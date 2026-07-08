(function () {
    const showcase = document.querySelector('.proj-showcase');
    if (!showcase) return;

    const slides = Array.from(showcase.querySelectorAll('.proj-showcase__slide'));
    const pips = Array.from(showcase.querySelectorAll('.proj-showcase__progress span'));
    const counter = showcase.querySelector('.proj-showcase__progress b');
    const prev = showcase.querySelector('.proj-showcase__arrow--prev');
    const next = showcase.querySelector('.proj-showcase__arrow--next');

    if (slides.length < 2) return;

    let current = 0;
    let intervalId = null;

    function update(index) {
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

    function start() {
        window.clearInterval(intervalId);
        intervalId = window.setInterval(() => update(current + 1), 4200);
    }

    function stop() {
        window.clearInterval(intervalId);
    }

    prev?.addEventListener('click', () => {
        stop();
        update(current - 1);
        start();
    });

    next?.addEventListener('click', () => {
        stop();
        update(current + 1);
        start();
    });

    showcase.addEventListener('click', (event) => {
        if (event.target.closest('.proj-showcase__arrow')) return;

        stop();
        update(current + 1);
        start();
    });

    showcase.addEventListener('mouseenter', stop);
    showcase.addEventListener('mouseleave', start);
    showcase.addEventListener('focusin', stop);
    showcase.addEventListener('focusout', start);

    start();
})();
