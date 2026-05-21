// ============ CUSTOM CURSOR ============
// Replaces default OS cursor with a styled ring + dot
const customCursor    = document.getElementById('customCursor');
const customCursorDot = document.getElementById('customCursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot snaps instantly
    if (customCursorDot) {
        customCursorDot.style.left = mouseX + 'px';
        customCursorDot.style.top  = mouseY + 'px';
    }
});

// Ring follows with smooth lag
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    if (customCursor) {
        customCursor.style.left = cursorX + 'px';
        customCursor.style.top  = cursorY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand cursor ring when hovering interactive elements
document.querySelectorAll('a, button, .portfolio-card, .contact-item, .skill-icon').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (customCursor) { customCursor.style.width = '56px'; customCursor.style.height = '56px'; }
    });
    el.addEventListener('mouseleave', () => {
        if (customCursor) { customCursor.style.width = '36px'; customCursor.style.height = '36px'; }
    });
});


// ============ MAGNETIC BUTTONS ============
// Buttons gently attract toward the cursor when nearby
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect   = btn.getBoundingClientRect();
        const relX   = e.clientX - rect.left - rect.width  / 2;
        const relY   = e.clientY - rect.top  - rect.height / 2;
        const strength = 0.35;
        btn.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});


// ============ LOADING SCREEN ============
// Animates the loading intro, then removes it after delay
(function initLoadingScreen() {
    const ls      = document.getElementById('loadingScreen');
    const lsName  = document.getElementById('lsName');
    const lsPct   = document.getElementById('lsPercent');
    if (!ls) return;

    // Animate percentage counter 0 → 100
    let pct = 0;
    const pctInterval = setInterval(() => {
        pct = Math.min(pct + Math.floor(Math.random() * 4) + 1, 100);
        if (lsPct) lsPct.textContent = pct + '%';
        if (pct >= 100) clearInterval(pctInterval);
    }, 23);

    // Build animated name letters
    const name = 'ANIDATUL SIFA';
    name.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = char === ' ' ? 'ls-letter space' : 'ls-letter';
        if (char !== ' ') span.textContent = char;
        span.style.animationDelay = (0.1 + i * 0.07) + 's';
        if (lsName) lsName.appendChild(span);
    });

    // Exit loading screen at 2.8s
    setTimeout(() => {
        ls.classList.add('ls-exit');
        // Remove from DOM after exit transition completes
        setTimeout(() => {
            ls.style.display = 'none';
            ls.remove();
        }, 850);
    }, 2800);
})();


// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const body        = document.body;
let isDark = false;

const sunPath  = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
const moonPath = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>';

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    body.classList.toggle('dark');
    body.classList.toggle('light');
    themeIcon.innerHTML = isDark ? moonPath : sunPath;
    // Refresh particles and code symbols for new theme
    createParticles();
    createCodeSymbols();
    addTerminalDecoration();
});


// ============ CLOSE / GOODBYE OVERLAY ============
const closeBtn    = document.getElementById('closeBtn');
const overlay     = document.getElementById('overlay');
const overlayClose = document.getElementById('overlayClose');

closeBtn.addEventListener('click',    () => { overlay.classList.add('active'); });
overlayClose.addEventListener('click', () => { overlay.classList.remove('active'); });


// ============ NAVBAR & SIDEBAR VISIBILITY ============
const navbar  = document.getElementById('navbar');
const sidebar = document.getElementById('sidebar');

// Hide sidebar when About section is visible
const aboutSection  = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sidebar.classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
        }
    });
}, { threshold: 0.3 });
aboutObserver.observe(aboutSection);

// Hide navbar after scrolling 100px
window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    if (st > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
});

// Reveal navbar/sidebar when mouse approaches top
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 60) {
        navbar.classList.remove('hidden');
        sidebar.classList.remove('hidden');
    }
});


