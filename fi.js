// fi.js
/**
 * Motor de ficc. interactiva (fi.js IF Engine)
 * Licencia MIT (c) baltasar@gmail.com 201405
 */

var Ent = function() {
    this.isScenery = function()
    {
        return this.scenery;
    };
    this.esEscenario = this.isScenery;

    this.setScenery = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.scenery = v;
    };
    this.ponEscenario = this.setScenery;

    this.isContainer = function()
    {
        return this.container;
    }
    this.esContenedor = this.isContainer;

    this.setContainer = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.container = v;
    }
    this.ponContenedor = this.setContainer;

    this.isReachable = function()
    {
        return this.reachable;
    };
    this.esAlcanzable = this.isReachable;

    this.setReachable = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.reachable = v;
    };
    this.ponAlcanzable = this.setReachable;

    this.moveTo = function(newOwner)
    {
        if ( arguments.length === 0
          || newOwner == null )
        {
            newOwner = ctrl.places.limbo;
        }

		if ( this.owner != newOwner ) {
			// Remove from current owner
			if ( this.owner != null ) {
				var i = this.owner.objs.indexOf( this );

				if ( i >= 0 ) {
					this.owner.objs.splice( i, 1 );
				}
			}

			// Put in new owner
			this.owner = newOwner;
			newOwner.objs.push( this );
		}

		return;
    }
    this.mueveA = this.moveTo;

    this.isOpen = function()
    {
        return this.open;
    }
    this.estaAbierto = this.isOpen;

    this.setOpen = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.open = v;
    }
    this.ponAbierto = this.setOpen;

    this.has = function(obj) {
        return ( this.objs.indexOf( obj ) > -1 );
    }
    this.tiene = this.has;

    this.getObjById = function(strObj) {
        var toret = false;

        for(var i = 0; i < this.objs.length; ++i) {
            var obj = this.objs[ i ];
            var objIds = obj.syn.concat( obj.id );

            if ( objIds.indexOf( strObj ) > -1 ) {
                toret = true;
                break;
            }
        }

        return toret;
    }
    this.devObjPorId = this.getObjById;

    this.isVisible = function(persona) {
        var owner = this.owner;
        var loc = ctrl.places.getCurrentLoc();

        if ( arguments.length < 1
          || persona == null )
        {
            persona = ctrl.personas.getPlayer();
        }

        while( owner !== persona
            && owner !== loc
            && owner.isOpen() )
        {
            owner = owner.owner;
        }

        return ( owner === persona
              || owner === loc );
    }
    this.esVisible = this.isVisible;
};

Ent.Scenery = true;
Ent.Escenario = true;
Ent.Portable = false;

var Loc = function(n, i, s, d) {
    Ent.call( this );

    this.num = n;
    this.id = i.trim();
    this.syn = s;
    this.desc = d;
    this.visits = 0;

    this.scenery = true;
    this.container = true;
    this.reachable = true;
    this.open = true;
    this.pic = null;
    this.audio = {
        "src": null,
        "volume": 0.5,
        "loop": false,
    };

    this.objs = [];
    this.personas = [];

    this.compas = [ "norte", "sur", "este", "oeste", "arriba", "abajo" ];
    this.brevCompas = [ "n", "s", "e", "o", "ar", "ab" ];
    this.exits = [ null, null, null, null, null, null ];
    this.salidas = this.exits;

    this.setScenery = function (v) {}
    this.ponEscenario = this.setScenery;
    this.setReachable = function(v) {}
    this.ponAlcanzable = this.setReachable;
    this.setContainer = function(v) {}
    this.ponContenedor = this.setcontainer;
    this.setOpen = function(v) {}
    this.ponAbierto = this.setOpen;
    this.moveTo = function(x) {}
    this.mueveA = this.moveTo;

    this.has = function(obj) {
        return ( this.objs.indexOf( obj ) > -1 ) || ( this.personas.indexOf( obj ) > -1 );
    }
    this.tiene = this.has;

    this.cnvtStrToExitOrd = function(s)
    {
        var toret = -1;

        if ( s != null ) {
            s = s.trim().toLowerCase();

            for(var i = 0; i < this.compas.length; ++i) {
                if ( this.compas[ i ] === s ) {
                    toret = i;
                    break;
                }
            }
        }

        return toret;
    }

    this.setExit = function(strDir, loc)
    {
        var numExit = this.cnvtStrToExitOrd( strDir );

        if ( numExit > -1 ) {
            this.exits[ numExit ] = loc;
        }

        return;
    }

    this.ponSalida = this.setExit;

    this.getInvExit = function(ne)
    {
        var toret = -1;

        if ( ne != null ) {
            if ( ( ne % 2 ) == 0 ) {
                toret = ne + 1;
            } else {
                toret = ne - 1;
            }
        }

        return toret;
    }

    this.devInvSalida = this.getInvExit;

    this.setExitBi = function(strDir, loc)
    {
        var numExit = this.cnvtStrToExitOrd( strDir );
        var numInvExit = this.getInvExit( numExit );

        if ( numExit > -1
          && numInvExit > -1 )
        {
            this.exits[ numExit ] = loc;
            loc.exits[ numInvExit ] = this;
        }

        return;
    }

    this.ponSalidaBi = this.setExitBi;

    this.getExit = function(strDir)
    {
        var toret = null;
        var numExit = this.cnvtStrToExitOrd( strDir );

        if ( numExit > -1 ) {
            toret = this.exits[ numExit ];
        }

        return toret;
    }

    this.devSalida = this.getExit;

    this.doEachTurn = function() {
        return;
    }

    this.hazCadaTurno = this.doEachTurn;
};

