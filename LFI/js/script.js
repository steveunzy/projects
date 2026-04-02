/* ============================================
   LIVE FREE INITIATIVE - MAIN JAVASCRIPT
   ============================================ */

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initNavigation();
    initFormValidation();
    initBlogFilters();
    initSmoothScroll();
    initAnimations();
});

/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            }
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

/* ============================================
   NAVIGATION HIGHLIGHTING
   ============================================ */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle index vs root path
    if (currentPage === '' || currentPage === '/') {
        const indexLink = Array.from(navLinks).find(link => link.getAttribute('href') === 'index.html');
        if (indexLink) indexLink.classList.add('active');
    }
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (validateForm(this)) {
                // Show success message
                showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
                
                // Reset form
                this.reset();
            }
        });
    }

    // Real-time validation
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateInput(input) {
    let isValid = true;

    // Check if empty
    if (input.value.trim() === '') {
        showInputError(input, 'This field is required');
        isValid = false;
    }
    // Validate email
    else if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showInputError(input, 'Please enter a valid email');
            isValid = false;
        } else {
            clearInputError(input);
        }
    }
    // Validate phone
    else if (input.type === 'tel') {
        if (input.value && input.value.length < 7) {
            showInputError(input, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearInputError(input);
        }
    }
    // Clear error for valid inputs
    else {
        clearInputError(input);
    }

    return isValid;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add new error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.style.color = '#ef4444';
    errorMsg.style.fontSize = '0.85rem';
    errorMsg.style.marginTop = '0.25rem';
    errorMsg.textContent = message;
    input.parentElement.appendChild(errorMsg);
}

function clearInputError(input) {
    input.classList.remove('error');
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0066cc'};
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/* ============================================
   BLOG FILTERS
   ============================================ */
function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            blogPosts.forEach(post => {
                const postFilter = post.getAttribute('data-filter');

                if (filterValue === 'all' || postFilter === filterValue) {
                    post.style.display = '';
                    setTimeout(() => post.classList.add('animate-fade'), 10);
                } else {
                    post.style.display = 'none';
                    post.classList.remove('animate-fade');
                }
            });
        });
    });

    // Set initial active button
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
    }
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   ANIMATIONS
   ============================================ */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elements = document.querySelectorAll(
        '.program-card, .stat-card, .testimonial-card, .project-card, ' +
        '.blog-post, .team-member, .skill-card, .support-card, .faq-item'
    );

    elements.forEach(el => observer.observe(el));
}

/* ============================================
   NEWSLETTER FORM
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            
            if (email && email.value) {
                showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
                this.reset();
            }
        });
    }
});

/* ============================================
   DONATION BUTTONS
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const donationOptions = document.querySelectorAll('.amount');
    donationOptions.forEach(option => {
        option.addEventListener('click', function() {
            const amount = this.textContent.trim();
            if (amount !== 'Custom') {
                showNotification(`Donation amount selected: ${amount}. Proceeding to payment...`, 'info');
                // Here you would integrate with a payment gateway
            }
        });
    });
});

/* ============================================
   LOAD MORE ARTICLES
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more-section button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showNotification('Loading more articles...', 'info');
            // Here you would load more blog posts via AJAX
            this.textContent = 'No more articles';
            this.disabled = true;
        });
    }
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Scroll to top
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Add scroll event listener for navbar
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});

/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/* ============================================
   ACCESSIBILITY IMPROVEMENTS
   ============================================ */

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }

    // Skip to main content with Ctrl+Alt+M
    if (e.ctrlKey && e.altKey && e.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add focus styles for keyboard navigation
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
interactiveElements.forEach(el => {
    el.addEventListener('focus', function() {
        this.style.outline = '2px solid #0066cc';
        this.style.outlineOffset = '2px';
    });

    el.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

/* ============================================
   ERROR HANDLING
   ============================================ */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Error:', e.message);
    // Log to error tracking service in production
});

// Handle fetch errors gracefully
const originalFetch = window.fetch;
window.fetch = function(...args) {
    return originalFetch.apply(this, args)
        .catch(error => {
            console.error('Fetch error:', error);
            return Promise.reject(error);
        });
};

/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
window.addEventListener('resize', debounce(function() {
    // Handle resize events
}, 250));

/* ============================================
   ANALYTICS TRACKING
   ============================================ */

// Track key user actions
function trackEvent(category, action, label) {
    if (window.gtag) {
        gtag('event', 'page_view', {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link) {
        trackEvent('external_link', 'click', link.href);
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.id) {
        trackEvent('form', 'submit', form.id);
    }
});

/* ============================================
   INITIALIZATION COMPLETE
   ============================================ */
console.log('Live Free Initiative website loaded successfully');
