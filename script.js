// ===== Global Variables =====
let navbar = null;
let navToggle = null;
let navMenu = null;
let navLinks = [];
let backToTopBtn = null;
let skillProgressBars = [];
let sections = [];
let revealElements = [];
let webhookBtn = null;

// ===== Utility Functions =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== DOM Elements Initialization =====
function initializeElements() {
    navbar = document.getElementById('navbar');
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    backToTopBtn = document.getElementById('back-to-top');
    skillProgressBars = document.querySelectorAll('.skill-progress');
    sections = document.querySelectorAll('section');
    revealElements = document.querySelectorAll('.reveal');
    webhookBtn = document.getElementById('webhook-trigger-btn');
    
    // Add reveal class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .info-card');
    animateElements.forEach(el => el.classList.add('reveal'));
    revealElements = document.querySelectorAll('.reveal');
}

// ===== Navigation Functions =====
function toggleMobileMenu() {
    if (!navMenu || !navToggle) return;
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    if (!navMenu || !navToggle) return;
    
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleNavLinkClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const offsetTop = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        closeMobileMenu();
    }
}

function updateActiveNavLink() {
    const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight : 70) + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Scroll Effects =====
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar scroll effect
    if (navbar) {
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to top button
    if (backToTopBtn) {
        if (scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Reveal animations
    revealOnScroll();
    
    // Animate skill bars when skills section is visible
    animateSkillBars();
}

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    revealElements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const revealPoint = 150;
        
        if (scrollTop + windowHeight - revealPoint > elementTop && 
            scrollTop < elementTop + elementHeight) {
            element.classList.add('active');
        }
    });
}

// ===== Skill Bars Animation =====
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (scrollTop + windowHeight > skillsSectionTop + 200) {
        skillsAnimated = true;
        
        skillProgressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 100);
        });
    }
}

// ===== Back to Top Function =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Contact Form Handling =====
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission
    showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
    e.target.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formObject);
}

// ===== Webhook Functions =====
async function triggerWebhook() {
    if (!webhookBtn) return;
    
    // Disable button and show loading state
    setWebhookButtonLoading(true);
    
    try {
        // Example webhook URL - you should replace this with your actual webhook endpoint
        const webhookUrl = 'http://localhost:5678/webhook-test/7b80483c-4402-441c-b1f2-c393e6e66faa';
        
        console.log('웹훅 요청 시작:', webhookUrl);
        
        // Make the webhook request (simple GET without parameters)
        const response = await fetch(webhookUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/markdown, application/json, text/plain'
            }
        });
        
        console.log('응답 상태:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`웹훅 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        // Get response content and process it
        const responseText = await response.text();
        console.log('원본 응답:', responseText);
        
        let markdownContent;
        
        // Try to parse as JSON first
        try {
            const jsonResponse = JSON.parse(responseText);
            console.log('파싱된 JSON:', jsonResponse);
            
            // Extract markdown content from various possible formats
            if (Array.isArray(jsonResponse) && jsonResponse[0] && jsonResponse[0].output) {
                // Format: [{"output": "markdown content"}]
                markdownContent = jsonResponse[0].output;
            } else if (jsonResponse.output) {
                // Format: {"output": "markdown content"}
                markdownContent = jsonResponse.output;
            } else if (jsonResponse.markdown) {
                // Format: {"markdown": "markdown content"}
                markdownContent = jsonResponse.markdown;
            } else if (jsonResponse.content) {
                // Format: {"content": "markdown content"}
                markdownContent = jsonResponse.content;
            } else if (typeof jsonResponse === 'string') {
                // Format: "markdown content"
                markdownContent = jsonResponse;
            } else {
                // Fallback: stringify the entire response
                markdownContent = JSON.stringify(jsonResponse, null, 2);
            }
        } catch (e) {
            // If it's not valid JSON, treat as plain text
            markdownContent = responseText;
        }
        
        // Clean up the markdown content
        markdownContent = cleanMarkdownContent(markdownContent);
        console.log('정리된 마크다운:', markdownContent);
        
        // Download the markdown file
        downloadMarkdownFile(markdownContent);
        
        showNotification('웹훅에서 받은 마크다운 파일이 다운로드되었습니다!', 'success');
        
    } catch (error) {
        console.error('웹훅 에러:', error);
        
        // For demo purposes, generate a sample markdown file if webhook fails
        const sampleMarkdown = generateSampleMarkdown();
        downloadMarkdownFile(sampleMarkdown);
        
        showNotification(`웹훅 호출 실패: ${error.message}. 데모용 샘플 파일을 다운로드합니다.`, 'error');
    } finally {
        setWebhookButtonLoading(false);
    }
}

