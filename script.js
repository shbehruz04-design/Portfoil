// ============================================
// Load Portfolio Data from Admin Panel
// ============================================
function loadPortfolioContent() {
    const savedData = localStorage.getItem('portfolioData');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);

        // Update Hero Section
        const nameEl = document.querySelector('.name');
        if (nameEl && data.hero) {
            nameEl.textContent = data.hero.name;
        }

        const descriptionEl = document.querySelector('.hero-description');
        if (descriptionEl && data.hero) {
            descriptionEl.textContent = data.hero.description;
        }

        // Update Motto
        const mottoEl = document.querySelector('.hero-motto');
        if (mottoEl && data.hero && data.hero.motto) {
            mottoEl.textContent = data.hero.motto;
        }

        const footerMottoEl = document.querySelector('.footer-motto');
        if (footerMottoEl && data.hero && data.hero.motto) {
            footerMottoEl.textContent = data.hero.motto;
        }

        // Update About Section
        const aboutIntro = document.querySelector('.about-intro');
        if (aboutIntro && data.about) {
            aboutIntro.textContent = data.about.intro;
        }

        const aboutTexts = document.querySelectorAll('.about-text p');
        if (aboutTexts.length >= 2 && data.about) {
            aboutTexts[1].textContent = data.about.text1;
            if (aboutTexts[2]) aboutTexts[2].textContent = data.about.text2;
        }

        // Update Stats
        if (data.about && data.about.stats) {
            const statNumbers = document.querySelectorAll('.stat-number');
            if (statNumbers.length >= 3) {
                statNumbers[0].setAttribute('data-target', data.about.stats.projects);
                statNumbers[1].setAttribute('data-target', data.about.stats.years);
                statNumbers[2].setAttribute('data-target', data.about.stats.clients);
            }
        }

        // Update Contact Section
        if (data.contact) {
            const contactEmail = document.querySelector('.contact-item:nth-child(1) a');
            if (contactEmail) {
                contactEmail.textContent = data.contact.email;
                contactEmail.href = `mailto:${data.contact.email}`;
            }

            const contactPhone = document.querySelector('.contact-item:nth-child(2) a');
            if (contactPhone) {
                contactPhone.textContent = data.contact.phone;
                contactPhone.href = `tel:${data.contact.phone}`;
            }

            const contactLocation = document.querySelector('.contact-item:nth-child(3) span');
            if (contactLocation) {
                contactLocation.textContent = data.contact.location;
            }

            const contactDesc = document.querySelector('.contact-description');
            if (contactDesc) {
                contactDesc.textContent = data.contact.description;
            }
        }

        // Update Skills
        if (data.skills) {
            updateSkills(data.skills);
        }

        // Update Projects
        if (data.projects) {
            updateProjects(data.projects);
            // Re-setup project buttons with new data
            setTimeout(setupProjectButtons, 100);
        }
        
        // Re-setup social links with new data
        setTimeout(setupSocialLinks, 100);

        // Store roles for typing effect
        if (data.hero && data.hero.roles) {
            window.typingRoles = data.hero.roles;
        }
    } catch (e) {
        console.error('Error loading portfolio data:', e);
    }
}

function updateSkills(skills) {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, catIndex) => {
        if (skills[catIndex]) {
            const skillData = skills[catIndex];
            if (skillData.items) {
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((item, itemIndex) => {
                    if (skillData.items[itemIndex]) {
                        const nameEl = item.querySelector('.skill-name');
                        const percentEl = item.querySelector('.skill-percent');
                        const progressEl = item.querySelector('.skill-progress');
                        if (nameEl) nameEl.textContent = skillData.items[itemIndex].name;
                        if (percentEl) percentEl.textContent = skillData.items[itemIndex].percent + '%';
                        if (progressEl) {
                            progressEl.setAttribute('data-width', skillData.items[itemIndex].percent);
                            progressEl.style.width = '0';
                        }
                    }
                });
            } else if (skillData.tags) {
                const tagsContainer = category.querySelector('.skill-tags');
                if (tagsContainer) {
                    tagsContainer.innerHTML = '';
                    skillData.tags.forEach(tag => {
                        const tagEl = document.createElement('span');
                        tagEl.className = 'skill-tag';
                        tagEl.textContent = tag;
                        tagsContainer.appendChild(tagEl);
                    });
                }
            }
        }
    });
}

