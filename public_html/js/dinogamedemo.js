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
    yodaImg.onload = function () {

        var stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: $(window).width(),
            height: $(window).height()
        });

        var layer = new Konva.Layer();

// create our shape
        var circle = new Konva.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

        var rect = new Konva.Rect({
            x: 50,
            y: 50,
            width: 100,
            height: 50,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true});

        var yoda = new Konva.Image({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            image: yodaImg,
            draggable: true
        });

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
                r: circulo.getAttr('radius')};

//        console.log(c);

            $.each(pontos, function (i, p) {
                //Incrementa n se o ponto esta dentro do circulo
                // console.log(i+':'+p.x);
                n = (intoCirc(p, c)) ? ++n : n;
                //(TESTE)? TRUE : FALSE ;
            });

//        console.log(n);
            if (n >= np) {//se n > np o retangulo esta completamente dentro do circulo
//            console.log("Esta dentro do círculo!!");
//            console.log(retangulo.position());
                //alert("Está dentro do círculo!!");
                retangulo.fill('red');
                console.log(retangulo);
                retangulo.setStrokeWidth(10);
                retangulo.stroke('black');
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
            if (((p.x - c.x) ** 2 + (p.y - c.y) ** 2) < c.r ** 2) {
                return true;
            } else {
                return false;
            }
        }


// add the shape to the layer
        layer.add(circle);
        layer.add(rect);
        layer.add(yoda);

// add the layer to the stage
        stage.add(layer);
// draw the image
//    layer.draw();

    }
});