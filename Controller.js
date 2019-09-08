MD_F.fireflyJar = [];
MD_F.screen = MD_F.getScreen('screen');
MD_F.getColor = () => {
    const num = (Math.random() * 5) | 0;
    switch (num) {
        case 1:
            return 'red';
        case 2:
            return 'green';
        case 3:
            return 'blue';
        case 4:
            return 'brown';
        default:
            return 'black';
    }
};
MD_F.add = () => {
    const firefly = MD_F.getFirefly(MD_F.screen);
    firefly.bodyColor = MD_F.getColor();
    MD_F.fireflyJar.push(firefly);
    MD_F.showInfo();
};
MD_F.del = () => {
    if (MD_F.fireflyJar.length > 1) {
        MD_F.fireflyJar.pop();
    }
    MD_F.showInfo();
};
MD_F.showInfo = () => {
    cn_t.innerHTML = MD_F.fireflyJar.length;
    ci_r.innerHTML = MD_F.fireflyJar.length * MD_F.fireflyJar[0].body.length;
};
MD_F.start = () => {
    const screen = MD_F.screen;
    let animate = null;
    let fireflyJar = MD_F.fireflyJar;
    const firstFirefly = MD_F.getFirefly(screen);
    firstFirefly.bodyColor = MD_F.getColor();
    firstFirefly.headColor = MD_F.getColor();
    fireflyJar.push(firstFirefly);
    const maxX = (screen.width - firstFirefly.radius * 1.2) | 0;
    const maxY = (screen.height - firstFirefly.radius * 1.2) | 0;
    const extraSpeed = (firstFirefly.radius / 3) | 0;
    const collisionRadius = (firstFirefly.radius * 2.4) | 0;
    let fps = 0;
    MD_F.showInfo();

    const itemGenerator = setInterval(() => {
        MD_F.add();
    }, 1000);

    setTimeout(() => {
        clearInterval(itemGenerator);
    }, 5000);

    function draw(firefly) {
        if (firefly.head.x >= maxX) {
            randomYDirection(firefly, 4);
            firefly.stepLeft();
        }
        if (firefly.head.y >= maxY) {
            randomXDirection(firefly, 4);
            firefly.stepTop();
        }
        if (firefly.head.x <= firefly.radius) {
            randomYDirection(firefly, 4);
            firefly.stepRight();
        }
        if (firefly.head.y <= firefly.radius) {
            randomXDirection(firefly, 4);
            firefly.stepBottom();
        }

        function randomYDirection(firefly, count) {
            const num = (Math.random() * count) | 0;
            switch (num) {
                case 1:
                    firefly.yDirectionClear();
                    break;
                case 2:
                    firefly.stepBottom();
                    break;
                case 3:
                    firefly.stepTop();
                    break;
            }

            if (firefly.xDirection === 0 && firefly.yDirection === 0) {
                firefly.stepTop();
            }
            randomSpeed(firefly, 7);
        }

        function randomXDirection(firefly, count) {
            const num = (Math.random() * count) | 0;
            switch (num) {
                case 1:
                    firefly.xDirectionClear();
                    break;
                case 2:
                    firefly.stepRight();
                    break;
                case 3:
                    firefly.stepLeft();
                    break;
            }

            if (firefly.xDirection === 0 && firefly.yDirection === 0) {
                firefly.stepRight();
            }
            randomSpeed(firefly, 7);
        }

        function randomSpeed(snake, count) {
            const rnd = (Math.random() * count) | 0;
            if (rnd > 1 && rnd < 11) {
                snake.speed = rnd;
            }
        }

        randomXDirection(firefly, 500);
        randomYDirection(firefly, 500);

        fireflyJar.forEach(other => {
            if (other !== firefly) {
                if ((other.head.x + collisionRadius) >= firefly.head.x &&
                    (other.head.x - collisionRadius) <= firefly.head.x &&
                    (other.head.y + collisionRadius) >= firefly.head.y &&
                    (other.head.y - collisionRadius) <= firefly.head.y) {

                    randomXDirection(firefly, 100);
                    randomYDirection(firefly, 100);
                    randomXDirection(other, 100);
                    randomYDirection(other, 100);

                    firefly.speed = other.speed = extraSpeed;
                }
            }
        });

        firefly.move();
        firefly.draw();
    }

    function allDraw() {
        screen.clear();
        fireflyJar.forEach(firefly => {
            draw(firefly)
        });
        fps++;
        animate = requestAnimationFrame(allDraw);
    }

    setInterval(() => {
        fp_s.innerHTML = fps;
        fps = 0;
    }, 1000);

    animate = requestAnimationFrame(allDraw);
};

MD_F.start();