var Obj = function(n, i, s, l, d) {
    Ent.call( this );

    this.num = n;
    this.id = i.trim();
    this.desc = d;
    this.syn = s;
    this.owner = l;

    this.objs = [];
    this.container = false;
    this.scenery = false;
    this.reachable = true;
    this.clothing = false;
    this.worn = false;
    this.open = true;
    this.closeable = false;

    this.isCloseable = function()
    {
        return this.closeable;
    }
    this.esCerrable = this.isCloseable;

    this.setCloseable = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.closeable = v;
    }
    this.ponCerrable = this.setCloseable;

    this.isClothing = function()
    {
        return this.clothing;
    }
    this.esPrenda = this.isClothing;

    this.setClothing = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.clothing = v;
    }

    this.ponPrenda = this.setClothing;

    this.setWorn = function(v)
    {
        if ( arguments.length === 0 ) {
            v = true;
        }

        this.setClothing();
        this.worn = v;
    }

    this.ponPuesto = this.setWorn;

    this.isWorn = function()
    {
        return ( this.isClothing() && this.worn );
    }

    this.estaPuesto = this.isWorn;
};

var Persona = function(n, i, l, d) {
    Ent.call( this );

    this.num = n;
    this.turns = 0;
    this.score = 0;
    this.id = i.trim();
    this.desc = d;
    this.owner = l;
    this.objs = [];
    this.syn = [];
    this.container = true;
    this.scenery = true;
    this.reachable = true;
    this.open = true;

    this.preAction = function() {
        return "";
    }

    this.postAction = function() {
    }

    this.getNameForPrinting = function()
    {
        var toret = this.id.toLowerCase();

        return toret[ 0 ].toUpperCase() + toret.slice( 1 );
    }

    this.say = function(txt) {
        ctrl.print( "<b>" + this.getNameForPrinting()
                          + "</b>: " + txt );
    }
    this.di = this.say;

    this.moveTo = function(newOwner) {
        if ( arguments.length === 0
          || newOwner == null )
        {
            newOwner = ctrl.places.limbo;
        }

		if ( this.owner != newOwner ) {
			// Remove from current owner
			if ( this.owner != null ) {
				var i = this.owner.personas.indexOf( this );

				if ( i >= 0 ) {
					this.owner.personas.splice( i, 1 );
				}
			}

			// Put in new owner
			this.owner = newOwner;
			newOwner.personas.push( this );
		}

		return;
    }
    this.mueveA = this.moveTo;
};

