// =========================================================
// HERO "COMPILE" TYPING ANIMATION
// =========================================================
const compileEl = document.getElementById('compileLine');
const stackTokens = [
  'wordpress', 'php', 'mysql', 'javascript', 'html', 'css',
  'react js', 'python', 'django', 'tailwind'
];

function runCompileAnimation(){
  let i = 0;
  const prefix = 'import { ';
  const suffix = ' } from "experience"';
  let built = '';

  function typeNext(){
    if (i >= stackTokens.length){
      compileEl.textContent = prefix + built + suffix;
      return;
    }
    const token = (i === 0 ? '' : ', ') + stackTokens[i];
    let charIndex = 0;
    const typeChar = () => {
      if (charIndex <= token.length){
        compileEl.textContent = prefix + built + token.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, 28);
      } else {
        built += token;
        i++;
        setTimeout(typeNext, 60);
      }
    };
    typeChar();
  }
  typeNext();
}
runCompileAnimation();

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// stagger items inside grids slightly via inline delay
document.querySelectorAll('.stack-group, .project-card, .timeline-item, .edu-item').forEach((el, idx) => {
  el.style.transitionDelay = `${(idx % 4) * 70}ms`;
});

// =========================================================
// SPINE PROGRESS + ACTIVE SECTION
// =========================================================
const spineFill = document.getElementById('spineFill');
const spineTicks = document.querySelectorAll('.spine-tick');
const sections = Array.from(spineTicks).map(t => document.getElementById(t.dataset.target));

function updateSpine(){
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const pct = Math.min(100, Math.max(0, (scrolled / docHeight) * 100));
  spineFill.style.height = pct + '%';

  let activeIndex = 0;
  sections.forEach((sec, idx) => {
    if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.5){
      activeIndex = idx;
    }
  });
  spineTicks.forEach((t, idx) => t.classList.toggle('active', idx === activeIndex));
}
window.addEventListener('scroll', updateSpine, { passive: true });
updateSpine();

spineTicks.forEach(tick => {
  tick.addEventListener('click', () => {
    const target = document.getElementById(tick.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// =========================================================
// CURSOR GLOW (desktop only, respects reduced motion)
// =========================================================
const glow = document.getElementById('cursorGlow');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

if (!prefersReducedMotion && !isTouch){
  let glowVisible = false;
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    if (!glowVisible){
      glow.style.opacity = '1';
      glowVisible = true;
    }
  });
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    glowVisible = false;
  });
}

// Toggle between projects using buttons

const reactButton = document.getElementById('react');
const wordpressButton = document.getElementById('wordpress');
const wordpressProjects = document.getElementById('wordpress-project');
const reactProjects = document.getElementById('react-project');
const pythonProjects = document.getElementById('python-project');
const pythonButton = document.getElementById('python');

reactProjects.style.display = 'none';

reactButton.addEventListener('click', function () {
    wordpressProjects.style.display = 'none';
    pythonProjects.style.display = 'none';
    reactProjects.style.display = 'grid';
});

wordpressButton.addEventListener('click', function(){
  wordpressProjects.style.display = 'grid';
  reactProjects.style.display = 'none';
  pythonProjects.style.display = 'none';
})

pythonButton.addEventListener('click', function(){
  pythonProjects.style.display = 'grid';
  wordpressProjects.style.display = 'none';
  reactProjects.style.display = 'none';
})