function setWebhookButtonLoading(isLoading) {
    if (!webhookBtn) return;
    
    const icon = webhookBtn.querySelector('i.fa-download');
    const spinner = webhookBtn.querySelector('.loading-spinner');
    const text = webhookBtn.querySelector('.btn-text');
    
    webhookBtn.disabled = isLoading;
    
    if (isLoading) {
        if (icon) icon.style.display = 'none';
        if (spinner) spinner.style.display = 'block';
        if (text) text.textContent = '생성 중...';
    } else {
        if (icon) icon.style.display = 'block';
        if (spinner) spinner.style.display = 'none';
        if (text) text.textContent = 'CV 다운로드';
    }
}

function extractCVData() {
    // Extract data from the current CV page
    const data = {
        name: '김태현',
        title: 'Full Stack Software Engineer',
        email: 'kim.taehyun@email.com',
        phone: '+82 10-1234-5678',
        location: '서울, 대한민국',
        summary: document.querySelector('.hero-description')?.textContent || '',
        experience: [],
        skills: {},
        projects: [],
        education: {
            degree: '컴퓨터공학과 학사',
            university: '한국대학교',
            year: '2015-2019'
        },
        timestamp: new Date().toISOString()
    };
    
    // Extract experience data
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const date = item.querySelector('.timeline-date')?.textContent || '';
        const title = item.querySelector('.timeline-title')?.textContent || '';
        const company = item.querySelector('.timeline-company')?.textContent || '';
        const description = Array.from(item.querySelectorAll('.timeline-description li'))
            .map(li => li.textContent);
        const tags = Array.from(item.querySelectorAll('.tag'))
            .map(tag => tag.textContent);
        
        data.experience.push({
            date,
            title,
            company,
            description,
            technologies: tags
        });
    });
    
    // Extract skills data
    const skillsCategories = document.querySelectorAll('.skills-category');
    skillsCategories.forEach(category => {
        const categoryTitle = category.querySelector('.category-title')?.textContent || '';
        const skills = [];
        
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach(skill => {
            const name = skill.querySelector('.skill-name')?.textContent || '';
            const level = skill.querySelector('.skill-level')?.textContent || '';
            skills.push({ name, level });
        });
        
        data.skills[categoryTitle] = skills;
    });
    
    // Extract projects data
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title')?.textContent || '';
        const description = card.querySelector('.project-description')?.textContent || '';
        const technologies = Array.from(card.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent);
        
        data.projects.push({
            title,
            description,
            technologies
        });
    });
    
    return data;
}

function generateSampleMarkdown() {
    const cvData = extractCVData();
    
    let markdown = `# ${cvData.name} - ${cvData.title}\n\n`;
    markdown += `**연락처 정보**\n`;
    markdown += `- 📧 이메일: ${cvData.email}\n`;
    markdown += `- 📱 전화: ${cvData.phone}\n`;
    markdown += `- 📍 위치: ${cvData.location}\n\n`;
    
    if (cvData.summary) {
        markdown += `## 소개\n\n${cvData.summary}\n\n`;
    }
    
    if (cvData.experience.length > 0) {
        markdown += `## 경력 사항\n\n`;
        cvData.experience.forEach(exp => {
            markdown += `### ${exp.title} - ${exp.company}\n`;
            markdown += `**기간:** ${exp.date}\n\n`;
            if (exp.description.length > 0) {
                markdown += `**주요 업무:**\n`;
                exp.description.forEach(desc => {
                    markdown += `- ${desc}\n`;
                });
                markdown += `\n`;
            }
            if (exp.technologies.length > 0) {
                markdown += `**기술 스택:** ${exp.technologies.join(', ')}\n\n`;
            }
        });
    }
    
    if (Object.keys(cvData.skills).length > 0) {
        markdown += `## 기술 스택\n\n`;
        Object.entries(cvData.skills).forEach(([category, skills]) => {
            markdown += `### ${category}\n\n`;
            skills.forEach(skill => {
                markdown += `- **${skill.name}**: ${skill.level}\n`;
            });
            markdown += `\n`;
        });
    }
    
    if (cvData.projects.length > 0) {
        markdown += `## 주요 프로젝트\n\n`;
        cvData.projects.forEach(project => {
            markdown += `### ${project.title}\n\n`;
            markdown += `${project.description}\n\n`;
            if (project.technologies.length > 0) {
                markdown += `**사용 기술:** ${project.technologies.join(', ')}\n\n`;
            }
        });
    }
    
    markdown += `## 학력\n\n`;
    markdown += `- **학위:** ${cvData.education.degree}\n`;
    markdown += `- **학교:** ${cvData.education.university}\n`;
    markdown += `- **기간:** ${cvData.education.year}\n\n`;
    
    markdown += `---\n\n`;
    markdown += `*이 CV는 ${new Date().toLocaleString('ko-KR')}에 자동 생성되었습니다.*\n`;
    
    return markdown;
}

