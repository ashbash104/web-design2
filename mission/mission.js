const themeSelector = document.getElementById('theme-selector');

function changeTheme() {
    const currentTheme = themeSelector.value;
    const body = document.body;
    const logo = document.getElementById('logo');

    if (currentTheme === 'dark') {
        body.classList.add('dark');
        logo.src = 'byui-logo_white.png';
    } else {
        body.classList.remove('dark');
        logo.src = 'byui-logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
