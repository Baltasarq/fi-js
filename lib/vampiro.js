// Vampiro (c) Baltasar 2014-2018 MIT License <baltasarq@gmail.com>
/*  Demo de fi.js
    generado por FI.JS@txtMap, v0.1/ v0.6 20140612
    Sun Aug 31 22:46:09 2014

        * Adaptado para fi.js, como demo.

        (c) Jaume Alcazo Castellarnau 1998
        (c) baltasarq 2014

*/


// ------------------------------------------------------ locBiblioteca ---
const locBiblioteca = ctrl.lugares.creaLoc(
    "Biblioteca",
    [ "biblioteca" ],
    "Te hallas en la biblioteca del castillo. Obviamente est&aacute; \
        llena de ${libros, ex libros} interesantes, pero \
        desgraciadamente no tienes \
        tiempo para leerlos.<br>Salidas visibles: ${oeste, oeste}."
);

locBiblioteca.ini = function() {
    this.pic = "res/biblioteca.jpg";
    this.ponSalidaBi( "oeste", locPasillo );
    ctrl.creaObj(
        "libros",
        [ "libro", "libros", "volumenes", "volumen",
              "estantes", "estante", "estanterias", "estanteria",
              "librer&iacute;a" ],
        "Montones de libros, pero no tengo tiempo para leer ahora.",
        locBiblioteca,
        Ent.Escenario
    );
};

const objCrucifijoPlateado = ctrl.creaObj(
    "crucifijo plateado",
    [ "crucifijo" ],
    "Es un peque&ntilde;o crucifijo plateado. Es uno de los cuatro elementos que nos servir&aacute;n para derrotar al vampiro.",
    locBiblioteca,
    Ent.Portable
);

objCrucifijoPlateado.ini = function() {
    this.ponPrenda();

    this.postWear = function() {
        ctrl.logros.logrado( "ortodoxo" );
    };
};

const objPalanca = ctrl.creaObj(
    "palanca",
    [ "palanca" ],
    "Es una palanca de acero toledano. Sirve para forzar cosas.",
    locBiblioteca,
    Ent.Portable
);


// ---------------------------------------------------------- locCocina ---
const locCocina = ctrl.lugares.creaLoc(
    "Cocina",
    [ "cocina", "habitacion", "estancia" ],
    "Est&aacute;s en la cocina del castillo. Esto est&aacute; lleno de \
        ${cacerolas, ex cacerolas} y de ${cacharros, ex cacharros} \
        para cocinar. Hay un ${horno, ex horno}, un \
        ${fregadero, ex fregadero} y un ${armario, ex armario} peque&ntilde;o.\
        <br>Salidas visibles: \
        ${este, este}."
);

locCocina.ini = function() {
    this.pic = "res/cocina.jpg";
    
    ctrl.creaObj(
        "cacerolas",
        [ "cacerolas", "cacerola", "cacharro", "cacharros" ],
        "Simples cacerolas y cacharros de cocina.",
        locCocina,
        Ent.Escenario
    );

    ctrl.creaObj(
        "fregadero",
        [ "fregadero" ],
        "Es un fregadero de piedra. El fregadero est&aacute; vac&iacute;o.",
        locCocina,
        Ent.Escenario
    );

    ctrl.creaObj(
        "horno",
        [ "horno" ],
        "Un simple horno, no tiene ninguna importancia.",
        locCocina,
        Ent.Escenario
    );
};

const objCuchillo = ctrl.creaObj(
    "cuchillo",
    [ "cuchillo" ],
    "Un simple cuchillo de cocina. Pincha.",
    locCocina,
    Ent.Portable
);

const objArmario = ctrl.creaObj(
    "armario",
    [ "armario", "aparador" ],
    "Es un armario de los que se usa para la vajilla. \
         La puerta tiene una peque&ntilde;a cerradura. ",
    locCocina,
    Ent.Escenario
);