function updateProjects(projects) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (projects[index]) {
            const project = projects[index];
            const titleEl = card.querySelector('.project-title');
            const descEl = card.querySelector('.project-description');
            const techEl = card.querySelector('.project-tech');
            
            if (titleEl) titleEl.textContent = project.title;
            if (descEl) descEl.textContent = project.description;
            if (techEl && project.tech) {
                techEl.innerHTML = '';
                project.tech.forEach(tech => {
                    const techSpan = document.createElement('span');
                    techSpan.textContent = tech;
                    techEl.appendChild(techSpan);
                });
            }
        }
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const links = document.querySelector('.links');
const navLinks = document.querySelectorAll('nav a');

mobileMenuToggle?.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    links.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle?.classList.remove('active');
        links?.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle?.classList.remove('active');
        links?.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        smoothScrollTo(href);
    });
});

// ============================================
// Contact Button in Header
// ============================================
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#contact');
    });
}

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        header.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        header.style.background = 'rgba(10, 14, 39, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .stat-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// Animated Counter for Stats
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// Animated Skill Progress Bars
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width + '%';
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(progress => {
    skillObserver.observe(progress);
});

// ============================================
// Load Portfolio Data from Admin Panel
// ============================================
function loadPortfolioContent() {
    const savedData = localStorage.getItem('portfolioData');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);

        // Update Hero Section
        const nameEl = document.querySelector('.name');
        if (nameEl && data.hero) {
            nameEl.textContent = data.hero.name;
        }

        const descriptionEl = document.querySelector('.hero-description');
        if (descriptionEl && data.hero) {
            descriptionEl.textContent = data.hero.description;
        }

        // Update Motto
        const mottoEl = document.querySelector('.hero-motto');
        if (mottoEl && data.hero && data.hero.motto) {
            mottoEl.textContent = data.hero.motto;
        }

        const footerMottoEl = document.querySelector('.footer-motto');
        if (footerMottoEl && data.hero && data.hero.motto) {
            footerMottoEl.textContent = data.hero.motto;
        }

        // Update About Section
        const aboutIntro = document.querySelector('.about-intro');
        if (aboutIntro && data.about) {
            aboutIntro.textContent = data.about.intro;
        }

        const aboutTexts = document.querySelectorAll('.about-text p');
        if (aboutTexts.length >= 2 && data.about) {
            aboutTexts[1].textContent = data.about.text1;
            if (aboutTexts[2]) aboutTexts[2].textContent = data.about.text2;
        }

        // Update Stats
        if (data.about && data.about.stats) {
            const statNumbers = document.querySelectorAll('.stat-number');
            if (statNumbers.length >= 3) {
                statNumbers[0].setAttribute('data-target', data.about.stats.projects);
                statNumbers[1].setAttribute('data-target', data.about.stats.years);
                statNumbers[2].setAttribute('data-target', data.about.stats.clients);
            }
        }

        // Update Contact Section
        if (data.contact) {
            const contactEmail = document.querySelector('.contact-item:nth-child(1) a');
            if (contactEmail) {
                contactEmail.textContent = data.contact.email;
                contactEmail.href = `mailto:${data.contact.email}`;
            }

            const contactPhone = document.querySelector('.contact-item:nth-child(2) a');
            if (contactPhone) {
                contactPhone.textContent = data.contact.phone;
                contactPhone.href = `tel:${data.contact.phone}`;
            }

            const contactLocation = document.querySelector('.contact-item:nth-child(3) span');
            if (contactLocation) {
                contactLocation.textContent = data.contact.location;
            }

            const contactDesc = document.querySelector('.contact-description');
            if (contactDesc) {
                contactDesc.textContent = data.contact.description;
            }
        }

        // Update Skills
        if (data.skills) {
            updateSkills(data.skills);
        }

        // Update Projects
        if (data.projects) {
            updateProjects(data.projects);
        }

        // Update typing roles
        if (data.hero && data.hero.roles) {
            window.typingRoles = data.hero.roles;
        }
    } catch (e) {
        console.error('Error loading portfolio data:', e);
    }
}

