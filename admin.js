// ============================================
// Admin Panel JavaScript
// ============================================

// Admin credentials (in production, use secure backend)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'bdex2026'
};

// State management
const adminState = {
    isLoggedIn: false,
    portfolioData: null
};

// ============================================
// Initialize Admin Panel
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeEventListeners();
    loadPortfolioData();
});

// ============================================
// Authentication
// ============================================
function checkAuth() {
    const authToken = localStorage.getItem('adminAuth');
    if (authToken === 'authenticated') {
        adminState.isLoggedIn = true;
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadEditorData();
}

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminAuth', 'authenticated');
        adminState.isLoggedIn = true;
        errorDiv.classList.remove('show');
        showDashboard();
    } else {
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.classList.add('show');
    }
});

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('adminAuth');
    adminState.isLoggedIn = false;
    showLogin();
    document.getElementById('loginForm').reset();
});

// ============================================
// Load Portfolio Data
// ============================================
function loadPortfolioData() {
    // Load saved data from localStorage or use defaults
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        adminState.portfolioData = JSON.parse(savedData);
    } else {
        // Default data structure
        adminState.portfolioData = {
            hero: {
                name: 'Bexruz',
                motto: 'We build, develop and exploer',
                roles: ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
                description: 'Crafting digital experiences with cutting-edge technology. Specialized in building scalable web applications and innovative solutions.'
            },
            about: {
                intro: 'I\'m a passionate developer with a love for creating elegant solutions to complex problems.',
                text1: 'With over 5 years of experience in web development, I specialize in building modern, responsive applications using the latest technologies. My approach combines clean code, user-centered design, and performance optimization.',
                text2: 'When I\'m not coding, you\'ll find me exploring new frameworks, contributing to open-source projects, or sharing knowledge with the developer community.',
                stats: {
                    projects: 50,
                    years: 5,
                    clients: 30
                }
            },
            skills: [
                {
                    category: 'Frontend',
                    items: [
                        { name: 'React', percent: 90 },
                        { name: 'TypeScript', percent: 85 },
                        { name: 'Vue.js', percent: 80 },
                        { name: 'CSS/SCSS', percent: 95 }
                    ]
                },
                {
                    category: 'Backend',
                    items: [
                        { name: 'Node.js', percent: 88 },
                        { name: 'Python', percent: 82 },
                        { name: 'MongoDB', percent: 85 },
                        { name: 'PostgreSQL', percent: 80 }
                    ]
                },
                {
                    category: 'Tools & Others',
                    tags: ['Git', 'Docker', 'AWS', 'Figma', 'Webpack', 'Jest', 'CI/CD', 'Agile']
                }
            ],
            projects: [
                {
                    title: 'E-Commerce Platform',
                    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include payment integration, admin dashboard, and real-time inventory.',
                    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    viewUrl: '',
                    codeUrl: ''
                },
                {
                    title: 'Task Management App',
                    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
                    tech: ['Vue.js', 'Socket.io', 'PostgreSQL', 'Express']
                },
                {
                    title: 'Analytics Dashboard',
                    description: 'A comprehensive analytics dashboard with data visualization, custom reports, and real-time metrics tracking.',
                    tech: ['React', 'D3.js', 'Python', 'FastAPI']
                },
                {
                    title: 'Mobile Banking App',
                    description: 'A secure mobile banking application with biometric authentication, transaction history, and budget tracking features.',
                    tech: ['React Native', 'Node.js', 'Firebase', 'TypeScript']
                }
            ],
            contact: {
                email: 'hello@example.com',
                phone: '+1 (234) 567-890',
                location: 'San Francisco, CA',
                description: 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!',
                social: {
                    github: '',
                    linkedin: '',
                    twitter: '',
                    dribbble: ''
                }
            },
            messages: []
        };
        savePortfolioData();
    }
}

function savePortfolioData() {
    localStorage.setItem('portfolioData', JSON.stringify(adminState.portfolioData));
    // Also sync to main site
    syncToMainSite();
}

function syncToMainSite() {
    // Store data that main site can access
    localStorage.setItem('portfolioData', JSON.stringify(adminState.portfolioData));
}

// ============================================
// Load Editor Data
// ============================================
function loadEditorData() {
    if (!adminState.portfolioData) return;

    const data = adminState.portfolioData;

    // Hero section
    document.getElementById('heroName').value = data.hero.name;
    document.getElementById('heroMotto').value = data.hero.motto || 'We build, develop and explore';
    document.getElementById('heroRole').value = data.hero.roles.join(',');
    document.getElementById('heroDescription').value = data.hero.description;

    // About section
    document.getElementById('aboutIntro').value = data.about.intro;
    document.getElementById('aboutText1').value = data.about.text1;
    document.getElementById('aboutText2').value = data.about.text2;
    document.getElementById('statProjects').value = data.about.stats.projects;
    document.getElementById('statYears').value = data.about.stats.years;
    document.getElementById('statClients').value = data.about.stats.clients;

    // Skills section
    loadSkillsEditor();

    // Projects section
    loadProjectsEditor();

    // Contact section
    document.getElementById('contactEmail').value = data.contact.email;
    document.getElementById('contactPhone').value = data.contact.phone;
    document.getElementById('contactLocation').value = data.contact.location;
    document.getElementById('contactDescription').value = data.contact.description;
    
    // Social media URLs
    if (data.contact.social) {
        document.getElementById('socialGitHub').value = data.contact.social.github || '';
        document.getElementById('socialLinkedIn').value = data.contact.social.linkedin || '';
        document.getElementById('socialTwitter').value = data.contact.social.twitter || '';
        document.getElementById('socialDribbble').value = data.contact.social.dribbble || '';
    }

    // Messages
    loadMessages();
}

