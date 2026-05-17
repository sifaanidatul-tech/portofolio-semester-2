// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
let isDark = false;

const sunPath = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
const moonPath = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>';

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    body.classList.toggle('dark');
    body.classList.toggle('light');
    themeIcon.innerHTML = isDark ? moonPath : sunPath;
    createParticles();
    createCodeSymbols();
    addTerminalDecoration();
});

// ============ CLOSE / OVERLAY ============
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const overlayClose = document.getElementById('overlayClose');

closeBtn.addEventListener('click', () => { overlay.classList.add('active'); });
overlayClose.addEventListener('click', () => { overlay.classList.remove('active'); });

// ============ NAVBAR & SIDEBAR VISIBILITY ============
const navbar = document.getElementById('navbar');
const sidebar = document.getElementById('sidebar');

const aboutSection = document.getElementById('about');
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

window.addEventListener('scroll', () => {
    const st = window.pageYOffset;
    if (st > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 60) {
        navbar.classList.remove('hidden');
        sidebar.classList.remove('hidden');
    }
});

// ============ RIPPLE EFFECT ON SIDEBAR ============
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (isDark) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

    // Nav particles on hover
    link.addEventListener('mouseenter', function (e) {
        if (!isDark) return;
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.classList.add('nav-particle');
            particle.style.left = (e.clientX + Math.random() * 30 - 15) + 'px';
            particle.style.top = (e.clientY + Math.random() * 30 - 15) + 'px';
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

// ============ SKILL BARS ANIMATION ============
const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            skillBars.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, i * 200);
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-list').forEach(el => skillsObserver.observe(el));

// ============ SCROLL ANIMATIONS ============
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));

// ============ PORTFOLIO CAROUSEL ============

// ============ PORTFOLIO CAROUSEL ============
const carousel = document.getElementById('portfolioCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = carousel ? carousel.querySelectorAll('.portfolio-card') : [];

function updateCarouselFocus() {
    if (!carousel || cards.length === 0) return;

    const carouselRect = carousel.getBoundingClientRect();
    const centerX = carouselRect.left + carouselRect.width / 2;

    cards.forEach(card => {
        card.classList.remove('center', 'near');

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(centerX - cardCenter);

        if (distance < 120) {
            card.classList.add('center');
        } else if (distance < 240) {
            card.classList.add('near');
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -250,
            behavior: 'smooth'
        });
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: 250,
            behavior: 'smooth'
        });
    });
}

if (carousel) {
    carousel.addEventListener('scroll', updateCarouselFocus);
    window.addEventListener('resize', updateCarouselFocus);

    setTimeout(() => {
        updateCarouselFocus();
    }, 300);
}

// ============ PARTICLES ============
const particlesContainer = document.getElementById('particles');

function createParticles() {
    particlesContainer.innerHTML = '';
    const count = window.innerWidth < 900 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 6 + 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = isDark
            ? 'rgba(100, 150, 255, 0.3)'
            : 'rgba(244, 132, 142, 0.25)';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        particlesContainer.appendChild(p);
    }
}
createParticles();

// ============ FLOATING CODE SYMBOLS (DARK MODE) ============
// ============ FLOATING CODE SYMBOLS (DARK MODE - ANIMASI KEREN) ============
function createCodeSymbols() {
    document.querySelectorAll('.code-symbol').forEach(el => el.remove());
    if (!isDark) return;
    
    // Simbol seperti kode program asli
    const symbols = [
        '<div>', 'const x', '{ }', '=>', 'import', 
        'return', '0101', 'function', 'class', 
        'npm run', 'git push', 'if (true)', '10101', '</>'
    ];
    
    for (let i = 0; i < 25; i++) {
        const sym = document.createElement('div');
        sym.classList.add('code-symbol');
        sym.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Posisi random horizontal
        sym.style.left = Math.random() * 90 + '%';
        
        // Ukuran font acak
        sym.style.fontSize = (Math.random() * 6 + 10) + 'px';
        
        // Kecepatan animasi random (biar tidak serempak)
        sym.style.animationDuration = (Math.random() * 4 + 3) + 's, 2s';
        sym.style.animationDelay = (Math.random() * 5) + 's, 0s';
        
        // Warna hijau neon / biru terang dengan glow
        sym.style.color = Math.random() > 0.5 ? '#44ff88' : '#6699ff';
        sym.style.textShadow = `0 0 ${Math.random() * 10 + 5}px ${sym.style.color}`;
        
        document.body.appendChild(sym);
    }
}
createCodeSymbols();
// ============ TERMINAL DECORATION (DARK MODE ABOUT) ============
function addTerminalDecoration() {
    document.querySelectorAll('.terminal-line').forEach(el => el.remove());
    if (!isDark) return;
    const codes = [
        'console.log("Hello World");',
        'const app = new Portfolio();',
        'function createMagic() { }',
        'return <App />;',
        'npm install creativity',
        'git commit -m "awesome"'
    ];
    const aboutSec = document.querySelector('.about-section');
    if (!aboutSec) return;
    codes.forEach((code, i) => {
        const line = document.createElement('div');
        line.classList.add('terminal-line');
        line.textContent = '> ' + code;
        line.style.position = 'absolute';
        line.style.top = (20 + i * 30) + 'px';
        line.style.left = '20px';
        line.style.animationDelay = (i * 0.5) + 's';
        aboutSec.appendChild(line);
    });
}
addTerminalDecoration();

