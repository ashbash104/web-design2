// ════════════════════════════════════════════
//  DATA — Projects as objects inside an array
// ════════════════════════════════════════════
const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    description: "Built with semantic HTML, CSS custom properties, and vanilla JS.",
    longDescription: "This portfolio! Built with semantic HTML, CSS custom properties, and vanilla JavaScript. Includes dynamic filtering, scroll animations, a sticky nav system, a contact form powered by EmailJS, and a fully responsive layout designed from scratch without any frameworks.",
    tags: ["HTML", "CSS", "JavaScript"],
    year: 2025,
    status: "live",
    github: "https://ashbash104.github.io/web-design2/portfolio/portfolio.html"
  },
  {
    id: 2,
    title: "Offtrack Storage CRM",
    description: "A CRM built for a storage business with live data and location search.",
    longDescription: "A responsive CRM application built for a real storage business. Fetches and displays live unit data, handles customer management, and includes location-based search. Built with TypeScript and custom CSS with a focus on usability and business logic implementation.",
    tags: ["TypeScript", "CSS", "API"],
    year: 2025,
    status: "live",
    github: "https://github.com/ashbash104/offtrack-storage-crm"
  },
  {
    id: 3,
    title: "Artillery Simulator",
    description: "A physics-based artillery simulator written in C++.",
    longDescription: "A physics-based artillery simulator implementing projectile motion, drag, and gravity calculations in C++. Demonstrates object-oriented design principles, mathematical modeling, and simulation logic. Built as a capstone lab for an advanced C++ course.",
    tags: ["C++"],
    year: 2024,
    status: "case",
    github: "https://github.com/ashbash104/ArtilleryFinalLab"
  },
  {
    id: 4,
    title: "STL Implementation",
    description: "A ground-up reimplementation of core C++ STL containers.",
    longDescription: "A ground-up reimplementation of core C++ Standard Template Library containers including vector, list, and map. Focuses on memory management, iterator design, and algorithmic efficiency. Built to deeply understand the internals of the STL.",
    tags: ["C++"],
    year: 2024,
    status: "live",
    github: "https://github.com/ashbash104/STL_Implementation"
  },
  {
    id: 5,
    title: "Recipe Blog",
    description: "A recipe blog with dynamic rendering and category filtering.",
    longDescription: "A recipe blog built with vanilla JavaScript, HTML, and CSS. Features dynamic card rendering from a data array, category-based filtering, and a clean readable layout. Demonstrates DOM manipulation, event handling, and responsive design without any frameworks.",
    tags: ["JavaScript", "HTML", "CSS"],
    year: 2024,
    status: "case",
    github: "https://ashbash104.github.io/web-design2/recipies/"
  },
  {
    id: 6,
    title: "Blog CMS",
    description: "A lightweight CMS with markdown authoring and tag filtering.",
    longDescription: "A lightweight content management interface currently in active development. Supports markdown authoring, image uploads, and a tag-based post filter. Designed to be self-hostable and easy to extend. Stack is vanilla JavaScript, HTML, and CSS.",
    tags: ["JavaScript", "HTML", "CSS"],
    year: 2025,
    status: "wip",
    github: null
  }
];

// Skills array of objects
const skills = [
  { name: "Python", level: 80 },
  { name: "C++", level: 65 },
  { name: "SQL", level: 80 },
  { name: "Git & Version Control", level: 80 },
  { name: "AI/Machine Learning", level: 65 },
  { name: "Prompt Engineering", level: 90 },
  { name: "Digital Logic Design", level: 70 },
  { name: "Software Lifecycle Management", level: 70 },
  { name: "Software Testing", level: 70 },
  { name: "OOP/DOP", level: 70 },
  { name: "Business Logic Implementation", level: 70 },
  { name: "Mathematics", level: 80 },
  { name: "Emotional Intelligence", level: 90 },
  { name: "Collaborative Problem Solving", level: 80 },
  { name: "Visual Communication", level: 70 },
  { name: "Adaptability", level: 90 }
];

// ════════════════════════════════════════
//  STATE
// ════════════════════════════════════════
let activeFilter = "All";

// ════════════════════════════════════════
//  UTILITY FUNCTIONS
// ════════════════════════════════════════

// Extract all unique tags using reduce
function getAllTags(projectList) {
  const allTags = projectList.reduce((acc, project) => {
    return acc.concat(project.tags);
  }, []);
  return ["All", ...new Set(allTags)];
}

// Return status label + CSS class — conditional branching
function getStatusInfo(status) {
  if (status === "live")  return { label: "Live",        cssClass: "status-live" };
  if (status === "wip")   return { label: "In Progress", cssClass: "status-wip" };
  if (status === "case")  return { label: "Case Study",  cssClass: "status-case" };
  return { label: "Unknown", cssClass: "" };
}

// Filter projects by active tag
function getFilteredProjects() {
  if (activeFilter === "All") return projects;
  return projects.filter(p => p.tags.includes(activeFilter));
}