function updateSkills(skills) {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, catIndex) => {
        if (skills[catIndex]) {
            const skillData = skills[catIndex];
            if (skillData.items) {
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach((item, itemIndex) => {
                    if (skillData.items[itemIndex]) {
                        const nameEl = item.querySelector('.skill-name');
                        const percentEl = item.querySelector('.skill-percent');
                        const progressEl = item.querySelector('.skill-progress');
                        if (nameEl) nameEl.textContent = skillData.items[itemIndex].name;
                        if (percentEl) percentEl.textContent = skillData.items[itemIndex].percent + '%';
                        if (progressEl) {
                            progressEl.setAttribute('data-width', skillData.items[itemIndex].percent);
                            progressEl.style.width = '0';
                        }
                    }
                });
            } else if (skillData.tags) {
                const tagsContainer = category.querySelector('.skill-tags');
                if (tagsContainer) {
                    tagsContainer.innerHTML = '';
                    skillData.tags.forEach(tag => {
                        const tagEl = document.createElement('span');
                        tagEl.className = 'skill-tag';
                        tagEl.textContent = tag;
                        tagsContainer.appendChild(tagEl);
                    });
                }
            }
        }
    });
}

function updateProjects(projects) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (projects[index]) {
            const project = projects[index];
            const titleEl = card.querySelector('.project-title');
            const descEl = card.querySelector('.project-description');
            const techEl = card.querySelector('.project-tech');
            
            if (titleEl) titleEl.textContent = project.title;
            if (descEl) descEl.textContent = project.description;
            if (techEl && project.tech) {
                techEl.innerHTML = '';
                project.tech.forEach(tech => {
                    const techSpan = document.createElement('span');
                    techSpan.textContent = tech;
                    techEl.appendChild(techSpan);
                });
            }
        }
    });
}

// ============================================
// Typing Effect for Hero Role
// ============================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const defaultRoles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
    // Load roles from saved data
    const savedData = localStorage.getItem('portfolioData');
    let roles = defaultRoles;
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (data.hero && data.hero.roles) {
                roles = data.hero.roles;
            }
        } catch (e) {
            console.error('Error loading roles:', e);
        }
    }
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const current = roles[currentRole];
        
        if (isDeleting) {
            typingText.textContent = current.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            typingText.textContent = current.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentChar === current.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typingSpeed);
    };

    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Save message to admin panel
    if (window.saveContactMessage) {
        window.saveContactMessage(data);
    } else {
        // Fallback: save to localStorage
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            const portfolioData = JSON.parse(savedData);
            if (!portfolioData.messages) portfolioData.messages = [];
            data.date = new Date().toISOString();
            portfolioData.messages.push(data);
            localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        }
    }
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
    
    // In a real application, you would send the data to a server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Message sent successfully!');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     alert('Error sending message. Please try again.');
    // });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Smooth Page Load Animation
// ============================================
window.addEventListener('load', () => {
    // Load portfolio content
    loadPortfolioContent();
    
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Also load on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioContent();
    setupProjectButtons();
    setupSocialLinks();
});

// ============================================
// Project Card Buttons
// ============================================
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkText = link.textContent.trim();
        const projectCard = link.closest('.project-card');
        const projectTitle = projectCard?.querySelector('.project-title')?.textContent || 'Project';
        
        if (linkText === 'View') {
            // In a real scenario, this would open the project URL
            // For now, show a message or you can add project URLs to admin panel
            alert(`Opening ${projectTitle}...\n\nIn production, this would link to the live project.`);
        } else if (linkText === 'Code') {
            // In a real scenario, this would open the GitHub/code repository
            alert(`Opening ${projectTitle} code repository...\n\nIn production, this would link to the GitHub repository.`);
        }
    });
});

// ============================================
// Social Links
// ============================================
function setupSocialLinks() {
    const savedData = localStorage.getItem('portfolioData');
    let socialUrls = {};
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            socialUrls = data.contact?.social || {};
        } catch (e) {
            console.error('Error loading social URLs:', e);
        }
    }
    
    document.querySelectorAll('.social-link, .social-icon').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('aria-label')?.toLowerCase() || link.textContent.trim().toLowerCase();
            let url = '';
            
            if (platform.includes('github')) {
                url = socialUrls.github || '';
            } else if (platform.includes('linkedin')) {
                url = socialUrls.linkedin || '';
            } else if (platform.includes('twitter')) {
                url = socialUrls.twitter || '';
            } else if (platform.includes('dribbble')) {
                url = socialUrls.dribbble || '';
            }
            
            if (url) {
                window.open(url, '_blank');
            } else {
                alert(`Please add your ${platform} URL in the admin panel.`);
            }
        });
    });
}

// Setup social links on page load and after content update
setupSocialLinks();

// ============================================
// Keyboard Navigation Support
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && links.classList.contains('active')) {
        mobileMenuToggle?.classList.remove('active');
        links?.classList.remove('active');
    }
});

// ============================================
// Performance Optimization: Debounce Scroll Events
// ============================================
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

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
