// vampiro.js
/*
	generado por FI.JS@txtMap, v0.1/ v0.6 20140612
	Sun Aug 31 22:46:09 2014

        * Adaptado para fi.js, como demo.

        (c) Jaume Alcazo Castellarnau 1998
        (c) baltasarq 2014

*/

ctrl.ponTitulo( "Vampiro" );
ctrl.ponIntro( "<p><h2>Memorias de reXXe</h2><br>\
                <b>\
                \"Vampiro\" es una obra original creada por Jaume \
                Alcazo Castellarnau en 1998.\
                </b><br>\
                <br><i>El <a href=\"http://wiki.caad.es/Proyecto_Vampiro\" \
                target=\"_blank\">proyecto vampiro </a> \
                consiste en recrear una aventura \
                muy sencilla en un nuevo parser, de manera que para el \
                autor experimentado, estas salgan a la luz enseguida. \
                En este caso, el objetivo es demostrar las posibilidades \
                de <a target=\"_blank\" href=\"http://caad.es/baltasarq/prys/fi.js/\">fi.js</a>\
                </i></p>" );
ctrl.ponImg( "res/portada_vampiro.jpg" );
ctrl.ponAutor( "baltasarq" );
ctrl.ponVersion( "20140831" );

// *** Locs --

var locBiblioteca = ctrl.lugares.creaLoc(
	"Biblioteca",
	[ "biblioteca" ],
	"Te hallas en la biblioteca del castillo. Obviamente est&aacute; \
        llena de ${libros, ex libros} interesantes, pero \
        desgraciadamente no tienes \
        tiempo para leerlos.<br>Salidas visibles: ${oeste, oeste}."
);
locBiblioteca.pic = "res/biblioteca.jpg";

var locCocina = ctrl.lugares.creaLoc(
	"Cocina",
	[ "cocina", "habitacion", "estancia" ],
	"Est&aacute;s en la cocina del castillo. Esto est&aacute; lleno de \
        ${cacerolas, ex cacerolas} y de ${cacharros, ex cacharros} \
        para cocinar. Hay un ${horno, ex horno}, un \
        ${fregadero, ex fregadero} y un ${armario, ex armario} peque&ntilde;o.\
        <br>Salidas visibles: \
        ${este, este}."
);
locCocina.pic = "res/cocina.jpg";

var locDormitorio = ctrl.lugares.creaLoc(
	"Dormitorio",
	[ "dormitorio", "habitacion", "estancia" ],
	"Est&aacute;s en un dormitorio no muy grande ni tampoco muy peque&ntilde;o. \
        Es bastante austero. S&oacute;lo hay una ${cama, ex cama} \
        y un ${armario, ex armario}.\
        <br>Salidas visibles: ${este, este}."
);
locDormitorio.pic = "res/dormitorio.jpg";


var locElFinal = ctrl.lugares.creaLoc(
	"El Final",
	[ "habitacion", "estancia" ],
	"Est&aacute;s en una habitaci&oacute;n desnuda. Unicamente hay un \
         ${altar, ex altar} en el centro. \
         Encima del altar puedes ver un ${ataud, ex ataud}.\
         <br>Salidas visibles: ${este, este}."
);
locElFinal.pic = "res/final.jpg";

var locEscaleras = ctrl.lugares.creaLoc(
	"Escaleras",
	[ "escaleras" ],
	"Te hallas en el final del pasillo. Delante de t&iacute; ves unas \
        escaleras que ${suben, sube} y otras que ${bajan, baja}. \
        Al ${oeste, oeste} est&aacute; el ${dormitorio, oeste} y al ${este, este} \
        la ${sala de estar, este}.<br>Salidas visibles: \
        ${sur, sur}, ${este, este}, ${oeste, oeste}, \
        ${arriba, arriba}, ${abajo, abajo}."
);
locEscaleras.pic = "res/escaleras.jpg";

var locEscalerasSuperiores = ctrl.lugares.creaLoc(
	"Escaleras superiores",
	[ "escaleras", "rellano" ],
	"Est&aacute;s en el piso superior del castillo. Aqu&iacute; hace m&aacute;s \
        fr&iacute;o que ${abajo, abajo}. Detr&aacute;s de t&iacute; est&aacute;n las \
        escaleras que ${bajan, baja} y \
        hacia el ${oeste, oeste} est&aacute; la ${habitaci&oacute;n, oeste} del \
        vampiro.<br>Salidas visibles: ${oeste, oeste}, ${abajo, abajo}."
);
locEscalerasSuperiores.pic = "res/escaleras_superiores.jpg";

