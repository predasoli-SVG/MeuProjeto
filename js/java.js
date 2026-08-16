/* ===== BRAVO BARBER — Interactions ===== */

(function () {
    'use strict';

    /* ---- Navbar scroll state ---- */
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;

        if (y > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    /* overlay for mobile menu */
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        overlay.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Fechar menu');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    /* close menu on nav click */
    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* ESC to close */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ---- Smooth scroll with offset ---- */
    var navLinks = document.querySelectorAll('a[href^="#"]');
    var navbarHeight = 70;

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (href === '#' || href.length < 2) return;

            var target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ---- Reveal on scroll (IntersectionObserver) ---- */
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;

                    setTimeout(function () {
                        el.classList.add('visible');
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        /* fallback: show all */
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ---- Image lazy load fallback (already covered by loading="lazy") ---- */

    /* ---- Active section highlight in nav ---- */
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = navMenu.querySelectorAll('a[href^="#"]');

    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navAnchors.forEach(function (anchor) {
                        if (anchor.getAttribute('href') === '#' + id) {
                            anchor.style.color = 'var(--white)';
                        } else if (!anchor.classList.contains('nav-cta')) {
                            anchor.style.color = '';
                        }
                    });
                }
            });
        }, { threshold: 0.5, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(function (sec) {
            sectionObserver.observe(sec);
        });
    }

    /* ---- Year in footer (auto-update) ---- */
    var yearEls = document.querySelectorAll('.footer-bottom p');
    yearEls.forEach(function (el) {
        if (el.textContent.includes('2026')) {
            el.textContent = el.textContent.replace('2026', new Date().getFullYear());
        }
    });

})();