// ============================================
// Skills Editor
// ============================================
function loadSkillsEditor() {
    const container = document.getElementById('skillsEditor');
    container.innerHTML = '';

    adminState.portfolioData.skills.forEach((category, catIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category-editor';
        categoryDiv.innerHTML = `<h4>${category.category}</h4>`;

        if (category.items) {
            category.items.forEach((skill, skillIndex) => {
                const skillDiv = document.createElement('div');
                skillDiv.className = 'skill-item-editor';
                skillDiv.innerHTML = `
                    <div class="form-group">
                        <label>Skill Name</label>
                        <input type="text" class="skill-name-input" value="${skill.name}" 
                               data-cat="${catIndex}" data-skill="${skillIndex}">
                    </div>
                    <div class="form-group">
                        <label>Percentage</label>
                        <input type="number" class="skill-percent-input" value="${skill.percent}" min="0" max="100"
                               data-cat="${catIndex}" data-skill="${skillIndex}">
                    </div>
                `;
                categoryDiv.appendChild(skillDiv);
            });
        } else if (category.tags) {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'tech-tags-editor';
            category.tags.forEach((tag, tagIndex) => {
                const tagDiv = document.createElement('div');
                tagDiv.className = 'tech-tag-input';
                tagDiv.innerHTML = `
                    <input type="text" value="${tag}" data-cat="${catIndex}" data-tag="${tagIndex}">
                    <span class="remove-tag" data-cat="${catIndex}" data-tag="${tagIndex}">×</span>
                `;
                tagsDiv.appendChild(tagDiv);
            });
            categoryDiv.appendChild(tagsDiv);
        }

        container.appendChild(categoryDiv);
    });

    // Add event listeners
    container.querySelectorAll('.skill-name-input, .skill-percent-input').forEach(input => {
        input.addEventListener('input', updateSkill);
    });

    container.querySelectorAll('.tech-tag-input input').forEach(input => {
        input.addEventListener('input', updateTag);
    });

    container.querySelectorAll('.remove-tag').forEach(btn => {
        btn.addEventListener('click', removeTag);
    });
}

function updateSkill(e) {
    const catIndex = parseInt(e.target.dataset.cat);
    const skillIndex = parseInt(e.target.dataset.skill);
    const skill = adminState.portfolioData.skills[catIndex].items[skillIndex];

    if (e.target.classList.contains('skill-name-input')) {
        skill.name = e.target.value;
    } else if (e.target.classList.contains('skill-percent-input')) {
        skill.percent = parseInt(e.target.value) || 0;
    }

    savePortfolioData();
}

function updateTag(e) {
    const catIndex = parseInt(e.target.dataset.cat);
    const tagIndex = parseInt(e.target.dataset.tag);
    adminState.portfolioData.skills[catIndex].tags[tagIndex] = e.target.value;
    savePortfolioData();
}

function removeTag(e) {
    const catIndex = parseInt(e.target.dataset.cat);
    const tagIndex = parseInt(e.target.dataset.tag);
    adminState.portfolioData.skills[catIndex].tags.splice(tagIndex, 1);
    loadSkillsEditor();
    savePortfolioData();
}

// ============================================
// Projects Editor
// ============================================
function loadProjectsEditor() {
    const container = document.getElementById('projectsEditor');
    container.innerHTML = '';

    adminState.portfolioData.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-editor';
        projectDiv.innerHTML = `
            <div class="project-editor-header">
                <h4>Project ${index + 1}</h4>
                <button type="button" class="delete-project-btn" data-index="${index}">Delete</button>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="project-title-input" value="${project.title}" data-index="${index}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="project-desc-input" rows="3" data-index="${index}">${project.description}</textarea>
            </div>
            <div class="form-group">
                <label>Technologies (comma-separated)</label>
                <input type="text" class="project-tech-input" value="${project.tech.join(', ')}" data-index="${index}">
            </div>
            <div class="form-group">
                <label>View Project URL (live demo)</label>
                <input type="url" class="project-view-url" value="${project.viewUrl || ''}" placeholder="https://yourproject.com" data-index="${index}">
            </div>
            <div class="form-group">
                <label>Code Repository URL (GitHub, etc.)</label>
                <input type="url" class="project-code-url" value="${project.codeUrl || ''}" placeholder="https://github.com/username/project" data-index="${index}">
            </div>
        `;
        container.appendChild(projectDiv);
    });

    // Add event listeners
    container.querySelectorAll('.project-title-input, .project-desc-input, .project-tech-input, .project-view-url, .project-code-url').forEach(input => {
        input.addEventListener('input', updateProject);
    });

    container.querySelectorAll('.delete-project-btn').forEach(btn => {
        btn.addEventListener('click', deleteProject);
    });
}

