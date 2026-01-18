//_________________________________________________________
// * Mission Statement Page JavaScript
// * Author: Ashlee Hart
// * Javascript for the Light/Dark theme toggle on the 
//   BYUI Mission Statement page.
//__________________________________________________________
const themeSelector = document.getElementById('theme-selector');

function applyTheme(theme) {
    const body = document.body;
    const logo = document.getElementById('logo');

    if (theme === 'dark') {
        body.classList.add('dark');
        body.classList.remove('light');
        logo.src = 'byui-logo_white.png';
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp';
    }
}

function changeTheme() {
    if (themeSelector.value === '') return;

    applyTheme(themeSelector.value);
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme('light');

    themeSelector.addEventListener('change', changeTheme);
});

