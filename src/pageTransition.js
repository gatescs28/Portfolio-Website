// Runs as the first script in <body> on project pages — before first paint.
// If a transition image was stored by projects.js, a fullscreen cover is
// created immediately (covering the page content), then shrinks to exactly
// where .proj-cover sits once the DOM is ready.
(function () {
    var img = sessionStorage.getItem('pt-img');
    if (!img) return;
    sessionStorage.removeItem('pt-img');

    // Create cover at fullscreen — synchronous, so it appears before page content paints
    var cover = document.createElement('div');
    cover.style.cssText =
        'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
        'background:url("' + img + '")center/cover no-repeat;' +
        'z-index:9999;pointer-events:none;';
    document.body.appendChild(cover);

    document.addEventListener('DOMContentLoaded', function () {
        var target = document.querySelector('.proj-cover');
        if (!target) { cover.remove(); return; }

        var rect = target.getBoundingClientRect();

        // Double rAF ensures layout is fully settled before we read rect and start animating
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                cover.style.transition = [
                    'top 440ms cubic-bezier(0.76,0,0.24,1)',
                    'left 440ms cubic-bezier(0.76,0,0.24,1)',
                    'width 440ms cubic-bezier(0.76,0,0.24,1)',
                    'height 440ms cubic-bezier(0.76,0,0.24,1)',
                    'border-radius 440ms cubic-bezier(0.76,0,0.24,1)',
                ].join(',');
                cover.style.top          = rect.top + 'px';
                cover.style.left         = rect.left + 'px';
                cover.style.width        = rect.width + 'px';
                cover.style.height       = rect.height + 'px';
                cover.style.borderRadius = '24px';

                cover.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName !== 'width') return;
                    cover.removeEventListener('transitionend', handler);
                    cover.remove();
                });
            });
        });
    });
}());