objArmario.ini = function() {
    this.ponAbierto( false );
    this.preExamine = function() {
        let toret = objArmario.desc;

        if ( this.estaAbierto() ) {
                toret += "Est&aacute; abierto.";
        } else {
                toret += "Est&aacute; cerrado.";
        }

        return toret;
    };
    this.preOpen = function() {
        let toret = "No puedes abrirlo con eso.";
        const s = parser.sentencia;

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
    };
};

const objRistraDeAjos = ctrl.creaObj(
    "ristra de ajos",
    [ "ristra", "ajos", "ajo" ],
    "Es una ristra entera de ajos que expelen un olor un tanto asqueroso. Es uno de los cuatro elementos que me servir&aacute;n para derrotar al vampiro.",
    ctrl.lugares.limbo,
    Ent.Portable
);

objRistraDeAjos.ini = function() {
    this.ponPrenda();
    this.postWear = function() {
        ctrl.logros.logrado( "temeroso" );
    };
};


// ------------------------------------------------------ locDormitorio ---
const locDormitorio = ctrl.lugares.creaLoc(
    "Dormitorio",
    [ "dormitorio", "habitacion", "estancia" ],
    "Est&aacute;s en un dormitorio no muy grande ni tampoco muy peque&ntilde;o. \
        Es bastante austero. S&oacute;lo hay una ${cama, ex cama} \
        y un ${armario, ex armario}.\
        <br>Salidas visibles: ${este, este}."
);

locDormitorio.ini = function() {
    this.pic = "res/dormitorio.jpg";
    ctrl.creaObj(
        "cama",
        [ "cama" ],
        "Est&aacute; cubierta de ${s&aacute;banas, ex sabanas}.",
        locDormitorio,
        Ent.Escenario
    );
    ctrl.creaObj(
        "armario ropero",
        [ "armario", "ropero" ],
        "El armario ropero est&aacute; vac&iacute;o.",
        locDormitorio,
        Ent.Escenario
    );
};

const objSabanas = ctrl.creaObj(
    "sabanas",
    [ "sabanas" ],
    "Desordenadas y sucias.",
    locDormitorio,
    Ent.Escenario
);

objSabanas.ini = function() {
    this.preExamine = function() {
        let toret = objSabanas.desc;

        if ( objLlavecita.owner == ctrl.lugares.limbo ) {
            objLlavecita.moveTo( locDormitorio );
            toret += " Entre ellas encuentras una peque&ntilde;a \
            ${llavecita, coge llavecita}.";
        }

        return toret;
    };
};

const objLlavecita = ctrl.creaObj(
    "llavecita",
    [ "llavecita", "llave" ],
    "Esta peque&ntilde;a llavecita tiene la pinta de abrir un armario o algo as&iacute;.",
    ctrl.lugares.limbo,
    Ent.Portable
);


// --------------------------------------------------------- locElFinal ---
const locElFinal = ctrl.lugares.creaLoc(
    "El Final",
    [ "habitacion", "estancia" ],
    "Est&aacute;s en una habitaci&oacute;n desnuda. Unicamente hay un \
         ${altar, ex altar} en el centro. \
         Encima del altar puedes ver un ${ataud, ex ataud}.\
         <br>Salidas visibles: ${este, este}."
);

locElFinal.ini = function() {
    this.pic = "res/final.jpg";
    this.audio.src = "res/tension.mp3";
    this.audio.loop = true;
    this.ponSalidaBi( "este", locEscalerasSuperiores );    
    ctrl.creaObj(
        "altar",
        [ "altar" ],
        "Es un altar de dura piedra. Encima de &eacute;ste est&aacute; el \
             ${ataud, ex ataud}.",
        locElFinal,
        Ent.Escenario
    );
};

const objAtaud = ctrl.creaObj(
    "ataud",
    [ "ataud", "sarcofago", "caja", "cajon" ],
    "Una sencilla caja de pino.",
    locElFinal,
    Ent.Escenario
);