function updateProject(e) {
    const index = parseInt(e.target.dataset.index);
    const project = adminState.portfolioData.projects[index];

    if (e.target.classList.contains('project-title-input')) {
        project.title = e.target.value;
    } else if (e.target.classList.contains('project-desc-input')) {
        project.description = e.target.value;
    } else if (e.target.classList.contains('project-tech-input')) {
        project.tech = e.target.value.split(',').map(t => t.trim()).filter(t => t);
    }

    savePortfolioData();
}

function deleteProject(e) {
    if (confirm('Are you sure you want to delete this project?')) {
        const index = parseInt(e.target.dataset.index);
        adminState.portfolioData.projects.splice(index, 1);
        loadProjectsEditor();
        savePortfolioData();
    }
}

document.getElementById('addProjectBtn')?.addEventListener('click', () => {
    adminState.portfolioData.projects.push({
        title: 'New Project',
        description: 'Project description here...',
        tech: ['React', 'Node.js'],
        viewUrl: '',
        codeUrl: ''
    });
    loadProjectsEditor();
    savePortfolioData();
});

// ============================================
// Save All Changes
// ============================================
function saveAllChanges() {
    const data = adminState.portfolioData;

    // Update hero
    data.hero.name = document.getElementById('heroName').value;
    data.hero.motto = document.getElementById('heroMotto').value;
    data.hero.roles = document.getElementById('heroRole').value.split(',').map(r => r.trim());
    data.hero.description = document.getElementById('heroDescription').value;

    // Update about
    data.about.intro = document.getElementById('aboutIntro').value;
    data.about.text1 = document.getElementById('aboutText1').value;
    data.about.text2 = document.getElementById('aboutText2').value;
    data.about.stats.projects = parseInt(document.getElementById('statProjects').value) || 0;
    data.about.stats.years = parseInt(document.getElementById('statYears').value) || 0;
    data.about.stats.clients = parseInt(document.getElementById('statClients').value) || 0;

    // Update contact
    data.contact.email = document.getElementById('contactEmail').value;
    data.contact.phone = document.getElementById('contactPhone').value;
    data.contact.location = document.getElementById('contactLocation').value;
    data.contact.description = document.getElementById('contactDescription').value;
    
    // Social media URLs
    if (!data.contact.social) data.contact.social = {};
    data.contact.social.github = document.getElementById('socialGitHub').value;
    data.contact.social.linkedin = document.getElementById('socialLinkedIn').value;
    data.contact.social.twitter = document.getElementById('socialTwitter').value;
    data.contact.social.dribbble = document.getElementById('socialDribbble').value;

    savePortfolioData();
    
    // Show success message
    const btn = document.getElementById('saveAllBtn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.style.background = 'linear-gradient(135deg, #559C55, #00D0FF)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

document.getElementById('saveAllBtn')?.addEventListener('click', saveAllChanges);

// ============================================
// Messages
// ============================================
function loadMessages() {
    const container = document.getElementById('messagesList');
    const messages = adminState.portfolioData.messages || [];

    if (messages.length === 0) {
        container.innerHTML = '<p class="empty-state">No messages yet. Messages from the contact form will appear here.</p>';
        return;
    }

    container.innerHTML = '';
    messages.reverse().forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';
        const date = new Date(message.date);
        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-info">
                    <h4>${message.name}</h4>
                    <p>${message.email}</p>
                    <p>Subject: ${message.subject}</p>
                </div>
                <div class="message-date">${date.toLocaleString()}</div>
            </div>
            <div class="message-content">${message.message}</div>
        `;
        container.appendChild(messageDiv);
    });
}

// ============================================
// Event Listeners
// ============================================
function initializeEventListeners() {
    // Auto-save on input (debounced)
    let saveTimeout;
    document.addEventListener('input', (e) => {
        if (e.target.matches('#heroName, #heroMotto, #heroRole, #heroDescription, #aboutIntro, #aboutText1, #aboutText2, #statProjects, #statYears, #statClients, #contactEmail, #contactPhone, #contactLocation, #contactDescription, #socialGitHub, #socialLinkedIn, #socialTwitter, #socialDribbble')) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveAllChanges();
            }, 1000);
        }
    });
}

// ============================================
// Export function for main site to save messages
// ============================================
window.saveContactMessage = function(messageData) {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (!data.messages) data.messages = [];
        messageData.date = new Date().toISOString();
        data.messages.push(messageData);
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }
};
