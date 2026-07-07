(function () {
    var calendar = document.querySelector('.prediction-calendar');
    var tooltip = document.querySelector('.prediction-calendar__tooltip');
    var detailPanel = document.querySelector('.prediction-calendar__detail');
    var detailScore = detailPanel && detailPanel.querySelector('strong');
    var detailPrediction = detailPanel && detailPanel.querySelector('small');
    var ratioChart = document.querySelector('.prediction-chart--ratio');

    if (calendar && tooltip && detailPanel && detailScore && detailPrediction && ratioChart) {
        var games = document.createDocumentFragment();
        var lossGames = [
            3, 8, 12, 17, 21,
            26, 31, 35, 39, 44,
            48, 53, 57, 62, 66,
            70, 73, 77, 81, 85,
            88, 90, 92, 93, 94
        ];

        for (var gameNumber = 1; gameNumber <= 104; gameNumber += 1) {
            var game = document.createElement('button');
            var isUpcoming = gameNumber > 94;
            var isWin = !isUpcoming && lossGames.indexOf(gameNumber) === -1;
            var score = isUpcoming ? 'Match yet to be played' : 'Team A 0–0 Team B';
            var prediction = isUpcoming ? 'Prediction: Match yet to be played' : 'Prediction: Team A 0–0 Team B';
            var details = 'Game ' + gameNumber + ': ' + score + ' · ' + prediction;

            game.type = 'button';
            game.className = 'prediction-game prediction-game--' + (isUpcoming ? 'upcoming' : (isWin ? 'win' : 'loss'));
            game.setAttribute('role', 'listitem');
            game.setAttribute('aria-label', details);
            game.dataset.game = 'Game ' + gameNumber;
            game.dataset.score = score;
            game.dataset.prediction = prediction;
            game.dataset.outcome = isUpcoming ? 'upcoming' : (isWin ? 'win' : 'loss');
            games.appendChild(game);
        }

        calendar.appendChild(games);

        function showGameDetails(event) {
            var game = event.target.closest('.prediction-game');
            if (!game || !calendar.contains(game)) return;

            detailPanel.querySelector('span').textContent = game.dataset.game + ' // Selected';
            detailScore.textContent = game.dataset.score;
            detailPrediction.textContent = game.dataset.prediction;
            detailPanel.classList.remove('is-win', 'is-loss', 'is-upcoming');
            detailPanel.classList.add('is-' + game.dataset.outcome);
            detailPanel.setAttribute('aria-hidden', 'false');
            detailPanel.classList.add('is-active');
            ratioChart.classList.add('has-active-game');
        }

        function clearGameDetails(event) {
            var next = event.relatedTarget;
            if (next && calendar.contains(next)) return;

            detailPanel.setAttribute('aria-hidden', 'true');
            detailPanel.classList.remove('is-active');
            ratioChart.classList.remove('has-active-game');
        }

        calendar.addEventListener('mouseover', showGameDetails);
        calendar.addEventListener('focusin', showGameDetails);
        calendar.addEventListener('mouseout', clearGameDetails);
        calendar.addEventListener('focusout', clearGameDetails);
    }

    var value = document.querySelector('.prediction-profit__value');
    var chart = document.querySelector('.prediction-chart--profit');
    var seedMoving = document.querySelector('.prediction-profit__seed-moving');
    var multiplier = document.querySelector('.prediction-profit__multiplier');
    var gaugeChart = document.querySelector('.prediction-chart--gauge');
    var gaugeValue = document.querySelector('.prediction-gauge__value strong');
    if (!value || !chart || !seedMoving || !multiplier || !gaugeChart || !gaugeValue) return;

    var seed = Number(value.dataset.seed || 25);
    var target = Number(value.dataset.target || 360);
    var profitDuration = 3200;
    var gaugeDuration = 1800;
    var hasStarted = false;
    var gaugeTarget = Number(gaugeValue.parentElement.dataset.target || 80);
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gaugeChart.style.setProperty('--gauge-end-angle', (gaugeTarget * 1.8) + 'deg');

    function startGaugeAnimation() {
        if (reduceMotion) {
            gaugeValue.textContent = gaugeTarget + '%';
            gaugeChart.classList.add('is-complete');
            return;
        }

        gaugeChart.classList.add('is-running');

        var gaugeStartedAt = null;

        function updateGauge(timestamp) {
            if (gaugeStartedAt === null) gaugeStartedAt = timestamp;

            var progress = Math.min((timestamp - gaugeStartedAt) / gaugeDuration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var amount = Math.round(gaugeTarget * eased);

            gaugeValue.textContent = amount + '%';

            if (progress < 1) {
                requestAnimationFrame(updateGauge);
            } else {
                gaugeChart.classList.remove('is-running');
                gaugeChart.classList.add('is-complete');
            }
        }

        requestAnimationFrame(updateGauge);
    }

    function showMultiplier() {
        var ratio = Math.round((target / seed) * 100) / 100;
        var formatted = ratio.toFixed(2).replace(/\.?0+$/, '');
        var multiplierText = 'x' + formatted;
        var asciiCharacters = '#/01+*=:';

        multiplier.textContent = '';
        multiplier.setAttribute('aria-label', multiplierText);

        multiplierText.split('').forEach(function (character, characterIndex) {
            var glyph = document.createElement('span');
            var finalCharacter = document.createElement('span');
            var asciiCloud = document.createElement('small');
            var cloudText = '';

            glyph.className = 'prediction-profit__glyph';
            if (characterIndex === 0) glyph.classList.add('prediction-profit__glyph--prefix');
            finalCharacter.className = 'prediction-profit__glyph-final';
            asciiCloud.className = 'prediction-profit__ascii-cloud';
            finalCharacter.setAttribute('aria-hidden', 'true');
            asciiCloud.setAttribute('aria-hidden', 'true');
            finalCharacter.textContent = character;

            for (var asciiIndex = 0; asciiIndex < 9; asciiIndex += 1) {
                cloudText += asciiCharacters[(characterIndex * 3 + asciiIndex) % asciiCharacters.length];
            }

            asciiCloud.textContent = cloudText;
            glyph.appendChild(finalCharacter);
            glyph.appendChild(asciiCloud);
            multiplier.appendChild(glyph);
        });

        multiplier.classList.add('is-visible');

        var glyphs = multiplier.querySelectorAll('.prediction-profit__glyph');

        if (reduceMotion) {
            glyphs.forEach(function (glyph) {
                glyph.classList.add('is-resolved');
            });
            startGaugeAnimation();
            return;
        }

        glyphs.forEach(function (glyph, index) {
            window.setTimeout(function () {
                glyph.classList.add('is-resolved');

                if (index === glyphs.length - 1) {
                    window.setTimeout(startGaugeAnimation, 240);
                }
            }, 260 * index);
        });
    }

    function countUp() {
        var startedAt = null;

        function update(timestamp) {
            if (startedAt === null) startedAt = timestamp;

            var progress = Math.min((timestamp - startedAt) / profitDuration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var amount = Math.round(seed + (target - seed) * eased);

            value.textContent = '$' + amount.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                showMultiplier();
            }
        }

        requestAnimationFrame(update);
    }

    function startSequence() {
        if (hasStarted) return;
        hasStarted = true;

        var seedBottom = seedMoving.getBoundingClientRect().bottom;
        var valueBottom = value.getBoundingClientRect().bottom;
        chart.style.setProperty('--seed-drop-distance', Math.max(0, Math.round(valueBottom - seedBottom)) + 'px');

        if (reduceMotion) {
            value.textContent = '$' + target.toLocaleString();
            chart.classList.add('is-complete');
            showMultiplier();
            return;
        }

        chart.classList.add('is-running');

        window.setTimeout(function () {
            value.textContent = '$' + seed.toLocaleString();
            value.classList.add('is-seeded');
        }, 2300);

        window.setTimeout(countUp, 2500);
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.98) {
                    observer.disconnect();
                    startSequence();
                }
            });
        }, {
            threshold: [0.98]
        });

        observer.observe(chart);
    } else {
        startSequence();
    }
}());
