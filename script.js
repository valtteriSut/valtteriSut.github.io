// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectRows = document.querySelectorAll('.project-row');
    const selectAllBtn = document.getElementById('selectAllBtn');

    // Function to update select all button text
    function updateSelectAllButton() {
        const activeCount = document.querySelectorAll('.filter-btn.active').length;
        const totalCount = filterButtons.length;
        
        if (activeCount === totalCount) {
            selectAllBtn.textContent = 'Deselect All';
            selectAllBtn.classList.add('active');
        } else if (activeCount === 0) {
            selectAllBtn.textContent = 'Select All';
            selectAllBtn.classList.remove('active');
        } else {
            selectAllBtn.textContent = 'Deselect All';
            selectAllBtn.classList.add('active');
        }
    }

    // Function to filter projects
    function filterProjects() {
        const activeCategories = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.dataset.category);
        
        projectRows.forEach((project, index) => {
            const projectCategory = project.querySelector('.project-category').textContent;
            const shouldShow = activeCategories.length > 0 && activeCategories.includes(projectCategory);
            const isCurrentlyVisible = !project.classList.contains('hidden');
            
            if (shouldShow && !isCurrentlyVisible) {
                // Show project with animation
                project.classList.remove('hidden');
                project.classList.remove('filtering-out');
                project.classList.add('filtering-in');
                
                setTimeout(() => {
                    project.classList.remove('filtering-in');
                }, 500);
                
            } else if (!shouldShow && isCurrentlyVisible) {
                // Hide project with animation
                project.classList.add('filtering-out');
                
                setTimeout(() => {
                    project.classList.add('hidden');
                    project.classList.remove('filtering-out');
                }, 300);
            }
        });
    }

    // Select All / Deselect All button functionality
    selectAllBtn.addEventListener('click', () => {
        const activeCount = document.querySelectorAll('.filter-btn.active').length;
        const shouldSelectAll = activeCount !== filterButtons.length;
        
        filterButtons.forEach(button => {
            if (shouldSelectAll) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        updateSelectAllButton();
        filterProjects();
    });

    // Individual filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateSelectAllButton();
            filterProjects();
        });
    });

    // Initialize button text
    updateSelectAllButton();
}

// Wait for h1 animation to complete before showing other content
let h1AnimationComplete = false;

// Listen for the last h1 span animation to complete
const lastSpan = document.querySelector('h1 span:nth-child(3)');
lastSpan.addEventListener('animationend', () => {
    h1AnimationComplete = true;
    document.body.classList.add('content-visible');
    
    // Start scroll animations after a brief delay
    setTimeout(() => {
        initializeScrollAnimations();
        initializeProjectFilters(); // Initialize filter functionality
    }, 300);
});

function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Staggered animation for skills
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skills = entry.target.querySelectorAll('.skill-item');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.classList.add('is-visible');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Staggered animation for projects
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projects = entry.target.querySelectorAll('.project-row');
                projects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('is-visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe skills and projects sections for staggered animations
    skillsObserver.observe(document.querySelector('.skills-grid'));
    projectsObserver.observe(document.querySelector('.projects-list'));
}