// ============ ROBOT EYE TRACKING ============
const leftEye = document.getElementById('leftEye');
const rightEye = document.getElementById('rightEye');
const robotWrapper = document.getElementById('robotWrapper');

document.addEventListener('mousemove', (e) => {
    if (!robotWrapper) return;
    const rect = robotWrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const angle = Math.atan2(dy, dx);
    const maxMove = 6;
    const mx = Math.cos(angle) * maxMove;
    const my = Math.sin(angle) * maxMove;
    if (leftEye) leftEye.style.transform = `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px))`;
    if (rightEye) rightEye.style.transform = `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px))`;
});

robotWrapper.addEventListener('click', () => {
    robotWrapper.classList.add('moving');
    setTimeout(() => { robotWrapper.classList.remove('moving'); }, 2000);
});

// ============ GREETING TYPING EFFECT ============
const greeting = document.querySelector('.profile-info .greeting');

if (greeting) {
    const greetingText = greeting.textContent;
    greeting.textContent = '';
    let charIndex = 0;

    function typeGreeting() {
        if (charIndex < greetingText.length) {
            greeting.textContent += greetingText[charIndex];
            charIndex++;
            setTimeout(typeGreeting, 100);
        }
    }

    setTimeout(typeGreeting, 500);
}

// ============ NAME REVEAL ============
const nameEl = document.querySelector('.profile-info h1');

if (nameEl) {
    nameEl.style.opacity = '0';
    nameEl.style.transform = 'translateY(20px)';

    setTimeout(() => {
        nameEl.style.transition = 'opacity 0.8s, transform 0.8s';
        nameEl.style.opacity = '1';
        nameEl.style.transform = 'translateY(0)';
    }, 800);
}

// ============ TAGLINE REVEAL ============
const tagline = document.querySelector('.profile-info .tagline');

if (tagline) {
    tagline.style.opacity = '0';
    tagline.style.transform = 'translateY(15px)';

    setTimeout(() => {
        tagline.style.transition = 'opacity 0.8s, transform 0.8s';
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
    }, 1200);
}

// ============ EXPERIENCE BUTTON REVEAL ============
const expBtn = document.querySelector('.experience-btn');

if (expBtn) {
    expBtn.style.opacity = '0';
    expBtn.style.transform = 'scale(0.8)';

    setTimeout(() => {
        expBtn.style.transition = 'opacity 0.6s, transform 0.6s';
        expBtn.style.opacity = '1';
        expBtn.style.transform = 'scale(1)';
    }, 1600);
}

// ============ AVATAR REVEAL ============
const avatar = document.querySelector('.profile-avatar');

if (avatar) {
    avatar.style.opacity = '0';
    avatar.style.transform = 'scale(0.5)';

    setTimeout(() => {
        avatar.style.transition = 'opacity 0.8s, transform 0.8s';
        avatar.style.opacity = '1';
        avatar.style.transform = 'scale(1)';
    }, 400);
}

// ============ ROBOT EYE BLINK ============
function blinkEyes() {
    [leftEye, rightEye].forEach(eye => {
        if (eye) {
            eye.style.transition = 'transform 0.1s';
            const ct = eye.style.transform;
            eye.style.transform = ct + ' scaleY(0.1)';
            setTimeout(() => { eye.style.transform = ct + ' scaleY(1)'; }, 150);
        }
    });
}
setInterval(() => { if (Math.random() > 0.5) blinkEyes(); }, 3000);



const robot = document.getElementById("robotImg");
const sound = document.getElementById("robotSound");

robot.addEventListener("mousemove", () => {
    robot.style.transform = "rotate(5deg) scale(1.05)";
});

robot.addEventListener("mouseleave", () => {
    robot.style.transform = "rotate(0deg)";
});

robot.addEventListener("click", () => {
    sound.play();
});








// ============ ANIMASI TAMBAHAN - TIDAK MENGUBAH KODE ASLI ============

// === PORTFOLIO SECTION SCROLL REVEAL (CARD MUNCUL SATU PER SATU) ===
const portfolioSection = document.getElementById('portfolio');
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15 });
if (portfolioSection) portfolioObserver.observe(portfolioSection);

// === CONTACT ITEMS SCROLL REVEAL ===
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
if (contactInfo) contactObserver.observe(contactInfo);
if (contactForm) contactObserver.observe(contactForm);

