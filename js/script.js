/* ============================================
   TSUPA HERO PORTFOLIO - JAVASCRIPT
   ============================================
   This file contains all the interactive functionality
   for the portfolio website including:
   - Welcome message alert
   - Active navigation highlighting
   - Image modal/lightbox
   - Scroll to top button
   - Smooth scrolling
   ============================================ */

// ============================================
// WELCOME MESSAGE
// ============================================

/**
 * Displays a welcome message when the page loads
 * Only shows on the home page (index.html)
 */
function showWelcomeMessage() {
    // Check if we're on the home page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html' || currentPage === '') {
        // Wait a short delay before showing the welcome message
        setTimeout(() => {
            alert('Welcome to Tsupa Hero Portfolio! 🎉\n\nThank you for visiting our website. We are Computer Science students at University of the Cordilleras. Enjoy exploring our portfolio!');
        }, 500);
    }
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================

/**
 * Highlights the current page in the navigation menu
 * Adds 'active' class to the nav link matching the current page
 */
function highlightCurrentPage() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Loop through each link and check if it matches the current page
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Get the href attribute of the link
        const linkPage = link.getAttribute('href');
        
        // Check if this link corresponds to the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// IMAGE MODAL / LIGHTBOX
// ============================================

/**
 * Opens the modal with the clicked image
 * @param {string} imageSrc - The source URL of the image to display
 * @param {string} caption - The caption text for the image
 */
function openModal(imageSrc, caption) {
    // Get the modal element
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Check if modal elements exist (only on gallery page)
    if (modal && modalImage && modalCaption) {
        // Set the image source and caption
        modalImage.src = imageSrc;
        modalCaption.textContent = caption;
        
        // Display the modal
        modal.style.display = 'block';
        
        // Prevent scrolling on the body while modal is open
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.animation = 'fadeIn 0.3s ease';
    }
}

/**
 * Closes the image modal
 */
function closeModal() {
    // Get the modal element
    const modal = document.getElementById('imageModal');
    
    // Check if modal exists
    if (modal) {
        // Hide the modal
        modal.style.display = 'none';
        
        // Re-enable scrolling on the body
        document.body.style.overflow = 'auto';
    }
}

/**
 * Closes the modal when clicking outside the image
 * @param {Event} event - The click event
 */
function closeModalOnClickOutside(event) {
    const modal = document.getElementById('imageModal');
    
    // Check if the click was on the modal background (not the image or caption)
    if (event.target === modal) {
        closeModal();
    }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

/**
 * Shows or hides the scroll to top button based on scroll position
 */
function toggleScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Show button when user scrolls down 300px from the top
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }
}

/**
 * Scrolls the page to the top smoothly
 */
function scrollToTop() {
    // For modern browsers
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

/**
 * Adds smooth scrolling behavior to all navigation links
 */
function enableSmoothScrolling() {
    // Get all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default jump behavior
            event.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// CARD HOVER EFFECTS
// ============================================

/**
 * Adds interactive hover effects to cards
 */
function addCardHoverEffects() {
    // Get all cards
    const cards = document.querySelectorAll('.member-card, .interest-card, .project-card, .dream-card, .skill-card, .achievement-card');
    
    cards.forEach(card => {
        // Add mouseenter event
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        // Add mouseleave event
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// KEYBOARD NAVIGATION FOR MODAL
// ============================================

/**
 * Closes modal when Escape key is pressed
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardNavigation(event) {
    // Check if Escape key was pressed
    if (event.key === 'Escape') {
        closeModal();
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initializes all JavaScript functionality when the page loads
 */
function initializePage() {
    // Show welcome message (only on home page)
    showWelcomeMessage();
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Enable smooth scrolling
    enableSmoothScrolling();
    
    // Add card hover effects
    addCardHoverEffects();
    
    // Set up scroll event listener for scroll-to-top button
    window.addEventListener('scroll', toggleScrollTopButton);
    
    // Set up click event for scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Set up modal close on background click
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', closeModalOnClickOutside);
    }
    
    // Set up keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Also run when the window finishes loading (backup)
window.addEventListener('load', function() {
    // Ensure scroll button is properly initialized
    toggleScrollTopButton();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
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

/**
 * Adds a simple fade-in animation to elements when they come into view
 * Uses Intersection Observer API
 */
function addScrollAnimations() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all cards
        const cards = document.querySelectorAll('.member-card, .interest-card, .project-card, .dream-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

// Add scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);