var locPasillo = ctrl.lugares.creaLoc(
	"Pasillo",
	[ "pasillo" ],
	"Te encuentras en medio del pasillo principal de este piso. \
         Al ${oeste, oeste} est&aacute; la ${cocina, oeste} y al ${este, este} \
         la ${biblioteca, este}. El pasillo sigue hacia el \
         ${norte, norte}.<br>Salidas visibles: \
         ${norte, norte}, ${sur, sur}, ${este, este}, ${oeste, oeste}."
);
locPasillo.pic = "res/pasillo.jpg";


var locSalaDeEstar = ctrl.lugares.creaLoc(
	"Sala de estar",
	[ "sala", "habitacion", "estancia" ],
	"Es la sala m&aacute;s acogedora de todo el castillo. \
        En la ${chimenea, ex chimenea} \
        los &uacute;ltimos ${restos de alg&uacute;n fuego, ex fuego} \
        chisporrotean alegremente. \
        Hay una ${mesa, ex mesa} grande con una ${silla, ex silla} al \
        lado. De la pared cuelgan \
        bastantes ${trofeos, ex trofeos} de caza y \
        ${adornos, ex adornos} varios.<br>Salidas visibles: \
        ${oeste, oeste}.\n"
);
locSalaDeEstar.pic = "res/sala_estar.jpg";

var locSotano = ctrl.lugares.creaLoc(
	"S&oacute;tano",
	[ "sotano" ],
	"En este peque&ntilde;o s&oacute;tano hace mucho calor, sientes una \
        sensaci&oacute;n de recogimiento. Est&aacute; todo muy sucio. Hay un \
        ${barril, ex barril} \
        aqu&iacute;, tambi&eacute;n hay unas ${escaleras, ex escaleras} que \
        ${suben, arriba}.<br>Salidas visibles: \
        ${arriba, arriba}.\n"
);
locSotano.pic = "res/sotano.jpg";

var locVestibulo = ctrl.lugares.creaLoc(
	"Vest&iacute;bulo",
	[ "vestibulo", "habitacion", "estancia" ],
	"Est&aacute;s en el vest&iacute;bulo del castillo. El ambiente es muy \
        h&uacute;medo y fr&iacute;o. Est&aacute;s en un pasillo que se extiende hacia el \
        ${norte, norte}. Al ${sur, sur} queda la \
        ${puerta de entrada, ex puerta} al castillo.<br>Salidas \
        visibles: ${norte, norte}.\n"
);
locVestibulo.pic = "res/vestibulo.jpg";

locVestibulo.preGo = function() {
        var loc = ctrl.lugares.devLocActual();
        var s = parser.sentencia;
        var toret = "";

        if ( s.term1 !== "sur" ) {
                toret = acciones.devAccion( "go" ).exe( s );
        } else {
                toret = objPuertaEntrada.desc;
        }

        return toret;
}

var objPuertaEntrada = ctrl.creaObj(
	"puerta",
	[ "entrada" ],
	"No es el momento de irse, &iexcl;acabas de llegar! Debes cumplir \
         tu misi&oacute;n.",
	locVestibulo,
	Ent.Escenario
);

objPuertaEntrada.preOpen = function() {
        return objPuertaEntrada.desc;
}


// *** Compas --

// -- locBiblioteca
locBiblioteca.ponSalidaBi( "oeste", locPasillo );

// -- locElFinal
locElFinal.ponSalidaBi( "este", locEscalerasSuperiores );

// -- locEscaleras
locEscaleras.ponSalidaBi( "este", locSalaDeEstar );
locEscaleras.ponSalidaBi( "oeste", locDormitorio );
locEscaleras.ponSalidaBi( "arriba", locEscalerasSuperiores );
locEscaleras.ponSalidaBi( "abajo", locSotano );

// -- locEscalerasSuperiores
locEscalerasSuperiores.ponSalidaBi( "oeste", locElFinal );

