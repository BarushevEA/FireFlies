MD_F.getFirefly = (screen) => {
    class Firefly {
        constructor(screen) {
            this.screen = screen;
            this.head = {x: 0, y: 0};
            this.bodyColor = 'green';
            this.radius = 30;
            this.doubleRadius = this.radius * 2;
            this.speed = 2;
            this.body = [];
            this.radiusArr = [];
            this.xDirection = 0;
            this.yDirection = 0;
            this.countSegments = this.radius;
            this.point = {min: {x: 0, y: 0}, max: {x: 0, y: 0}};
            this.canvasSize = {width: 0, height: 0};
            this.init();
        }

        init() {
            this.body = [];
            this.xDirectionClear();
            this.yDirectionClear();
            this.stepBottom();
            this.stepRight();
            this.addSegment();

            this.yDirectionClear();
            for (let i = 0; i < this.countSegments; i++) {
                this.move();
                this.addSegment();
                this.radiusArr.push(((this.countSegments - i) / this.radius * this.radius / 1.5) | 0);
            }
        };

        static createSegment(x, y) {
            return {x: x, y: y};
        }

        addSegment() {
            if (this.body.length === 0) {
                this.body.push(Firefly.createSegment(this.radius, this.radius));
                this.head.x = this.body[0].x;
                this.head.y = this.body[0].y;
            } else {
                const end = this.body[this.body.length - 1];
                this.body.push(Firefly.createSegment(end.x, end.y));
            }
        };

        stepRight() {
            this.xDirection = this.speed
        }

        stepLeft() {
            this.xDirection = -this.speed
        }

        stepTop() {
            this.yDirection = -this.speed
        }

        stepBottom() {
            this.yDirection = this.speed
        }

        move() {
            for (let i = this.body.length - 1; i > -1; i--) {
                const segment = this.body[i];
                if (i === 0) {
                    segment.x += this.xDirection;
                    segment.y += this.yDirection;
                } else {
                    segment.x = this.body[i - 1].x;
                    segment.y = this.body[i - 1].y;
                }
            }
            this.head.x = this.body[0].x;
            this.head.y = this.body[0].y;
        }

        xDirectionClear() {
            this.xDirection = 0
        }

        yDirectionClear() {
            this.yDirection = 0
        }

        draw() {
            this.getCanvasSize();
            this.canvasSize.height += this.doubleRadius;
            this.canvasSize.width += this.doubleRadius;
            this.screen.startDrawing(this.canvasSize);
            this.minNumber();
            this.drawHead();
            this.drawBody();
            this.screen.finishDrawing(this.point.min.x - this.radius, this.point.min.y - this.radius);
        }

        drawBody() {
            this.screen.setColor(this.bodyColor);
            let x = 0;
            let y = 0;
            for (let i = this.body.length - 1; i > 0; i--) {
                x = this.body[i].x - this.point.min.x + this.radius;
                y = this.body[i].y - this.point.min.y + this.radius;
                this.screen.drawSegment(x, y, this.radiusArr[i]);
            }
        }

        drawHead() {
            const x = this.body[0].x - this.point.min.x + this.radius;
            const y = this.body[0].y - this.point.min.y + this.radius;
            this.screen.setColor(this.bodyColor, 0.7);
            this.screen.drawSegment(x, y, (this.radius * 0.5) | 0);
            this.screen.setColor(this.bodyColor, 0.3);
            this.screen.drawSegment(x, y, (this.radius * 0.6) | 0);
        }

        maxNumber() {
            let maxX = this.body[0].x;
            let maxY = this.body[0].y;
            this.body.forEach(item => {
                if (maxX < item.x) {
                    maxX = item.x;
                }
                if (maxY < item.y) {
                    maxY = item.y;
                }
            });

            this.point.max.x = maxX;
            this.point.max.y = maxY;
        }

        minNumber() {
            let minX = this.body[0].x;
            let minY = this.body[0].y;
            this.body.forEach(item => {
                if (minX > item.x) {
                    minX = item.x;
                }
                if (minY > item.y) {
                    minY = item.y;
                }
            });

            this.point.min.x = minX;
            this.point.min.y = minY;
        }

        getCanvasSize() {
            this.minNumber();
            this.maxNumber();
            this.canvasSize.width = Math.abs(this.point.min.x - this.point.max.x);
            this.canvasSize.height = Math.abs(this.point.min.y - this.point.max.y);
        }
    }

    return new Firefly(screen);
};