// ============ RIPPLE EFFECT ON SIDEBAR ============
// Dark mode: ripple on click
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (isDark) {
            const rect   = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left  = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top   = (e.clientY - rect.top  - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

    // Dark mode: nav particles on hover
    link.addEventListener('mouseenter', function (e) {
        if (!isDark) return;
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.classList.add('nav-particle');
            particle.style.left = (e.clientX + Math.random() * 30 - 15) + 'px';
            particle.style.top  = (e.clientY + Math.random() * 30 - 15) + 'px';
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    });
});


// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// ============ SCROLL ANIMATIONS (fade up on enter viewport) ============
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));


// ============ SKILL BARS: ANIMATED FILL + COUNT-UP ============
// Fills skill bars and counts percentage when section enters viewport
(function initSkillBars() {
    const skillsList   = document.querySelector('.skills-list');
    const skillBars    = document.querySelectorAll('.skill-bar-fill');
    const skillPercents = document.querySelectorAll('.skill-percent');
    let animated = false;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;

                // Animate bar width with stagger
                skillBars.forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width + '%';
                    }, i * 180 + 200);
                });

                // Animated count-up for percentage numbers
                skillPercents.forEach((el, i) => {
                    const target = parseInt(el.dataset.pct) || 0;
                    el.textContent = '0%';
                    setTimeout(() => {
                        let cur = 0;
                        const step = () => {
                            cur = Math.min(cur + 2, target);
                            el.textContent = cur + '%';
                            if (cur < target) requestAnimationFrame(step);
                        };
                        requestAnimationFrame(step);
                    }, i * 180 + 300);
                });

                // Staggered slide-in for each skill row
                document.querySelectorAll('.skill-item').forEach((item, i) => {
                    item.style.opacity   = '0';
                    item.style.transform = 'translateX(-50px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
                        item.style.opacity    = '1';
                        item.style.transform  = 'translateX(0)';
                    }, i * 150 + 100);
                });
            }
        });
    }, { threshold: 0.25 });

    if (skillsList) obs.observe(skillsList);
})();


// ============ SKILL BAR EXIT ANIMATION ============
// Bars retract to the right when user scrolls past skills section
(function initSkillBarExit() {
    const skillsSec = document.querySelector('.skills-section');
    if (!skillsSec) return;

    let skillsWasVisible = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsWasVisible = true;
                skillsSec.classList.remove('skill-exit');
            } else if (skillsWasVisible && !entry.isIntersecting) {
                // Only exit if scrolling downward past the section
                const scrollDir = window.pageYOffset > (skillsSec._lastScrollY || 0);
                if (scrollDir) {
                    skillsSec.classList.add('skill-exit');
                } else {
                    skillsSec.classList.remove('skill-exit');
                }
            }
            skillsSec._lastScrollY = window.pageYOffset;
        });
    }, { threshold: 0.05 });

    observer.observe(skillsSec);

    window.addEventListener('scroll', () => {
        skillsSec._lastScrollY = window.pageYOffset;
    }, { passive: true });
})();

// ============ PORTFOLIO CAROUSEL ============
const carousel = document.getElementById('portfolioCarousel');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
const cards    = carousel ? carousel.querySelectorAll('.portfolio-card') : [];

// Highlight the card closest to the center of the carousel
function updateCarouselFocus() {
    if (!carousel || cards.length === 0) return;
    const carouselRect = carousel.getBoundingClientRect();
    const centerX      = carouselRect.left + carouselRect.width / 2;
    cards.forEach(card => {
        card.classList.remove('center', 'near');
        const rect       = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance   = Math.abs(centerX - cardCenter);
        if      (distance < 120) card.classList.add('center');
        else if (distance < 240) card.classList.add('near');
    });
}

if (prevBtn) prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -250, behavior: 'smooth' }); });
if (nextBtn) nextBtn.addEventListener('click', () => { carousel.scrollBy({ left:  250, behavior: 'smooth' }); });

if (carousel) {
    carousel.addEventListener('scroll', updateCarouselFocus);
    window.addEventListener('resize', updateCarouselFocus);
    setTimeout(updateCarouselFocus, 300);
}