// === SMOOTH NAVBAR: re-apply animasi masuk saat muncul kembali ===
// (Sudah ditangani CSS keyframes, tidak perlu JS tambahan)

// === SKILL ITEMS: Visibility via skills-list.visible ===
// (Sudah ditangani observer asli di skillsObserver)

// === TOMBOL HOVER: Efek scale + shadow dinamis ===
document.querySelectorAll('.experience-btn, .submit-btn, .overlay-close').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, letter-spacing 0.3s ease';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// === PORTFOLIO CARD TILT EFFECT (3D SAAT HOVER) ===
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        this.style.transform = `translateY(-10px) scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        this.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    });
});

// === ABOUT SECTION: photo dan text reveal ===
const aboutInner = document.querySelector('.about-inner');
const aboutRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
if (aboutInner) aboutRevealObserver.observe(aboutInner);

// === ROBOT WRAPPER: tambah visible untuk efek dark glow ===
const robotWrapperEl = document.getElementById('robotWrapper');
const robotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });
if (robotWrapperEl) robotObserver.observe(robotWrapperEl);

// === CURSOR GLOW LEMBUT (BACKGROUND FOLLOWING CURSOR) ===
let cursorGlow = document.createElement('div');
cursorGlow.id = 'cursorGlow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(244,132,142,0.08), transparent 70%);
`;
document.body.appendChild(cursorGlow);

let cursorTimeout;
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
    if (isDark) {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(100,150,255,0.07), transparent 70%)';
    } else {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(244,132,142,0.08), transparent 70%)';
    }
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => { cursorGlow.style.opacity = '0'; }, 2000);
});

// === SIDEBAR LINKS: stagger entrance animasi ===
document.querySelectorAll('.sidebar a').forEach((link, i) => {
    link.style.opacity = '0';
    link.style.transform = 'translateX(-30px)';
    setTimeout(() => {
        link.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s';
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
    }, 700 + i * 120);
});

// === FOOTER LINKS: stagger animasi saat terlihat ===
const footerEl = document.querySelector('.footer');
const footerLinks = document.querySelectorAll('.footer-links a');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footerLinks.forEach((link, i) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    link.style.transition = 'opacity 0.4s ease, transform 0.4s ease, color 0.3s, translateX 0.3s';
                    link.style.opacity = '0.85';
                    link.style.transform = 'translateX(0)';
                }, i * 100);
            });
        }
    });
}, { threshold: 0.3 });
if (footerEl) footerObserver.observe(footerEl);

// === SECTION H2 TITLES: tambah animate-in jika belum punya ===
document.querySelectorAll('section h2:not(.animate-in)').forEach(h2 => {
    h2.classList.add('animate-in');
    animateObserver.observe(h2);
});

// === CONTACT ITEM OPACITY FIX ===
// Pastikan contact items bisa terlihat jika observer sudah fire
setTimeout(() => {
    document.querySelectorAll('.contact-item').forEach(item => {
        if (!item.closest('.contact-info.visible')) return;
        item.style.opacity = '1';
    });
}, 100);


// ============ ANIMASI SUPER HIDUP v2 ============

// === DEV CARD WIDGET (Pengganti video keju - floating di kanan bawah) ===
(function createDevCard() {
    const card = document.createElement('div');
    card.id = 'devCard';
    card.innerHTML = `
        <div class="dev-card-inner">
            <button class="dev-card-close" id="devCardClose" title="Tutup">✕</button>
            <div class="dev-card-avatar">👩‍💻</div>
            <div class="dev-card-name">ANIDATUL SIFA</div>
            <div class="dev-card-role">✦ Web Dev & UI/UX ✦</div>
            <div class="dev-card-skills">
                <span class="dev-skill-tag">HTML</span>
                <span class="dev-skill-tag">CSS</span>
                <span class="dev-skill-tag">Figma</span>
            </div>
            <div class="dev-card-bar"><div class="dev-card-bar-fill html"></div></div>
            <div class="dev-card-bar"><div class="dev-card-bar-fill css"></div></div>
            <div class="dev-card-bar"><div class="dev-card-bar-fill ux"></div></div>
            <div class="dev-card-status">
                <span class="dev-status-dot"></span>
                <span>Available for work</span>
            </div>
        </div>
    `;
    document.body.appendChild(card);

    // Close button
    document.getElementById('devCardClose').addEventListener('click', (e) => {
        e.stopPropagation();
        card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        card.style.transform = 'translateX(200px) rotate(10deg)';
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 400);
    });

    // Tilt effect on hover
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) / rect.width * 15;
        const y = (e.clientY - rect.top - rect.height/2) / rect.height * 15;
        card.querySelector('.dev-card-inner').style.transform =
            `translate(-4px,-4px) rotate(-2deg) rotateX(${-y}deg) rotateY(${x}deg)`;
        card.querySelector('.dev-card-inner').style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.dev-card-inner').style.transform = '';
        card.querySelector('.dev-card-inner').style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
})();