var ctrl = ( function() {
    var tit = "Ficción interactiva";
    var intro = "¡Comienza la aventura!";
    var pic = null;
    var aut = "";
    var version = "";
    var turns = 1;
    var useScore = false;
    var alarms = [];
    var daemons = {};

    function Alarm(turns, trigger) {
		this.turns = turns;
		this.event = trigger;
	}

    function Daemon(id, fn) {
        this.id = id;
        this.fn = fn;
    }

	function setAlarm(turns, f) {
		alarms.push( new Alarm( turns, f ) );
	}

    function addDaemon(id, fn) {
        if ( arguments.length != 2 ) {
            ctrl.showError( "addDaemon(): need 2 args: id and fn" );
            return;
        }

        daemons[ id ] = new Daemon( id, fn );
    }

    function getDaemon(id) {
        if ( arguments.length != 1 ) {
            ctrl.showError( "getDaemon(): need 1 arg: id" );
            return;
        }

        return daemons[ id ];
    }

    function removeDaemon(id) {
        if ( arguments.length != 1 ) {
            ctrl.showError( "removeDaemon(): need 1 arg: id" );
            return;
        }

        if ( !daemons.hasOwnProperty( id ) ) {
            ctrl.showError( "missing daemon with id: " + id );
            return;
        }

        delete daemons.id;
    }

    function hasScore() {
		return this.useScore;
	}

	function setUseScore(useIt) {
		if ( arguments.length < 1 ) {
			useIt = true;
		}

		this.useScore = useIt;
	}

    function getAuthor()
    {
        return aut;
    }

    function setAuthor(a)
    {
        aut = a;
    }

    function getTitle()
    {
        return tit;
    }

    function setTitle(t)
    {
        tit = t;
    }

    function getVersion()
    {
        return version;
    }

    function setVersion(v)
    {
        version = v;
    }

    function getPic()
    {
        return pic;
    }

    function setPic(p)
    {
        pic = p;
    }

    function getIntro()
    {
        return intro;
    }

    function setIntro(i)
    {
        intro = i;
    }

    function setNewTurn() {
		var player = personas.getPlayer();

        ++turns;
        ++player.turns;

        // Check alarms
        for(var i = 0; i < alarms.length; ++i) {
			--alarms[ i ].turns;

			if ( alarms[ i ].turns <= 0
			  && alarms[ i ].event != null )
			{
				alarms[ i ].event();
				alarms.splice( i, 1 );
			}
		}

        // Run daemons
        for(var key in daemons) {
            if ( daemons.hasOwnProperty( key ) ) {
                daemons[ key ].fn();
            }
        }

        return;
    }

    function getTurns() {
        return turns;
    }

    /**
     * Returns whether the object is being carried or present in loc.
     * @param obj The object to check
     * @return true if present, false otherwise.
     */
    function isPresent(obj)
    {
        return ( ctrl.places.getCurrentLoc().has( obj )
              || ctrl.personas.getPlayer().has( obj ) );
    }

    /**
     * Returns the object corresponding with the name,
     * provided is carried by the object, present
     * in the current loc, or inside a container.
     * @param objName
     * @return a reference if found, null otherwise.
     */
    function isObjAround(objName)
    {
        var toret = null;

        if ( objName != null ) {
            var loc = ctrl.places.getCurrentLoc();
            var player = ctrl.personas.getPlayer();

            toret = ctrl.lookUpObj( player, objName );

            if ( toret == null ) {
                toret = ctrl.lookUpObj( loc, objName );

                if ( toret == null ) {
                    toret = lookUpPersona( loc, objName );
                }
            }
        }

        return toret;
    }

    function lookUpPersona(loc, w)
    {
		var toret = null;
		var personas = loc.personas;

		w = parser.canonical( w );

		for(var i = 0; i < loc.personas.length; ++i) {
			var persona = loc.personas[ i ];
			var idsPersona = persona.syn.concat( parser.canonical( persona.id ) );

			if ( idsPersona.indexOf( w ) > -1 ) {
				toret = persona;
				break;
			}
		}

		return toret;
	}

    function lookUpObj(container, w)
    {
        var toret = null;
        var id = parser.canonical( container.id );
        var containerIds = container.syn.concat( id );

        w = parser.canonical( w );

        // Is this loc?
        if ( containerIds.indexOf( w ) > -1 ) {
            toret = container;
        } else {
            // Look in objects
            var targets = container.objs;

            if ( container instanceof Loc ) {
                targets = targets.concat( container.personas );
            }

            for(var i = 0; i < targets.length; ++i) {
                var obj = targets[ i ];
                var idsObj = obj.syn.concat( parser.canonical( obj.id ) );

                if ( idsObj.indexOf( w ) > -1 ) {
                    toret = obj;
                    break;
                }
                else
                if ( obj.isContainer()
                  && obj.isOpen() )
                {
                    toret = lookUpObj( obj, w );

                    if ( toret != null ) {
                        break;
                    }
                }
            }
        }

        return toret;
    }

    function inject(txt, enter, replace)
    {
        var edInput = getHtmlPart( "edInput", "missing input edit" );
        var btSend = getHtmlPart( "btSend", "missing send button" );

        if ( arguments.length < 1 ) {
            txt = "";
            enter = false;
        }
        else
        if ( arguments.length < 2 ) {
            enter = true;
        }
        else
        if ( arguments.length < 3 ) {
            replace = true;
        }

        if ( replace ) {
                edInput.value = txt;
        } else {
            edInput.value += txt;
        }


        if ( enter ) {
            btSend.click();
        }

        edInput.focus();
        return false;
    }

    function print(msg)
    {
        var dvAnswer = getHtmlPart( "dvAnswer", "missing answer div" );
        var pAnswer = document.createElement( "p" );

        pAnswer.innerHTML = cnvtTextLinksToHtml( msg );
        dvAnswer.appendChild( pAnswer );
    }

    function endGame(msg, pic)
    {
        var dvInput = getHtmlPart( "dvInput", "missing input div" );
        var dvAnswer = getHtmlPart( "dvAnswer", "missing input div" );
        var dvDesc = getHtmlPart( "dvDesc", "missing desc div" );
        var dvId = getHtmlPart( "dvId", "missing id div" );
        var dvPic = getHtmlPart( "dvPic", "missing pic div" );

        if ( arguments.length < 2 ) {
            pic = null;
        }
        else
        if ( arguments.length < 1 ) {
            msg = "Has ganado.";
        }

        // Eliminate input possibilities and extra stuff
        dvInput.style.display = "none";
        dvId.style.display = "none";
        dvAnswer.style.display = "none";
        ctrl.media.audio.stop();

        // Erase desc
        dvDesc.innerHTML = "";

        // Hide the old picture and display the new one
        dvPic.style.display = "none";
        dvPic = document.createElement( "div" );
        dvDesc.appendChild( dvPic );
        dvPic.style.display = "none";

        if ( pic != null ) {
            var pImg = document.createElement( "p" );
            var img = document.createElement( "img" );

            pImg.setAttribute( "align", "center" );
            img.setAttribute( "src", pic );
            img.setAttribute( "alt", "game over" );
            pImg.appendChild( img );
            dvPic.appendChild( pImg );
            dvPic.style.display = "block";
        }

        // Show end game text
        var pDesc = document.createElement( "p" );
        pDesc.style.textAlign = "justify";
        pDesc.innerHTML = msg;
        dvDesc.appendChild( pDesc );


        return;
    }

    /**
     * Converts text links to HTML
     * i.e., from ${perro, ex perro} embedded in text to
     * <a href="javascript:ctrl.inject('ex perro')">perro</a>
     * @param txt The text with the link
     * @return A string with the HTML link
     */
    function cnvtTextLinksToHtml(txt)
    {
        var linkEndPos = 0;
        var linkPos = txt.indexOf( "${" );

        while( linkPos > -1 ) {
            linkEndPos = txt.indexOf( '}', linkPos + 2 );

            if ( linkEndPos > -1 ) {
                var txtLink = txt.slice( linkPos + 2, linkEndPos );
                var parts = txtLink.split( ',' );
                var link = "<a onClick=\"javascript: ctrl.inject('"
                            + parts[ 1 ]
                            + "')\" href='javascript:void(0)'>"
                            + parts[ 0 ]
                            + "</a>";
                txt = txt.slice( 0, linkPos ) + link
                    + txt.slice( linkEndPos + 1 );
            }

            linkPos = txt.indexOf( "${", Math.max( linkPos + 2, linkEndPos ) );
        }

        return txt;
    }

    var places = ( function() {
        var locs = [];
        var start = null;
        var current = null;
        var limbo = creaLoc( "limbo", [ "limbo" ], "limbo" );

        function getLocByNum(i)
        {
            var toret = null;

            if ( arguments.length > 0 ) {
                for (var n = 0; n < locs.length; ++n) {
                    var loc = locs[ n ];

                    if ( loc.num === i ) {
                        toret = loc;
                        break;
                    }
                }
            }

            return toret;
        }

        function getLocById(x)
        {
            var toret = null;

            if ( arguments.length > 0 ) {
                for (var n = 0; n < locs.length; ++n) {
                    var loc = locs[ n ];

                    if ( loc.id === x ) {
                        toret = loc;
                        break;
                    }
                }
            }

            return toret;
        }

        function getCurrentLoc()
        {
            var toret = current;

            if ( toret == null ) {
                ctrl.showError( "current loc not found" );
                throw "current loc not found";
            }

            return toret;
        }

        function setCurrentLoc(l)
        {
            current = l;
        }

        function creaLoc(id, syn, desc)
        {
            var toret = new Loc( locs.length, id, syn, desc );

            locs.push( toret );
            return toret;
        }

        function getStart() {
            return start;
        }

        function setStart(v) {
            start = v;
        }

        function doDesc(loc, desc)
        {
            // Remove any pending answer
            ctrl.getHtmlPart( "dvAnswer", "missing div answer" ).innerHTML = "";

            // Desc
            if ( arguments.length < 1
              || loc == null )
            {
                loc = ctrl.places.getCurrentLoc();
            }

            if ( arguments.length < 2
              || desc == null )
            {
                desc = loc.desc;
            }

            updateDesc( loc, desc );
            ++loc.visits;
        }

        function updateDesc(loc, desc)
        {
            var dvId = ctrl.getHtmlPart( "dvId", "missing div loc.id" );
            var dvDesc = ctrl.getHtmlPart( "dvDesc", "missing div loc.desc" );
            var dvPic = ctrl.getHtmlPart( "dvPic", "missing div loc.pic" );

            if ( arguments.length < 1
              || loc == null )
            {
                loc = ctrl.places.getCurrentLoc();
            }

            if ( arguments.length < 2
              || desc == null )
            {
                desc = loc.desc;
            }

            // Set loc's id
            var id = document.createElement( "h2" );
            id.innerHTML = loc.id;
            dvId.innerHTML = "";
            dvId.appendChild( id );

            // Set loc's pic
            if ( loc.pic != null ) {
                var pimg = document.createElement( "p" );
                var img = document.createElement( "img" );
                img.setAttribute( "src", loc.pic );
                pimg.appendChild( img );
                dvPic.innerHTML = "";
                dvPic.appendChild( pimg );
            } else {
                dvPic.innerHTML = "";
            }

            // Set loc's audio
            media.audio.stop();
            if ( loc.audio.src != null ) {
                media.audio.set(
                    loc.audio.src, loc.audio.volume, loc.audio.loop
                );
            }

            // Set loc's desc
            var objsDesc = ctrl.list( loc );
            var pDesc = document.createElement( "p" );
            pDesc.innerHTML = ctrl.cnvtTextLinksToHtml( desc )
                    + ctrl.cnvtTextLinksToHtml( objsDesc );

            if ( loc.personas.length > 1 ) {
					var personasDesc = ctrl.listPersonas( loc );
                    pDesc.innerHTML += "<p>Aqu&iacute; puedes ver a: "
							+ ctrl.cnvtTextLinksToHtml( personasDesc );
            }

            dvDesc.innerHTML = "";
            dvDesc.appendChild( pDesc );

            actual = loc;
            return;
        }

        return {
            "locs": locs,
            "limbo": limbo,
            "creaLoc": creaLoc,
            "newLoc": creaLoc,
            "setStart": setStart,
            "getStart": getStart,
            "ponInicio": setStart,
            "devInicio": getStart,
            "doDesc": doDesc,
            "hazDesc": doDesc,
            "updateDesc": updateDesc,
            "actualizaDesc": updateDesc,
            "getCurrentLoc": getCurrentLoc,
            "setCurrentLoc": setCurrentLoc,
            "devLocActual": getCurrentLoc,
            "ponLocActual": setCurrentLoc,
            "getLocByNum": getLocByNum,
            "devLocPorNum": getLocByNum,
            "getLocById": getLocById,
            "devLocPorId": getLocById,
        };
    })();

    var media = ( function() {
        var colorIdsEn = [ "input",   "back",  "foreground", "desc", "answer",    "link",      "resaltedlink" ];
        var colorIdsEs = [ "entrada", "fondo", "tinta",      "desc", "respuesta", "enlace",    "enlaceresaltado" ];
        var colors     = [ "white",   "black", "white",      "white", "gray",     "lightgray", "white" ];

        function getIndexFromId(id)
        {
            var toret = -1;

            id = id.trim().toLowerCase();

            // Chk for english ids
            for(var i = 0; i < colorIdsEn.length; ++i) {
                if ( colorIdsEn[ i ] === id ) {
                    toret = i;
                    break;
                }
            }

            if ( toret === -1 ) {
                // Chk for spanish ids
                for(var i = 0; i < colorIdsEs.length; ++i) {
                    if ( colorIdsEs[ i ] === id ) {
                        toret = i;
                        break;
                    }
                }
            }

            return toret;
        }

        function getColor(id)
        {
            var toret = "black";
            var index = getIndexFromId( id );

            if ( index >= 0 ) {
                toret = colors[ index ];
            }

            return toret;
        }

        function setColor(id, v)
        {
            // Now managed with CSS
            /*
            var toret = false;
            var index = getIndexFromId( id );

            if ( index >= 0 ) {
                colors[ index ] = v;
                toret = true;
            }

            return toret;
            */

            return true;
        }

        var audio = ( function() {
            var playing = null;

            function play()
            {
                if ( playing != null ) {
                    playing.play();
                }

                return;
            }

            function stop()
            {
                pause();
                playing = null;
            }

            function pause()
            {
                if ( playing != null ) {
                    playing.pause();
                }

                return;
            }

            function setVolume(v)
            {
                if ( playing != null ) {

                    v = parseFloat( v );
                    if ( isNaN( v ) ) {
                        v = 0;
                    }

                    playing.volume = v;
                }

                return;
            }

            function set(src, v, loop)
            {
				/*
                stop();
                playing = new Audio( src );
                setVolume( v );

                if ( loop ) {
                    playing.addEventListener( 'ended', function() {
                        playing.currentTime = 0;
                        playing.play();
                    }, false);
                }

                play();
                */
            }

            return {
                "playing": playing,
                "reproduce": play,
                "play": play,
                "stop": stop,
                "para": stop,
                "pause": pause,
                "pausa": pause,
                "setVolume": setVolume,
                "ponVolumen": setVolume,
                "set": set,
            };
        })();

        return {
            "getColor": getColor,
            "setColor": setColor,
            "cambiaColor": setColor,
            "devColor": getColor,
            "audio": audio,
        };
    })();

    function creaObj(id, syn, desc, loc, isScenery)
    {
        var toret = new Obj( loc.objs.length, id, syn, loc, desc );

        toret.setScenery( isScenery );
        loc.objs.push( toret );
        return toret;
    }

    var personas = ( function() {

        var player = null;
        var personas = [];

        function creaPersona(id, syn, desc, loc)
        {
            var toret = new Persona( personas.length, id, loc, desc );
            toret.syn = syn;

            loc.personas.push( toret );
            personas.push( toret );
            return toret;
        }

        function getPersonaByNum(i)
        {
            var toret = null;

            if ( arguments.length > 0 ) {
                for (var n = 0; n < personas.length; ++n) {
                    var persona = personas[ n ];

                    if ( persona.num === i ) {
                        toret = persona;
                        break;
                    }
                }
            }

            return toret;
        }

        function getPersonaById(x)
        {
            var toret = null;

            if ( arguments.length > 0 ) {
                for (var n = 0; n < personas.length; ++n) {
                    var persona = personas[ n ];

                    if ( persona.id === x ) {
                        toret = persona;
                        break;
                    }
                }
            }

            return toret;
        }

        function changePlayer(p)
        {
            if ( player != null ) {
                player.syn = [];
            }

            player = p;
            preparePlayer( player );
        }

        function getPlayer()
        {
            if ( player == null ) {
                showError( "jugador no encontrado" );
                throw "jugador no encontrado";
            }

            if ( player.syn.length === 0 ) {
                preparePlayer( player );
            }

            return player;
        }

        function preparePlayer(player)
        {
            player.syn.push( "te" );
            player.syn.push( "me" );
            player.syn.push( "yo" );
            player.syn.push( "jugador" );
            return;
        }

        return {
            "personas": personas,
            "creaPersona": creaPersona,
            "getPersonaByNum": getPersonaByNum,
            "devPersonaPorNum": getPersonaByNum,
            "getPersonaById": getPersonaById,
            "devPersonaPorId": getPersonaById,
            "newPersona": creaPersona,
            "cambiaJugador": changePlayer,
            "changePlayer": changePlayer,
            "devJugador": getPlayer,
            "getPlayer": getPlayer,
        };
    })();

    function showError(msg)
    {
        var dvError = document.getElementById( "dvError" );
        var pError = document.createElement( "p" );

        pError.style.color = "white";
        pError.style.backgroundColor = "red";
        pError.innerHTML = "ERROR: " + msg;
        dvError.appendChild( pError );
    }

    function goto(loc, persona)
    {
        var currentLoc = ctrl.places.getCurrentLoc();

        if ( arguments.length == 1 ) {
            persona = personas.getPlayer();
        }

        persona.moveTo( loc );
        ctrl.places.setCurrentLoc( loc );

        actions.execute( "look" );
        return;
    }

    /**
     * Returns a part of the HTML document.
     * @param partId the id of the part to find
     * @param msgError the error to show, if it is not found.
     * @return the part, if everything ran smoothly.
     */
    function getHtmlPart(partId, msgError)
    {
        if ( arguments.length < 1 ) {
            partId = "theThingThatShouldNotBe";
        }

        if ( arguments.length < 2 ) {
            msgError = partId + " html element not found";
        }

        var toret = document.getElementById( partId );

        if ( toret == null ) {
            showError( msgError );
            throw msgError;
        }

        return toret;
    }

    /**
     * This is called when the user starts to play.
     */
    function boot()
    {
        var dvFi = getHtmlPart( "dvFi", "div Fi not found" );
        var dvIntro = getHtmlPart( "dvIntro", "div Intro not found" );
        var frmInput = getHtmlPart( "frmInput", "form Input not found" );
        var dvHead = document.getElementsByTagName( "head" )[ 0 ];
        var dvHeadStyle = document.createElement( "style" );
        var startLoc = ctrl.places.getStart();

        ctrl.places.setCurrentLoc( startLoc );
        goto( startLoc );
        dvIntro.style.display = "none";
        dvFi.style.display = "block";
        frmInput.style.display = "block";

        frmInput.reset();
        frmInput[ "edInput" ].focus();
        return false;
    }

    /**
     * This is the function to be called in order to start playing.
     */
    function start()
    {
        var dvTitle = getHtmlPart( "dvTitle", "div title not found" );
        var dvFi = getHtmlPart( "dvFi", "div Fi not found" );
        var dvIntro = getHtmlPart( "dvIntro", "div Intro not found" );
        var edInput = getHtmlPart( "edInput", "edit input in form input not found" );
        var btSend = getHtmlPart( "btSend", "button send in form input not found" );
        var btReset = getHtmlPart( "btReset", "button reset in form input not found" );
        var hdTitle = document.createElement( "h1" );
        var body = document.getElementsByTagName( "body" )[ 0 ];

        // Prepare web page
        dvIntro.style.display = "block";
        dvFi.style.display = "none";
        document.title = ctrl.getTitle();
        hdTitle.innerHTML = ctrl.getTitle();
        dvTitle.appendChild( hdTitle );

        // Prepare intro
        var pIntro = document.createElement( "p" );
        pIntro.innerHTML = ctrl.getIntro();
        dvIntro.insertBefore( pIntro, getHtmlPart( "frmIntro", "missing intro form" ) );

        if ( ctrl.getPic() != null ) {
            var dvImgIntro = document.createElement( "div" );
            var imgIntro = document.createElement( "img" );
            dvImgIntro.setAttribute( "align", "center" );
            imgIntro.setAttribute( "src", ctrl.getPic() );
            dvImgIntro.appendChild( imgIntro );
            dvIntro.insertBefore( dvImgIntro, pIntro );
        }

        if ( ctrl.getVersion().length > 0 ) {
            var pInfo = document.createElement( "p" );
            pInfo.setAttribute( "id", "versionInfo" );
            pInfo.innerHTML = "<small>"
                    + "<b>" + ctrl.getTitle() + "</b>"
                    + " <i> v" + ctrl.getVersion()
                    + "</i></small> ";
            dvIntro.insertBefore( pInfo, pIntro );
        }

        if ( ctrl.getAuthor().length > 0 ) {
            var pInfo = document.getElementById( "versionInfo" );

            if ( pInfo == null ) {
                pInfo = document.createElement( "p" );
                pInfo.setAttribute( "id", "versionInfo" );
                dvIntro.insertBefore( pInfo, pIntro );
            }

            pInfo.innerHTML += "<small>- <i>"
                    + ctrl.getAuthor()
                    + "</i></small>";
        }



        return;
    }

	/** Lists all objects
     * @param obj The vector of objects
     * @param strAction The action to apply to any object, as string.
     */
    function listVector(v, strAction)
    {
		var toret = "";

        if ( arguments === 1 ) {
            strAction = null;
        }

		if ( v.length > 0 ) {
			for(var i = 0; i < v.length; ++i) {
                obj = v[ i ];
				part = obj.id;

                if ( strAction != null ) {
                    part = "${" + part
                            + "," + strAction + " " + part + "}";
                }

                toret += part;

				if ( i == ( v.length - 2 ) ) {
					toret += " y ";
				}
				else
				if ( i < ( v.length - 2 ) ) {
					toret += ", ";
				}
			}
		}

		toret += ".";
        return toret;
	}

    /** Lists all personas inside a Loc
     * @param loc The Loc
     */
	function listPersonas(loc)
	{
		var personas = loc.personas.filter( function(x) {
			return ( x != ctrl.personas.getPlayer() );
		});

		return listVector( personas, talkAction.verbs[ 0 ] );
	}

    /** Lists all objects inside a Loc
     * @param loc The Loc
     */
    function list(loc)
    {
        var player = ctrl.personas.getPlayer();
        var totalObjsListed = 0;
        var toret = "<br>";
        var isInventory = false;
        var portableObjs = [];

        if ( loc == player ) {
            isInventory = true;
            toret += "Llevas contigo: ";
        } else {
            toret += "<br>Tambi&eacute;n puedes ver: ";
        }

        // Discard scenery objects
        for(var i = 0; i < loc.objs.length; ++i) {
            var obj = loc.objs[ i ];

            if ( !obj.isScenery() ) {
                portableObjs.push( obj );
            }
        }

        // List them
        for(var i = 0; i < portableObjs.length; ++i) {
            var obj = portableObjs[ i ];
            var examineAction = actions.getAction( "examine" );
            var takeAction = actions.getAction( "take" );
            var disrobeAction = actions.getAction( "disrobe" );

            if ( !obj.isScenery() ) {
                toret += "${" + obj.id + ',';

                if ( loc == player ) {
                    toret += examineAction.verbs[ 0 ] + ' ' + obj.id;
                    toret += "}";

                    if ( obj.isWorn() ) {
                        toret += " (${puesto,";
                        toret += disrobeAction.verbs[ 0 ] + ' ' + obj.id;
                        toret += "})";
                    }
                } else {
                    toret += takeAction.verbs[ 0 ] + ' ' + obj.id;
                    toret += "}";
                }

                if ( i == ( portableObjs.length - 2 ) ) {
					toret += " y ";
				}
				else
				if ( i < ( portableObjs.length - 2 ) ) {
					toret += ", ";
				}

                totalObjsListed++;
            }
        }

        if ( totalObjsListed < 1 ) {
            if ( isInventory ) {
                toret = "<br>No llevas nada contigo.";
            } else {
                toret = "";
            }
        } else {
            toret += '.';
        }

        return toret;
    }

    return {
        "personas": personas,
        "places": places,
        "lugares": places,
        "media": media,
        "boot": boot,
        "start": start,
        "inicia": start,
        "getPic": getPic,
        "setPic": setPic,
        "devImg": getPic,
        "ponImg": setPic,
        "getVersion": getVersion,
        "setVersion": setVersion,
        "devVersion": getVersion,
        "ponVersion": setVersion,
        "getAuthor": getAuthor,
        "setAuthor": setAuthor,
        "getAutor": getAuthor,
        "ponAutor": setAuthor,
        "setTitle": setTitle,
        "getTitle": getTitle,
        "ponTitulo": setTitle,
        "devTitulo": getTitle,
        "setIntro": setIntro,
        "getIntro": getIntro,
        "ponIntro": setIntro,
        "devIntro": getIntro,
        "creaObj": creaObj,
        "newObj": creaObj,
        "list": list,
        "lista": list,
        "listVector": listVector,
        "listaVector": listVector,
        "listPersonas": listPersonas,
        "listaPersonas": listPersonas,
        "goto": goto,
        "irA": goto,
        "cnvtTextLinksToHtml": cnvtTextLinksToHtml,
        "cnvtEnlacesHtml": cnvtTextLinksToHtml,
        "print": print,
        "setNewTurn": setNewTurn,
        "getTurns": getTurns,
        "devTurnos": getTurns,
        "endGame": endGame,
        "terminaJuego": endGame,
        "inject": inject,
        "simula": inject,
        "showError": showError,
        "getHtmlPart": getHtmlPart,
        "isPresent": isPresent,
        "estaPresente": isPresent,
        "isObjAround": isObjAround,
        "estaObjPresente": isObjAround,
        "lookUpObj": lookUpObj,
        "buscaObj": lookUpObj,
        "lookUpPersona": lookUpPersona,
        "buscaPersona": lookUpPersona,
        "setUseScore": setUseScore,
        "hasScore": hasScore,
        "ponUsaPuntuacion": setUseScore,
        "usaPuntuacion": hasScore,
        "setAlarm": setAlarm,
        "ponAlarma": setAlarm,
        "addDaemon": addDaemon,
        "getDaemon": getDaemon,
        "removeDaemon": removeDaemon,
        "ponDaemon": addDaemon,
        "devDaemon": getDaemon,
        "borraDaemon": removeDaemon,
    };
}() );

