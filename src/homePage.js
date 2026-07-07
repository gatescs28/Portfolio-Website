const slides = document.querySelectorAll('.slide');
let current = 0;
let intervalId = null;

function startSlideshow() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        goTo(current + 1);
    }, 3500);
}

function updateProjectReadout() {
    const counter = document.querySelector('.project-panel__progress b');
    const pips = document.querySelectorAll('.project-panel__progress > span');
    const meta = document.querySelector('.project-panel__meta');

    if (counter) {
        counter.textContent = `${String(current + 1).padStart(2, '0')}/${String(slides.length).padStart(2, '0')}`;
    }

    pips.forEach((pip, index) => {
        pip.classList.toggle('is-active', index === current);
    });

    if (meta) {
        meta.textContent = `Project // ${String(current + 1).padStart(3, '0')}`;
    }
}

function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    updateProjectReadout();
}

const projectPanel = document.querySelector('.project-panel');
projectPanel.addEventListener('mouseenter', () => clearInterval(intervalId));
projectPanel.addEventListener('mouseleave', startSlideshow);

document.querySelector('.slide-arrow--prev').addEventListener('click', () => {
    clearInterval(intervalId);
    goTo(current - 1);
});

document.querySelector('.slide-arrow--next').addEventListener('click', () => {
    clearInterval(intervalId);
    goTo(current + 1);
});

updateProjectReadout();
startSlideshow();

const sideNavContainer = document.querySelector('.side-nav-container');
const sideNav = sideNavContainer.querySelector('.side-nav');
const navLinks = sideNav.querySelectorAll('a');
const mergedPanels = sideNavContainer.querySelectorAll('.side-nav-merged');

navLinks.forEach((link, i) => {
    link.addEventListener('mouseenter', () => {
        sideNav.classList.add('fading');
        mergedPanels.forEach((panel, j) => {
            panel.classList.toggle('active', i === j);
        });
    });
});

sideNavContainer.addEventListener('mouseleave', () => {
    sideNav.classList.remove('fading');
    mergedPanels.forEach(panel => panel.classList.remove('active'));
});
