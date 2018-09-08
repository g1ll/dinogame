/* 
 * Dino Game Demo 
 *  - Testando a matematica basica
 * Authors: 
 * 
 * IFSUL TEAM
 *  • Gill Velleda Gonzales
 *  • Daniel Trindade Cavalcanti
 *  • Rafael Garcia Blanco
 * 
 * Version: 0.5
 * 
 * Use: jQuery and Konva
 */

/* global Konva */
$(document).ready(function () {

    var yodaImg = new Image();
    yodaImg.src = 'img/yoda.jpg';
    var yodaImg1 = new Image();
    yodaImg1.src = 'img/lesto.jfif';
    var yodaImg2 = new Image();
    yodaImg2.src = 'img/masto.jpg';
    var yodaImg3 = new Image();
    yodaImg3.src = 'img/mega.jpg';
    var yodaImg4 = new Image();
    yodaImg4.src = 'img/para.jpg';
    var yoda = createImage(50, 50, 100, 100, yodaImg, true, 0);
    var lesto = createImage(50, 50, 100, 100, yodaImg1, true, 1);
    var masto = createImage(50, 50, 100, 100, yodaImg2, true, 2);
    var mega = createImage(50, 50, 100, 100, yodaImg3, true, 3);
    var para = createImage(50, 50, 100, 100, yodaImg4, true, 4);
    var brmap = new Image();
    brmap.src = 'img/brmap.png';
    var selecionados = [0, 0, 0, 0, 0];
    console.log(selecionados);

    var stage = new Konva.Stage({
        container: 'container', // id of container <div>
        width: $(window).width(),
        height: $(window).height()
    });

    var layer = new Konva.Layer();

// create our shape
    function createCircle(x, y, rad, fill, stroke, certo) {
        var circle = new Konva.Circle({
            x: x,
            y: y,
            radius: rad,
            fill: fill,
            stroke: stroke,
            strokeWidth: 4,
            certo: certo,
            visible: false
        });
        return circle;
    }
    var noroeste = createCircle(stage.getWidth() / 4, stage.getHeight() / 3, stage.getWidth() / 14, "green", "black", 0);
    var norte = createCircle(stage.getWidth() / 2, stage.getHeight() / 3.1, stage.getWidth() / 14, "red", "black", 1);
    var nordeste = createCircle(stage.getWidth() / 1.5, stage.getHeight() / 2.3, stage.getWidth() / 14, "yellow", "black", 2);
    var centroOeste = createCircle(stage.getWidth() / 2.5, stage.getHeight() / 1.8, stage.getWidth() / 14, "green", "black", 3);
    var sudeste = createCircle(stage.getWidth() / 1.7, stage.getHeight() / 1.46, stage.getWidth() / 14, "blue", "black", 4);
    var sul = createCircle(stage.getWidth() / 2.15, stage.getHeight() / 1.2, stage.getWidth() / 14, "orange", "black", 5);

    var button = createRect(
            stage.getWidth() - 150,
            stage.getHeight() - stage.getHeight() / 5, 100, 50, "green", "black", 4, false, 1);
//    var rect = createRect(50,50,150,100,"blue","black",4,true,1);

    var button_text = new Konva.Text({
        x: button.attrs.x + 5,
        y: button.attrs.y + 10,
        text: 'Verificar',
        fontSize: 25,
        fontFamily: 'Calibri',
        fill: 'white'
    });


    function createRect(x, y, w, h, f, s, sw, drag, id) {
        var rect = new Konva.Rect({
            x: x,
            y: y,
            width: w,
            height: h,
            fill: f,
            stroke: s,
            strokeWidth: sw,
            draggable: drag,
            cornerRadius: 20,
            id: id});

        return rect;
    }

    function createImage(x, y, w, h, img, drag, id = null) {
        var imagem = new Konva.Image({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            image: img,
            draggable: true,
            id: id});
        return imagem;
    }

    var mapa = new Konva.Image({
        x: 0,
        y: 70,
        width: stage.getWidth() - 70,
        height: stage.getHeight() - 70,
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

    yoda.on('dragend dragmove', function () {
        if (this.attrs.width < sul.attrs.radius * 2)
            selecionados[this.getAttr("id")] = testAllRegions(this);
        else
            selecionados[this.getAttr("id")] = testAllRegionsInnerCirc(this);
    });

    lesto.on('dragend dragmove', function () {
        if (this.attrs.width < sul.attrs.radius * 2)
            selecionados[this.getAttr("id")] = testAllRegions(this);
        else
            selecionados[this.getAttr("id")] = testAllRegionsInnerCirc(this);
    });

    masto.on('dragend dragmove', function () {
        if (this.attrs.width < sul.attrs.radius * 2)
            selecionados[this.getAttr("id")] = testAllRegions(this);
        else
            selecionados[this.getAttr("id")] = testAllRegionsInnerCirc(this);
    });

    mega.on('dragend dragmove', function () {
        if (this.attrs.width < sul.attrs.radius * 2)
            selecionados[this.getAttr("id")] = testAllRegions(this);
        else
            selecionados[this.getAttr("id")] = testAllRegionsInnerCirc(this);
    });

    para.on('dragend dragmove', function () {

        if (this.attrs.width < sul.attrs.radius * 2)
            selecionados[this.getAttr("id")] = testAllRegions(para);
        else
            selecionados[this.getAttr("id")] = testAllRegionsInnerCirc(para);
    });

    button.on('click touchstart', function () {
        alert(selecionados);
        mostraPontos();
    });
    button_text.on('click touchstart', function () {
        alert(selecionados);
        mostraPontos();
    });

    function mostraPontos() {
            var p = 0;
            $.each(selecionados,function(i,v){
                    p+=v;
            });
            alert("Pontos: "+p);
            if(p === 5){
                alert('Parabéns!! Acertou Todos!!');
                if(confirm("Quer reiniciar?")){
                    location.reload();
                }
            }else if(p>0){
                alert('Parabéns! Mas alguém está fora do lugar!');
            }else{
                 alert('Continue Tentando!');
            }
    };

    function testAllRegions(ret) {
        retorno = 0;
        if (estadentro(ret, noroeste)) {
            retorno = 1;
        }
        if (estadentro(ret, norte)) {
            retorno = 1;
        }
        if (estadentro(ret, nordeste)) {
            retorno = 1;
        }
        if (estadentro(ret, centroOeste)) {
            retorno = 1;
        }
        if (estadentro(ret, sudeste)) {
            retorno = 1;
        }
        if (estadentro(ret, sul)) {
            retorno = 1;
        }
        return retorno;
    }

    function testAllRegionsInnerCirc(ret) {
        retorno = 0;

        console.log(sudeste.attrs.x);
        if (estadentro_circ(ret, noroeste)) {
            retorno = 1;
        }
        if (estadentro_circ(ret, norte)) {
            retorno = 1;
        }
        if (estadentro_circ(ret, nordeste)) {
            retorno = 1;
        }
        if (estadentro_circ(ret, centroOeste)) {
            retorno = 1;
        }
        if (estadentro_circ(ret, sudeste)) {
            retorno = 1;
        }
        if (estadentro_circ(ret, sul)) {
            retorno = 1;
        }
        return retorno;
    }


    function estadentro_circ(ret, circ) {
        console.log(ret.attrs.x);
        console.log(circ.attrs.x);
        var rx1 = ret.attrs.x;
        var ry1 = ret.attrs.y;
        var rx2 = rx1 + ret.attrs.width;
        var ry2 = ry1 + ret.attrs.height;
        var cx = circ.attrs.x;
        var cy = circ.attrs.y;
        var cid = circ.attrs.certo;
        var rid = ret.attrs.id;
        console.log(cx + " >= " + rx1 + " &&" + cx + " <= " + rx2 + ") && (" + cy + ">=" + ry1 + " && " + cy + "<= " + ry2 + ") && " + cid + " === " + rid);
        if ((cx >= rx1 && cx <= rx2) && (cy >= ry1 && cy <= ry2) && cid === rid) {

            console.log('certo');

            return true;
        } else {
            console.log('errado:' + circ.attrs.x + "  " + circ.attrs.certo);
            return false;
        }
    }

    /**
     * @description Testa se um retângulo esta completamente dentro de uma circunferencia
     * @param retangulo = retangulo Konva.Rect();
     * @param circulo = circulo Konva.Circle();
     */
    function estadentro(retangulo, circulo) {
        var n = 0;//contador de pontos dentro da circunferencia
        if (stage.getWidth() < 500) {
            var np = 1;
        } else {
            var np = 3;
        }//todos os pontos dentro do circulo
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
            certo: circulo.getAttr('certo')};

//        console.log(c);

        $.each(pontos, function (i, p) {
            //Incrementa n se o ponto esta dentro do circulo
            // console.log(i+':'+p.x);
            n = (intoCirc(p, c)) ? ++n : n;
            //(TESTE)? TRUE : FALSE ;
        });
        console.log(retangulo.getAttr('id'));
        console.log(n);
        if (n >= np) {
            if (c.certo == retangulo.getAttr('id')) {
                //se n > np o retangulo esta completamente dentro do circulo
//            console.log("Esta dentro do círculo!!");
//            console.log(retangulo.position());
                //alert("Está dentro do círculo!!");
                retangulo.fill('red');
//                console.log(retangulo);
                retangulo.setStrokeWidth(10);
                retangulo.stroke('black');

                console.log("circulo certo");
                return true;
            } else {
                console.log('circulo errado');
                return false;
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
//        layer.add(rect);

        layer.add(noroeste);
        layer.add(norte);
        layer.add(nordeste);
        layer.add(centroOeste);
        layer.add(sudeste);
        layer.add(sul);
        layer.add(yoda);
        layer.add(lesto);
        layer.add(masto);
        layer.add(mega);
        layer.add(para);
        layer.add(button);
        layer.add(button_text);

// add the layer to the stage
        stage.add(layer);
// draw the image
//    layer.draw();
    }


});
