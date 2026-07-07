(function () {
    const STORAGE_KEY = 'agDarkMode';

    function applyDark(on) {
        document.body.classList.toggle('dark', on);
        document.querySelectorAll('.dark-toggle').forEach(btn => {
            btn.setAttribute('aria-pressed', String(on));
        });
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDark(saved !== null ? saved === 'true' : prefersDark);

    document.addEventListener('click', e => {
        const btn = e.target.closest('.dark-toggle');
        if (!btn) return;
        const isDark = !document.body.classList.contains('dark');
        applyDark(isDark);
        localStorage.setItem(STORAGE_KEY, isDark);
    });
})();