// === CODE TICKER (running text bawah layar) ===
(function createCodeTicker() {
    const ticker = document.createElement('div');
    ticker.id = 'codeTicker';
    const items = [
        '&lt;html&gt; Building dreams with code &lt;/html&gt;',
        'const passion = "Web Development" + "UI/UX" + "Creativity";',
        '✦ Anidatul Sifa Portfolio 2026 ✦',
        'function createBeauty() { return design + code + passion; }',
        'border-radius: 9999px; /* making things beautiful */',
        'git commit -m "Added awesome animations 🚀"',
        'display: flex; align-items: center; justify-content: dreams;',
        '.sifa { passion: infinite; skills: growing; goal: amazing-developer; }',
        '&lt;div class="future"&gt; Loading great things... &lt;/div&gt;',
        'npm install creativity@latest && npm run dream',
    ];
    // Duplikat untuk seamless loop
    const allItems = [...items, ...items];
    ticker.innerHTML = `<div class="code-ticker-inner">${
        allItems.map(t => `<span class="ticker-item">${t}</span>`).join('')
    }</div>`;
    document.body.appendChild(ticker);
})();

// === ABOUT PHOTO: MOUSE PARALLAX EFFECT ===
const aboutPhoto = document.querySelector('.about-photo-frame');
const aboutPhotoImg = document.querySelector('.about-photo-inner img');
if (aboutPhoto && aboutPhotoImg) {
    aboutPhoto.addEventListener('mousemove', (e) => {
        const rect = aboutPhoto.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) / rect.width;
        const y = (e.clientY - rect.top - rect.height/2) / rect.height;
        aboutPhotoImg.style.transform = `scale(1.08) translate(${x * 12}px, ${y * 12}px) rotate(${x}deg)`;
        aboutPhotoImg.style.transition = 'transform 0.1s ease';
        aboutPhoto.style.transform = `rotate(${x * 4}deg) scale(1.04)`;
        aboutPhoto.style.transition = 'transform 0.1s ease';
    });
    aboutPhoto.addEventListener('mouseleave', () => {
        aboutPhotoImg.style.transform = '';
        aboutPhotoImg.style.transition = 'transform 0.6s ease';
        aboutPhoto.style.transform = '';
        aboutPhoto.style.transition = 'transform 0.6s ease';
    });

    // Click: spin effect
    aboutPhoto.addEventListener('click', () => {
        aboutPhotoImg.style.transition = 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
        aboutPhotoImg.style.transform = 'scale(1.1) rotate(360deg)';
        setTimeout(() => {
            aboutPhotoImg.style.transform = '';
            aboutPhotoImg.style.transition = 'transform 0.6s ease';
        }, 800);
    });
}

// === PROFILE AVATAR: MOUSE PARALLAX ===
const profileAvatar = document.querySelector('.profile-avatar img');
const profileSection = document.getElementById('profile');
if (profileAvatar && profileSection) {
    profileSection.addEventListener('mousemove', (e) => {
        const rect = profileSection.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) / rect.width;
        const y = (e.clientY - rect.top - rect.height/2) / rect.height;
        profileAvatar.style.transform = `translateY(-18px) translate(${x * 15}px, ${y * 10}px) rotate(${x * 3}deg)`;
        profileAvatar.style.transition = 'transform 0.15s ease';
    });
    profileSection.addEventListener('mouseleave', () => {
        profileAvatar.style.transform = '';
        profileAvatar.style.transition = 'transform 0.8s ease';
    });
}

