const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('./sons/Buld horn - buzina de Palhaço.mp3');

let isGameOver = false; 
const jump = () => {
    if (isGameOver) return; 

    mario.classList.add('jump');

    
    jumpSound.currentTime = 0;
    jumpSound.play().catch(error => console.log("Erro ao tocar som:", error));

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); 

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        isGameOver = true; 

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        
        jumpSound.pause();
        jumpSound.currentTime = 0;

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);