// -- locPasillo
locPasillo.ponSalidaBi( "norte", locEscaleras );
locPasillo.ponSalidaBi( "sur", locVestibulo );
locPasillo.ponSalidaBi( "este", locBiblioteca );
locPasillo.ponSalidaBi( "oeste", locCocina );

// -- locSalaDeEstar
locSalaDeEstar.ponSalidaBi( "oeste", locEscaleras );

// -- locVestibulo
locVestibulo.ponSalidaBi( "norte", locPasillo );


// *** Objs --

var objAdornos = ctrl.creaObj(
	"adornos",
	[ "adorno", "adornos" ],
	"Adornan.",
	locSalaDeEstar,
	Ent.Escenario
);

var objAltar = ctrl.creaObj(
	"altar",
	[ "altar" ],
	"Es un altar de dura piedra. Encima de &eacute;ste est&aacute; el \
         ${ataud, ex ataud}.",
	locElFinal,
	Ent.Escenario
);

var objArmario = ctrl.creaObj(
	"armario",
	[ "armario", "aparador" ],
	"Es un armario de los que se usa para la vajilla. \
         La puerta tiene una peque&ntilde;a cerradura. ",
	locCocina,
	Ent.Escenario
);

objArmario.ponAbierto( false );

objArmario.preExamine = function() {
        var toret = objArmario.desc;

        if ( objArmario.estaAbierto() ) {
                toret += "Est&aacute; abierto.";
        } else {
                toret += "Est&aacute; cerrado.";
        }

        return toret;
}

objArmario.preOpen = function() {
        var toret = "No puedes abrirlo con eso.";
        var s = parser.sentencia;

        if ( s.obj2 === null ) {
                s.obj2 = objLlavecita;
        }

        if ( !ctrl.estaPresente( s.obj2 ) ) {
                toret = "No puedes abrirlo as&iacute;.";
        }
        else
        if ( s.obj2 === objLlavecita ) {
                toret = "Ya estaba abierto.";

                if ( !objArmario.estaAbierto() ) {
                        toret = "Lo has abierto con la llavecita.";
                        objArmario.ponAbierto();

                        if ( objRistraDeAjos.owner === ctrl.lugares.limbo )
                        {
                                objRistraDeAjos.moveTo( locCocina );
                                toret += " Dentro hay una \
                                           ${ristra de ajos, coge ristra}.";
                        }
                }
        }

        return toret;
}

var objArmarioRopero = ctrl.creaObj(
	"armario ropero",
	[ "armario", "ropero" ],
	"El armario ropero est&aacute; vac&iacute;o.",
	locDormitorio,
	Ent.Escenario
);

var objAtaud = ctrl.creaObj(
	"ataud",
	[ "ataud", "sarcofago", "caja", "cajon" ],
	"Una sencilla caja de pino.",
	locElFinal,
	Ent.Escenario
);

objAtaud.preOpen = function() {
        var toret = "";

        // La estaca
        if ( !ctrl.estaPresente( objTrozoDeMadera ) )
        {
                toret += "Necesitas un estaca que clavar en el \
                          coraz&oacute;n del vampiro.\n";
        } else {
                if ( !objTrozoDeMadera.afilado ) {
                        toret += "Podr&iacute;as utilizar el madero, como \
                                  estaca, pero no est&aacute; afilado.\n";
                }
        }

        // El martillo
        if ( !ctrl.estaPresente( objMartillo ) ) {
                toret += "Falta algo con lo que golpear la estaca.\n";
        }

        // El crucifijo
        if ( !ctrl.estaPresente( objCrucifijoPlateado ) ) {
                toret += "Es b&aacute;sica una protecci&oacute;n religiosa.\n";
        } else {
                if ( !objCrucifijoPlateado.estaPuesto() ) {
                        toret += "El crucifijo deber&iacute;a colgar de tu \
                                  cuello.\n";
                }
        }

        // La ristra de ajos
        if ( !ctrl.estaPresente( objRistraDeAjos ) ) {
                toret += "Es b&aacute;sica una protecci&oacute;n pagana.\n";
        } else {
                if ( !objRistraDeAjos.estaPuesto() ) {
                        toret += "La protecci&oacute;n del ajo solamente se \
                                  logra si cuelga de tu cuello.\n";
                }
        }

        // Es el final?
        if ( toret.length === 0 ) {
            var dvFrame = ctrl.getHtmlPart( "dvFrame", "missing frame div" );

            dvFrame.style.display = "none";
            msg = "\
                    Abres el ata&uacute;d, y, protegido por \
                    los ajos y el crucifijo, comienzas \
                    tu tarea. La cara de horror del \
                    vampiro cuando le clavas la estaca \
                    solo es comparable al rostro \
                    lleno de paz que puedes observar \
                    unos cuantos martillazos despu&eacute;s. \
                    La reducci&oacute;n del cuerpo a cenizas \
                    te confirma que tu misi&oacute;n est&aacute; ya \
                    cumplida. \
                    <p class='clsAchieved'>Logros: "
                + ctrl.logros.completadosComoTexto()
                + "</p>";

            ctrl.terminaJuego( msg, "res/portada_vampiro.jpg" );
        } else {
                toret = "Revisas que tengas todo lo necesario...<br>"
                        + toret;
        }

        return toret;
}

