(function () {
    const showcases = Array.from(document.querySelectorAll('.exp-showcase'));
    if (!showcases.length) return;

    const ROTATION_DELAY = 4200;
    let intervalId = null;

    const controllers = showcases.map((showcase) => {
        const slides = Array.from(showcase.querySelectorAll('.exp-showcase__slide'));
        const pips = Array.from(showcase.querySelectorAll('.exp-showcase__progress span'));
        const counter = showcase.querySelector('.exp-showcase__progress b');
        const prev = showcase.querySelector('.exp-showcase__arrow--prev');
        const next = showcase.querySelector('.exp-showcase__arrow--next');
        let current = 0;

        function update(index) {
            if (slides.length < 2) return;

            slides[current].classList.remove('is-active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('is-active');

            pips.forEach((pip, pipIndex) => {
                pip.classList.toggle('is-active', pipIndex === current);
            });

            if (counter) {
                counter.textContent = `${String(current + 1).padStart(2, '0')}/${String(slides.length).padStart(2, '0')}`;
            }
        }

        function advance(amount) {
            update(current + amount);
        }

        return { showcase, slides, prev, next, advance };
    }).filter((controller) => controller.slides.length > 1);

    if (!controllers.length) return;

    function stopAll() {
        window.clearInterval(intervalId);
    }

    function startAll() {
        stopAll();
        intervalId = window.setInterval(() => {
            controllers.forEach((controller) => controller.advance(1));
        }, ROTATION_DELAY);
    }

    function resetSharedTimer() {
        startAll();
    }

    controllers.forEach((controller) => {
        const { showcase, prev, next, advance } = controller;

        prev?.addEventListener('click', () => {
            advance(-1);
            resetSharedTimer();
        });

        next?.addEventListener('click', () => {
            advance(1);
            resetSharedTimer();
        });

        showcase.addEventListener('click', (event) => {
            if (event.target.closest('.exp-showcase__arrow')) return;

            advance(1);
            resetSharedTimer();
        });

        showcase.addEventListener('mouseenter', stopAll);
        showcase.addEventListener('mouseleave', startAll);
        showcase.addEventListener('focusin', stopAll);
        showcase.addEventListener('focusout', startAll);
    });

    startAll();
})();
