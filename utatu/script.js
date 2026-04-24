// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SMOOTH SCROLL TO SECTIONS
    // ============================================
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle all navigation links (header, footer, back-to-top)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                smoothScrollToSection(targetId);
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Update browser history
                window.history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // HAMBURGER MENU TOGGLE
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ============================================
    // APPOINTMENT FORM SUBMISSION
    // ============================================
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;

            // Validate phone number
            if (!validatePhoneNumber(phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            // Create WhatsApp message
            const appointmentMessage = `
Hello,

I would like to book an appointment at Utatu Medicals and Maternity Centre.

*Booking Details:*
Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred Date: ${date}
${message ? `Additional Notes: ${message}` : ''}

Please confirm my appointment.

Thank you!
            `.trim();

            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(appointmentMessage);
            const whatsappURL = `https://wa.me/256785630795?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form
            appointmentForm.reset();

            // Show success message
            showNotification('Appointment request sent! We will confirm via WhatsApp.', 'success');
        });
    }

    // ============================================
    // PHONE NUMBER VALIDATION
    // ============================================
    function validatePhoneNumber(phone) {
        // Basic validation for Uganda phone numbers
        const phoneRegex = /^(256|\+256|0)(7|3)\d{8}$/;
        // Remove any non-digit characters except +
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        return phoneRegex.test(cleanPhone);
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ============================================
    // SMOOTH SCROLL BEHAVIOR (Already in CSS, but enhanced here)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
            }
        });
    });

    // ============================================
    // SCROLL TO TOP ON PAGE LOAD
    // ============================================
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });

    // ============================================
    // ANIMATION ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and testimonial cards
    document.querySelectorAll('.service-card, .testimonial-card, .value-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ============================================
    // DATE INPUT - SET MINIMUM DATE
    // ============================================
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }

    // ============================================
    // PHONE INPUT - FORMAT
    // ============================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to reasonable length
            if (value.length > 12) {
                value = value.slice(0, 12);
            }
            
            e.target.value = value;
        });
    }

    // ============================================
    // EMERGENCY BUTTON - PREVENT DOUBLE CLICK
    // ============================================
    document.querySelectorAll('.emergency-btn, .whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Allow normal link behavior
            return true;
        });
    });

    // ============================================
    // KEYBOARD ACCESSIBILITY
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // ============================================
    // ACTIVE NAVIGATION LINK
    // ============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ============================================
    // PREVENT ACCIDENTAL DOUBLE SUBMISSIONS
    // ============================================
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function() {
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            submitBtn.style.cursor = 'not-allowed';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }, 3000);
        });
    }
});

// ============================================
// ADDITIONAL ANIMATIONS CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }

    .nav-menu a.active {
        border-bottom: 3px solid white;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