var parser = ( function() {

    var sentence = {
        persona: null,
        act: null,
        obj1: null,
        obj2: null,

        verb: null,
        term1: null,
        prep: null,
        term2: null,

        init: function()
        {
            // Words
            this.verb = null;
            this.term1 = null;
            this.prep = null;
            this.term2 = null;

            // Objects
            this.persona = ctrl.personas.getPlayer();
            this.act = null;
            this.obj1 = null;
            this.obj2 = null;
        },
    }

    var IgnoredWords = ( function() {
        var Particles = [
            "el", "la", "las", "los", "un", "una", "uno", "y", "o",
            "pero", "dentro", "cuidadosamente", "lentamente", "rapidamente"
        ];

        var Prepositions = [
            "a", "al", "ante", "bajo", "cabe", "con", "contra", "de", "del",
            "desde", "en", "entre", "hacia", "hasta", "para", "por",
            "segun", "sin", "so", "sobre", "tras"
        ];

        function isIgnorable(w)
        {
            return ( Particles.indexOf( canonical( w ) ) >= 0 );
        }

        function isPreposition(w)
        {
            return ( Prepositions.indexOf( canonical( w ) ) >= 0 );
        }

        return {
            "Particles": Particles,
            "Prepositions": Prepositions,
            "Palabras": Particles,
            "Preposiciones": Prepositions,
            "isIgnorable": isIgnorable,
            "esIgnorable": isIgnorable,
            "isPreposition": isPreposition,
            "esPreposicion": isPreposition,
        };
    } )();

    function doParse()
    {
        var frmInput = ctrl.getHtmlPart( "frmInput", "missing form: input" );
        var dvAnswer = ctrl.getHtmlPart( "dvAnswer", "missing div answer" );
        var cmd = frmInput[ "edInput" ].value.trim().toLowerCase();

        dvAnswer.innerHTML = "";

        if ( cmd.length > 0 ) {
            var txtAnswer = ctrl.cnvtTextLinksToHtml( parse( cmd ) );

            var pAnswer = document.createElement( "p" );
            pAnswer.innerHTML = txtAnswer;
            dvAnswer.appendChild( pAnswer );
        }

        frmInput.reset();
        frmInput[ "edInput" ].focus();
        return false;
    }

    function canonical( w )
    {
        if ( w == null ) {
            w = "";
        }

        return w.split( ' ' )[ 0 ].trim().toLowerCase();
    }

    function stripIgnoredWords(ws)
    {
        var toret = [];

        if ( ws.length > 1 ) {
            for(var i = 0; i < ws.length; ++i) {
                ws[ i ] = canonical( ws[ i ] );

                if ( ws[ i ].length > 0
                  && !IgnoredWords.isIgnorable( ws[ i ] ) ) {
                    toret.push( ws[ i ] );
                }
            }
        } else {
            if ( ws.length > 0 ) {
                toret.push( canonical( ws[ 0 ] ) );
            }
        }

        return toret;
    }

    function setSentenceParticles(ws)
    {
        sentence.init();

        for(var i = 0; i < ws.length; ++i )
        {
            var w = canonical( ws[ i ] );

            // Set verb
            if ( i == 0 ) {
                if ( !IgnoredWords.isPreposition( w ) ) {
                    sentence.verb = w;
                } else {
                    break;
                }
            }
            else
            // Set noun1
            if ( i == 1 ) {
                if ( !IgnoredWords.isPreposition( w ) ) {
                    sentence.term1 = w;
                } else {
                    sentence.prep = w;
                }
            }
            // Set noun2
            else
            if ( i == 2 ) {
                if ( IgnoredWords.isPreposition( w ) ) {
                    sentence.prep = w;
                } else {
                    if ( sentence.term1 != null ) {
                        sentence.term2 = w;
                        break;
                    } else {
                        sentence.term1 = w;
                    }
                }
            } else {
				if ( !IgnoredWords.isPreposition( w ) ) {
					sentence.term2 = w;
					break;
				}
            }
        }

        return;
    }

    function identifyObjects()
    {
        sentence.act = actions.lookUp( sentence );

        if ( sentence.act != null ) {
            // look up objects
            sentence.obj1 = ctrl.isObjAround( sentence.term1 );
            sentence.obj2 = ctrl.isObjAround( sentence.term2 );
        }

        return;
    }

    function inputTransformation()
    {
        var toret = "";

        // Call all transInput() in actions
        for(var i = 0; i < actions.actList.length; ++i) {
            toret = actions.actList[ i ].transInput( sentence );

            if ( toret !== "" ) {
                break;
            }
        }

        return toret;
    }

    /**
	 * Prepares the player's input, substituting accented chars
	 * and removing special chars.
	 * @param cmd The player's command, as a String
	 * @return A new String with the input prepared as described.
	 */
    function prepareInput(cmd)
	{

		var accentedVowels = "áéíóúäëïöüâêîôûàèìòùÁÉÍÓÚÄËÏÖÜÂÊÎÔÛÀÈÌÒÙ";
		var regularVowels = "aeiou";
		var specialChars = "ñÑçÇ";
		var regularChars = "nNcC";
		var aCode = "a".charCodeAt( 0 );
		var zCode = "z".charCodeAt( 0 );
		var zeroCode = "0".charCodeAt( 0 );
		var nineCode = "9".charCodeAt( 0 );
		var toret = "";

		cmd = cmd.trim().toLowerCase();

		for (var i = 0; i < cmd.length; i++)
		{
			var ch = cmd[ i ];
			var posVowels = accentedVowels.indexOf( ch );
			var posSpecial = specialChars.indexOf( ch );
			var code = ch.charCodeAt( 0 );

			if ( posVowels > -1 ) {
				toret += regularVowels[ posVowels % 5 ];
			}
			else
			if ( posSpecial > -1 ) {
				toret += regularChars[ posSpecial ];
			}
			else
			if ( ( code >= aCode
				&& code <= zCode )
			 || ( code >= zeroCode
				&& code <= nineCode )
			 || ch === ' ' )
			{
				toret += ch;
			}
		}

		return toret;
	}

    function parse(cmd)
    {
        var words = [];
        var toret = "";
        var player = ctrl.personas.getPlayer();
        var loc = ctrl.places.getCurrentLoc();

        cmd = prepareInput( cmd );
        words = cmd.split( ' ' );

        // Interpret input
        words = stripIgnoredWords( words );
        setSentenceParticles( words );
        toret = inputTransformation();

        if ( toret == "" ) {
            identifyObjects();
            toret = "No puedes hacer eso.";

            // Execute action
            if ( sentence.act != null ) {
                var playerAnswer = player.preAction();

                if ( playerAnswer == "" ) {
                    toret = sentence.act.doIt( sentence );
                    player.postAction();
                } else {
                    toret = playerAnswer;
                }

                loc.doEachTurn();
                ctrl.setNewTurn();
            }
        }

        return toret;
    }

    return {
        "doParse": doParse,
        "parse": parse,
        "sentence": sentence,
        "sentencia": sentence,
        "IgnoredWords": IgnoredWords,
        "PalabrasIgnoradas": IgnoredWords,
        "canonical": canonical,
        "canonica": canonical,
        "identifyObjects": identifyObjects,
        "idObjs": identifyObjects,
    };
}() );

