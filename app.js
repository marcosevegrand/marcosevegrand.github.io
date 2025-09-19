// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initModalFunctionality();
    initSmoothScrolling();
    initTimelineAnimation();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active section highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
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

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .timeline-item, .certification-card, .project-card, .skill-category');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Timeline animation with staggered delay
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
}

// Modal functionality for detail pages
function initModalFunctionality() {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const detailButtons = document.querySelectorAll('.details-btn');
    
    const detailData = {
        experience: {
            /* exp1: {
                title: '[Job Title]',
                company: '[Company Name]',
                location: '[City, Country]',
                duration: '[Start Date] - [End Date / Present]',
                details: `[Detailed description of responsibilities, technologies used, projects worked on, and measurable achievements. 

This section would include:
• Specific technologies and frameworks used
• Key projects and their impact
• Team collaboration and leadership experience
• Quantifiable achievements and metrics
• Problem-solving examples and innovative solutions

Add multiple paragraphs here to provide comprehensive information about your role and contributions.]`,
                achievements: [
                    '[Achievement 1 with specific metrics]',
                    '[Achievement 2 with quantifiable results]',
                    '[Achievement 3 with business impact]'
                ]
            }*/
        },
        certification: {
            cert1: {
                name: 'AZ-104',
                issuer: 'Microsoft',
                date: '[...]',
                credentialId: '[...]',
                details: `[Description of certification scope and skills validated.

This certification demonstrates proficiency in:
• Core concepts and principles
• Practical application of knowledge
• Industry best practices and standards
• Problem-solving capabilities in the domain

The certification process involved comprehensive training, hands-on exercises, and rigorous examination to validate expertise in the field.]`,
                skills: [
                    '[Skill 1 validated by certification]',
                    '[Skill 2 validated by certification]',
                    '[Skill 3 validated by certification]'
                ],
                validUntil: '[Expiration Date if applicable]'
            },
        },
        project: {
            proj1: {
                title: '[Project Title]',
                description: '[Brief project description and key features]',
                technologies: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
                github: '[GitHub Repository URL]',
                demo: '[Live Demo URL]',
                details: `[Detailed project description, challenges faced, solutions implemented, and outcomes.

Project Overview:
This project was developed to solve [specific problem] and provides [key benefits]. The application features a modern, responsive design with intuitive user experience.

Technical Implementation:
• Frontend: Built using [frontend technologies]
• Backend: Developed with [backend technologies]
• Database: Implemented using [database technology]
• Deployment: Hosted on [hosting platform]

Key Features:
• [Feature 1 with detailed description]
• [Feature 2 with detailed description]
• [Feature 3 with detailed description]

Challenges and Solutions:
During development, several technical challenges were encountered and successfully resolved:
• [Challenge 1] - Solved by [solution approach]
• [Challenge 2] - Implemented [technical solution]
• [Challenge 3] - Overcame through [methodology]

Results and Impact:
The project successfully achieved its objectives with measurable outcomes including [specific metrics and benefits].]`,
                features: [
                    '[Feature 1 description]',
                    '[Feature 2 description]',
                    '[Feature 3 description]',
                    '[Feature 4 description]'
                ],
                role: '[Your specific role and contributions]',
                duration: '[Project duration]',
                teamSize: '[Team size if applicable]'
            }
        }
    };
    
    // Handle detail button clicks
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const type = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            
            if (detailData[type] && detailData[type][id]) {
                showModal(detailData[type][id], type);
            }
        });
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function showModal(data, type) {
        let content = '';
        
        if (type === 'experience') {
            content = `
                <h2>${data.title}</h2>
                <h3>${data.company}</h3>
                <p class="duration">${data.duration}</p>
                <p class="location">${data.location}</p>
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Role Description</h4>
                <p style="white-space: pre-line;">${data.details}</p>
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Key Achievements</h4>
                <ul style="color: var(--cv-text-secondary); padding-left: 1.5rem;">
                    ${data.achievements.map(achievement => `<li style="margin-bottom: 0.5rem;">${achievement}</li>`).join('')}
                </ul>
            `;
        } else if (type === 'certification') {
            content = `
                <h2>${data.name}</h2>
                <h3>${data.issuer}</h3>
                <p class="duration">Issued: ${data.date}</p>
                <p class="location">Credential ID: ${data.credentialId}</p>
                ${data.validUntil ? `<p class="location">Valid Until: ${data.validUntil}</p>` : ''}
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Certification Details</h4>
                <p style="white-space: pre-line;">${data.details}</p>
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Skills Validated</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            `;
        } else if (type === 'project') {
            content = `
                <h2>${data.title}</h2>
                <p style="margin-bottom: 1rem;">${data.description}</p>
                
                <div style="margin-bottom: 2rem;">
                    <strong style="color: var(--cv-accent);">Duration:</strong> ${data.duration}<br>
                    <strong style="color: var(--cv-accent);">Role:</strong> ${data.role}<br>
                    <strong style="color: var(--cv-accent);">Team Size:</strong> ${data.teamSize}
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                    ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <a href="${data.github}" target="_blank" class="project-link" style="margin-right: 1rem;">View on GitHub</a>
                    <a href="${data.demo}" target="_blank" class="project-link">Live Demo</a>
                </div>
                
                <div style="background: var(--cv-bg-secondary); padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4 style="color: var(--cv-accent); margin-bottom: 1rem;">Project Screenshots</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="height: 150px; background: var(--cv-bg-card); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--cv-text-muted); border: 1px solid var(--cv-border);">
                            Screenshot 1 Placeholder
                        </div>
                        <div style="height: 150px; background: var(--cv-bg-card); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--cv-text-muted); border: 1px solid var(--cv-border);">
                            Screenshot 2 Placeholder
                        </div>
                    </div>
                </div>
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Project Overview</h4>
                <p style="white-space: pre-line;">${data.details}</p>
                
                <h4 style="color: var(--cv-accent); margin: 2rem 0 1rem 0;">Key Features</h4>
                <ul style="color: var(--cv-text-secondary); padding-left: 1.5rem;">
                    ${data.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                </ul>
            `;
        }
        
        modalBody.innerHTML = content;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Add hover effects for interactive elements
function initHoverEffects() {
    const cards = document.querySelectorAll('.timeline-content, .certification-card, .project-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add typing animation for the main title (optional enhancement)
function initTypingAnimation() {
    const titleElement = document.querySelector('.about-text h1');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid var(--cv-accent)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    initHoverEffects();
    
    // Add click handlers for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item.experience-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const detailBtn = this.querySelector('.details-btn');
            if (detailBtn) {
                detailBtn.click();
            }
        });
    });
    
    // Add click handlers for certification cards
    const certCards = document.querySelectorAll('.certification-card');
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const detailBtn = this.querySelector('.details-btn');
            if (detailBtn) {
                detailBtn.click();
            }
        });
    });
    
    // Add click handlers for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const detailBtn = this.querySelector('.details-btn');
            if (detailBtn) {
                detailBtn.click();
            }
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Any additional scroll-based functionality can be added here
}, 16)); // ~60fps

// Add loading animation (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});