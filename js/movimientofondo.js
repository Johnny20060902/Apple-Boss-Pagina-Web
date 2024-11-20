const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

let particlesArray;

function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 10000; // Ajusta la densidad
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5; // Tamaño reducido
        this.speedX = (Math.random() * 0.5 - 0.25); // Velocidad más lenta
        this.speedY = (Math.random() * 0.5 - 0.25); // Velocidad más lenta
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote en los bordes
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 255, 102, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Si las partículas están cerca, conecta hasta 3
            if (distance < 80) {
                ctx.strokeStyle = `rgba(0, 255, 102, ${1 - distance / 80})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();

                // Adicional: Dibuja un tercer círculo como "salpicadura"
                if (distance < 50) {
                    ctx.beginPath();
                    ctx.arc(
                        (particlesArray[a].x + particlesArray[b].x) / 2,
                        (particlesArray[a].y + particlesArray[b].y) / 2,
                        5,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = `rgba(0, 255, 102, ${1 - distance / 80})`;
                    ctx.fill();
                }
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    connectParticles(); // Llama a la función para conectar partículas
    requestAnimationFrame(animate);
}

// Inicializar partículas y animación
initParticles();
animate();
