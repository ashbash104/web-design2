import { recipes } from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
            <p>${recipe.description}</p>
        `;

        recipeList.appendChild(recipeCard);
    });
});
