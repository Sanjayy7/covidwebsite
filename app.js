// COVIDPROJECT - Dynamic Features and Interactivity

document.addEventListener('DOMContentLoaded', function() {
// Initialize all dynamic features
initMobileNavigation();
initSmoothScrolling();
initScrollAnimations();
initActiveNavigation();
initCounterAnimations();
initModalFunctionality();
initParallaxEffects();
initAdditionalFeatures();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
hamburger.addEventListener('click', function() {
hamburger.classList.toggle('active');
navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
link.addEventListener('click', function() {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
});
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
}
});
}
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
const navLinks = document.querySelectorAll('.nav-link[data-section]');
navLinks.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const targetSection = this.getAttribute('data-section');
scrollToSection(targetSection);
});
});

// Also handle footer links
const footerLinks = document.querySelectorAll('a[href^="#"]');
footerLinks.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const href = this.getAttribute('href');
if (href && href.length > 1) {
const sectionId = href.substring(1);
scrollToSection(sectionId);
}
});
});
}

function scrollToSection(sectionId) {
const targetElement = document.getElementById(sectionId);
if (targetElement) {
const navbar = document.getElementById('navbar');
const navbarHeight = navbar ? navbar.offsetHeight : 70;
const targetPosition = targetElement.offsetTop - navbarHeight - 20;

window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
}

// Scroll-based Animations with Intersection Observer
function initScrollAnimations() {
const animatedElements = document.querySelectorAll('.fade-in-up');
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
const delay = entry.target.getAttribute('data-delay') || 0;
setTimeout(() => {
entry.target.classList.add('visible');
}, parseInt(delay));
observer.unobserve(entry.target);
}
});
}, observerOptions);

animatedElements.forEach(element => {
observer.observe(element);
});
}

// Active Navigation Highlighting
function initActiveNavigation() {
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
const scrollPosition = window.scrollY + 150;
let currentSection = '';

sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
currentSection = section.getAttribute('id');
}
});

navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('data-section') === currentSection) {
link.classList.add('active');
}
});
}

let ticking = false;
window.addEventListener('scroll', function() {
if (!ticking) {
requestAnimationFrame(function() {
updateActiveNav();
ticking = false;
});
ticking = true;
}
});

updateActiveNav();
}

// Animated Counter for Statistics
function initCounterAnimations() {
const counters = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
counterObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

counters.forEach(counter => {
counterObserver.observe(counter);
});
}

function animateCounter(element) {
const target = parseInt(element.getAttribute('data-target'));
let current = 0;
const increment = target / 50;
const timer = setInterval(() => {
current += increment;
if (current >= target) {
element.textContent = target;
clearInterval(timer);
} else {
element.textContent = Math.floor(current);
}
}, 30);
}

// Modal Functionality
function initModalFunctionality() {
const modal = document.getElementById('dashboard-modal');
if (modal) {
modal.addEventListener('click', function(e) {
if (e.target === modal) {
closeDashboard();
}
});
}

document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
closeDashboard();
}
});
}

function closeDashboard() {
const modal = document.getElementById('dashboard-modal');
if (modal) {
modal.classList.add('hidden');
}
}

// Parallax Effects
function initParallaxEffects() {
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
window.addEventListener('scroll', function() {
const scrolled = window.pageYOffset;
const rate = scrolled * -0.5;
heroBackground.style.transform = `translateY(${rate}px)`;
});
}
}

// Additional Features
function initAdditionalFeatures() {
// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
button.addEventListener('click', function(e) {
const ripple = document.createElement('span');
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = e.clientX - rect.left - size / 2;
const y = e.clientY - rect.top - size / 2;

ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = x + 'px';
ripple.style.top = y + 'px';
ripple.classList.add('ripple');

this.appendChild(ripple);

setTimeout(() => {
ripple.remove();
}, 600);
});
});
}

// Dashboard Modal Functions
function openDashboard(title, vizId) {
const modal = document.getElementById('fullscreen-modal');
const modalContent = document.getElementById('modal-content');

// Show modal
modal.style.display = 'flex';
setTimeout(() => {
modal.classList.add('show');
}, 10);

// Clone the existing dashboard and make it fullscreen
const originalViz = document.getElementById(vizId);
if (originalViz) {
const clonedViz = originalViz.cloneNode(true);
clonedViz.id = vizId + '_fullscreen';
clonedViz.style.width = '100%';
clonedViz.style.height = '100%';

modalContent.innerHTML = '<h2 style="padding: 20px; margin: 0; color: var(--color-text); background: var(--color-surface); border-bottom: 1px solid var(--color-border);">' + title + '</h2>';
modalContent.appendChild(clonedViz);

// Reinitialize Tableau visualization for the cloned element
if (typeof tableau !== 'undefined') {
const vizElement = clonedViz.querySelector('object') || clonedViz.querySelector('.tableauViz');
if (vizElement) {
// Try to reinitialize the Tableau viz
setTimeout(() => {
try {
// This will trigger Tableau to render in the new container
if (window.tableau && window.tableau.VizManager) {
window.tableau.VizManager.getVizs().forEach(viz => {
if (viz.getAreTabsHidden && viz.getAreTabsHidden()) {
viz.refreshDataAsync();
}
});
}
} catch (e) {
console.log('Tableau reinitialization note:', e);
}
}, 100);
}
}
} else {
modalContent.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--color-text);"><h2>' + title + '</h2><p>Dashboard loading...</p></div>';
}

// Prevent body scroll
document.body.style.overflow = 'hidden';
}

function closeFullscreenModal() {
const modal = document.getElementById('fullscreen-modal');

modal.classList.remove('show');
setTimeout(() => {
modal.style.display = 'none';
document.getElementById('modal-content').innerHTML = '';
}, 300);

// Restore body scroll
document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape') {
const modal = document.getElementById('fullscreen-modal');
if (modal && modal.classList.contains('show')) {
closeFullscreenModal();
}
}
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
const fullscreenModal = document.getElementById('fullscreen-modal');
if (fullscreenModal) {
fullscreenModal.addEventListener('click', function(e) {
if (e.target === this) {
closeFullscreenModal();
}
});
}
});