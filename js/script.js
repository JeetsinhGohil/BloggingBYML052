// js/script.js

// Sample Data
const sampleAssignments = [
    {
        id: '1',
        title: 'Introduction to HTML5 and Semantic Elements',
        author: 'John Doe',
        subject: 'Web Development',
        semester: 'Semester 3',
        category: 'Tutorial',
        tags: ['HTML', 'Web', 'Frontend'],
        description: 'A comprehensive guide on using semantic HTML5 elements to structure your web pages effectively.',
        content: '<p>HTML5 introduced many semantic elements such as <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;section&gt;</code>. These elements give meaning to the structure of web pages, making them more accessible and easier to understand for search engines.</p><p>In this assignment, we will build a basic web layout using only semantic elements.</p>',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-01T10:00:00.000Z',
        status: 'published'
    },
    {
        id: '2',
        title: 'Understanding Relational Databases (SQL)',
        author: 'Jane Smith',
        subject: 'Database Management',
        semester: 'Semester 4',
        category: 'Assignment',
        tags: ['SQL', 'Database', 'Backend'],
        description: 'An overview of relational databases, primary keys, foreign keys, and basic SQL queries.',
        content: '<p>Relational databases store data in tables. Each table represents an entity. We use SQL (Structured Query Language) to interact with these databases.</p><p>Key concepts include SELECT, INSERT, UPDATE, and DELETE statements, as well as JOINS to combine data from multiple tables.</p>',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-05T14:30:00.000Z',
        status: 'published'
    },
    {
        id: '3',
        title: 'OSI Model and Network Protocols',
        author: 'Mike Johnson',
        subject: 'Computer Networks',
        semester: 'Semester 5',
        category: 'Notes',
        tags: ['Networking', 'OSI', 'TCP/IP'],
        description: 'Detailed study notes covering the 7 layers of the OSI model and common protocols used at each layer.',
        content: '<p>The OSI model is a conceptual model that characterizes and standardizes the communication functions of a telecommunication or computing system. The layers are: Physical, Data Link, Network, Transport, Session, Presentation, and Application.</p>',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-10T09:15:00.000Z',
        status: 'published'
    },
    {
        id: '4',
        title: 'Process Scheduling Algorithms in OS',
        author: 'Alice Williams',
        subject: 'Operating Systems',
        semester: 'Semester 4',
        category: 'Assignment',
        tags: ['OS', 'Scheduling', 'Algorithms'],
        description: 'Comparison and implementation details of FCFS, SJF, Round Robin, and Priority scheduling algorithms.',
        content: '<p>Process scheduling is an essential part of a Multiprogramming operating system. Such operating systems allow more than one process to be loaded into the executable memory at a time and the loaded process shares the CPU using time multiplexing.</p>',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-12T16:45:00.000Z',
        status: 'published'
    },
    {
        id: '5',
        title: 'Agile vs Waterfall Methodology',
        author: 'David Brown',
        subject: 'Software Engineering',
        semester: 'Semester 6',
        category: 'Notes',
        tags: ['Agile', 'SDLC', 'Project Management'],
        description: 'A critical analysis of the two most popular software development life cycle models.',
        content: '<p>Waterfall is a linear approach to software development, whereas Agile is an iterative, team-based approach to development. This assignment highlights the pros and cons of both methodologies depending on the project requirements.</p>',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-15T11:20:00.000Z',
        status: 'published'
    },
    {
        id: '6',
        title: 'Binary Search Trees (BST)',
        author: 'Sarah Davis',
        subject: 'Data Structures',
        semester: 'Semester 3',
        category: 'Tutorial',
        tags: ['Trees', 'Algorithms', 'C++'],
        description: 'Learn how to implement insertion, deletion, and traversal operations in a Binary Search Tree.',
        content: '<p>A Binary Search Tree is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node\'s key. The right subtree of a node contains only nodes with keys greater than the node\'s key.</p>',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-18T13:00:00.000Z',
        status: 'published'
    }
];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupMobileMenu();
});

function initApp() {
    // Check if assignments exist in localStorage
    if (!localStorage.getItem('campus_notes_assignments')) {
        localStorage.setItem('campus_notes_assignments', JSON.stringify(sampleAssignments));
    }
    
    // Route handler based on current page
    const currentPath = window.location.pathname;
    
    if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        initHomePage();
    } else if (currentPath.endsWith('assignments.html')) {
        initAssignmentsPage();
    } else if (currentPath.endsWith('create.html')) {
        initCreatePage();
    } else if (currentPath.endsWith('post.html')) {
        initPostPage();
    } else if (currentPath.endsWith('dashboard.html')) {
        initDashboardPage();
    }
}

// Data Helpers
function getAssignments() {
    return JSON.parse(localStorage.getItem('campus_notes_assignments')) || [];
}

function saveAssignments(assignments) {
    localStorage.setItem('campus_notes_assignments', JSON.stringify(assignments));
}

