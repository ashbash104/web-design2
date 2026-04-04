// ════════════════════════════════════════════
//  DATA — Projects as objects inside an array
// ════════════════════════════════════════════
const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    description: "This portfolio! Built with semantic HTML, CSS custom properties, and vanilla JavaScript. Includes dynamic filtering, scroll animations, and a responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    year: 2025,
    status: "live",
    github: "https://github.com"
  },
  {
    id: 2,
    title: "Offtrack Storage CRM",
    description: "A responsive weather app that fetches live data from a public API. Displays current conditions, a 5-day forecast, and location search.",
    tags: ["JavaScript", "CSS", "API"],
    year: 2025,
    status: "live",
    github: "https://github.com/ashbash104/offtrack-storage-crm"
  },
  {
    id: 3,
    title: "Artillery Simulator",
    description: "Search and save recipes using the Spoonacular API. Includes dietary filters, ingredient-based search, and a favourites list stored in localStorage.",
    tags: ["JavaScript", "HTML", "CSS"],
    year: 2024,
    status: "case",
    github: "https://github.com/ashbash104/ArtilleryFinalLab"
  },
  {
    id: 4,
    title: "STL Implementation",
    description: "A fully accessible task manager with drag-and-drop reordering, priority tagging, and persistent state via localStorage.",
    tags: ["JavaScript", "CSS", "HTML"],
    year: 2024,
    status: "live",
    github: "https://github.com/ashbash104/STL_Implementation"
  },
  {
    id: 5,
    title: "Quiz Game",
    description: "A timed trivia quiz pulling from the Open Trivia API. Tracks score, shows answer explanations, and stores a high-score leaderboard.",
    tags: ["JavaScript", "API", "CSS"],
    year: 2024,
    status: "case",
    github: "https://github.com"
  },
  {
    id: 6,
    title: "Blog CMS",
    description: "A lightweight content management interface. Supports markdown authoring, image uploads, and a tag-based post filter. Currently in active development.",
    tags: ["JavaScript", "HTML", "CSS"],
    year: 2025,
    status: "wip",
    github: null
  }
];

// Skills array of objects
const skills = [
  { name: "Python", level: 80 },
  { name: "C++", level: 80 },
  { name: "SQL", level: 80 },
  { name: "Git & Version Control", level: 80 },
  { name: "AI/Machine Learning", level: 70 },
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
    const githubBtn = project.github
      ? `<a href="${project.github}" target="_blank" class="card-github" onclick="event.stopPropagation()">View on GitHub ↗</a>`
      : `<span class="card-github card-github--disabled">Repo coming soon</span>`;

    return `
      <div class="project-card" style="animation-delay:${index * 60}ms" data-id="${project.id}">
        <div class="card-header">
          <span class="card-year">${project.year}</span>
          <span class="card-status ${cssClass}">${label}</span>
        </div>
        <h2 class="card-title">${project.title}</h2>
        <p class="card-desc">${project.description}</p>
        <div class="card-tags">${tagHTML}</div>
        <div class="card-footer">${githubBtn}</div>
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

  // Conditional branching — WIP projects get a different message
  if (project.status === "wip") {
    alert(`"${project.title}" is still in progress — check back soon!`);
  } else if (project.github) {
    window.open(project.github, "_blank");
  } else {
    alert(`"${project.title}" — case study coming soon.`);
  }
}

function resetFilter() {
  activeFilter = "All";
  renderFilters();
  renderProjects();
}

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