var objBarril = ctrl.creaObj(
	"barril",
	[ "barril", "tapa", "hendidura", "muesca" ],
	"Se trata de un barril con tapa, que presenta una peque&ntilde;a  \
        hendidura.",
	locSotano,
	Ent.Escenario
);

objBarril.ponAbierto( false );

objBarril.preExamine = function() {
        var toret = objBarril.desc;

        if ( objBarril.estaAbierto() ) {
                toret += " Est&aacute; vac&iacute;o.";
        } else {
                toret += " No puedes ver lo que hay dentro del barril \
                     porque est&aacute; cerrado.";
        }

        return toret;
}

objBarril.preOpen = function() {
        var toret = "No puedes abrirlo con eso.";
        var s = parser.sentencia;

        if ( s.obj2 === null ) {
                s.obj2 = objPalanca;
        }

        if ( !ctrl.estaPresente( s.obj2 ) ) {
                toret = "No puedes abrirlo as&iacute;.";
        }
        else
        if ( s.obj2 === objPalanca ) {
                toret = "Ya estaba abierto.";

                if ( !objBarril.estaAbierto() ) {
                        toret = "Lo has abierto con la palanca, haciendo \
                                 fuerza en uno de los bordes de \
                                 la tapa, en donde la hendidura.";

                        objBarril.ponAbierto();
                        objMartillo.mueveA( objBarril.owner );
                        toret += " Dentro hab&iacute;a un \
                                   ${martillo, coge martillo}.";
                }
        }

        return toret;
}

var objCacerolas = ctrl.creaObj(
	"cacerolas",
	[ "cacerolas", "cacerola", "cacharro", "cacharros" ],
	"Simples cacerolas y cacharros de cocina.",
	locCocina,
	Ent.Escenario
);

var objCama = ctrl.creaObj(
	"cama",
	[ "cama" ],
	"Est&aacute; cubierta de ${s&aacute;banas, ex sabanas}.",
	locDormitorio,
	Ent.Escenario
);

var objChimenea = ctrl.creaObj(
	"chimenea",
	[ "chimenea" ],
	"Es una chimenea hecha de ladrillos y muy elegante. \
         En ella chisporrotean los ${restos de un fuego, ex fuego}.",
	locSalaDeEstar,
	Ent.Escenario
);

var objCrucifijoPlateado = ctrl.creaObj(
	"crucifijo plateado",
	[ "crucifijo" ],
	"Es un peque&ntilde;o crucifijo plateado. Es uno de los cuatro elementos que nos servir&aacute;n para derrotar al vampiro.",
	locBiblioteca,
	Ent.Portable
);

objCrucifijoPlateado.ponPrenda();

objCrucifijoPlateado.postWear = function() {
    ctrl.logros.logrado( "ortodoxo" );
};

var objCuchillo = ctrl.creaObj(
	"cuchillo",
	[ "cuchillo" ],
	"Un simple cuchillo de cocina. Pincha.",
	locCocina,
	Ent.Portable
);

var objFregadero = ctrl.creaObj(
	"fregadero",
	[ "fregadero" ],
	"Es un fregadero de piedra. El fregadero est&aacute; vac&iacute;o.",
	locCocina,
	Ent.Escenario
);

var objHorno = ctrl.creaObj(
	"horno",
	[ "horno" ],
	"Un simple horno, no tiene ninguna importancia.",
	locCocina,
	Ent.Escenario
);