var actions = ( function() {

    var Act = function(i, v) {

        this.id = i.trim();
        this.verbs = v;

        /**
         * Returns true if the sentence matches
         * @param s the sentence object
         */
        this.match = function(s)
        {
            return ( this.verbs.indexOf( s.verb ) > -1 );
        }
        this.encaja = this.match;

        /**
         * Does the action, calling preXXX and postXXX
         * @param s the sentence object
         */
        this.doIt = function(s)
        {
            return this.exe(s);
        }
        this.hazlo = this.doIt;

        /**
         * Does the action, WITHOUT calling preXXX and postXXX
         * @param s the sentence object
         */
        this.exe = function(s)
        {
            return "No ha pasado nada.";
        }

        /**
         * Modifies the input, if needed.
         */
        this.transInput = function(s) {
            return "";
        }
    };

    var actList = [];

    /**
     * Creates a new action, passing array of verbs
     * @param v array of verbs
     */
    function create(id, v)
    {
        var toret = new Act( id, v );

        actList.push( toret );
        return toret;
    }

    /**
     * Returns an action, given its id
     * @param id The id of the action
     * @param msgError The error to show if not found
     * @return The action, when found
     * @throws The error message, if not found.
     */
    function getAction(id, msgError)
    {
        var toret = null;

        if ( arguments.length > 0
          && id != null )
        {
            id = id.trim().toLowerCase();
            if ( arguments.length < 2 ) {
                msgError = id + " action not found";
            }

            for(var i = 0; i < actList.length; ++i) {
                if ( actList[ i ].id === id ) {
                    toret = actList[ i ];
                    break;
                }
            }
        }

        if ( toret == null ) {
            ctrl.showError( msgError );
            throw msgError;
        }

        return toret;
    }

    function execute(actionId, noun1, noun2)
    {
        var toret = "No tiene sentido";

        if ( arguments.length === 0 ) {
            actionId = null;
            noun1 = null;
            noun2 = null;
        }
        else
        if ( arguments.length === 1 ) {
            noun1 = null;
            noun2 = null;
        }
        else
        if ( arguments.length === 2 ) {
            noun2 = null;
        }

		var action = getAction( actionId,
                "trying: actions.execute() with '" + actionId + "'"
        );

		if ( action != null ) {
			parser.sentence.init();
			parser.sentence.verb = action.verbs[ 0 ];
			parser.sentence.term1 = noun1;
			parser.sentence.term2 = noun2;
			parser.idObjs();

			toret = action.doIt( parser.sentence );
		}

        return toret;
    }

    /**
     * Determines the action from the sentence.
     * @param s the sentence object.
     * @return The action object, or null if not found
     */
    function find(s)
    {
        var toret = null;

        if ( arguments.length >= 1 ) {
            for(var i = 0; i < actList.length; ++i) {
                var action = actList[ i ];

                if ( action.match( s ) ) {
                    toret = action;
                    break;
                }
            }
        }

        return toret;
    }

    /**
     * Determines the action from the sentence.
     * @param s the sentence object.
     * @return The action object, throws if not found
     */
    function lookUp(s)
    {
        var toret = null;

        if ( arguments.length >= 1 ) {
            toret = find( s );
        } else {
            ctrl.showError( "action not given" );
            throw msg;
        }

        return toret;
    }

    return {
        "Act": Act,
        "actList": actList,
        "actLista": actList,
        "find": find,
        "lookUp": lookUp,
        "busca": lookUp,
        "create": create,
        "crea": create,
        "execute": execute,
        "ejecuta": execute,
        "getAction": getAction,
        "devAccion": getAction,
    };
})();

var acciones = actions;

// Start intro
window.onload = function() {
    ctrl.start();
    document.getElementById( "btBoot" ).focus();
}

// Redirect key presses to the user prompt
window.onkeypress = function(e) {
    var dvIntro = document.getElementById( "dvIntro" );

    if ( dvIntro.style.display == "block" ) {
        if ( e.keyCode == 13 ) {
            ctrl.boot();
        } else {
            document.getElementById( "btBoot" ).focus();
        }
    } else {
        document.getElementById( "edInput" ).focus();
    }

    return;
}