// === SKILL BAR: PARTICLE BURST SAAT TERISI ===
function skillBarBurst(barEl) {
    const rect = barEl.getBoundingClientRect();
    const x = rect.right;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px; height: 6px;
            border-radius: 50%;
            background: ${isDark ? '#4488ff' : '#f4848e'};
            pointer-events: none;
            z-index: 9999;
            animation: burstFly 0.6s ease-out forwards;
        `;
        const angle = (i / 6) * Math.PI * 2;
        const dist = 30 + Math.random() * 30;
        p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

// Tambah keyframe burst dinamis
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burstFly {
        0% { transform: translate(0,0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(burstStyle);

// Override skill bar animasi agar trigger burst
const origSkillsObserver = skillsAnimated;
const skillBarsAll = document.querySelectorAll('.skill-bar-fill');
const burstObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBarsAll.forEach((bar, i) => {
                setTimeout(() => {
                    skillBarBurst(bar);
                }, i * 200 + 1200); // Setelah bar selesai terisi
            });
        }
    });
}, { threshold: 0.5, once: true });
const skillsList2 = document.querySelector('.skills-list');
if (skillsList2) burstObserver.observe(skillsList2);

// === NAVBAR: MAGNETIC BUTTON EFFECT ===
[document.getElementById('themeToggle'), document.getElementById('closeBtn')].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) * 0.4;
        const y = (e.clientY - rect.top - rect.height/2) * 0.4;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
        btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
});

// === SIDEBAR: MAGNETIC ICON EFFECT ===
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) * 0.3;
        const y = (e.clientY - rect.top - rect.height/2) * 0.3;
        link.querySelector('svg').style.transform = `translate(${x}px, ${y}px)`;
    });
    link.addEventListener('mouseleave', () => {
        if (link.querySelector('svg')) {
            link.querySelector('svg').style.transform = '';
            link.querySelector('svg').style.transition = 'transform 0.4s ease';
        }
    });
});

// === PORTFOLIO CARDS: HOLOGRAPHIC EFFECT ===
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.1), transparent 60%)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// === CONTACT FORM: FOCUS RIPPLE ===
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
        this.style.transform = 'scale(1.02)';
    });
    input.addEventListener('blur', function() {
        this.style.transform = '';
    });
});

// === DEV CARD UPDATE SESUAI THEME ===
themeToggle.addEventListener('click', () => {
    const ticker = document.getElementById('codeTicker');
    const devCardInner = document.querySelector('.dev-card-inner');
    // CSS handles it via body.dark selectors
});

// === SMOOTH COUNT-UP ANIMASI UNTUK SKILL PERCENT ===
function animateCount(el, from, to, duration) {
    const start = performance.now();
    function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(from + (to - from) * ease) + '%';
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.skill-percent').forEach((el, i) => {
                const target = parseInt(el.textContent);
                el.textContent = '0%';
                setTimeout(() => animateCount(el, 0, target, 1200), i * 200 + 200);
            });
            countObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const skillsListEl = document.querySelector('.skills-list');
if (skillsListEl) countObserver.observe(skillsListEl);


// ================================================================
//  UPGRADE v3 — LOADING + TYPING NAME + SCROLL EXIT + ICON COLOR
// ================================================================

// ===== 1. LOADING SCREEN =====
(function initLoadingScreen() {
    const name = 'ANIDATUL SIFA';
    const letters = name.split('').map((ch, i) => {
        if (ch === ' ') return '<span style="display:inline-block;width:14px"></span>';
        return `<span style="animation-delay:${0.15 + i * 0.07}s">${ch}</span>`;
    }).join('');

    // Shapes untuk background loading
    const shapes = ['◆','▲','●','★','✦','⬡'].map(s => {
        const el = `<div class="load-shape" style="
            font-size:${20+Math.random()*30}px;
            left:${Math.random()*100}%;
            animation-duration:${5+Math.random()*6}s;
            animation-delay:${Math.random()*3}s;
        ">${s}</div>`;
        return el;
    }).join('');

    const screen = document.createElement('div');
    screen.id = 'loadingScreen';
    screen.innerHTML = `
        <div class="load-curtain-top"></div>
        <div class="load-curtain-bot"></div>
        ${shapes}
        <div class="load-content">
            <div class="load-logo">✦</div>
            <div class="load-name">${letters}</div>
            <div class="load-bar-wrap"><div class="load-bar-fill"></div></div>
            <div class="load-sub">Loading Portfolio...</div>
        </div>
    `;
    document.body.prepend(screen);

    // Setelah 2.5s, split curtain keluar
    setTimeout(() => {
        screen.classList.add('exit');
        setTimeout(() => {
            screen.classList.add('done');
        }, 1000);
    }, 2500);
})();

// ===== 2. TYPING EFFECT NAMA "ANIDATUL SIFA" =====
(function initTypingName() {
    const nameEl = document.querySelector('.profile-info h1');
    if (!nameEl) return;

    const fullText = nameEl.textContent.trim();
    nameEl.textContent = '';
    nameEl.style.opacity = '1';
    nameEl.style.transform = 'none';

    // Tambah cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    nameEl.appendChild(cursor);

    let i = 0;
    function typeChar() {
        if (i < fullText.length) {
            nameEl.insertBefore(document.createTextNode(fullText[i]), cursor);
            i++;
            // Speed: huruf biasa 90ms, spasi 200ms
            setTimeout(typeChar, fullText[i-1] === ' ' ? 200 : 90);
        } else {
            // Setelah selesai, cursor tetap berkedip beberapa saat lalu hilang
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
                cursor.style.transition = 'opacity 0.5s';
                setTimeout(() => cursor.remove(), 500);
            }, 2500);
        }
    }

    // Mulai setelah loading selesai
    setTimeout(typeChar, 3200);
})();

// ===== 3. SCROLL PROGRESS BAR =====
(function initScrollBar() {
    const stripe = document.createElement('div');
    stripe.id = 'scrollStripe';
    document.body.appendChild(stripe);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        stripe.style.transform = `scaleX(${progress})`;
    }, { passive: true });
})();