// ============ SCROLL PROGRESS BAR ============
// Thin rainbow bar at top of screen indicating scroll depth
(function initScrollBar() {
    let stripe = document.getElementById('scrollStripe');
    if (!stripe) {
        stripe = document.createElement('div');
        stripe.id = 'scrollStripe';
        document.body.appendChild(stripe);
    }
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docH      = document.documentElement.scrollHeight - window.innerHeight;
        stripe.style.transform = `scaleX(${docH > 0 ? scrollTop / docH : 0})`;
    }, { passive: true });
})();

// ============ PARTICLES ============
// Floating ambient particles (light mode: pink, dark mode: blue)
const particlesContainer = document.getElementById('particles');

function createParticles() {
    particlesContainer.innerHTML = '';
    const count = window.innerWidth < 900 ? 18 : 35;
    for (let i = 0; i < count; i++) {
        const p    = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 6 + 3;
        p.style.width  = size + 'px';
        p.style.height = size + 'px';
        p.style.left   = Math.random() * 100 + '%';
        p.style.background = isDark
            ? `rgba(${Math.round(80 + Math.random()*50)}, ${Math.round(120 + Math.random()*60)}, 255, 0.3)`
            : `rgba(244, ${Math.round(100 + Math.random()*50)}, 142, 0.22)`;
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay   = (Math.random() * 8)       + 's';
        particlesContainer.appendChild(p);
    }
}
createParticles();

// ============ CODE SYMBOLS (DARK MODE MATRIX EFFECT) ============
// Floating code chars fall from the top like a matrix rain in dark mode
function createCodeSymbols() {
    // Remove old symbols
    document.querySelectorAll('.code-symbol').forEach(s => s.remove());
    if (!isDark) return;

    const symbols = ['</', '{}', '=>', '&&', '||', '()', '[]', '/*', '*/', '++', '--',
                     'fn', 'var', 'let', 'if', '!=', '==', '>>', '<<', '::'];
    const count   = window.innerWidth < 900 ? 8 : 16;

    for (let i = 0; i < count; i++) {
        const sym     = document.createElement('div');
        sym.className = 'code-symbol';
        sym.textContent        = symbols[Math.floor(Math.random() * symbols.length)];
        sym.style.left         = Math.random() * 100 + 'vw';
        sym.style.top          = (Math.random() * -50) + 'vh';
        sym.style.animationDuration  = (Math.random() * 8 + 4) + 's';
        sym.style.animationDelay     = (Math.random() * 6)     + 's';
        sym.style.fontSize           = (Math.random() * 8 + 10) + 'px';
        sym.style.opacity            = (Math.random() * 0.4 + 0.3).toString();
        document.body.appendChild(sym);
    }
}
createCodeSymbols();


// ============ TERMINAL DECORATION ============
// Adds terminal-style corner decorations in dark mode
function addTerminalDecoration() {
    document.querySelectorAll('.terminal-corner').forEach(el => el.remove());
    if (!isDark) return;

    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach(pos => {
        const corner = document.createElement('div');
        corner.className = 'terminal-corner ' + pos;
        document.body.appendChild(corner);
    });
}


// ============ CINEMATIC PROFILE PARALLAX ============
// Profile info slides slightly as user scrolls away from hero section
(function initProfileParallax() {
    const profileSec  = document.getElementById('profile');
    const profileInfo = document.querySelector('.profile-info');
    const profileAv   = document.querySelector('.profile-avatar');
    const decors      = document.querySelectorAll('.profile-decor');

    window.addEventListener('scroll', () => {
        if (!profileSec) return;
        const rect = profileSec.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        // p: 0 when section top = viewport top, 1 when section has scrolled away
        const progress = -rect.top / rect.height;
        const p = Math.max(0, Math.min(1, progress));

        if (profileInfo) {
            profileInfo.style.transform = `translateX(${p * -50}px) translateY(${p * -20}px)`;
            profileInfo.style.opacity   = `${1 - p * 0.4}`;
        }
        if (profileAv) {
            profileAv.style.transform = `translateX(${p * 40}px) translateY(${p * -15}px) scale(${1 - p * 0.1})`;
            profileAv.style.opacity   = `${1 - p * 0.3}`;
        }
        // Background decors rotate as you scroll
        decors.forEach((d, i) => {
            d.style.transform = `rotate(${p * (i % 2 === 0 ? 180 : -120)}deg) scale(${1 + p * 0.2})`;
        });
    }, { passive: true });
})();