function cleanMarkdownContent(content) {
    if (!content || typeof content !== 'string') {
        return '';
    }
    
    // Replace escaped newlines with actual newlines
    let cleaned = content.replace(/\\n/g, '\n');
    
    // Replace escaped quotes
    cleaned = cleaned.replace(/\\"/g, '"');
    
    // Replace escaped backslashes
    cleaned = cleaned.replace(/\\\\/g, '\\');
    
    // Remove any remaining escape characters that might interfere
    cleaned = cleaned.replace(/\\t/g, '\t');
    cleaned = cleaned.replace(/\\r/g, '\r');
    
    // Trim whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
}

function downloadMarkdownFile(content) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `김태현_CV_${new Date().toISOString().split('T')[0]}.md`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                z-index: 9999;
                border-left: 4px solid var(--primary-color);
            }
            .notification-success {
                border-left-color: #10b981;
            }
            .notification-error {
                border-left-color: #ef4444;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-icon {
                color: var(--primary-color);
            }
            .notification-success .notification-icon {
                color: #10b981;
            }
            .notification-error .notification-icon {
                color: #ef4444;
            }
            .notification-message {
                flex: 1;
                font-size: 0.9rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                padding: 0.25rem;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// ===== Typing Animation =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero-subtitle');
    if (!typingElement) return;
    
    const texts = [
        'Full Stack Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeText, 2000);
}

// ===== Parallax Effect =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 10));
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        
        const aboutSectionTop = aboutSection.offsetTop;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrollTop + windowHeight > aboutSectionTop + 200) {
            countersAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                let current = 0;
                const increment = target / 60; // 60 frames for 1 second
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', throttle(animateCounters, 100));
}

// ===== Theme Toggle (Optional Enhancement) =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle Dark Mode';
    
    // Add theme toggle styles
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-toggle {
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: var(--bg-white);
            border: 2px solid var(--border-light);
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.25rem;
            color: var(--text-dark);
            transition: var(--transition);
            z-index: 999;
            box-shadow: var(--shadow-md);
        }
        .theme-toggle:hover {
            background: var(--primary-color);
            color: var(--text-white);
            border-color: var(--primary-color);
        }
        [data-theme="dark"] {
            --text-dark: #f7fafc;
            --text-light: #a0aec0;
            --bg-white: #1a202c;
            --bg-light: #2d3748;
            --border-light: #4a5568;
        }
    `;
    document.head.appendChild(themeStyles);
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ===== Smooth Scroll Polyfill =====
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Import smooth scroll polyfill for older browsers
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@0.4.4/dist/smoothscroll.min.js';
        document.head.appendChild(script);
    }
}

// ===== Loading Animation =====
function initLoadingAnimation() {
    // Add loading class to all sections
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('loading');
    });
    
    // Remove loading class after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            sections.forEach(section => {
                section.classList.remove('loading');
            });
        }, 500);
    });
}

// ===== Event Listeners =====
function addEventListeners() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Webhook button
    if (webhookBtn) {
        webhookBtn.addEventListener('click', triggerWebhook);
    }
    
    // Scroll events (throttled for performance)
    window.addEventListener('scroll', throttle(handleScroll, 10));
    
    // Resize events
    window.addEventListener('resize', debounce(() => {
        closeMobileMenu();
        // Recalculate positions on resize
        updateActiveNavLink();
    }, 250));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// ===== Intersection Observer for Better Performance =====
function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
        
        // Separate observer for skill bars
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkillBars();
                }
            });
        }, { threshold: 0.3 });
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }
}

// ===== Initialize Everything =====
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        initializeElements();
        addEventListeners();
        smoothScrollPolyfill();
        initLoadingAnimation();
        initTypingAnimation();
        initParallaxEffect();
        initCounterAnimation();
        initIntersectionObserver();
        initThemeToggle();
        
        // Initial calls
        handleScroll();
        revealOnScroll();
        
        console.log('CV Website initialized successfully!');
    } catch (error) {
        console.error('Error initializing CV website:', error);
    }
}

// ===== Start the application =====
init();

// ===== Performance Optimization =====
// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Call preload on script execution
preloadResources();

// ===== Export functions for potential external use =====
window.CVWebsite = {
    init,
    showNotification,
    scrollToTop,
    toggleMobileMenu,
    closeMobileMenu,
    triggerWebhook,
    extractCVData,
    downloadMarkdownFile
};