// ===== 4. ABOUT PHOTO EXIT KANAN/KIRI SAAT SCROLL =====
(function initAboutPhotoScroll() {
    const frame = document.querySelector('.about-photo-frame');
    const aboutSec = document.getElementById('about');
    if (!frame || !aboutSec) return;

    let lastScrollY = window.pageYOffset;
    let isInAbout = false;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isInAbout = true;
                frame.classList.remove('exit-right', 'exit-left');
                frame.classList.add('enter-normal');
            } else {
                isInAbout = false;
                // Tentukan arah scroll
                const currentY = window.pageYOffset;
                if (currentY > lastScrollY) {
                    // Scroll ke bawah — foto pergi ke kanan
                    frame.classList.remove('enter-normal', 'exit-left');
                    frame.classList.add('exit-right');
                } else {
                    // Scroll ke atas — foto pergi ke kiri
                    frame.classList.remove('enter-normal', 'exit-right');
                    frame.classList.add('exit-left');
                }
            }
            lastScrollY = window.pageYOffset;
        });
    }, { threshold: 0.15 });

    obs.observe(aboutSec);

    window.addEventListener('scroll', () => {
        lastScrollY = window.pageYOffset;
    }, { passive: true });
})();

// ===== 5. SECTION WIPE LINE EFFECT SAAT ENTER =====
(function initSectionWipe() {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.add('section-wipe'));

    const wipeObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('wipe-active');
                setTimeout(() => entry.target.classList.remove('wipe-active'), 900);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => wipeObs.observe(sec));
})();

// ===== 6. SIDEBAR ICON: WARNA AKTIF SAAT DIKLIK =====
(function initActiveNavIcon() {
    const navLinks = document.querySelectorAll('.sidebar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Hapus active dari semua
            navLinks.forEach(l => l.classList.remove('active-nav'));

            // Aktifkan yang diklik
            this.classList.add('active-nav');

            // Ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'icon-ripple';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);

            // Setelah 2 detik, hapus warna aktif
            setTimeout(() => {
                this.classList.remove('active-nav');
            }, 2000);
        });
    });

    // Auto-detect section aktif saat scroll
    const sections = ['profile','about','skills','portfolio','contact'];
    const sectionEls = sections.map(id => document.getElementById(id)).filter(Boolean);

    const activeObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sectionEls.forEach(sec => activeObs.observe(sec));
})();

// ===== 7. SCROLL VIDEO STYLE: HORIZONTAL STRIP PARALLAX =====
(function initVideoScrollEffect() {
    // Elemen yang mendapat efek parallax horizontal saat scroll
    const profileInfo = document.querySelector('.profile-info');
    const profileAvImg = document.querySelector('.profile-avatar');
    const aboutText = document.querySelector('.about-text');
    const skillsH2 = document.querySelector('.skills-section h2');
    const portH2 = document.querySelector('.portfolio-section h2');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const sy = window.pageYOffset;

            // Profile section parallax — info geser kiri, avatar geser kanan
            if (profileInfo) {
                const rect = profileInfo.closest('section')?.getBoundingClientRect();
                if (rect && rect.bottom > 0 && rect.top < window.innerHeight) {
                    const progress = -rect.top / window.innerHeight;
                    profileInfo.style.transform = `translateX(${progress * -30}px)`;
                    if (profileAvImg) profileAvImg.style.transform = `translateX(${progress * 30}px)`;
                }
            }

            // About text: slight slide
            if (aboutText) {
                const rect = aboutText.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    const p = (window.innerHeight / 2 - rect.top - rect.height / 2) / window.innerHeight;
                    aboutText.style.transform = `translateX(${p * 20}px)`;
                }
            }

            // Skills h2 scale
            if (skillsH2) {
                const rect = skillsH2.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    const p = 1 - Math.abs(rect.top + rect.height/2 - window.innerHeight/2) / window.innerHeight;
                    skillsH2.style.transform = `scale(${0.9 + p * 0.15}) translateY(${(1-p)*20}px)`;
                }
            }

            ticking = false;
        });
    }, { passive: true });
})();

// ===== 8. STAGGER REVEAL UNTUK CONTACT ITEMS =====
(function initStaggerContactItems() {
    const contactInner = document.querySelector('.contact-inner');
    if (contactInner) {
        contactInner.classList.add('stagger-reveal');
        const staggerObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });
        staggerObs.observe(contactInner);
    }
})();

// ===== 9. SKILLS LIST: ENSURE VISIBLE CLASS TRIGGERS SLIDE =====
// Patch ulang skillsObserver agar juga trigger robot visible
const skillsListForPatch = document.querySelector('.skills-list');
if (skillsListForPatch) {
    const patchObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Robot dari kanan
                const robot = document.getElementById('robotWrapper');
                if (robot) {
                    setTimeout(() => robot.classList.add('visible'), 300);
                }
            }
        });
    }, { threshold: 0.2 });
    patchObs.observe(skillsListForPatch);
}

