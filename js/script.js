// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Smooth scrolling for navigation links
const smoothAnchors = document.querySelectorAll('a[href^="#"]');
smoothAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .team-member, .location-card').forEach(el => {
    observer.observe(el);
});

// Form submission with enhanced validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Enhanced form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show success message
    showNotification('Thank you! Your message has been sent. We will get back to you soon.', 'success');

    // Reset form
    contactForm.reset();
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        fontWeight: '600',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    });

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Enhanced scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
    }

    // Dynamic background effect
    const body = document.body;
    const scrollPercent = Math.min(scrolled / (document.body.scrollHeight - window.innerHeight), 1);
    body.style.backgroundPosition = `${scrollPercent * 50}% ${scrollPercent * 50}%`;
});

// Mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Subtle parallax on background
    document.body.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    body.loaded {
        opacity: 1;
    }

    .service-card, .gallery-item, .testimonial-card, .team-member, .location-card {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .service-card.animate, .gallery-item.animate, .testimonial-card.animate, .team-member.animate, .location-card.animate {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        padding: 2rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 32px 32px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-top: none;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-8px, 8px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-8px, -8px);
    }

    header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    /* Hover effects for interactive elements */
    .service-card:hover .service-icon {
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }

    /* Smooth transitions for all interactive elements */
    * {
        transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);
    
    .service-card.animate, .gallery-item.animate, .testimonial-card.animate, .team-member.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        padding: 1rem;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);