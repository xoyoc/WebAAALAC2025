/**
 * ===========================
 * AAALAC - JavaScript Functionality
 * ===========================
 */

// Optimized JavaScript with performance improvements
class AAALACWebsite {
    constructor() {
        this.init();
    }

    /**
     * Initialize website functionality
     */
    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeCounters();
        this.setupNavbar();
        this.hideLoader();
    }

    /**
     * Setup all event listeners
     */
    
    
    
    setupEventListeners() {
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuBtn?.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                if (menuIcon) menuIcon.className = 'fas fa-bars';
            } else {
                mobileMenu.classList.add('active');
                if (menuIcon) menuIcon.className = 'fas fa-times';
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu?.classList.remove('active');
                mobileMenu?.classList.add('hidden');
                if (menuIcon) menuIcon.className = 'fas fa-bars';
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm?.addEventListener('submit', this.handleFormSubmit.bind(this));

        // Form field enhancements
        this.enhanceFormFields();

        // Scroll to section functionality
        window.scrollToSection = this.scrollToSection.bind(this);

        // Select enhancements
        this.enhanceSelects();
    }

    /**
     * Enhanced form field behavior
     */
    enhanceFormFields() {
        const formInputs = document.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                const parent = input.parentElement;
                parent?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                const parent = input.parentElement;
                parent?.classList.remove('focused');
            });

            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }

    /**
     * Enhance select elements
     */
    enhanceSelects() {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', function() {
                if (this.value) {
                    this.classList.add('text-gray-900');
                    this.classList.remove('text-gray-500');
                } else {
                    this.classList.remove('text-gray-900');
                    this.classList.add('text-gray-500');
                }
            });
        });
    }

    /**
     * Hide loader with smooth transition
     */
    hideLoader() {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        }, 500);
    }

    /**
     * Setup navbar functionality
     */
    setupNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        // Optimized scroll handler with throttling
        const handleScroll = this.throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Navbar shadow effect
            if (currentScrollY > 50) {
                navbar?.classList.add('shadow-lg');
                navbar?.classList.remove('shadow-sm');
            } else {
                navbar?.classList.add('shadow-sm');
                navbar?.classList.remove('shadow-lg');
            }

            // Active navigation links
            this.updateActiveNavLinks();

            lastScrollY = currentScrollY;
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Update active navigation links based on scroll position
     */
    updateActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Initialize scroll animations
     */
    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Initialize counter animations
     */
    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Animate counter numbers
     * @param {HTMLElement} element - Counter element
     */
    animateCounter(element) {
        const target = parseInt(element.dataset.target) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('formMessage');
        const originalText = submitBtn?.innerHTML || '';

        // Validate form
        if (!this.validateForm(e.target)) {
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75');
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showMessage(messageDiv, 'success', '¡Mensaje enviado con éxito! Te contactaremos pronto.');
            e.target.reset();
            
            // Reset form field styles
            e.target.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('has-value');
            });

        } catch (error) {
            // Show error message
            this.showMessage(messageDiv, 'error', 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
        } finally {
            // Restore button
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75');
            }
        }
    }

    /**
     * Validate form fields
     * @param {HTMLFormElement} form - Form element
     * @returns {boolean} - Validation result
     */
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const value = field.value.trim();
            
            if (!value) {
                this.showFieldError(field, 'Este campo es requerido');
                isValid = false;
            } else if (field.type === 'email' && !this.validateEmail(value)) {
                this.showFieldError(field, 'Por favor ingresa un email válido');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Validation result
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show field error
     * @param {HTMLElement} field - Input field
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('border-red-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-1 field-error';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
    }

    /**
     * Clear field error
     * @param {HTMLElement} field - Input field
     */
    clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorDiv = field.parentElement.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Show form message
     * @param {HTMLElement} element - Message container
     * @param {string} type - Message type (success/error)
     * @param {string} message - Message text
     */
    showMessage(element, type, message) {
        if (!element) return;
        
        const isSuccess = type === 'success';
        
        element.className = `mt-4 p-4 rounded-xl border ${
            isSuccess 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
        }`;
        
        element.innerHTML = `
            <i class="fas fa-${isSuccess ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
            ${message}
        `;
        
        element.classList.remove('hidden');

        // Hide message after 5 seconds
        setTimeout(() => {
            element.classList.add('hidden');
        }, 5000);
    }

    /**
     * Scroll to section smoothly
     * @param {string} sectionId - Target section ID
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Utility function for throttling
     * @param {Function} func - Function to throttle
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} - Throttled function
     */
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

/**
 * ===========================
 * UTILITY FUNCTIONS
 * ===========================
 */

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} - Debounced function
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {HTMLElement} element - Target element
 * @param {number} offset - Offset in pixels
 */
function smoothScrollToElement(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Get element's offset from document top
 * @param {HTMLElement} element - Target element
 * @returns {number} - Offset in pixels
 */
function getElementOffset(element) {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

/**
 * ===========================
 * PERFORMANCE OPTIMIZATIONS
 * ===========================
 */

// Preload critical images
const criticalImages = [
    './img/Isotipo.png'
];

criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});

// Lazy load non-critical images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('skeleton');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * ===========================
 * MODAL FUNCTIONALITY
 * ===========================
 */

class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.overlay = this.modal?.querySelector('.modal-overlay');
        this.closeBtn = this.modal?.querySelector('.modal-close');
        
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Close modal on overlay click
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close modal on close button click
        this.closeBtn?.addEventListener('click', () => {
            this.close();
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open() {
        this.modal?.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal?.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.modal?.classList.contains('active');
    }
}

/**
 * ===========================
 * NOTIFICATION SYSTEM
 * ===========================
 */

class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.notifications = [];
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        
        // Show notification
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        return notification;
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type} bg-white shadow-lg rounded-lg p-4 max-w-sm transform translate-x-full transition-transform duration-300`;
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div class="flex items-start">
                <i class="fas fa-${icon} mr-3 mt-0.5"></i>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">${message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        return notification;
    }

    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    remove(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }
}

/**
 * ===========================
 * INITIALIZATION
 * ===========================
 */

// Initialize website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main website functionality
    new AAALACWebsite();

    // Initialize notification system
    window.notifications = new NotificationSystem();
});

// Additional event listeners for compatibility with existing code
window.addEventListener('load', () => {
    // Hide loader when page loads (fallback)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.display = 'none';
        }
    }, 800);
});

/**
 * ===========================
 * GLOBAL FUNCTIONS (for compatibility)
 * ===========================
 */

// Global scroll function for button clicks
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};