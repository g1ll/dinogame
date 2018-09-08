$().ready(function () {

    var $canvas = $('canvas');
    console.log($canvas);
    var ctx = $canvas[0].getContext('2d');
    console.log(ctx);

    var xr = 20;
    var yr = 20;
    var key = 0;
    var speed = 10;
    var gameover = false;

    var r1 = new Rect(xr, yr, 50, 50, 0.5, 'red');
    var r2 = new Rect(xr + 50, yr, 50, 50, 10, '#0f0');
    var r3 = new Rect(xr + 100, yr, 50, 50, 10, 'rgb(0,0,255)');
    var r4 = new Rect(
            Math.floor(50 + Math.random() * ($canvas[0].width - 2 * 50))
            , yr, 50, 50, 10, 'rgb(' + Math.floor(Math.random() * 255) +
            ',' + Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ')');
    var r5 = new Rect(xr + 100, yr + 100, 50, 50, 10, '#000000');

    var rc = 20;
    var xc = Math.floor(rc + Math.random() * ($canvas[0].width - 2 * rc));
    var yc = Math.floor(rc + Math.random() * ($canvas[0].height - 2 * rc));
    console.log(xc + " | " + yc);

    var load = 0;
    var total = 1;

    var theme = new Audio();
    var loop = setInterval(isLoaded, 1000);

    loadAssets();

    function isLoaded() {
        console.log(load);
        if (load === total) {
            clearInterval(loop);
            start();
        } else {
            ctx.fillStyle = 'black';
            ctx.font = '30px sans-serif';
            var msg = 'Carregando ...';
            var w = ctx.measureText(msg).width;
            ctx.fillText(msg, $canvas[0].width / 2 - w / 2,
                    $canvas[0].height / 2);
        }
    }

    function start() {
        controles();
        theme.play();
        drawScreen();
    }

    function drawScreen() {

        //moveRect();
        r1.move(key);

        //background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 500, 300);


        r1.draw(ctx);
        r2.draw(ctx);
        r3.draw(ctx);
        r4.draw(ctx);
        r5.draw(ctx);
        //retangulo
//        ctx.fillStyle = 'blue';
//        ctx.fillRect(xr, yr, 50, 50);
//        ctx.strokeStyle = 'black';
//        ctx.strokeRect(xr, yr, 50, 50);
        //xr+=10;
        //if(xr>500)
        //xr = 0;

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.arc(xc,
                yc,
                rc,
                (Math.PI / 180) * 0,
                (Math.PI / 180) * 360,
                false
                );
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        //contorno
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 5, 490, 290);

        if (colide(r1.x, r1.y, xc, yc)) {
            gameover = true;
        }
        if (!gameover)
            window.requestAnimationFrame(drawScreen);
        else
            alert('GAME OVER');
    }


    function moveRect() {
        if (key === 38) {
            yr -= speed;
        } else if (key === 40) {
            yr += speed;
        }
    }


    function controles() {
        $(document).keydown(function (e) {
            console.log(e.which);
            key = e.which;

        });

        $(document).keyup(function (e) {
            key = 0;
        });
        
        $('canvas').mousedown(function (e){
           // alert('teste');
            console.log("DOWN:"+e.clientX+" "+e.clientY);
        });
        $('canvas').mouseup(function (e){
           // alert('teste');
            console.log("UP:"+e.clientX+" "+e.clientY);
        });
    }


    function colide(x1, y1, x2, y2) {
        console.log(x1 + '=' + x2 + ' | ' + y1 + '=' + y2);
        if (x1 === x2 && y1 === y2) {
            return true;
        } else {
            return false;
        }
    }


    function loadAssets() {
        //theme.src = 'sounds/theme.mp3';
        theme.src = 'http://gill.esy.es/Jogos/JS/snake_mario/sounds/sounds1.mp3';
        theme.load();
        theme.oncanplaythrough = function () {
            console.log(this.src);
            this.volume = 0.5;
            if (typeof this.loop === 'boolean') {
                theme.loop = true;
            } else {
                this.addEventListener('ended', function () {
                    this.currentTime = 0;
                }, false);
            }
            load++;
        };

    }
});

function Rect(x, y, w, h, s, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.speed = s;

    this.move = function (key) {
        if (key === 38) {
            this.y -= this.speed;
        } else if (key === 40) {
            this.y += this.speed;
        } else if (key === 37) {
            this.x -= this.speed;
        } else if (key === 39) {
            this.x += this.speed;
        }
    };

    this.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    };
}