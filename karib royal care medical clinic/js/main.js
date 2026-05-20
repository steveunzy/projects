// KAIB ROYAL CARE MEDICAL CLINIC - JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    initMobileMenu();

    // Contact Form Handling
    initContactForm();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize navigation highlighting
    initNavHighlight();
});

/**
 * Initialize Mobile Menu Toggle with Enhanced Animations
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function () {
                // Add slight delay before closing for better UX
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }, 150);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Prevent body scroll when menu is open
        navMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
}

/**
 * Initialize Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .feature, .feature-card, .commitment-card, ' +
        '.value-item, .action-card, .about-section, .policy-section'
    );

    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(element);
    });
}

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission (In real scenario, this would send to a backend)
            submitForm(formData);
        });
    }
}

/**
 * Validate Form Data
 */
function validateForm(data) {
    // Check if all fields are filled
    for (let key in data) {
        if (data[key].trim() === '') {
            return false;
        }
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }

    // Validate phone format (basic)
    const phonePattern = /^\d{10,}$/;
    if (!phonePattern.test(data.phone.replace(/\D/g, ''))) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return false;
    }

    return true;
}

/**
 * Submit Form (Simulate)
 */
function submitForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    // Add loading animation
    submitBtn.classList.add('pulse');

    // Simulate network delay
    setTimeout(function () {
        // In a real application, you would send this data to a backend
        // For now, we'll just show a success message
        console.log('Form Data:', data);

        showFormMessage('✓ Thank you! Your message has been sent successfully. We will contact you soon.', 'success');

        // Reset form with animations
        const form = document.getElementById('contactForm');
        form.style.animation = 'fadeInUp 0.3s ease reverse';
        
        setTimeout(() => {
            form.reset();
            form.style.animation = 'fadeInUp 0.3s ease';
        }, 300);

        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.classList.remove('pulse');

        // Scroll to message
        const formMessage = document.getElementById('formMessage');
        setTimeout(() => {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);

        // Clear message after 6 seconds
        setTimeout(function () {
            formMessage.classList.remove('success', 'error');
            formMessage.innerHTML = '';
        }, 6000);
    }, 1500);
}

/**
 * Show Form Message with Animation
 */
function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.innerHTML = message;
    messageElement.className = 'form-message ' + type;
    messageElement.style.display = 'block';
    messageElement.style.animation = 'fadeInUp 0.4s ease';
}

/**
 * Smooth Scroll to Sections
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offset = 80; // Account for sticky navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Navigation Link Highlighting
 */
function initNavHighlight() {
    // This function will be called on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Only add active class if the link has an href that matches a section
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
}

/**
 * Highlight navigation on page load
 */
window.addEventListener('load', function() {
    updateActiveNavLink();
});

/**
 * Accessibility: Keyboard Navigation
 */
document.addEventListener('keydown', function (event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Add console message for development
console.log('KAIB Royal Care Medical Clinic - Website loaded successfully!');