// ===== 10. HOVER GLOW TRAIL PADA SIDEBAR ICONS =====
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.boxShadow = isDark
            ? '0 0 20px rgba(68,136,255,0.6)'
            : '0 0 15px rgba(244,132,142,0.5)';
    });
    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active-nav')) {
            this.style.boxShadow = '';
        }
    });
});


// ================================================================
//  UPGRADE v4 — CINEMATIC LOADING + SKILL BAR EXIT KE KANAN
// ================================================================

// ===== REMOVE OLD LOADING SCREEN (dari v3 jika ada) =====
(function removeOldLoader() {
    const old = document.getElementById('loadingScreen');
    if (old) old.remove();
})();

// ===== NEW CINEMATIC LOADING SCREEN v4 =====
(function createCinematicLoader() {
    const name = 'ANIDATUL SIFA';

    // BG shapes
    const shapeDefs = [
        { color:'rgba(244,132,142,0.15)', size:300, tx:'40px', ty:'-60px', dur:'6s', top:'5%', left:'5%' },
        { color:'rgba(192,132,212,0.12)', size:250, tx:'-50px', ty:'40px', dur:'8s', top:'60%', right:'5%' },
        { color:'rgba(126,200,200,0.1)',  size:200, tx:'30px', ty:'50px', dur:'7s', bottom:'10%', left:'30%' },
        { color:'rgba(255,221,87,0.1)',   size:180, tx:'-30px', ty:'-40px', dur:'5s', top:'30%', right:'20%' },
    ];
    const shapesHTML = shapeDefs.map(s => {
        const pos = Object.entries(s).filter(([k])=>['top','left','right','bottom'].includes(k)).map(([k,v])=>`${k}:${v}`).join(';');
        return `<div class="ls-bg-shape" style="width:${s.size}px;height:${s.size}px;background:${s.color};${pos};--tx:${s.tx};--ty:${s.ty};animation-duration:${s.dur}"></div>`;
    }).join('');

    // Name letters HTML — stagger per huruf
    let delay = 0.6;
    const lettersHTML = name.split('').map(ch => {
        if (ch === ' ') {
            const el = `<span class="ls-letter space"></span>`;
            delay += 0.04;
            return el;
        }
        const el = `<span class="ls-letter" style="animation-delay:${delay.toFixed(2)}s;color:hsl(${Math.random()*60+330},80%,80%)">${ch}</span>`;
        delay += 0.08;
        return el;
    }).join('');

    const screen = document.createElement('div');
    screen.id = 'loadingScreen';
    screen.innerHTML = `
        <div class="ls-panel ls-panel-tl"></div>
        <div class="ls-panel ls-panel-tr"></div>
        <div class="ls-panel ls-panel-bl"></div>
        <div class="ls-panel ls-panel-br"></div>
        ${shapesHTML}
        <div class="ls-center">
            <div class="ls-ring"><div class="ls-emoji">✦</div></div>
            <div class="ls-name">${lettersHTML}</div>
            <div class="ls-tagline">Web Developer &amp; UI/UX Designer</div>
            <div class="ls-progress"><div class="ls-progress-fill" id="lsProgressFill"></div></div>
            <div class="ls-percent" id="lsPercent">0%</div>
        </div>
    `;
    document.body.prepend(screen);

    // Animasi persentase count-up
    let pct = 0;
    const pctEl = document.getElementById('lsPercent');
    const pctTimer = setInterval(() => {
        pct = Math.min(pct + Math.random() * 4 + 1, 100);
        if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
        if (pct >= 100) {
            if (pctEl) pctEl.textContent = '100%';
            clearInterval(pctTimer);
        }
    }, 60);

    // Exit: panel berpencar ke 4 sudut
    const exitDelay = 2800;
    setTimeout(() => {
        screen.classList.add('ls-exit');
        // Fade center content
        const center = screen.querySelector('.ls-center');
        if (center) {
            center.style.transition = 'opacity 0.3s ease';
            center.style.opacity = '0';
        }
        // Hapus setelah animasi selesai
        setTimeout(() => {
            screen.classList.add('ls-done');
        }, 1200);
    }, exitDelay);
})();

// ===== TYPING NAME: MULAI SETELAH LOADING =====
(function reinitTypingName() {
    // Hapus typing lama jika ada (dari v3)
    const existingCursor = document.querySelector('.typing-cursor');
    if (existingCursor) existingCursor.remove();

    const nameEl = document.querySelector('.profile-info h1');
    if (!nameEl) return;

    const fullText = nameEl.textContent.trim();
    nameEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    nameEl.appendChild(cursor);

    let i = 0;
    function type() {
        if (i < fullText.length) {
            nameEl.insertBefore(document.createTextNode(fullText[i]), cursor);
            i++;
            const delay = fullText[i-1] === ' ' ? 180 : (Math.random() * 60 + 60);
            setTimeout(type, delay);
        } else {
            // Selesai typing: cursor berkedip 3 detik lalu fade out
            setTimeout(() => {
                cursor.style.transition = 'opacity 0.8s';
                cursor.style.opacity = '0';
                setTimeout(() => cursor.remove(), 800);
            }, 3000);
        }
    }

    // Start setelah loading exit (3.8s)
    setTimeout(type, 3900);
})();

