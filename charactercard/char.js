// Select Elements
const charLevel = document.querySelector('#level');
const charHealth = document.querySelector('#health');
const attackBtn = document.querySelector('#attacked');
const levelUpBtn = document.querySelector('#levelup');
const barbieClass = document.querySelector('#class');


// Character Object
const barbie = {
    level: 1,
    health: 100,
    class: "Just a Girl",

    attack() {
        if (this.health > 0) {
            this.health -= 20;

            if (this.health <= 0) {
                this.health = 0;
                updateDisplay();
                alert("Barbie down");
                return;
            }

            updateDisplay();
        } else {
            alert("Barbie is already down!");
        }
    },

    levelUp() {
        if (this.health > 0) {
            this.level += 1;
            updateDisplay();
        } else {
            alert("Barbie can't level up when she's down!");
        }
    }
};


// Update the screen
function updateDisplay() {
    charLevel.textContent = `Level: ${barbie.level}`;
    charHealth.textContent = `Health: ${barbie.health}`;
    barbieClass.textContent = `Class: ${barbie.class}`;
}


// Initialize Display
updateDisplay();


// Event Listeners
attackBtn.addEventListener('click', () => barbie.attack());
levelUpBtn.addEventListener('click', () => barbie.levelUp());