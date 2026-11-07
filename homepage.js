'use strict';

// Deferred papers stay out of filters until explicitly restored in the HTML.
const papers = [...document.querySelectorAll('.publication-card:not([data-deferred])')];
const filters = [...document.querySelectorAll('.tag-btn')];
const resultCount = document.getElementById('publication-count');
filters.forEach(button => {
  const tag = button.dataset.tag;
  const count = papers.filter(paper => tag === 'all' || paper.dataset.tags.split(',').includes(tag)).length;
  button.querySelector('.tag-count').textContent = count;
  button.addEventListener('click', () => {
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    papers.forEach(paper => {
      paper.hidden = tag !== 'all' && !paper.dataset.tags.split(',').includes(tag);
    });
    resultCount.textContent = `${count} featured ${count === 1 ? 'paper' : 'papers'}`;
  });
});

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

async function copyText(text) {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard');
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* Show manual-copy guidance below. */ }
    field.remove();
    showToast(copied ? 'Copied to clipboard' : 'Please select the text and copy it manually.');
  }
}

document.getElementById('copy-email').addEventListener('click', () => copyText('yudi2023@zju.edu.cn'));
document.getElementById('copy-bio').addEventListener('click', () => {
  copyText([...document.querySelectorAll('.bio-copy')].map(paragraph => paragraph.textContent.trim()).join('\n'));
});

const backToTop = document.getElementById('backToTop');
const navigation = document.querySelector('.section-drip-nav');
const footer = document.querySelector('.mountain-footer');
const sectionLinks = [...navigation.querySelectorAll('a')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
function updateNavigation() {
  backToTop.classList.toggle('visible', window.scrollY > 300);
  navigation.classList.toggle('is-footer-visible', footer.getBoundingClientRect().top < window.innerHeight / 2 + 180);
  const current = sections.filter(section => section.getBoundingClientRect().top <= 150).pop() || sections[0];
  sectionLinks.forEach(link => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

// Preserve the template's compact author lists with keyboard-accessible expansion.
document.querySelectorAll('.publication-authors-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.closest('.publication-authors-shell').classList.toggle('expanded');
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Collapse author list' : 'Show all authors');
    button.textContent = expanded ? '▴' : '▾';
  });
});

// Restore the original rotating project cloud with the user's actual work.
// All links remain available when JavaScript or motion is disabled.
const cloud = document.getElementById('tagcloud-container');
const cloudLinks = [...cloud.querySelectorAll('a:not([hidden])')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let cloudFrame = null;
let cloudVisible = false;
let cloudHovered = false;
let cloudFocused = false;
let cloudPoints = [];
let previousFrameTime = 0;

function positionCloud() {
  const width = cloud.clientWidth;
  const height = cloud.clientHeight;
  const radius = Math.min(width / 3.8, height / 2) * 0.8;
  cloudPoints.forEach(point => {
    const scale = 2 / (2 - point.z);
    point.el.style.left = `${width / 2 + point.x * radius * 1.5 - point.el.offsetWidth / 2}px`;
    point.el.style.top = `${height / 2 + point.y * radius - point.el.offsetHeight / 2}px`;
    point.el.style.transform = `scale(${scale})`;
    point.el.style.opacity = Math.max(0.35, (point.z + 1) / 2);
    point.el.style.zIndex = Math.round(scale * 100);
  });
}
function animateCloud(time) {
  cloudFrame = null;
  if (!cloudVisible || cloudHovered || cloudFocused || reducedMotion.matches || document.hidden) return;
  const angle = Math.min((time - previousFrameTime) || 16.7, 40) * 0.00012;
  previousFrameTime = time;
  const cos = Math.cos(angle), sin = Math.sin(angle);
  cloudPoints.forEach(point => {
    const y = point.y * cos - point.z * sin;
    const z = point.z * cos + point.y * sin;
    const x = point.x;
    point.y = y;
    point.x = x * cos - z * sin;
    point.z = z * cos + x * sin;
  });
  positionCloud();
  cloudFrame = requestAnimationFrame(animateCloud);
}
function resumeCloud() {
  if (cloudFrame === null) { previousFrameTime = 0; cloudFrame = requestAnimationFrame(animateCloud); }
}
function configureCloud() {
  if (cloudFrame !== null) cancelAnimationFrame(cloudFrame);
  cloudFrame = null;
  cloud.classList.toggle('cloud-ready', !reducedMotion.matches);
  cloudPoints = cloudLinks.map((el, index) => {
    el.classList.toggle('tagcloud-item', !reducedMotion.matches);
    el.removeAttribute('style');
    const phi = Math.acos(-1 + (2 * index + 1) / cloudLinks.length);
    const theta = Math.sqrt(cloudLinks.length * Math.PI) * phi;
    return { el, x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) };
  });
  if (!reducedMotion.matches) { positionCloud(); resumeCloud(); }
}
cloud.addEventListener('mouseenter', () => { cloudHovered = true; });
cloud.addEventListener('mouseleave', () => { cloudHovered = false; resumeCloud(); });
cloud.addEventListener('focusin', () => { cloudFocused = true; });
cloud.addEventListener('focusout', event => {
  if (!cloud.contains(event.relatedTarget)) { cloudFocused = false; resumeCloud(); }
});
document.addEventListener('visibilitychange', resumeCloud);
reducedMotion.addEventListener('change', configureCloud);
window.addEventListener('resize', () => { if (!reducedMotion.matches) positionCloud(); });
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    cloudVisible = entries[0].isIntersecting;
    if (cloudVisible) resumeCloud();
  }, { rootMargin: '120px' }).observe(cloud);
} else cloudVisible = true;
configureCloud();

// A project link must reveal its paper even when a filter has hidden it.
cloudLinks.filter(link => link.hash).forEach(link => {
  link.addEventListener('click', () => {
    const paper = document.querySelector(link.hash);
    if (paper?.hidden && !paper.hasAttribute('data-deferred')) {
      filters.find(button => button.dataset.tag === 'all').click();
    }
  });
});
