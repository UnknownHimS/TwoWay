const box1 = document.getElementById('box1');
const rectangles = [
    document.getElementById('box3'),
    document.getElementById('box4'),
    document.getElementById('box5'),
    document.getElementById('box6'),
    document.getElementById('box7'),
    document.getElementById('box9'),
    document.getElementById('box10'),
    document.getElementById('box11'),
    document.getElementById('box12'),
    document.getElementById('box13'),
    document.getElementById('box14'),
];
const box8 = document.getElementById('box8');
let box14 = document.getElementById('box14');
const result = document.getElementById('result');

let posX = 50;  // Initial position of box1 (in px)
let posY = 210;  // Initial position of box1 (in px)
let step = 10;  // Movement step in px

// Randomly assign positions for box8 and box14 as the goal
let goal = 0;
let random = Math.floor(Math.random() * 2) + 1;

if (random === 1) {
    box14.style.top = '50px';
    box14.style.left = '810px';
    goal = 2;
} else if (random === 2) {
    box14.style.top = '570px';
    box14.style.left = '545px';
    goal = 1;
}

if (goal === 1) {
    box8.style.top = '50px';
    box8.style.left = '810px';
} else if (goal === 2) {
    box8.style.top = '570px';
    box8.style.left = '545px';
}

// Function to move box1 and detect collisions
function myRectangle(event) {
    // Move box1 based on the arrow keys
    switch (event.key) {
        case 'ArrowUp':
            posY -= step;
            break;
        case 'ArrowDown':
            posY += step;
            break;
        case 'ArrowLeft':
            posX -= step;
            break;
        case 'ArrowRight':
            posX += step;
            break;
    }

    // Update the position of box1
    box1.style.top = posY + 'px';
    box1.style.left = posX + 'px';

    // Get the position and size of box1 and box8
    const box1Rect = box1.getBoundingClientRect();
    const box8Rect = box8.getBoundingClientRect();

    // Check for collision with other rectangles (box3 to box7)
    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];
        const rectRect = rect.getBoundingClientRect();

        // Collision detection logic with other rectangles
        if (box1Rect.left < rectRect.right &&
            box1Rect.right > rectRect.left &&
            box1Rect.top < rectRect.bottom &&
            box1Rect.bottom > rectRect.top) {

            // Display collision message and reload the page
            result.textContent = `Collision detected!`;
            setTimeout(() => location.reload(), 500); // Reload after a short delay
            return; // Stop further checks after collision
        }
    }

    // Check if box1 collides with box8 (win condition)
    if (box1Rect.left < box8Rect.right &&
        box1Rect.right > box8Rect.left &&
        box1Rect.top < box8Rect.bottom &&
        box1Rect.bottom > box8Rect.top) {

        // Display win message
        result.textContent = `You Win! 🏆`;

        // Reload the page after a short delay to display the win message
        setTimeout(() => location.reload(), 1000);
        return; // Stop further checks after win
    }

    // If no collision or win detected, clear the result message
    result.textContent = '';
}

// Listen for keydown events to move box1
window.addEventListener('keydown', myRectangle);