objAtaud.ini = function() {
    this.preOpen = function() {
            let toret = "";

            // La estaca
            if ( !ctrl.estaPresente( objTrozoDeMadera ) ) {
                    toret += "Necesitas un estaca que clavar en el \
                              coraz&oacute;n del vampiro.";
            } else {
                    if ( !objTrozoDeMadera.afilado ) {
                            toret += "Podr&iacute;as utilizar el madero, como \
                                      estaca, pero no est&aacute; afilado.";
                    }
            }

            // El martillo
            if ( !ctrl.estaPresente( objMartillo ) ) {
                    toret += "<br/>Falta algo con lo que golpear la estaca";
            }

            // El crucifijo
            if ( !ctrl.estaPresente( objCrucifijoPlateado ) ) {
                    toret += "<br/>Es b&aacute;sica una protecci&oacute;n religiosa";
            } else {
                    if ( !objCrucifijoPlateado.estaPuesto() ) {
                            toret += "<br/>El crucifijo deber&iacute;a colgar de tu \
                                      cuello";
                    }
            }

            // La ristra de ajos
            if ( !ctrl.estaPresente( objRistraDeAjos ) ) {
                    toret += "<br/>Es b&aacute;sica una protecci&oacute;n pagana.";
            } else {
                    if ( !objRistraDeAjos.estaPuesto() ) {
                            toret += "<br/>La protecci&oacute;n del ajo solamente se \
                                      logra si cuelga de tu cuello.";
                    }
            }

            // Es el final?
            if ( toret.length === 0 ) {
                const dvFrame = ctrl.getHtmlPart( "dvFrame", "missing frame div" );

                dvFrame.style.display = "none";
                ctrl.logros.logrado( "matavampiros" );
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
    };
};


// ------------------------------------------------------- locEscaleras ---
const locEscaleras = ctrl.lugares.creaLoc(
    "Escaleras",
    [ "escaleras" ],
    "Te hallas en el final del pasillo. Delante de t&iacute; ves unas \
        escaleras que ${suben, sube} y otras que ${bajan, baja}. \
        Al ${oeste, oeste} est&aacute; \
        el ${dormitorio, oeste} y al ${este, este} \
        la ${sala de estar, este}.<br>Salidas visibles: \
        ${sur, sur}, ${este, este}, ${oeste, oeste}, \
        ${arriba, arriba}, ${abajo, abajo}."
);

locEscaleras.ini = function() {
    this.pic = "res/escaleras.jpg";
    this.ponSalidaBi( "sur", locPasillo );
    this.ponSalidaBi( "este", locSalaDeEstar );
    this.ponSalidaBi( "oeste", locDormitorio );
    this.ponSalidaBi( "arriba", locEscalerasSuperiores );
    this.ponSalidaBi( "abajo", locSotano );
};


// --------------------------------------------- locEscalerasSuperiores ---
const locEscalerasSuperiores = ctrl.lugares.creaLoc(
    "Escaleras superiores",
    [ "escaleras", "rellano" ],
    "Est&aacute;s en el piso superior del castillo. \
    Aqu&iacute; hace m&aacute;s \
    fr&iacute;o que ${abajo, abajo}. Detr&aacute;s de t&iacute; est&aacute;n las \
    escaleras que ${bajan, baja} y \
    hacia el ${oeste, oeste} est&aacute; la ${habitaci&oacute;n, oeste} del \
    vampiro.<br>Salidas visibles: ${oeste, oeste}, ${abajo, abajo}."
);

locEscalerasSuperiores.ini = function() {
    this.pic = "res/escaleras_superiores.jpg";
    this.ponSalidaBi( "oeste", locElFinal );
};


// --------------------------------------------------------- locPasillo ---
const locPasillo = ctrl.lugares.creaLoc(
    "Pasillo",
    [ "pasillo" ],
    "Te encuentras en medio del pasillo principal de este piso. \
         Al ${oeste, oeste} est&aacute; la ${cocina, oeste} y al ${este, este} \
         la ${biblioteca, este}. El pasillo sigue hacia el \
         ${norte, norte}.<br>Salidas visibles: \
         ${norte, norte}, ${sur, sur}, ${este, este}, ${oeste, oeste}."
);

locPasillo.ini = function() {
    this.pic = "res/pasillo.jpg";
    this.ponSalidaBi( "oeste", locCocina );
};

const objTrajeBarato = ctrl.creaObj(
    "traje barato",
    [ "traje" ],
    "Es un traje barato comprado en las rebajas.",
    locPasillo,
    Ent.Portable
);

objTrajeBarato.ini = function() {
    this.ponPrenda();
    this.postWear = function() {
        ctrl.logros.logrado( "pudoroso" );
    };
};


// ----------------------------------------------------- locSalaDeEstar ---
const locSalaDeEstar = ctrl.lugares.creaLoc(
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
        ${oeste, oeste}."
);

locSalaDeEstar.ini = function() {
    this.pic = "res/sala_estar.jpg";
    this.ponSalidaBi( "oeste", locEscaleras );
    ctrl.creaObj(
        "adornos",
        [ "adorno", "adornos" ],
        "Adornan.",
        locSalaDeEstar,
        Ent.Escenario
    );
    ctrl.creaObj(
        "chimenea",
        [ "chimenea" ],
        "Es una chimenea hecha de ladrillos y muy elegante. \
             En ella chisporrotean los ${restos de un fuego, ex fuego}.",
        locSalaDeEstar,
        Ent.Escenario
    );
    ctrl.creaObj(
        "trofeos",
        [ "trofeos", "trofeo" ],
        "Insignificantes trofeos.",
        locSalaDeEstar,
        Ent.Escenario
    );
    ctrl.creaObj(
        "silla",
        [ "silla" ],
        "Una c&oacute;moda silla.",
        locSalaDeEstar,
        Ent.Escenario
    );
    ctrl.creaObj(
        "mesa",
        [ "mesa" ],
        "Una mesa de caoba, bastante grande.",
        locSalaDeEstar,
        Ent.Escenario
    );
};

const objRestos = ctrl.creaObj(
    "restos",
    [ "restos", "fuego" ],
    "Chisporrotean algunas brasas entre madera a&uacute;n por quemar.",
    locSalaDeEstar,
    Ent.Escenario
);

objRestos.preExamine = function() {
        let toret = objRestos.desc;

        if ( objTrozoDeMadera.owner === ctrl.lugares.limbo ) {
                toret += " Entre los restos del fuego encuentras un \
                           ${trozo de madera, coge palo}.";
                objTrozoDeMadera.moveTo( locSalaDeEstar );
        }

        return toret;
};

const objTrozoDeMadera = ctrl.creaObj(
    "palo",
    [ "trozo", "madera", "madero", "estaca" ],
    "Un trozo de madera, rectangular y alargado.",
    ctrl.lugares.limbo,
    Ent.Portable
);

objTrozoDeMadera.ini = function() {
    this.afilado = false;
    this.preExamine = function() {
        let toret = objTrozoDeMadera.desc;

        if ( objTrozoDeMadera.afilado ) {
                toret += " Ahora parece una estaca.";
        }

        return toret;
    };
    this.preAttack = function() {
        return actions.execute( "sharpen", "madero" );
    };
    this.preSharpen = function() {
        const S = parser.sentencia;
        let toret = "No puedes afilarlo con eso.";

        if ( S.obj2 === null
          || S.obj2 === this )
        {
            S.obj2 = objCuchillo;
        }

        if ( !ctrl.estaPresente( S.obj2 ) ) {
            toret = "No puedes afilarlo as&iacute;.";
        }
        else
        if ( S.obj2 === objCuchillo ) {
            toret = "Ya estaba afilado.";

            if ( !this.afilado ) {
                toret = "Has afilado el madero con el cuchillo.";
                this.afilado = true;
                ctrl.logros.logrado( "estaca" );
            }
        }

        return toret;
    };
};


// ---------------------------------------------------------- locSotano ---
const locSotano = ctrl.lugares.creaLoc(
    "S&oacute;tano",
    [ "sotano" ],
    "En este peque&ntilde;o s&oacute;tano hace mucho calor, sientes una \
        sensaci&oacute;n de recogimiento. Est&aacute; todo muy sucio. Hay un \
        ${barril, ex barril} \
        aqu&iacute;, tambi&eacute;n hay unas escaleras que \
        ${suben, arriba}.<br>Salidas visibles: \
        ${arriba, arriba}."
);

locSotano.ini = function() {
    this.pic = "res/sotano.jpg";
    this.audio.src = "res/goteo_agua.mp3";
    this.audio.loop = true;
};

const objBarril = ctrl.creaObj(
    "barril",
    [ "barril", "tapa", "hendidura", "muesca" ],
    "Se trata de un barril con tapa, que presenta una peque&ntilde;a  \
        hendidura.",
    locSotano,
    Ent.Escenario
);

objBarril.ini = function() {
    this.ponAbierto( false );

    this.preExamine = function() {
        let toret = this.desc;

        if ( this.estaAbierto() ) {
                toret += " Est&aacute; vac&iacute;o.";
        } else {
                toret += " No puedes ver lo que hay dentro del barril \
                     porque est&aacute; cerrado.";
        }

        return toret;
    };

    this.preOpen = function() {
        const S = parser.sentencia;
        let toret = "No puedes abrirlo con eso.";

        if ( S.obj2 === null ) {
            S.obj2 = objPalanca;
        }

        if ( !ctrl.estaPresente( S.obj2 ) ) {
            toret = "No puedes abrirlo as&iacute;.";
        }
        else
        if ( S.obj2 === objPalanca ) {
            toret = "Ya estaba abierto.";

            if ( !this.estaAbierto() ) {
                toret = "Lo has abierto con la palanca, haciendo \
                         fuerza en uno de los bordes de \
                         la tapa, en donde la hendidura.";

                this.ponAbierto();
                objMartillo.mueveA( this.owner );
                toret += " Dentro hab&iacute;a un \
                           ${martillo, coge martillo}.";
            }
        }

        return toret;
    };
};

const objMartillo = ctrl.creaObj(
    "martillo",
    [ "martillo", "maza" ],
    "Un martillo grande. Es uno de los elementos que me \
     permitir&aacute;n acabar con el vampiro.",
    ctrl.lugares.limbo,
    Ent.Portable
);

objMartillo.ini = function() {
    this.postTake = function() {
        ctrl.logros.logrado( "carpintero" );
    };
};


// ------------------------------------------------------- locVestibulo ---
const locVestibulo = ctrl.lugares.creaLoc(
    "Vest&iacute;bulo",
    [ "vestibulo", "habitacion", "estancia" ],
    "Est&aacute;s en el vest&iacute;bulo del castillo. El ambiente es muy \
        h&uacute;medo y fr&iacute;o. \
        Est&aacute;s en un pasillo que se extiende hacia el \
        ${norte, norte}. Al ${sur, sur} queda la \
        ${puerta de entrada, ex puerta} al castillo.<br>Salidas \
        visibles: ${norte, norte}."
);

locVestibulo.ini = function() {
    this.pic = "res/vestibulo.jpg";
    this.ponSalidaBi( "norte", locPasillo );
    this.preGo = function() {
        const S = parser.sentencia;
        let toret = "";

        if ( S.term1 != "sur" ) {
            toret = acciones.devAccion( "go" ).exe( S );
        } else {
            toret = objPuertaEntrada.desc;
        }

        return toret;
    };
};

const objPuertaEntrada = ctrl.creaObj(
    "puerta",
    [ "entrada" ],
    "No es el momento de irse, &iexcl;acabas de llegar! Debes cumplir \
         tu misi&oacute;n.",
    locVestibulo,
    Ent.Escenario
);

objPuertaEntrada.ini = function() {
    this.preExamine = function() {
        ctrl.logros.logrado( "cobardica" );
        return this.desc;
    };

    this.preOpen = function() {
        return actions.execute( "examine", "puerta" );
    };
};


// --- Jugador y otras personas -------------------------------------------
const jugador = ctrl.personas.creaPersona( "reXXe",
                    [ "rexxe", "cazador", "cazavampiros" ],
                    "reXXe, un experimentado caza vampiros.",
                    locVestibulo
);

const murcielagos = ctrl.personas.creaPersona(
                    "murci&eacute;lagos",
                    [ "murcielago", "murcielagos" ],
                    "^{Oscuras, y, adivinas, peludas formas. } \
                     Varios murci&eacute;lagos, no parecen saber \
                     muy bien qu&eacute; pensar de ti.",
                    ctrl.lugares.limbo
);

murcielagos.ini = function() {
    murcielagos.ponAlcanzable( false );

    murcielagos.daemon = function() {
        if ( ctrl.getTurns() % 7 == 0 ) {
            if ( ctrl.lugares.getCurrentLoc() == murcielagos.owner ) {
                    ctrl.print( "Unos murci&eacute;lagos se alborotan un tanto, chillando entre ellos..." );
                    ctrl.audio.set( "res/murcielagos.mp3" );
            } else {
                    ctrl.print( "Ahogados, d&eacute;biles chillidos provienen de alguna parte..." );
            }
        }
    };

    ctrl.ponAlarma( 3, function() {
        murcielagos.mueveA( locPasillo );

        if ( ctrl.lugares.devLocActual() == murcielagos.owner ) {
            ctrl.print( "Despertados por tu presencia, los murci&eacute;lagos chillan como comenzando a desperezarse..." );
            ctrl.audio.set( "res/murcielagos.mp3" );
        } else {
            ctrl.print( "Unos lejanos chillidos llegan a ti de forma apagada..." );
        }

        ctrl.ponDaemon( "bats", murcielagos.daemon );
    });
};

murcielagos.preTalk = function() {
    ctrl.logros.logrado( "charlatan" );
    return "¿Pero para qu&eacute;? \
            ...no molestes a los pobres murci&eacute;lagos...";
};

locPasillo.preSing = function() {
    return "Buscas a algun incauto para tu perpretaci&oacute;n...<br>"
                + acciones.ejecuta( "talk", "murcielagos" );
};


// --- Acciones --------------------------------------------------------
const sharpenAction = acciones.crea( "sharpen",
    [ "afila", "afilar", "afilo",
        "pule", "pulir", "pulo"]
);

sharpenAction.exe = function(s) {
    let toret = "No veo de eso en derredor.";

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
    let toret = "No veo de eso en derredor.";

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


// Boot --------------------------------------------------------------
ctrl.ini = function() {
    // Logros
    ctrl.logros.add( "charlatan", "Charlatán (molestaste a los murciélagos)." );
    ctrl.logros.add( "cobardica", "Cobarde (intentaste salir del castillo)." );
    ctrl.logros.add( "pudoroso", "Pudoroso (te pusiste el traje)." );
    ctrl.logros.add( "estaca", "El afilador (afilaste la estaca)." );
    ctrl.logros.add( "temeroso", "Temeroso (te pusiste los ajos)." );
    ctrl.logros.add( "ortodoxo", "Ortodoxo (te pusiste el crucifijo)." );
    ctrl.logros.add( "carpintero", "Carpintero (encontraste el martillo)." );
    ctrl.logros.add( "matavampiros", "Matavampiros (mataste al vampiro)." );

    // Arranque
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
                    de <a target=\"_blank\" \
                    href=\"http://caad.es/baltasarq/prys/fi.js/\">fi.js</a>\
                    </i></p>" );
    ctrl.ponImg( "res/portada_vampiro.jpg" );
    ctrl.ponAutor( "baltasarq" );
    ctrl.ponVersion( "20230914" );

    ctrl.personas.cambiaJugador( jugador );
    ctrl.lugares.ponInicio( locVestibulo );
};