// ===== SKILL BAR EXIT KE KANAN SAAT SCROLL MELEWATI SKILLS =====
(function initSkillBarExit() {
    const skillsSec = document.querySelector('.skills-section');
    if (!skillsSec) return;

    let skillsVisible = false;
    let skillsWasVisible = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsVisible = true;
                skillsWasVisible = true;
                skillsSec.classList.remove('skill-exit');
            } else if (skillsWasVisible && !entry.isIntersecting) {
                skillsVisible = false;
                // Tentukan: sedang scroll ke bawah (melewati skills) → exit
                const scrollDir = window.pageYOffset > (skillsSec._lastScrollY || 0);
                if (scrollDir) {
                    // Scroll ke bawah melewati skills → bar berjalan ke kanan
                    skillsSec.classList.add('skill-exit');
                } else {
                    skillsSec.classList.remove('skill-exit');
                }
            }
            skillsSec._lastScrollY = window.pageYOffset;
        });
    }, { threshold: 0.05 });

    observer.observe(skillsSec);

    // Track scroll direction
    window.addEventListener('scroll', () => {
        skillsSec._lastScrollY = window.pageYOffset;
    }, { passive: true });
})();

// ===== SCROLL PROGRESS BAR (rainbow) =====
(function ensureScrollBar() {
    let stripe = document.getElementById('scrollStripe');
    if (!stripe) {
        stripe = document.createElement('div');
        stripe.id = 'scrollStripe';
        document.body.appendChild(stripe);
    }
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        stripe.style.transform = `scaleX(${docH > 0 ? scrollTop/docH : 0})`;
    }, { passive: true });
})();

// ===== CINEMATIC PARALLAX: PROFILE SECTION =====
(function initCinematicParallax() {
    const profileSec = document.getElementById('profile');
    const profileInfo = document.querySelector('.profile-info');
    const profileAv = document.querySelector('.profile-avatar');
    const decors = document.querySelectorAll('.profile-decor');

    window.addEventListener('scroll', () => {
        if (!profileSec) return;
        const rect = profileSec.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const progress = -rect.top / rect.height; // 0 → 1 saat scroll melewati section
        const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
        const p = clamp(progress, 0, 1);

        // Info geser ke kiri saat scroll
        if (profileInfo) {
            profileInfo.style.transform = `translateX(${p * -50}px) translateY(${p * -20}px)`;
            profileInfo.style.opacity = `${1 - p * 0.4}`;
        }
        // Avatar geser ke kanan
        if (profileAv) {
            profileAv.style.transform = `translateX(${p * 40}px) translateY(${p * -15}px) scale(${1 - p * 0.1})`;
            profileAv.style.opacity = `${1 - p * 0.3}`;
        }
        // Decors berputar
        decors.forEach((d, i) => {
            d.style.transform = `rotate(${p * (i%2===0?180:-120)}deg) scale(${1 + p * 0.2})`;
        });
    }, { passive: true });
})();

// ===== ABOUT SECTION: EXTRA CINEMATIC =====
(function initAboutCinematic() {
    const aboutInner = document.querySelector('.about-inner');
    const aboutPhoto = document.querySelector('.about-photo-frame');
    const aboutText = document.querySelector('.about-text');
    const aboutSec = document.getElementById('about');

    window.addEventListener('scroll', () => {
        if (!aboutSec) return;
        const rect = aboutSec.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

        // Center of section relative to viewport
        const centerRel = (rect.top + rect.height/2 - window.innerHeight/2) / window.innerHeight;
        const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
        const p = clamp(centerRel, -1, 1);

        if (aboutText) {
            aboutText.style.transform = `translateX(${p * -25}px)`;
        }
    }, { passive: true });
})();

// ===== SKILLS SECTION: COUNTER & ENTRANCE REDO (setelah loading) =====
(function reinitSkillsAfterLoad() {
    const skillsList = document.querySelector('.skills-list');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const skillPercents = document.querySelectorAll('.skill-percent');
    let animated = false;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;

                // Bars terisi
                skillBars.forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width + '%';
                    }, i * 180 + 200);
                });

                // Percent count-up
                skillPercents.forEach((el, i) => {
                    const target = parseInt(el.dataset ? el.dataset.pct : el.textContent) || parseInt(el.textContent);
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

                // Skill items stagger
                document.querySelectorAll('.skill-item').forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-50px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 150 + 100);
                });
            }
        });
    }, { threshold: 0.25 });

    if (skillsList) obs.observe(skillsList);
})();

