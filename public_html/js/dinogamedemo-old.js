/* 
 * Dino Game Demo 
 *  - Testando a matematica basica
 * Author: Gill Velleda Gonzales
 * 
 * Version: 0.1
 * 
 * Use: jQuery and Konva
 */

/* global Konva */
$(document).ready(function () {

    var yodaImg = new Image();
    yodaImg.src = 'img/yoda.png';
    var yoda = createImage(50,50,100,100,yodaImg,true)
    var brmap = new Image();
    brmap.src = 'img/brmap.svg';
    
    var stage = new Konva.Stage({
        container: 'container', // id of container <div>
        width: $(window).width(),
        height: $(window).height()
    });

    var layer = new Konva.Layer();

// create our shape

    
    function createCircle(x,y,rad, fill, stroke){
        var circle = new Konva.Circle({
        x: x,
        y: y,
        radius: rad,
        fill: fill,
        stroke: stroke,
        strokeWidth: 4,
        certo:1     
        });
        return circle;
    }
    var circle = createCircle(stage.getWidth() / 2, stage.getHeight() / 2, 100, "red", "black");

    var rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true});

    function createImage(x,y,w,h,img,drag){
        var imagem = new Konva.Image({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        image: img,
        draggable: true
        });
        return imagem;
}

    var mapa = new Konva.Image({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        image: brmap,
        draggable: false
    });

    var load = 0;
    var total = 2;

    var loop = setInterval(isLoaded, 1000);
    loadAssets();

    function loadAssets() {
        brmap.onload = function () {
            load++;
        };
        yodaImg.onload = function () {
            load++;
        };
    }

    function isLoaded() {
        if (load === total) {
            clearInterval(isLoaded);            
            console.log('Pronto');
            init();
        } else {
            console.log('Carregando...');
        }
    }
    
    rect.on('dragend dragmove', function () {
        estadentro(this, circle);
    });

    yoda.on('dragend dragmove', function () {
        estadentro(this, circle);
    });


    /**
     * @description Testa se um retângulo esta completamente dentro de uma circunferencia
     * @param retangulo = retangulo Konva.Rect();
     * @param circulo = circulo Konva.Circle();
     */
    function estadentro(retangulo, circulo) {
        var n = 0;//contador de pontos dentro da circunferencia
        var np = 3;//todos os pontos dentro do circulo
        var atr = retangulo.getAttrs();
//        console.log(atr);
        var pontos = [retangulo.position(),
            {x: atr.x + atr.width, y: atr.y},
            {x: atr.x + atr.width, y: atr.y + atr.height},
            {x: atr.x, y: atr.y + atr.height},
            {x: atr.x + atr.width / 2, y: atr.y + atr.height / 2}];

        var c = {x: circulo.getAttr('x'),
            y: circulo.getAttr('y'),
            r: circulo.getAttr('radius'),
            certo: circulo.getAttr('certo') };
        

//        console.log(c);

        $.each(pontos, function (i, p) {
            //Incrementa n se o ponto esta dentro do circulo
            // console.log(i+':'+p.x);
            n = (intoCirc(p, c)) ? ++n : n;
            //(TESTE)? TRUE : FALSE ;
        });

        console.log(n);
        if (n >= np) {//se n > np o retangulo esta completamente dentro do circulo
//            console.log("Esta dentro do círculo!!");
//            console.log(retangulo.position());
            //alert("Está dentro do círculo!!");
            retangulo.fill('red');
//                console.log(retangulo);
            retangulo.setStrokeWidth(10);
            retangulo.stroke('black');
                        if(c.certo==1){
            console.log("circulo certo");
        }else{
            console.log('circulo errado');
        }
        } else {
            retangulo.fill('blue');
            retangulo.stroke('');
        }
        //
        //console.log(obj.attrs);
        layer.draw();

    }
    /**
     * @description Calcula se um ponto (p) esta dentro de uma circunferencia (c)
     * @param p = Ponto com coordenadas x e y {x,y}
     * @param c = Circunferência com coordenadas x, y e o raio {x,y,r}
     */
    function intoCirc(p, c) {
        //(Cx – Px)^2 + (Cy – Py)^2 < Raio^2
        if (((p.x - c.x) ** 2 + (p.y - c.y) ** 2) <= c.r ** 2) {
            return true;
        } else {
            return false;
        }
    }

    function init() {
        // add the shape to the layer
        layer.add(mapa);
        layer.add(circle);
        layer.add(rect);
        layer.add(yoda);

// add the layer to the stage
        stage.add(layer);
// draw the image
//    layer.draw();
    }


});