function getAssignmentById(id) {
    const assignments = getAssignments();
    return assignments.find(a => a.id === id);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// UI Helpers
function createAssignmentCard(assignment) {
    const date = new Date(assignment.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
    
    const tagsHtml = assignment.tags ? assignment.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
    
    return `
        <div class="card">
            <img src="${assignment.image || 'https://via.placeholder.com/800x400?text=No+Image'}" alt="${assignment.title}" class="card-img">
            <div class="card-body">
                <div class="card-meta">
                    <span class="card-badge">${assignment.subject}</span>
                    <span>${date}</span>
                </div>
                <h3 class="card-title">${assignment.title}</h3>
                <p class="card-desc">${assignment.description}</p>
                <div class="tag-list">
                    ${tagsHtml}
                </div>
                <div class="card-footer">
                    <span class="card-author"><i class="fas fa-user-circle"></i> ${assignment.author}</span>
                    <a href="post.html?id=${assignment.id}" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.9rem;">Read More</a>
                </div>
            </div>
        </div>
    `;
}

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Page Specific Initializers

function initHomePage() {
    const assignments = getAssignments().filter(a => a.status === 'published');
    
    // Sort by date newest first
    assignments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const featuredContainer = document.getElementById('featured-assignments');
    const latestContainer = document.getElementById('latest-assignments');
    
    if (featuredContainer && latestContainer) {
        if (assignments.length > 0) {
            // Take top 3 for featured
            featuredContainer.innerHTML = assignments.slice(0, 3).map(createAssignmentCard).join('');
            // Take next 3 for latest
            latestContainer.innerHTML = assignments.slice(3, 6).map(createAssignmentCard).join('');
        } else {
            const emptyHtml = `<div class="empty-state">
                <p>No assignments published yet.</p>
            </div>`;
            featuredContainer.innerHTML = emptyHtml;
            latestContainer.innerHTML = emptyHtml;
        }
    }
}

function initAssignmentsPage() {
    const grid = document.getElementById('assignments-grid');
    const searchInput = document.getElementById('search-input');
    const subjectFilter = document.getElementById('subject-filter');
    const semesterFilter = document.getElementById('semester-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (!grid) return;

    let assignments = getAssignments().filter(a => a.status === 'published');
    
    function renderAssignments() {
        let filtered = [...assignments];
        
        // Search
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(a => 
                a.title.toLowerCase().includes(searchTerm) || 
                a.author.toLowerCase().includes(searchTerm) ||
                (a.tags && a.tags.some(t => t.toLowerCase().includes(searchTerm)))
            );
        }
        
        // Subject Filter
        const subject = subjectFilter.value;
        if (subject) {
            filtered = filtered.filter(a => a.subject === subject);
        }
        
        // Semester Filter
        const semester = semesterFilter.value;
        if (semester) {
            filtered = filtered.filter(a => a.semester === semester);
        }
        
        // Sort
        const sort = sortFilter.value;
        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sort === 'newest' ? dateB - dateA : dateA - dateB;
        });
        
        if (filtered.length > 0) {
            grid.innerHTML = filtered.map(createAssignmentCard).join('');
        } else {
            grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search"></i>
                <h3>No assignments found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>`;
        }
    }
    
    // Event listeners
    if (searchInput) searchInput.addEventListener('input', renderAssignments);
    if (subjectFilter) subjectFilter.addEventListener('change', renderAssignments);
    if (semesterFilter) semesterFilter.addEventListener('change', renderAssignments);
    if (sortFilter) sortFilter.addEventListener('change', renderAssignments);
    
    // Initial render
    renderAssignments();
}

function initCreatePage() {
    const form = document.getElementById('assignment-form');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    
    if (!form) return;
    
    let currentImageBase64 = '';
    
    // Handle Edit Mode
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
        document.getElementById('page-title').textContent = 'Edit Assignment';
        const assignment = getAssignmentById(editId);
        if (assignment) {
            document.getElementById('title').value = assignment.title;
            document.getElementById('author').value = assignment.author;
            document.getElementById('subject').value = assignment.subject;
            document.getElementById('semester').value = assignment.semester;
            document.getElementById('category').value = assignment.category;
            document.getElementById('tags').value = assignment.tags ? assignment.tags.join(', ') : '';
            document.getElementById('description').value = assignment.description;
            document.getElementById('content').value = assignment.content;
            
            if (assignment.image) {
                currentImageBase64 = assignment.image;
                imagePreview.src = currentImageBase64;
                imagePreview.style.display = 'block';
                previewContainer.querySelector('span').style.display = 'none';
            }
        }
    }
    
    // Image Upload Preview
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                currentImageBase64 = e.target.result;
                imagePreview.src = currentImageBase64;
                imagePreview.style.display = 'block';
                previewContainer.querySelector('span').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validation
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('content').value.trim();
        
        if (!title || !author || !content) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        const tags = document.getElementById('tags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t);
            
        const status = e.submitter.value; // 'published' or 'draft'
        
        const assignmentData = {
            id: editId || generateId(),
            title: title,
            author: author,
            subject: document.getElementById('subject').value,
            semester: document.getElementById('semester').value,
            category: document.getElementById('category').value,
            tags: tags,
            description: document.getElementById('description').value,
            content: content,
            image: currentImageBase64,
            date: editId ? getAssignmentById(editId).date : new Date().toISOString(),
            status: status
        };
        
        const assignments = getAssignments();
        
        if (editId) {
            const index = assignments.findIndex(a => a.id === editId);
            if (index !== -1) {
                assignments[index] = assignmentData;
            }
        } else {
            assignments.push(assignmentData);
        }
        
        saveAssignments(assignments);
        
        showToast(`Assignment ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

function initPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        document.getElementById('post-container').innerHTML = '<div class="empty-state"><h3>Assignment not found</h3><a href="assignments.html" class="btn btn-primary mt-3">Back to Assignments</a></div>';
        return;
    }
    
    const assignment = getAssignmentById(id);
    
    if (!assignment) {
        document.getElementById('post-container').innerHTML = '<div class="empty-state"><h3>Assignment not found</h3><a href="assignments.html" class="btn btn-primary mt-3">Back to Assignments</a></div>';
        return;
    }
    
    // Update Title
    document.title = `${assignment.title} - Campus Notes`;
    
    // Render Post
    const date = new Date(assignment.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    
    const tagsHtml = assignment.tags ? assignment.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
    
    const postHtml = `
        <div class="post-header">
            <div class="post-meta-top">
                <span><i class="fas fa-folder"></i> ${assignment.subject}</span>
                <span><i class="fas fa-calendar"></i> ${date}</span>
                <span><i class="fas fa-graduation-cap"></i> ${assignment.semester}</span>
            </div>
            <h1 class="post-title">${assignment.title}</h1>
            <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-light);">
                <i class="fas fa-user-circle" style="font-size: 1.5rem; color: var(--text-dark);"></i> 
                <strong>${assignment.author}</strong>
            </div>
            ${tagsHtml ? `<div class="tag-list" style="margin-bottom: 2rem;">${tagsHtml}</div>` : ''}
        </div>
        
        ${assignment.image ? `<img src="${assignment.image}" alt="${assignment.title}" class="post-hero-img">` : ''}
        
        <div class="post-content">
            ${assignment.content}
        </div>
    `;
    
    document.getElementById('post-content-container').innerHTML = postHtml;
    
    // Related Assignments (Same subject, excluding current)
    const assignments = getAssignments().filter(a => a.status === 'published' && a.subject === assignment.subject && a.id !== id);
    const relatedContainer = document.getElementById('related-assignments');
    
    if (relatedContainer) {
        if (assignments.length > 0) {
            relatedContainer.innerHTML = assignments.slice(0, 3).map(createAssignmentCard).join('');
        } else {
            relatedContainer.innerHTML = '<p class="text-light">No related assignments found.</p>';
        }
    }
}

function initDashboardPage() {
    const assignments = getAssignments();
    
    // Stats
    const totalPublished = assignments.filter(a => a.status === 'published').length;
    const totalDrafts = assignments.filter(a => a.status === 'draft').length;
    
    document.getElementById('stat-total').textContent = assignments.length;
    document.getElementById('stat-published').textContent = totalPublished;
    document.getElementById('stat-drafts').textContent = totalDrafts;
    
    const tableBody = document.getElementById('dashboard-tbody');
    const searchInput = document.getElementById('dash-search');
    
    if (!tableBody) return;
    
    // Event delegation for table buttons
    tableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        
        const id = target.dataset.id;
        
        if (target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this assignment?')) {
                const newAssignments = assignments.filter(a => a.id !== id);
                saveAssignments(newAssignments);
                showToast('Assignment deleted successfully.');
                setTimeout(() => window.location.reload(), 1000);
            }
        } else if (target.classList.contains('edit-btn')) {
            window.location.href = `create.html?edit=${id}`;
        } else if (target.classList.contains('view-btn')) {
            window.location.href = `post.html?id=${id}`;
        }
    });
    
    function renderTable() {
        let filtered = [...assignments];
        
        // Sort newest first
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (searchInput && searchInput.value) {
            const term = searchInput.value.toLowerCase();
            filtered = filtered.filter(a => a.title.toLowerCase().includes(term));
        }
        
        if (filtered.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding: 2rem;">No assignments found.</td></tr>`;
            return;
        }
        
        tableBody.innerHTML = filtered.map(a => {
            const date = new Date(a.date).toLocaleDateString();
            const statusClass = a.status === 'published' ? 'status-published' : 'status-draft';
            
            return `
                <tr>
                    <td><strong>${a.title}</strong><br><span style="font-size:0.8rem; color:var(--text-light)">${a.subject}</span></td>
                    <td>${a.author}</td>
                    <td>${date}</td>
                    <td><span class="status-badge ${statusClass}">${a.status}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="action-btn view-btn" data-id="${a.id}" title="View"><i class="fas fa-eye"></i></button>
                            <button class="action-btn edit-btn" data-id="${a.id}" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete-btn" data-id="${a.id}" title="Delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    if (searchInput) searchInput.addEventListener('input', renderTable);
    
    renderTable();
}