// ============ CINEMATIC ABOUT: FOTO NYERET DARI KIRI ============
// Foto awalnya tersembunyi jauh di kiri layar.
// Saat About section muncul di viewport → foto "nyeret" masuk dari kiri.
// Saat scroll melewati section → foto perlahan geser ke kanan dan menghilang.
(function initAboutCinematicSlide() {
    const aboutSec   = document.getElementById('about');
    const aboutPhoto = document.querySelector('.about-photo-frame');
    const aboutText  = document.querySelector('.about-text');
    if (!aboutSec || !aboutPhoto) return;

    // Set initial state: foto tersembunyi di kiri, teks tersembunyi di kanan
    aboutPhoto.style.opacity   = '0';
    aboutPhoto.style.transform = 'translateX(-160px)';
    aboutPhoto.style.transition = 'none'; // dikendalikan JS, bukan CSS transition

    if (aboutText) {
        aboutText.style.opacity   = '0';
        aboutText.style.transform = 'translateX(80px)';
        aboutText.style.transition = 'none';
    }

    // Clamp helper
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    window.addEventListener('scroll', () => {
        const rect = aboutSec.getBoundingClientRect();
        const vh   = window.innerHeight;

        // ── FASE 1: MASUK ──
        // Saat section mulai muncul dari bawah (rect.top = vh) sampai tengah layar
        // enterProgress: 0 = section baru kelihatan, 1 = section di tengah viewport
        const enterProgress = clamp(1 - rect.top / (vh * 0.75), 0, 1);

        // ── FASE 2: KELUAR ──
        // Saat section mulai keluar ke atas (rect.top negatif)
        // exitProgress: 0 = section masih di tengah, 1 = section sudah habis
        const exitProgress  = clamp(-rect.top / (rect.height * 0.6), 0, 1);

        // Gabungkan: masuk dulu, lalu keluar
        if (exitProgress > 0) {
            // Foto geser ke kanan dan fade out saat scroll ke bawah
            const ex = exitProgress;
            aboutPhoto.style.opacity   = `${1 - ex}`;
            aboutPhoto.style.transform = `translateX(${ex * 120}px) scale(${1 - ex * 0.05})`;

            if (aboutText) {
                aboutText.style.opacity   = `${1 - ex * 0.8}`;
                aboutText.style.transform = `translateX(${ex * -40}px)`;
            }
        } else {
            // Foto nyeret masuk dari kiri, easing smooth
            const ep = enterProgress;
            // Easing: cubic ease-out secara manual lewat formula
            const eased = 1 - Math.pow(1 - ep, 3);

            aboutPhoto.style.opacity   = `${eased}`;
            aboutPhoto.style.transform = `translateX(${(1 - eased) * -160}px) scale(${0.92 + eased * 0.08})`;

            if (aboutText) {
                // Teks muncul sedikit terlambat (delay 0.15 faktor)
                const textEp    = clamp((ep - 0.15) / 0.85, 0, 1);
                const textEased = 1 - Math.pow(1 - textEp, 3);
                aboutText.style.opacity   = `${textEased}`;
                aboutText.style.transform = `translateX(${(1 - textEased) * 80}px)`;
            }
        }
    }, { passive: true });

    // Trigger scroll satu kali agar langsung terhitung posisi awal
    window.dispatchEvent(new Event('scroll'));
})();

