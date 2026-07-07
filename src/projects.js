// ── Hover: play video preview ──────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('.project-card__video');
    if (video) {
        card.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => video.pause());
    }

    card.addEventListener('click', e => {
        e.preventDefault();
        const href = card.getAttribute('href');
        const rect = card.getBoundingClientRect();
        const img  = card.querySelector('.project-card__img');

        // Pass the image to the next page so it can continue the animation
        sessionStorage.setItem('pt-img', img ? img.src : '');

        const cover = document.createElement('div');
        cover.className = 'page-transition-cover';
        cover.style.cssText = `
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            border-radius: 18px;
            background-image: url('${img ? img.src : ''}');
        `;
        document.body.appendChild(cover);
        cover.getBoundingClientRect(); // force reflow

        // Expand to fullscreen then navigate
        Object.assign(cover.style, {
            transition: 'top 320ms cubic-bezier(0.4,0,0.2,1), left 320ms cubic-bezier(0.4,0,0.2,1), width 320ms cubic-bezier(0.4,0,0.2,1), height 320ms cubic-bezier(0.4,0,0.2,1), border-radius 320ms cubic-bezier(0.4,0,0.2,1)',
            top: '0px', left: '0px', width: '100vw', height: '100vh', borderRadius: '0px',
        });

        cover.addEventListener('transitionend', e => {
            if (e.propertyName !== 'width') return;
            window.location.href = href;
        });
    });
});

// ── Project filter dropdown ───────────────────────────────────────────────
const projectFilter = document.querySelector('.project-filter');
const projectFilterButton = document.querySelector('.project-filter__button');
const projectFilterOptions = document.querySelectorAll('.project-filter__menu button');
const filterableProjectCards = document.querySelectorAll('.project-card');

const filterLabels = {
    all: 'All',
    ml: 'ML Learning',
    financial: 'Financial',
    hardware: 'Hardware',
};

function closeProjectFilter() {
    if (!projectFilter || !projectFilterButton) return;
    projectFilter.classList.remove('is-open');
    projectFilterButton.setAttribute('aria-expanded', 'false');
}

function applyProjectFilter(filter) {
    filterableProjectCards.forEach(card => {
        if (card.classList.contains('project-card--hidden')) return;

        const tags = (card.dataset.filterTags || '').split(/\s+/);
        const shouldShow = filter === 'all' || tags.includes(filter);
        card.classList.toggle('project-card--filter-hidden', !shouldShow);
    });

    projectFilterOptions.forEach(option => {
        option.classList.toggle('is-active', option.dataset.filter === filter);
    });

    if (projectFilterButton) {
        projectFilterButton.innerHTML = `Filter: ${filterLabels[filter] || 'All'} <span aria-hidden="true">▾</span>`;
    }
}

if (projectFilter && projectFilterButton) {
    projectFilterButton.addEventListener('click', () => {
        const isOpen = projectFilter.classList.toggle('is-open');
        projectFilterButton.setAttribute('aria-expanded', String(isOpen));
    });

    projectFilterOptions.forEach(option => {
        option.addEventListener('click', () => {
            applyProjectFilter(option.dataset.filter || 'all');
            closeProjectFilter();
        });
    });

    document.addEventListener('click', event => {
        if (!projectFilter.contains(event.target)) {
            closeProjectFilter();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeProjectFilter();
        }
    });

    applyProjectFilter('all');
}