var objLibros = ctrl.creaObj(
	"libros",
	[ "libro", "libros", "volumenes", "volumen",
          "estantes", "estante", "estanterias", "estanteria",
          "librer&iacute;a" ],
	"Montones de libros, pero no tengo tiempo para leer ahora.",
	locBiblioteca,
	Ent.Escenario
);

var objLlavecita = ctrl.creaObj(
	"llavecita",
	[ "llavecita", "llave" ],
	"Esta peque&ntilde;a llavecita tiene la pinta de abrir un armario o algo as&iacute;.",
	ctrl.lugares.limbo,
	Ent.Portable
);

var objMartillo = ctrl.creaObj(
	"martillo",
	[ "martillo", "maza" ],
	"Un martillo grande. Es uno de los elementos que me permitir&aacute;n acabar con el vampiro.",
	ctrl.lugares.limbo,
	Ent.Portable
);

objMartillo.postTake = function() {
    ctrl.logros.logrado( "matavampiros" );
};

var objMesa = ctrl.creaObj(
	"mesa",
	[ "mesa" ],
	"Una mesa de caoba, bastante grande.",
	locSalaDeEstar,
	Ent.Escenario
);

var objPalanca = ctrl.creaObj(
	"palanca",
	[ "palanca" ],
	"Es una palanca de acero toledano. Sirve para forzar cosas.",
	locBiblioteca,
	Ent.Portable
);

var objRestos = ctrl.creaObj(
	"restos",
	[ "restos", "fuego" ],
	"Chisporrotean algunas brasas entre madera a&uacute;n por quemar.",
	locSalaDeEstar,
	Ent.Escenario
);

objRestos.preExamine = function() {
        var toret = objRestos.desc;

        if ( objTrozoDeMadera.owner === ctrl.lugares.limbo ) {
                toret += " Entre los restos del fuego encuentras un \
                           ${trozo de madera, coge palo}.";
                objTrozoDeMadera.moveTo( locSalaDeEstar );
        }

        return toret;
}

var objRistraDeAjos = ctrl.creaObj(
	"ristra de ajos",
	[ "ristra", "ajos", "ajo" ],
	"Es una ristra entera de ajos que expelen un olor un tanto asqueroso. Es uno de los cuatro elementos que me servir&aacute;n para derrotar al vampiro.",
	ctrl.lugares.limbo,
	Ent.Portable
);

objRistraDeAjos.ponPrenda();

objRistraDeAjos.postWear = function() {
    ctrl.logros.logrado( "temeroso" );
}

var objSabanas = ctrl.creaObj(
	"sabanas",
	[ "sabanas" ],
	"Desordenadas y sucias.",
	locDormitorio,
	Ent.Escenario
);

objSabanas.preExamine = function() {
        var toret = objSabanas.desc;

        if ( objLlavecita.owner = ctrl.lugares.limbo ) {
                objLlavecita.moveTo( locDormitorio );
                toret += " Entre ellas encuentras una peque&ntilde;a \
                ${llavecita, coge llavecita}.";
        }

        return toret;
}

var objSilla = ctrl.creaObj(
	"silla",
	[ "silla" ],
	"Una c&oacute;moda silla.",
	locSalaDeEstar,
	Ent.Escenario
);

var objTrajeBarato = ctrl.creaObj(
	"traje barato",
	[ "traje" ],
	"Es un traje barato comprado en las rebajas.",
	locPasillo,
	Ent.Portable
);
objTrajeBarato.ponPrenda();

objTrajeBarato.postWear = function() {
    ctrl.logros.logrado( "ropa", 25 );
};

var objTrofeos = ctrl.creaObj(
	"trofeos",
	[ "trofeos", "trofeo" ],
	"Insignificantes trofeos.",
	locSalaDeEstar,
	Ent.Escenario
);

var objTrozoDeMadera = ctrl.creaObj(
	"trozo de madera",
	[ "trozo", "madera", "madero", "estaca", "palo" ],
	"Un trozo de madera, rectangular y alargado.",
	ctrl.lugares.limbo,
	Ent.Portable
);

objTrozoDeMadera.preExamine = function() {
        var toret = objTrozoDeMadera.desc;

        if ( objTrozoDeMadera.afilado ) {
                toret += " Ahora parece una estaca.";
        }

        return toret;
}