// ============ CONTACT FORM SUBMISSION ============
// Alert confirmation when submit button is clicked
function handleSubmit(btn) {
    const originalText   = btn.textContent;
    btn.textContent      = '✓ Sent!';
    btn.style.background = '#22c55e';
    btn.style.color      = '#fff';
    btn.style.borderColor = '#22c55e';
    setTimeout(() => {
        btn.textContent      = originalText;
        btn.style.background = '';
        btn.style.color      = '';
        btn.style.borderColor = '';
    }, 2500);
}

// ============ TYPING EFFECT ON NAME ============
// Typewriter effect on profile h1 after loading screen exits
(function initTypingName() {
    const nameEl = document.querySelector('.profile-info h1');
    if (!nameEl) return;

    const fullText = nameEl.textContent.trim();
    nameEl.textContent = '';

    // Create blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.style.cssText = `
        display: inline-block; width: 3px; height: 1em;
        background: currentColor; margin-left: 2px;
        vertical-align: text-bottom;
        animation: cursorBlink 0.8s step-end infinite;
    `;
    nameEl.appendChild(cursor);

    // Inject cursor blink keyframes once
    if (!document.getElementById('cursorBlinkStyle')) {
        const style = document.createElement('style');
        style.id = 'cursorBlinkStyle';
        style.textContent = '@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }';
        document.head.appendChild(style);
    }

    let i = 0;
    function type() {
        if (i < fullText.length) {
            nameEl.insertBefore(document.createTextNode(fullText[i]), cursor);
            i++;
            const delay = fullText[i - 1] === ' ' ? 180 : (Math.random() * 60 + 60);
            setTimeout(type, delay);
        } else {
            // Cursor blinks for 3 seconds then fades out
            setTimeout(() => {
                cursor.style.transition = 'opacity 0.8s';
                cursor.style.opacity    = '0';
                setTimeout(() => cursor.remove(), 800);
            }, 3000);
        }
    }

    // Start typing after loading screen exits (~3.8s total)
    setTimeout(type, 3900);
})();


// ============ SECTION ENTRANCE GLOW LINES ============
// Adds a color flash on section headings when they enter viewport
(function initHeadingGlow() {
    const headings = document.querySelectorAll('.portfolio-section h2, .skills-section h2');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)';
                entry.target.style.transform  = 'translate(-4px, -4px)';
                setTimeout(() => {
                    entry.target.style.transform = 'translate(0, 0)';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    headings.forEach(h => obs.observe(h));
})();


// ============ FOOTER SOCIAL ICONS STAGGER ============
// Social icons bounce in when footer enters viewport
(function initFooterAnimation() {
    const footer       = document.querySelector('.footer');
    const socialLinks  = document.querySelectorAll('.social-links a');
    const footerLinks  = document.querySelectorAll('.footer-links a');
    let   footerAnimated = false;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !footerAnimated) {
                footerAnimated = true;

                // Social icons bounce in with stagger
                socialLinks.forEach((link, i) => {
                    link.style.opacity   = '0';
                    link.style.transform = 'translateY(20px) scale(0.8)';
                    setTimeout(() => {
                        link.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
                        link.style.opacity    = '1';
                        link.style.transform  = 'translateY(0) scale(1)';
                    }, i * 120 + 200);
                });

                // Footer nav links fade in
                footerLinks.forEach((link, i) => {
                    link.style.opacity   = '0';
                    link.style.transform = 'translateX(-15px)';
                    setTimeout(() => {
                        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        link.style.opacity    = '0.85';
                        link.style.transform  = 'translateX(0)';
                    }, i * 80 + 100);
                });
            }
        });
    }, { threshold: 0.3 });

    if (footer) obs.observe(footer);
})();


// ============ CONTACT SECTION ITEMS STAGGER ============
// Contact info cards slide in one by one
(function initContactAnimation() {
    const contactItems = document.querySelectorAll('.contact-item');
    let   contactAnimated = false;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !contactAnimated) {
                contactAnimated = true;
                contactItems.forEach((item, i) => {
                    item.style.opacity   = '0';
                    item.style.transform = 'translateX(-40px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
                        item.style.opacity    = '1';
                        item.style.transform  = 'translateX(0)';
                    }, i * 150 + 100);
                });
            }
        });
    }, { threshold: 0.3 });

    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) obs.observe(contactInfo);
})();


// ============ ROBOT SPLINE: CLICK BOUNCE ============
// Robot does a fun movement animation on click
const robotWrapper = document.getElementById('robotWrapper');
if (robotWrapper) {
    robotWrapper.addEventListener('click', () => {
        robotWrapper.classList.add('moving');
        setTimeout(() => robotWrapper.classList.remove('moving'), 2000);
    });
}


// ============ PORTFOLIO CARDS: HOVER RIPPLE ============
// Adds a ripple at click position on portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousedown', function(e) {
        const rect   = this.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 80px; height: 80px;
            left: ${e.clientX - rect.left - 40}px;
            top:  ${e.clientY - rect.top  - 40}px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
            z-index: 100;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});


// ============ WINDOW RESIZE: REFRESH PARTICLES ============
window.addEventListener('resize', () => {
    createParticles();
}, { passive: true });



// ============ [FEATURE 1] CURSOR TRAIL / EKOR CURSOR ============
// Canvas-based glowing trail yang smooth dan elegan di belakang cursor
(function initCursorTrail() {
    const canvas = document.getElementById('cursorTrailCanvas');
    if (!canvas) return;

    // Sembunyikan di mobile
    if (window.innerWidth <= 768) return;

    const ctx = canvas.getContext('2d');

    // Resize canvas mengikuti window
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Array titik-titik ekor (trail points)
    const trailPoints = [];
    const TRAIL_LENGTH = 22;   // jumlah titik ekor
    const TRAIL_MAX_R  = 7;    // radius titik terbesar (pangkal)
    const TRAIL_MIN_R  = 0.5;  // radius titik terkecil (ujung)

    // Posisi mouse raw
    let rawX = window.innerWidth / 2;
    let rawY = window.innerHeight / 2;

    // Inisialisasi semua titik di tengah
    for (let i = 0; i < TRAIL_LENGTH; i++) {
        trailPoints.push({ x: rawX, y: rawY });
    }

    document.addEventListener('mousemove', (e) => {
        rawX = e.clientX;
        rawY = e.clientY;
    });

    // Helper: ambil warna glow sesuai mode
    function getGlowColor(alpha) {
        const dark = document.body.classList.contains('dark');
        if (dark) return `rgba(102, 153, 255, ${alpha})`;
        return `rgba(244, 100, 130, ${alpha})`;
    }

    function animateTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update posisi: setiap titik mengikuti titik sebelumnya dengan lag
        for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
            const factor = 0.28 + i * 0.012; // titik belakang lebih lambat
            trailPoints[i].x += (trailPoints[i - 1].x - trailPoints[i].x) * factor;
            trailPoints[i].y += (trailPoints[i - 1].y - trailPoints[i].y) * factor;
        }
        // Titik pertama langsung mengikuti mouse
        trailPoints[0].x += (rawX - trailPoints[0].x) * 0.35;
        trailPoints[0].y += (rawY - trailPoints[0].y) * 0.35;

        // Gambar setiap titik sebagai lingkaran blur + glow
        for (let i = 0; i < TRAIL_LENGTH; i++) {
            // Semakin ke belakang → semakin kecil & transparan
            const progress = 1 - i / TRAIL_LENGTH;        // 1 di depan, 0 di belakang
            const eased    = Math.pow(progress, 1.8);     // easing: lebih cepat fade di belakang

            const radius  = TRAIL_MIN_R + (TRAIL_MAX_R - TRAIL_MIN_R) * eased;
            const alpha   = eased * 0.55;
            const glowR   = radius * 2.5;
            const glowAlpha = eased * 0.18;

            const pt = trailPoints[i];

            // Glow luar (soft blur circle)
            const glowGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowR);
            glowGrad.addColorStop(0,   getGlowColor(glowAlpha));
            glowGrad.addColorStop(1,   getGlowColor(0));
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            // Core titik
            const coreGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
            coreGrad.addColorStop(0, getGlowColor(alpha));
            coreGrad.addColorStop(1, getGlowColor(0));
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = coreGrad;
            ctx.fill();
        }

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
})();


// ============ [FEATURE 2] NAVIGATION ACTIVE INDICATOR ============
// Bulatan glow yang pindah mengikuti section yang sedang aktif di viewport
(function initNavActiveIndicator() {
    const sidebar   = document.getElementById('sidebar');
    const indicator = document.getElementById('navActiveIndicator');
    if (!sidebar || !indicator) return;

    // Map: section id → sidebar link
    const sectionIds = ['profile', 'about', 'skills', 'portfolio', 'contact'];
    const navLinks   = sidebar.querySelectorAll('a');

    // Peta index link per section
    const sectionLinkMap = {};
    sectionIds.forEach((id, i) => {
        if (navLinks[i]) sectionLinkMap[id] = navLinks[i];
    });

    let currentActive = null;

    // Pindahkan indicator ke posisi link tertentu
    function moveIndicatorTo(link) {
        if (!link || link === currentActive) return;
        currentActive = link;

        // Hapus class aktif dari semua link
        navLinks.forEach(l => l.classList.remove('nav-active'));
        link.classList.add('nav-active');

        // Hitung posisi relatif terhadap sidebar
        const sidebarRect = sidebar.getBoundingClientRect();
        const linkRect    = link.getBoundingClientRect();

        // top relatif: jarak dari top sidebar ke center link
        const relativeTop = linkRect.top - sidebarRect.top + (linkRect.height / 2) - (44 / 2);

        indicator.style.top     = relativeTop + 'px';
        indicator.style.opacity = '1';
    }

    // IntersectionObserver untuk setiap section
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // section dianggap aktif saat di tengah viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id   = entry.target.id;
                const link = sectionLinkMap[id];
                if (link) moveIndicatorTo(link);
            }
        });
    }, observerOptions);

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) sectionObserver.observe(section);
    });

    // Set aktif awal ke Home setelah load
    setTimeout(() => {
        if (!currentActive && sectionLinkMap['profile']) {
            moveIndicatorTo(sectionLinkMap['profile']);
        }
    }, 3600); // setelah loading screen selesai

    // Update posisi jika window di-resize (karena posisi sidebar bisa berubah)
    window.addEventListener('resize', () => {
        if (currentActive) {
            const link = currentActive;
            currentActive = null; // force re-calculate
            moveIndicatorTo(link);
        }
    }, { passive: true });
})();


// ============ [FEATURE 3] MAGNIFY / FOCUS TEXT EFFECT ============
// Efek kaca pembesar pada tagline: default blur, area cursor menjadi fokus/jelas
(function initMagnifyText() {
    const wrap   = document.getElementById('magnifyTextWrap');
    const tagline = document.getElementById('magnifyTagline');
    if (!wrap || !tagline) return;

    // Sembunyikan di mobile
    if (window.innerWidth <= 768) return;

    // Buat overlay lingkaran "kaca pembesar" sebagai visual hint
    const glassEl = document.createElement('div');
    glassEl.id = 'magnifyGlassOverlay';
    wrap.style.position = 'relative'; // pastikan wrap punya positioning
    wrap.appendChild(glassEl);

    const RADIUS     = 60;  // radius area fokus (px)
    const BLUR_BASE  = 1.8; // blur default tagline
    let   isInside   = false;

    // Track posisi mouse relatif terhadap wrap
    let localX = 0, localY = 0;

    function onMouseMove(e) {
        const rect = wrap.getBoundingClientRect();
        localX = e.clientX - rect.left;
        localY = e.clientY - rect.top;

        // Update posisi kaca pembesar
        glassEl.style.left   = localX + 'px';
        glassEl.style.top    = localY + 'px';
        glassEl.style.width  = (RADIUS * 2) + 'px';
        glassEl.style.height = (RADIUS * 2) + 'px';

        // Hitung seberapa "dalam" kursor dari tepi area
        const margin = 10;
        const inX = localX > -margin && localX < rect.width + margin;
        const inY = localY > -margin && localY < rect.height + margin;

        if (inX && inY) {
            // Terapkan efek: gunakan CSS mask via background clip
            // Pendekatan: pakai radial gradient text-shadow sebagai glow fokus
            tagline.style.setProperty('--magnify-x', localX + 'px');
            tagline.style.setProperty('--magnify-y', localY + 'px');

            // Kurangi blur pada area cursor menggunakan WebKitMask
            // Karena CSS blur tidak bisa per-area, kita pakai pendekatan:
            // tagline asli blur → duplicate clear layer di atas dengan mask
            applyFocusEffect(localX, localY, RADIUS);
        }
    }

    // Buat elemen tagline duplikat yang tajam, dengan mask radial
    const taglineClear = tagline.cloneNode(true);
    taglineClear.removeAttribute('id');
    taglineClear.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        margin: 0;
        padding: ${window.getComputedStyle(tagline).padding};
        font-size: ${window.getComputedStyle(tagline).fontSize};
        line-height: ${window.getComputedStyle(tagline).lineHeight};
        color: inherit;
        filter: none;
        pointer-events: none;
        -webkit-mask-image: radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%);
        mask-image: radial-gradient(circle 0px at 50% 50%, black 60%, transparent 100%);
        transition: none;
        z-index: 2;
        opacity: 0;
    `;
    wrap.appendChild(taglineClear);

    function applyFocusEffect(x, y, r) {
        const rect = wrap.getBoundingClientRect();
        const pctX = (x / rect.width  * 100).toFixed(2) + '%';
        const pctY = (y / rect.height * 100).toFixed(2) + '%';
        const maskVal = `radial-gradient(circle ${r}px at ${pctX} ${pctY}, black 30%, transparent 75%)`;

        taglineClear.style.webkitMaskImage = maskVal;
        taglineClear.style.maskImage       = maskVal;
        taglineClear.style.opacity         = '1';
        glassEl.style.opacity              = '1';

        // Text glow pada area fokus untuk efek premium
        taglineClear.style.textShadow = document.body.classList.contains('dark')
            ? '0 0 8px rgba(102,153,255,0.4)'
            : '0 0 8px rgba(244,132,142,0.35)';
    }

    function onMouseEnter() {
        isInside = true;
        // Blur dihapus — tagline selalu jelas
        tagline.style.filter = 'none';
        glassEl.style.opacity = '1';
        taglineClear.style.opacity = '1';
    }

    function onMouseLeave() {
        isInside = false;
        // Tidak kembalikan blur — tagline tetap jelas
        tagline.style.filter = 'none';
        // Sembunyikan overlay clear
        taglineClear.style.opacity = '0';
        glassEl.style.opacity = '0';
    }

    wrap.addEventListener('mousemove',  onMouseMove);
    wrap.addEventListener('mouseenter', onMouseEnter);
    wrap.addEventListener('mouseleave', onMouseLeave);

    // Sinkronkan teks clear jika ada perubahan DOM (typing effect pada h1 tidak mengganggu tagline)
    // Update padding clear setelah font loaded
    document.fonts.ready.then(() => {
        const cs = window.getComputedStyle(tagline);
        taglineClear.style.padding    = cs.padding;
        taglineClear.style.fontSize   = cs.fontSize;
        taglineClear.style.lineHeight = cs.lineHeight;
        taglineClear.style.fontWeight = cs.fontWeight;
        taglineClear.style.fontFamily = cs.fontFamily;
        taglineClear.style.color      = cs.color;
    });

    // Update saat theme berubah (warna glow menyesuaikan)
    const themeToggleEl = document.getElementById('themeToggle');
    if (themeToggleEl) {
        themeToggleEl.addEventListener('click', () => {
            // Re-apply jika cursor masih di dalam
            if (isInside) applyFocusEffect(localX, localY, RADIUS);
        });
    }
})();