// ════════════════════════════════════════
//  RENDER: STATS  (uses .filter + .reduce)
// ════════════════════════════════════════
function renderStats() {
  const liveCount = projects.filter(p => p.status === "live").length;
  const tagCount  = getAllTags(projects).length - 1; // exclude "All"
  const yearCount = projects.reduce((acc, p) => { acc.add(p.year); return acc; }, new Set()).size;

  // DOM interaction — select elements and modify their content
  document.getElementById("stat-total").textContent = projects.length;
  document.getElementById("stat-live").textContent  = liveCount;
  document.getElementById("stat-tags").textContent  = tagCount;
  document.getElementById("stat-years").textContent = yearCount + "+";
}

// ════════════════════════════════════════
//  RENDER: FILTER BUTTONS
// ════════════════════════════════════════
function renderFilters() {
  const container = document.getElementById("filter-tags");
  const tags = getAllTags(projects);

  // .map() array of tags → button HTML strings
  container.innerHTML = tags.map(tag => `
    <button class="tag-btn ${tag === activeFilter ? "active" : ""}" data-tag="${tag}">
      ${tag}
    </button>
  `).join("");

  // Listen for click events on each button
  container.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      activeFilter = this.dataset.tag;
      renderFilters();
      renderProjects();
    });
  });
}

// ════════════════════════════════════════
//  RENDER: Manage Sticky HEader Offset
// ════════════════════════════════════════
const nav = document.querySelector('.site-nav');
const setOffset = () => {
  document.documentElement.style.setProperty(
    '--nav-height', nav.offsetHeight + 'px'
  );
};
setOffset();
window.addEventListener('resize', setOffset);

// ════════════════════════════════════════
//  RENDER: PROJECT CARDS  (uses .map)
// ════════════════════════════════════════
function renderProjects() {
  const grid     = document.getElementById("project-grid");
  const filtered = getFilteredProjects();
  const counter  = document.getElementById("results-count");

  // Conditional — singular vs plural label
  const noun = filtered.length === 1 ? "project" : "projects";
  counter.innerHTML = `Showing <span>${filtered.length}</span> ${noun}`;

  // Conditional — show empty state when nothing matches
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">◻</div>
        <p>No projects tagged <strong>"${activeFilter}"</strong>.</p>
        <button onclick="resetFilter()">Clear filter</button>
      </div>`;
    return;
  }

  // .map() each project object → card HTML
  grid.innerHTML = filtered.map((project, index) => {
    const { label, cssClass } = getStatusInfo(project.status);
    const tagHTML = project.tags.map(t => `<span class="card-tag">${t}</span>`).join("");

    return `
      <div class="project-card" style="animation-delay:${index * 60}ms" data-id="${project.id}">
        <div class="card-header">
          <span class="card-year">${project.year}</span>
          <span class="card-status ${cssClass}">${label}</span>
        </div>
        <h2 class="card-title">${project.title}</h2>
        <p class="card-desc">${project.description}</p>
        <div class="card-tags">${tagHTML}</div>
        <div class="card-footer">
          <span class="card-read-more">Read more ↗</span>
        </div>
        <span class="card-arrow">↗</span>
      </div>`;
  }).join("");

  // Event listener on each card
  grid.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", function () {
      handleCardClick(parseInt(this.dataset.id));
    });
  });
}

// ════════════════════════════════════════
//  RENDER: SKILLS
// ════════════════════════════════════════
function renderSkills() {
  const list = document.getElementById("skill-list");
  // console.log("Skill list:", list);
  // console.log("Skills:", skills);

  list.innerHTML = skills.map(skill => `
    <li class="skill-item">
      <span>${skill.name}</span>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-level="${skill.level / 100}"></div>
      </div>
    </li>
  `).join("");

  // Animate bars when scrolled into view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
          bar.style.transform = `scaleX(${bar.dataset.level})`;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(list);
}

// ════════════════════════════════════════
//  EVENT HANDLERS
// ════════════════════════════════════════
function handleCardClick(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  openModal(project);
}

function resetFilter() {
  activeFilter = "All";
  renderFilters();
  renderProjects();
}

// ════════════════════════════════════════
//  MODAL
// ════════════════════════════════════════
function openModal(project) {
  const { label, cssClass } = getStatusInfo(project.status);
  const tagHTML = project.tags.map(t => `<span class="card-tag">${t}</span>`).join("");
  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" class="modal-github">View on GitHub ↗</a>`
    : `<span class="modal-github modal-github--disabled">Repo coming soon</span>`;

  document.getElementById("modal-year").textContent = project.year;
  document.getElementById("modal-status").textContent = label;
  document.getElementById("modal-status").className = `card-status ${cssClass}`;
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-desc").textContent = project.longDescription;
  document.getElementById("modal-tags").innerHTML = tagHTML;
  document.getElementById("modal-link").innerHTML = githubBtn;

  const overlay = document.getElementById("project-modal");
  overlay.classList.add("visible");
  document.body.classList.add("modal-open");
}

function closeModal() {
  document.getElementById("project-modal").classList.remove("visible");
  document.body.classList.remove("modal-open");
}

// Close on overlay click
document.getElementById("project-modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
function init() {
  renderStats();
  renderFilters();
  renderProjects();
  renderSkills();
}

init();