objTrozoDeMadera.afilado = false;

objTrozoDeMadera.preAttack = function() {
    return actions.execute( "sharpen", "madero" );
}

objTrozoDeMadera.preSharpen = function() {
        var toret = "No puedes afilarlo con eso.";
        var s = parser.sentencia;

        if ( s.obj2 === null
          || s.obj2 === objTrozoDeMadera )
        {
                s.obj2 = objCuchillo;
        }

        if ( !ctrl.estaPresente( s.obj2 ) ) {
                toret = "No puedes afilarlo as&iacute;.";
        }
        else
        if ( s.obj2 === objCuchillo ) {
                toret = "Ya estaba afilado.";

                if ( !objTrozoDeMadera.afilado ) {
                        toret = "Has afilado el madero con el cuchillo.";
                        objTrozoDeMadera.afilado = true;
                        ctrl.logros.logrado( "estaca" );
                }
        }

        return toret;
}

// --- Jugador ---------------------------------------------------------
var jugador = ctrl.personas.creaPersona( "reXXe",
                    [ "rexxe", "cazador", "cazavampiros" ],
                    "reXXe, un experimentado caza vampiros.",
                    locVestibulo
);

var murcielagos = ctrl.personas.creaPersona(
                    "murci&eacute;lagos",
                    [ "murcielago", "murcielagos" ],
                    "Varios murci&eacute;lagos, no parecen saber \
                     muy bien qu&eacute; pensar de ti.",
                    ctrl.lugares.limbo
);
murcielagos.ponAlcanzable( false );

murcielagos.preTalk = function() {
    return "¿Pero para qu&eacute;? ...no molestes a los pobres murci&eacute;lagos...";
}

locPasillo.preSing = function() {
    return "Buscas a algun incauto para tu perpretaci&oacute;n...<br>"
                + acciones.ejecuta( "talk", "murcielagos" );
}

murcielagos.daemon = function() {
    if ( ctrl.getTurns() % 7 == 0 ) {
            if ( ctrl.lugares.getCurrentLoc() == murcielagos.owner ) {
                    ctrl.print( "Unos murci&eacute;lagos se alborotan un tanto, chillando entre ellos..." );
            } else {
                    ctrl.print( "Ahogados, d&eacute;biles chillidos provienen de alguna parte..." );
            }
    }
}

ctrl.ponAlarma( 3, function() {
    murcielagos.mueveA( locPasillo );

    if ( ctrl.lugares.devLocActual() == murcielagos.owner ) {
            ctrl.print( "Despertados por tu presencia, los murci&eacute;lagos chillan como comenzando a desperezarse..." );
    } else {
            ctrl.print( "Unos lejanos chillidos llegan a ti de forma apagada..." );
    }

    ctrl.ponDaemon( "bats", murcielagos.daemon );
});

// --- Acciones --------------------------------------------------------
var sharpenAction = acciones.crea( "sharpen",
    [ "afila", "afilar", "afilo",
        "pule", "pulir", "pulo"]
);

sharpenAction.exe = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 === null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 !== null ) {
        if ( s.obj1.isReachable() ) {
            toret = "La violencia no es la soluci&oacute;n.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
};

sharpenAction.doIt = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 === null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( typeof( s.obj1.preSharpen ) === "function" ) {
            toret = s.obj1.preSharpen();
        } else {
            toret = this.exe( s );
        }

        if ( typeof( s.obj1.postSharpen ) === "function" ) {
            s.obj1.postSharpen();
        }
    }

    return toret;
};

// Logros --------------------------------------------------------------
ctrl.logros.add( "ropa", "Pudoroso (te pusiste el traje)." );
ctrl.logros.add( "estaca", "El afilador (afilaste la estaca)." );
ctrl.logros.add( "temeroso", "Temeroso (te pusiste los ajos)." );
ctrl.logros.add( "ortodoxo", "Ortodoxo (te pusiste el crucifijo)." );
ctrl.logros.add( "matavampiros", "Mata-vampiros (encontraste el martillo)." );

// Arranque ------------------------------------------------------------
ctrl.personas.cambiaJugador( jugador );
ctrl.lugares.ponInicio( locVestibulo );
