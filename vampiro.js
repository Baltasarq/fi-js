/*
	generado por FI.JS@txtMap, v0.1/ v0.6 20140612
	Sun Aug 31 22:46:09 2014

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
	"\nTe hallas en la biblioteca del castillo. Obviamente está \
        llena de ${libros, ex libros} interesantes, pero \
        desgraciadamente no tienes \
        tiempo para leerlos.\nSalidas visibles: ${oeste, oeste}."
);
locBiblioteca.pic = "res/biblioteca.jpg";

var locCocina = ctrl.lugares.creaLoc(
	"Cocina",
	[ "cocina" ],
	"\nEstás en la cocina del castillo. Esto está lleno de \
        ${cacerolas, ex cacerolas} y de ${cacharros, ex cacharros} \
        para cocinar. Hay un ${horno, ex horno}, un \
        ${fregadero, ex fregadero} y un ${armario, ex armario} pequeño.\
        \nSalidas visibles: \
        ${este, este}."
);
locCocina.pic = "res/cocina.jpg";

var locDormitorio = ctrl.lugares.creaLoc(
	"Dormitorio",
	[ "dormitorio" ],
	"\nEstás en un dormitorio no muy grande ni tampoco muy pequeño. \
        Es bastante austero. Sólo hay una ${cama, ex cama} \
        y un ${armario, ex armario}.\
        \nSalidas visibles: ${este, este}."
);
locDormitorio.pic = "res/dormitorio.jpg";


var locElFinal = ctrl.lugares.creaLoc(
	"El Final",
	[ "el final" ],
	"\nEstás en una habitación desnuda. Unicamente hay un \
         ${altar, ex altar} en el centro. Encima del altar puedes ver \
         un ataud.\nSalidas visibles: ${este, este}."
);
locElFinal.pic = "res/final.jpg";

var locEscaleras = ctrl.lugares.creaLoc(
	"Escaleras",
	[ "escaleras" ],
	"\nTe hallas en el final del pasillo. Delante de tí ves unas \
        escaleras que ${suben, sube} y otras que ${bajan, baja}. \
        Al ${oeste, oeste} está el ${dormitorio, oeste} y al ${este, este} \
        la ${sala de estar, este}.\nSalidas visibles: \
        ${sur, sur}, ${este, este}, ${oeste, oeste}, \
        ${arriba, arriba}, ${abajo, abajo}."
);
locEscaleras.pic = "res/escaleras.jpg";

var locEscalerasSuperiores = ctrl.lugares.creaLoc(
	"Escaleras superiores",
	[ "escaleras superiores" ],
	"\nEstás en el piso superior del castillo. Aquí hace aún más \
        frío que ${abajo, abajo}. Detrás de tí están las \
        escaleras que ${bajan, baja} y \
        hacia el ${oeste, oeste} está la ${habitación, oeste} del \
        vampiro.\nSalidas visibles: ${oeste, oeste}, ${abajo, abajo}."
);
locEscalerasSuperiores.pic = "res/escaleras_superiores.jpg";

var locPasillo = ctrl.lugares.creaLoc(
	"Pasillo",
	[ "pasillo" ],
	"\nTe encuentras en medio del pasillo principal de este piso. \
         Al ${oeste, oeste} está la ${cocina, oeste} y al ${este, este} \
         la ${biblioteca, este}. El pasillo sigue hacia el \
         ${norte, norte}.\nSalidas visibles: \
         ${norte, norte}, ${sur, sur}, ${este, este}, ${oeste, oeste}."
);
locPasillo.pic = "res/pasillo.jpg";


var locSalaDeEstar = ctrl.lugares.creaLoc(
	"Sala de estar",
	[ "sala de estar" ],
	"\nEs la sala más acogedora de todo el castillo. \
        En la ${chimenea, ex chimenea} \
        los últimos ${restos de algún fuego, ex fuego} \
        chisporrotean alegremente. \
        Hay una ${mesa, ex mesa} grande con una ${silla, ex silla} al \
        lado. De la pared cuelgan \
        bastantes ${trofeos, ex trofeos} de caza y \
        ${adornos, ex adornos} varios.\nSalidas visibles: \
        ${oeste, oeste}.\n"
);
locSalaDeEstar.pic = "res/sala_estar.jpg";

var locSTano = ctrl.lugares.creaLoc(
	"Sótano",
	[ "sótano" ],
	"\nEn este pequeño sótano hace mucho calor, sientes una \
        sensación de recogimiento. Está todo muy sucio. Hay un \
        ${barril, ex barril} \
        aquí, también hay unas ${escaleras, ex escaleras} que \
        ${suben, arriba}.\nSalidas visibles: \
        ${arriba, arriba}.\n"
);
locSTano.pic = "res/sotano.jpg";

var locVestBulo = ctrl.lugares.creaLoc(
	"Vestíbulo",
	[ "vestíbulo" ],
	"\nEstás en el vestíbulo del castillo. El ambiente es muy \
        húmedo y frío. Estás en un pasillo que se extiende hacia el \
        ${norte, norte}. Al ${sur, sur} queda la \
        ${puerta de entrada, ex puerta} al castillo.\nSalidas \
        visibles: ${norte, norte}.\n"
);
locVestBulo.pic = "res/vestibulo.jpg";

var objPuertaEntrada = ctrl.creaObj(
	"puerta",
	[ "entrada" ],
	"No es el momento de irse, ¡acabas de llegar! Debes cumplir \
         tu misión.",
	locVestBulo,
	Ent.Escenario
);


// *** Compas --


// -- locBiblioteca
locBiblioteca.ponSalidaBi( "oeste", locPasillo );

// -- locCocina

// -- locDormitorio

// -- locElFinal
locElFinal.ponSalidaBi( "este", locEscalerasSuperiores );

// -- locEscaleras
locEscaleras.ponSalidaBi( "este", locSalaDeEstar );
locEscaleras.ponSalidaBi( "oeste", locDormitorio );
locEscaleras.ponSalidaBi( "arriba", locEscalerasSuperiores );
locEscaleras.ponSalidaBi( "abajo", locSTano );

// -- locEscalerasSuperiores
locEscalerasSuperiores.ponSalidaBi( "oeste", locElFinal );

// -- locPasillo
locPasillo.ponSalidaBi( "norte", locEscaleras );
locPasillo.ponSalidaBi( "sur", locVestBulo );
locPasillo.ponSalidaBi( "este", locBiblioteca );
locPasillo.ponSalidaBi( "oeste", locCocina );

// -- locSalaDeEstar
locSalaDeEstar.ponSalidaBi( "oeste", locEscaleras );

// -- locSTano

// -- locVestBulo
locVestBulo.ponSalidaBi( "norte", locPasillo );


// *** Objs --

var objAdornos = ctrl.creaObj(
	"adornos",
	[ "adornos" ],
	"Adornan.",
	locSalaDeEstar,
	Ent.Escenario
);

var objAltar = ctrl.creaObj(
	"altar",
	[ "altar" ],
	"Es un altar de dura piedra. Encima de éste está el ataud.",
	locElFinal,
	Ent.Escenario
);

var objArmario = ctrl.creaObj(
	"armario",
	[ "armario" ],
	"Es un armario de los que se usa para la vajilla. \
         La puerta tiene una pequeña cerradura: ",
	locCocina,
	Ent.Escenario
);

objArmario.ponAbierto( false );

objArmario.preExamine = function() {
        var toret = objArmario.desc;

        if ( objArmario.estaAbierto() ) {
                toret += "Está abierto.";
        } else {
                toret += "Está cerrado.";
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
                toret = "No puedes abrirlo así.";
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
	"El armario ropero está vacío.",
	locDormitorio,
	Ent.Escenario
);

var objAtaud = ctrl.creaObj(
	"ataud",
	[ "ataud" ],
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
                          corazón del vampiro.\n";
        } else {
                if ( !objTrozoDeMadera.afilada ) {
                        toret += "Podrías utilizar el madero, como \
                                  estaca, pero no está afilado.\n";
                }
        }

        // El martillo
        if ( !ctrl.estaPresente( objMartillo ) ) {
                toret += "Falta algo con lo que golpear la estaca.\n";
        }

        // El crucifijo
        if ( !ctrl.estaPresente( objCrucifijoPlateado ) ) {
                toret += "Es básica una protección religiosa.\n";
        } else {
                if ( !objCrucifijoPlateado.estaPuesto() ) {
                        toret += "El crucifijo debería colgar de tu \
                                  cuello.\n";
                }
        }

        // La ristra de ajos
        if ( !ctrl.estaPresente( objRistraDeAjos ) ) {
                toret += "Es básica una protección pagana.\n";
        } else {
                if ( !objRistraDeAjos.estaPuesto() ) {
                        toret += "La protección del ajo solamente se \
                                  logra si cuelga de tu cuello.\n";
                }
        }

        // Es el final?
        if ( toret.length === 0 ) {
        } else {
                toret = "Revisas que tengas todo lo necesario...\n"
                        + toret;
        }

        return toret;
}

var objBarril = ctrl.creaObj(
	"barril",
	[ "barril", "tapa", "hendidura", "muesca" ],
	"Se trata de un barril con tapa, que presenta una pequeña  \
        hendidura.",
	locSTano,
	Ent.Escenario
);

objBarril.preExamine = function() {
        var toret = objBarril.desc;

        if ( objBarril.estaAbierto() ) {
                toret += " Está vacío.";
        } else {
                toret += " No puedes ver lo que hay dentro del barril \
                     porque está cerrado.";
        }

        return toret;
}

objBarril.estaAbierto( false );

objBarril.preOpen = function() {
        var toret = "No puedes abrirlo con eso.";
        var s = parser.sentencia;

        if ( s.obj2 === null ) {
                s.obj2 = objPalanca;
        }

        if ( !ctrl.estaPresente( s.obj2 ) ) {
                toret = "No puedes abrirlo así.";
        }
        else
        if ( s.obj2 === objPalanca ) {
                toret = "Ya estaba abierto.";

                if ( !objBarril.estaAbierto() ) {
                        toret = "Lo has abierto con la palanca, haciendo \
                                 fuerza en uno de los bordes de la tapa.";
                        objBarril.ponAbierto();

                        if ( objMartillo.owner === ctrl.lugares.limbo )
                        {
                                objMartillo.moveTo( objBarril.owner );
                                toret += " Dentro hay una \
                                           ${martillo, coge martillo}.";
                        }
                }
        }

        return toret;
}

var objCacerolas = ctrl.creaObj(
	"cacerolas",
	[ "cacerolas" ],
	"Simples cacerolas y cacharros de cocina.",
	locCocina,
	Ent.Escenario
);

var objCacharros = ctrl.creaObj(
	"cacharros",
	[ "cacharros" ],
	"Simples cacerolas y cacharros de cocina.",
	locCocina,
	Ent.Escenario
);

var objCama = ctrl.creaObj(
	"cama",
	[ "cama" ],
	"Está cubierta de ${sábanas, ex sabanas}.",
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
	"Es un pequeño crucifijo plateado. Es uno de los cuatro elementos que nos servirán para derrotar al vampiro.",
	locBiblioteca,
	Ent.Portable
);

objCrucifijoPlateado.ponPrenda();

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
	"Es un fregadero de piedra. El fregadero está vacío.",
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
          "librería" ],
	"Montones de libros, pero no tengo tiempo para leer ahora.",
	locBiblioteca,
	Ent.Escenario
);

var objLlavecita = ctrl.creaObj(
	"llavecita",
	[ "llavecita", "llave" ],
	"Esta pequeña llavecita tiene la pinta de abrir un armario o algo así.",
	ctrl.lugares.limbo,
	Ent.Portable
);

var objMartillo = ctrl.creaObj(
	"martillo",
	[ "martillo" ],
	"Un martillo grande. Es uno de los elementos que me permitirán acabar con el vampiro.",
	ctrl.lugares.limbo,
	Ent.Portable
);

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
	"Chisporrotean algunas brasas entre madera aún por quemar.",
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
	[ "ristra" ],
	"Es una ristra entera de ajos que expelen un olor un tanto asqueroso. Es uno de los cuatro elementos que me servirán para derrotar al vampiro.",
	ctrl.lugares.limbo,
	Ent.Portable
);

objRistraDeAjos.ponPrenda();

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
                toret += " Entre ellas encuentras una pequeña \
                ${llavecita, coge llavecita}.";
        }

        return toret;
}

var objSilla = ctrl.creaObj(
	"silla",
	[ "silla" ],
	"Una cómoda silla.",
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

var objTrofeos = ctrl.creaObj(
	"trofeos",
	[ "trofeos" ],
	"Insignificantes trofeos.",
	locSalaDeEstar,
	Ent.Escenario
);

var objTrozoDeMadera = ctrl.creaObj(
	"trozo de madera",
	[ "trozo", "madera", "madero", "estaca", "palo" ],
	"Un trozo de madera, rectangular y alargado",
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

objTrozoDeMadera.preSharpen = function() {
        var toret = "No puedes abrirlo con eso.";
        var s = parser.sentencia;

        if ( s.obj2 === null ) {
                s.obj2 = objCuchillo;
        }

        if ( !ctrl.estaPresente( s.obj2 ) ) {
                toret = "No puedes abrirlo así.";
        }
        else
        if ( s.obj2 === objCuchillo ) {
                toret = "Ya estaba abierto.";

                if ( !objTrozoDeMadera.afilado ) {
                        toret = "Has afilado el madero con el cuchillo.";
                        objTrozoDeMadera.afilado = true;
                }
        }

        return toret;
}

// --- Jugador ---------------------------------------------------------
var jugador = ctrl.personas.creaPersona( "reXXe",
                    [ "rexxe", "cazador", "cazavampiros" ],
                    "reXXe, un experimentado caza vampiros.",
                    locVestBulo
);

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

// Arranque ------------------------------------------------------------
ctrl.personas.cambiaJugador( jugador );
ctrl.lugares.ponInicio( locVestBulo );

