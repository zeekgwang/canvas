const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

window.addEventListener('resize', function () {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
});

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Line {
    constructor(x, y, len) {
        this.x = x;
        this.y = y;
        this.velocity = 3;
        this.len = len;
    }

    draw = () => {
        c.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        c.fillStyle = 'rgba(255, 255, 255, 0.3)';

        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x+5, this.y - this.len);
        c.stroke();
        c.closePath();

        this.update();
    }

    update = () => {
        this.y += this.velocity;
        if(this.y >= cvs.height + this.len){
            this.y = Math.random() * this.len - this.len;
            this.x = Math.random() * cvs.width;
        }
    }
}

const lineArray = [];

for (let i = 0; i < 200; i++) {
    const start = { x: 0, y: 0 };
    const len = 30

    lineArray.push(
        new Line(
            start.x + Math.random() * cvs.width,
            start.y + (Math.random() * cvs.height - len * 2),
            len
        )
    );
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    lineArray.forEach(line => {
        line.draw();
    })
}

animate();
