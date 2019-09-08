MD_F.getScreen = (canvasId) => {
    class Screen {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext("2d", {alpha: false});
            this.height = this.canvas.height;
            this.width = this.canvas.width;
            this.tmpCanvas = document.createElement('canvas');
            this.tmpCtx = this.tmpCanvas.getContext('2d');
        }

        startDrawing(size) {
            this.tmpCanvas.width = size.width;
            this.tmpCanvas.height = size.height;
            this.tmpCanvas.width = this.tmpCanvas.width;
        }

        finishDrawing(x, y) {
            this.tmpCtx.closePath();
            this.ctx.drawImage(this.tmpCanvas, x, y);
        }

        setColor(color, opacity = 0.2) {
            switch (color) {
                case 'red':
                    this.tmpCtx.fillStyle = `rgba(250,0,0,${opacity})`;
                    this.tmpCtx.strokeStyle = `rgba(250,150,0,0.1)`;
                    break;
                case 'green':
                    this.tmpCtx.fillStyle = `rgba(0,250,0,${opacity})`;
                    this.tmpCtx.strokeStyle = `rgba(250,250,0,0.1)`;
                    break;
                case 'blue':
                    this.tmpCtx.fillStyle = `rgba(0,250,250,${opacity})`;
                    this.tmpCtx.strokeStyle = `rgba(250,250,250,0.1)`;
                    break;
                case 'brown':
                    this.tmpCtx.fillStyle = `rgba(0,50,250,${opacity})`;
                    this.tmpCtx.strokeStyle = `rgba(0,250,0,0.1)`;
                    break;
                default:
                    this.tmpCtx.fillStyle = `rgba(0,0,0,${opacity})`;
                    this.tmpCtx.strokeStyle = `rgba(50,50,250,0.1)`;
            }
            this.tmpCtx.lineWidth = 10;
        }

        drawSegment(x, y, radius) {
            this.tmpCtx.beginPath();
            this.tmpCtx.arc(x, y, radius, 0, 2 * Math.PI);
            this.tmpCtx.fill();
            this.tmpCtx.stroke();
        }

        clear() {
            this.canvas.width = this.canvas.width;
        }
    }

    return new Screen(canvasId);
};
