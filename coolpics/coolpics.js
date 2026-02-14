const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const galleryImages = document.querySelectorAll('.gallery img');

// Create modal elements
const modal = document.createElement('div');
modal.classList.add('modal');

const modalImg = document.createElement('img');
modalImg.classList.add('modal-content');

const closeBtn = document.createElement('span');
closeBtn.classList.add('close');
closeBtn.textContent = '✖';

modal.appendChild(closeBtn);
modal.appendChild(modalImg);
document.body.appendChild(modal);

// Open modal when image clicked
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = image.src;
    modalImg.alt = image.alt;
  });
});

// Close when X clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close when clicking outside image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
  }
});

