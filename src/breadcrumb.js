(function () {
    var siteMap = {
        'homepage.html': null,
        'projects.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: null }
        ],
        'project1.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: 'projects.html' },
            { label: 'NeuralVector Swarm', href: null }
        ],
        'project2.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: 'projects.html' },
            { label: 'Algorithmic Trading System', href: null }
        ],
        'project3.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: 'projects.html' },
            { label: 'Athletic Motion Analysis', href: null }
        ],
        'project4.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: 'projects.html' },
            { label: 'AI SharePoint Workflow Agent', href: null }
        ],
        'project7.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Projects', href: 'projects.html' },
            { label: 'Prediction Market Model', href: null }
        ],
        'experience.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Experience', href: null }
        ],
        'resume.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Resume', href: null }
        ],
        'about.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Personal', href: null }
        ],
        'contact.html': [
            { label: 'Home', href: 'index.html' },
            { label: 'Contact', href: null }
        ]
    };

    var filename = (window.location.pathname.split('/').pop() || '').toLowerCase();
    var crumbs = siteMap[filename];
    if (!crumbs) return;

    var bar = document.querySelector('.breadcrumb-bar');
    if (!bar) return;

    var html = crumbs.map(function (crumb, i) {
        var sep = i > 0 ? '<span class="breadcrumb__sep">&#62;</span>' : '';
        var isLast = i === crumbs.length - 1;
        if (isLast) {
            return sep + '<span class="breadcrumb__current">' + crumb.label + '</span>';
        }
        return sep + '<a href="' + crumb.href + '" class="breadcrumb__link">' + crumb.label + '</a>';
    }).join('');

    bar.innerHTML = html;
    bar.style.display = 'flex';
})();
