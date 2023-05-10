// fi.js (c) Baltasar 2014-2022 MIT License <baltasarq@gmail.com>
/**
 * Motor de ficc. interactiva (fi.js IF Engine)
 */


/** Represents a list of messages,
  * able to choose the next message by itself,
  * either sequentially or randomly.
  */
const MsgList = function(ml, alt=false) {
    this.pos = 0;
    this.ml = ml;
    this.alt = alt;

    this.nextPos = function() {
        const max = this.ml.length;

        if ( this.alt ) {
            this.pos = Math.floor( Math.random() * max );
        } else {
            this.pos = ( this.pos + 1 ) % max;
        }

        return this.pos;
    };
    this.sigPos = this.nextPos;

    this.nextMsg = function() {
        const toret = this.ml[ this.pos ];

        this.nextPos();
        return toret;
    };
    this.sigMsj = this.nextMsg;
};
const ListaMsjs = MsgList;


/** An entity. This is the common base 'object'
  * for locs, objs and personas.
  */
const Ent = function() {
    this.ini = function()
    {
    }

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

    this.isCloseable = function() {
        return false;
    }

    this.esCerrable = this.isCloseable;

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
        const loc = ctrl.places.getCurrentLoc();

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

    this.timesExamined = 0;

    this.getTimesExamined = function() {
        return this.timesExamined;
    }
    this.devVecesExaminado = this.getTimesExamined;

    this.setTimesExamined = function(x) {
        this.timesExamined = x;
    }
    this.ponVecesExaminado = this.setTimesExamined;
};

Ent.Scenery = true;
Ent.Escenario = true;
Ent.Portable = false;

const Loc = function(n, i, s, d) {
    Ent.call( this );

    this.num = n;
    this.id = i.trim();
    this.syn = s;
    this.desc = d;

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
        return ( this.objs.indexOf( obj ) > -1 )
            || ( this.personas.indexOf( obj ) > -1 );
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
        const numExit = this.cnvtStrToExitOrd( strDir );

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
        const numExit = this.cnvtStrToExitOrd( strDir );
        const numInvExit = this.getInvExit( numExit );

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
        const numExit = this.cnvtStrToExitOrd( strDir );

        if ( numExit > -1 ) {
            toret = this.exits[ numExit ];
        }

        return toret;
    }

    this.devSalida = this.getExit;

    this.preExamine = function() {
        var toret = "";

        if ( typeof( this.preExamina ) === "function" ) {
            toret = this.preExamina();
        }

        return toret;
    }

    this.postExamine = function() {
        if ( typeof( this.postExamina ) === "function" ) {
            this.postExamina();
        }
    }

    this.doEachTurn = function() {
        if ( typeof( this.hazCadaTurno ) === "function" ) {
            this.hazCadaTurno();
        }
    }
};

const Obj = function(n, i, s, l, d) {
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

const Persona = function(n, i, l, d) {
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

    this.getNameForPrinting = function() {
        var toret = this.id.toLowerCase();

        if ( toret.length > 0 ) {
          // First letter in uppercase
          toret = toret[ 0 ].toUpperCase() + toret.slice( 1 );

          // Next letters after space in uppercase
          var spacePos = toret.indexOf( " " );
          while( spacePos > 0 ) {
              ++spacePos;
              toret = toret.slice( 0, spacePos )
                      + toret[ spacePos ].toUpperCase()
                      + toret.slice( spacePos + 1 );

              spacePos = toret.indexOf( " ", spacePos );
          }
        }

        return toret;
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

const ctrl = ( function() {
    const alarms = [];
    const daemons = {};
    var tit = "Ficci&oacute;n interactiva";
    var intro = "&iexcl;Comienza la aventura!";
    var pic = null;
    var aut = "";
    var version = "";
    var turns = 1;
    var useScore = false;
    var history = "";
    var seed = 1;
    var gameEnded = false;
    var booted = false;

    const HtmlClassRef = {
        "links": {
            "obj": "clsLinkObj",
            "mov": "clsLinkMov",
            "pnj": "clsLinkPnj",
        },
        "achievements": "clsAchieved",
    };

    const achievements = (function() {
        var prefix = "Logro: ";
        const achieves = {};

        /** Creates a new achievement
         *  @param id The id of the achievement, such as "rockclimber".
         *  @param explanation The explanation of the achievement.
         */
        var Achievement = function(id, explanation) {
            this.id = id;
            this.explica = explanation;
            this.complet = false;
            this.pts = -1;
        };

        /** Add achievement
         *  @param id An id for the achievement.
         *  @param explica An explanation for the player.
         */
        function add(id, explica, completed, pts) {
            if ( arguments.length < 4 ) {
                pts = -1;
            }

            if ( arguments.length < 4 ) {
                completed = false;
            }

            const ach = new Achievement( id, explica );
            ach.pts = pts;
            ach.complet = completed;

            achieves[ id ] = ach;
        }

        /** Sets an achievement as completed (or not).
         *  @param id The id of the achievement.
         *  @param completed True if completed, false otherwise. Optional.
         *  @param pts Points if this achievement deserves a score. Optional.
         */
        function set(id, completed, pts)
        {
            var ach = get( id );

            if ( arguments.length < 3 ) {
                pts = -1;
            }

            if ( arguments.length < 2 ) {
                completed = true;
            }

            ach.complet = completed;
            ach.pts = pts;
            return;
        }

        /** Eliminates an achievement.
         *  @param id The id of the achievement.
         */
        function erase(id)
        {
            if ( id in achieves
              && achieves.hasOwnProperty( id ) )
            {
                delete achieves[ id ];
            } else {
                ctrl.showError( "Achievement '" + id + "' was not found." );
            }

            return;
        }

        function filterAchieves(filter)
        {
            var toret = [];

            for (var id in achieves) {
                if ( !achieves.hasOwnProperty( id ) ) {
                    continue;
                }

                var ach = achieves[ id ];

                if ( filter( ach ) ) {
                    toret.push( ach );
                }
            }

            return toret;
        }

        /** Get all completed or uncompleted achievements
         *  @param complet true for all completed achievements.
         */
        function getRange(complet)
        {
            if ( arguments.length == 0 ) {
                complet = true;
            }

            return filterAchieves(
                function(x) { return x.complet == complet; }
            );
        }

        /** Returns a given achievement, by its id
         *  @param id The id of the achievement.
         */
        function get(id)
        {
            var toret = null;

            if ( id in achieves
              && achieves.hasOwnProperty( id ) )
            {
                toret = achieves[ id ];
            } else {
                ctrl.showError( "Achievement '" + id + "' was not found." );
            }

            return toret;
        }

        /** Return a percentage between [0.0-1.0] of completed achievements. */
        function complet()
        {
            var completed_achs = 0;
            var total_achs = 0;
            var toret = { "achs": [] };
            var pts = 0;

            for (var id in achieves) {
                if ( !achieves.hasOwnProperty( id ) ) {
                    continue;
                }

                ++total_achs;
                var ach = achieves[ id ];

                if ( ach.complet ) {
                    ++completed_achs;
                    toret.achs.push( ach );

                    if ( ach.pts > 0 ) {
                        pts += ach.pts;
                    }
                }
            }

            if ( pts > 0 ) {
                toret.pts = pts;
            }

            toret.complet = completed_achs / total_achs;
            return toret;
        }

        /** Returns the information of complet() as a textual list. */
        function completAsText()
        {
            const totals = complet();
            const uncompleted_achievements = getRange( false );
            var toret = "<ul>";

            for(let ach of totals.achs) {
                toret += "<li>" + ach.explica + "</li>";
            }

            toret += "</ul><br/>─ Total: "
                    + Math.round( totals.complet * 100 )
                    + "%";

            if ( totals.pts > 0 ) {
                toret += " ─" + totals.pts+ "pts.─";
            }

            if ( uncompleted_achievements.length > 0 ) {
                toret += "<ul>";
                for(let ach of uncompleted_achievements) {
                    toret += "<li style='text-decoration: line-through;'>"
                             + ach.explica + "</li>";
                }
                toret += "</ul>";
            }

            return toret;
        }

        /** Marks the achievement and shows the corresponding explanation
         *  @param id The id of the given achievement
         *  @param pts Points if this achievement deserves a score. Optional.
         */
        function achieved(id, pts)
        {
            const ach = get( id );

            if ( ach != null ) {
                if ( !ach.complet ) {
                    var suffix = "";

                    if ( arguments.length > 1 ) {
                        ach.pts = pts;
                    }

                    if ( ach.pts > 0 ) {
                        suffix = " ─" + ach.pts + "pts.─";
                    }

                    set( id, true, pts );
                    ctrl.print( "<span class=\""
                                + HtmlClassRef.achievements + "\">"
                                + prefix
                                + ach.explica
                                + "</span>"
                                + suffix );
                }
            } else {
                ctrl.showError( "Achievement '" + id + "' was not found." );
            }

            return;
        }

        return {
            "Achievement": Achievement,
            "Logro": Achievement,
            "add": add,
            "inserta": add,
            "set": set,
            "marca": set,
            "erase": erase,
            "borra": erase,
            "getRange": getRange,
            "devRango": getRange,
            "get": get,
            "busca": get,
            "complet": complet,
            "completados": complet,
            "completed": complet,
            "completAsText": completAsText,
            "completedAsText": completAsText,
            "completadosComoTexto": completAsText,
            "achieved": achieved,
            "logrado": achieved,
            "prefix": prefix
        };
    })();



    function isGameOver() {
        return gameEnded;
    }

    function setGameOver() {
        gameEnded = true;
    }

    function Alarm(turns, trigger) {
		this.turns = turns;
		this.event = trigger;
	}

    function Daemon(id, fn) {
        this.id = id;
        this.fn = fn;
    }

    function addToHistory(cmd) {
        if ( history.length > 0 ) {
            history += "\n";
        }

        if ( cmd != null ) {
            cmd = cmd.trim();
            var s = { "verb": cmd };

            if ( !saveAction.match( s )
              && !loadAction.match( s ) )
            {
                history += cmd;
            }
        }

        return;
    }

    function setRndSeed(x) {
        if ( arguments.length == 0 ) {
            x = new Date().getTime();
        }

        seed = x;
    }

    function rnd(min, max) {
        if ( arguments.length < 2 ) {
            max = 100;
        }

        if ( arguments.length < 1 ) {
            min = 1;
        }

        var x = Math.sin( seed++ ) * 10000;
        x -= Math.floor( x );
        return Math.floor( ( x * ( max - min ) ) + min );
    }

    function save() {
        var toret = false;
        const savegame = {
            "seed": seed,
            "history": history
        };

        if ( typeof( Storage ) !== "undefined" ) {
            localStorage.setItem( "fi_js-SaveGame", JSON.stringify( savegame ) );
            toret = true;
        }

        return toret;
    }

    function saveTranscript()
    {
        // Prepare history
        let transcript = history
        let lastLinePos = transcript.trim().lastIndexOf( "\n" );

        if ( lastLinePos > 0 ) {
            transcript = transcript.substring( 0, lastLinePos );
        }

        // Prepare HTML infraestructure
        const link = document.createElement( "a" );

        link.id = "hiddenSave";
        link.style.display = "none";
        link.download = "transcription.txt";
        link.href = "data:text/plain," + encodeURI( transcript );

        document.body.appendChild( link );
        link.click();
        document.body.removeChild( link );
    }

    function load() {
        var toret = false;

        if ( typeof( Storage ) !== "undefined" ) {
            const strSavegame = localStorage.getItem( "fi_js-SaveGame" );

            if ( strSavegame != null ) {
                var savegame = JSON.parse( strSavegame );
                var newSeed = savegame.seed;
                var newHistory = savegame.history;
                var startLoc = ctrl.places.getStart();

                // Start from the beginning
                ctrl.places.setCurrentLoc( startLoc );
                goto( startLoc );

                // Restore command history
                history = "";
                if ( newHistory != null ) {
                    history = newHistory;
                }

                // Restore seed
                if ( newSeed != null ) {
                    seed = newSeed;
                }

                const cmds = history.split( '\n' );

                for(var i = 0; i < cmds.length; ++i) {
                    var cmd = cmds[ i ];
                    var s = { "verb": cmd };

                    if ( !saveAction.match( s )
                      && !loadAction.match( s ) )
                    {
                        parser.parse( cmd );
                    }
                }

                toret = true;
            }
        }

        return toret;
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

        delete daemons[ id ];
    }

    var prepBuildingOrder = "";

    function updateObjects()
    {
        const dvObjects = document.getElementById( "dvObjects" );

        if ( dvObjects == null ) {
            return;
        }

        var inventory = ctrl.personas.getPlayer().objs;
        var reachable = ctrl.places.getCurrentLoc().objs;
        var personas = ctrl.places.getCurrentLoc().personas;
        var pObjects = document.createElement( "p" );
        var strEntitiesList = "";
        var objRefPrefix = "<a class=\""
                            + HtmlClassRef.links.obj
                            + "\" onclick=\"javascript:ctrl.addTerm('";
        var pnjRefPrefix = "<a class=\""
                            + HtmlClassRef.links.pnj
                            + "\" onclick=\"javascript:ctrl.addTerm('";

        if ( personas.length > 1 ) {
                strEntitiesList += "/ ";
                for(var i = 0; i < personas.length; ++i) {
                        if ( personas[ i ] != ctrl.personas.getPlayer() ) {
                                strEntitiesList +=
                                        pnjRefPrefix
                                        + personas[ i ].id
                                        + "');\" href=\"#\">"
                                        + personas[ i ].id
                                        + "</a>  / ";
                        }
                }


                strEntitiesList += "<br />";
        }

        if ( inventory.length > 0 ) {
                strEntitiesList += "/ ";
                for(var i = 0; i < inventory.length; ++i) {
                        strEntitiesList +=
                                objRefPrefix
                                + inventory[ i ].id
                                + "');\" href=\"#\">"
                                + inventory[ i ].id
                                + "</a>  / ";
                }

                strEntitiesList += "<br />";
        }


        if ( reachable.length > 0 ) {
                strEntitiesList += "/ ";
                for(var i = 0; i < reachable.length; ++i) {
                        strEntitiesList +=
                                objRefPrefix
                                + reachable[ i ].id
                                + "');\"  href=\"#\">"
                                + reachable[ i ].id
                                + "</a>  / ";
                }
        }

        dvObjects.innerHTML = "";
        dvObjects.appendChild( pObjects );
        pObjects.innerHTML = strEntitiesList;

        return;
    }

    function addTerm(w)
    {
        const doEnter = ( this.prepBuildingOrder.length == 0 );

        ctrl.inject( w, doEnter, false );

        if ( !doEnter ) {
                ctrl.inject( this.prepBuildingOrder, false, false );
        }

        this.prepBuildingOrder = "";
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

    function ini()
    {
    }

    function setNewTurn() {
		const player = personas.getPlayer();

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

    function getTurns()
    {
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
        const id = parser.canonical( container.id );
        const containerIds = container.syn.concat( id );

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
        const edInput = getHtmlPart( "edInput", "missing input edit" );
        const btSend = getHtmlPart( "btSend", "missing send button" );

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
            edInput.value = "";
        }

        edInput.value += txt;

        if ( enter ) {
            btSend.click();
        }

        edInput.focus();
        return false;
    }

    function print(msg)
    {
        const dvAnswer = getHtmlPart( "dvAnswer", "missing answer div" );
        const pAnswer = document.createElement( "p" );

        pAnswer.innerHTML = cnvtTextLinksToHtml( msg );

        // Delay text appearance to make clear something changed.
        setTimeout(
            function() { dvAnswer.appendChild( pAnswer ); },
            100 );
    }

    function clearAnswers()
    {
        getHtmlPart( "dvAnswer", "missing answer div" ).innerHTML = "";
    }

    function endGame(msg, pic)
    {
        const dvInput = getHtmlPart( "dvInput", "missing input div" );
        const dvAnswer = getHtmlPart( "dvAnswer", "missing input div" );
        const dvDesc = getHtmlPart( "dvDesc", "missing desc div" );
        const dvId = getHtmlPart( "dvId", "missing id div" );
        let dvPic = getHtmlPart( "dvPic", "missing pic div" );

        if ( arguments.length < 2 ) {
            pic = null;
        }

        if ( arguments.length < 1 ) {
            msg = "Has ganado.";
        }

        // Eliminate input possibilities and extra stuff
        dvInput.style.display = "none";
        dvId.style.display = "none";
        dvAnswer.style.display = "none";
        ctrl.audio.stop();

        // Erase desc
        dvDesc.innerHTML = "";

        // Hide the old picture and display the new one
        dvPic.style.display = "none";
        dvPic = document.createElement( "div" );
        dvPic.id = "dvPic";
        dvDesc.appendChild( dvPic );
        dvPic.style.display = "none";

        if ( pic != null ) {
            const pImg = document.createElement( "p" );
            const img = document.createElement( "img" );

            pImg.align = "center";
            pImg.style.width = "100%";
            img.style = "width: auto; height: auto; max-width: 70%";
            img.src = pic;
            img.alt = img.title = "game over";

            pImg.appendChild( img );
            dvPic.appendChild( pImg );
            dvPic.style.display = "block";
        }

        // Show end game text
        const pDesc = document.createElement( "p" );
        pDesc.style.textAlign = "justify";
        pDesc.innerHTML = msg;
        dvDesc.appendChild( pDesc );
        dvDesc.style = "scroll-y: hidden; scroll-x: hidden; height: 75%";

        setGameOver();
        return;
    }

     /**
     * Decides the links class, which could be of movement, objects or pnj's.
     * Returns, for example: "<a class=\"linkObj\""
     * Possibilities are: linkObj, linkPnj, linkMov
     * @param txt The text with the command.
     * @return A string with the HTML link prefix.
     */
    function decideLinkClass(cmd)
    {
        var toret = "<a class=\"" + HtmlClassRef.links.mov + "\"";
        const pnjRefPrefix = "<a class=\"" + HtmlClassRef.links.pnj + "\"";
        const objRefPrefix = "<a class=\"" + HtmlClassRef.links.obj + "\"";

        if ( cmd != null ) {
            cmd = cmd.trim();

            if ( cmd.length > 0 ) {
                var words = cmd.split( " " );

                if ( words.length > 0 ) {
                    var firstWord = words[ 0 ];

                    const objs = [
                            "ex", "examina", "examinar", "examino",
                            "m", "mirar", "mira", "miro",
                            "look", "x", "take", "get", "pick",
                            "coger", "coge", "cojo", "tomar", "toma", "tomo" ];

                    const pnjs = [ "habla", "hablar", "hablo", "talk" ];

                    if ( objs.indexOf( firstWord ) > -1 ) {
                        toret = objRefPrefix;
                    }
                    else
                    if ( pnjs.indexOf( firstWord ) > -1 ) {
                        toret = pnjRefPrefix;
                    }
                }
            }
        }

        return toret;
    }

    /**
     * Takes a description and removes or prepends
     * the intro text, marked with ^{ and }
     *  i.e. "^{This only appears once. }This is the regular desc."
     */
    function buildDescOfEntity(ent, txt)
    {
        const MarkBegin = "^{";
        let onceTxt = "";

        // We are probably going to work over the ent's desc
        if ( arguments.length == 1 ) {
            txt = ent.desc;
        }

        // Extract intro
        let posBegin = txt.indexOf( MarkBegin );

        if ( posBegin >= 0 ) {
            let posEnd = posBegin + MarkBegin.length;
            let level = 1;

            while( posEnd < txt.length ) {
                if ( txt[ posEnd ] == '{' ) {
                    ++level;
                }
                else
                if ( txt[ posEnd ] == '}' ) {
                    --level;

                    if ( level == 0 ) {
                        break;
                    }
                }

                ++posEnd;
            }

            if ( posEnd < txt.length ) {
                onceTxt = txt.substring( posBegin + MarkBegin.length, posEnd );
                txt = txt.substring( 0, posBegin )
                    + txt.substring( posEnd + 1);
            } else {
                txt = ent.desc;
                showError( "Error: unclosed '}^'" );
            }

            // Add it, if needed
            if ( ent.getTimesExamined() == 0 ) {
                txt = txt.substring( 0, posBegin )
                        + onceTxt
                        + txt.substring( posBegin );
            }
        }

        return txt;
    }

    /**
     * Converts text links to HTML
     * i.e., from ${perro, ex perro} embedded in text to
     * <a onClick="javascript:ctrl.inject( 'ex perro' )">perro</a>
     * @param txt The text with the link
     * @return A string with the HTML link
     */
    function cnvtTextLinksToHtml(txt)
    {
        if ( arguments.length < 1
          || txt == null )
        {
            txt = "";
        }

        var linkEndPos = 0;
        var linkPos = txt.indexOf( "${" );

        while( linkPos > -1 ) {
            linkEndPos = txt.indexOf( '}', linkPos + 2 );

            if ( linkEndPos > -1 ) {
                var txtLink = txt.slice( linkPos + 2, linkEndPos );
                var parts = txtLink.split( ',' );

                if ( parts.length == 2 ) {
                    parts[ 0 ] = parts[ 0 ].trim();
                    parts[ 1 ] = parts[ 1 ].trim();

                    var link = decideLinkClass( parts[ 1 ] )
                                + " href=\"javascript:void(0)\""
                                + " onClick=\"javascript: ctrl.inject('"
                                + parts[ 1 ]
                                + "', true, true)\">"
                                + parts[ 0 ]
                                + "</a>";
                    txt = txt.slice( 0, linkPos ) + link
                        + txt.slice( linkEndPos + 1 );
                } else {
                    txt = txt.slice( 0, linkPos )
                        + "<a href='#ERROR' target='_blank'>ERROR</a>"
                        + txt.slice( linkEndPos + 1 );

                    ctrl.showError( "bad link: " + txtLink );
                }
            }

            linkPos = txt.indexOf( "${", Math.max( linkPos + 2, linkEndPos ) );
        }

        return txt;
    }

    const places = ( function() {
        const locs = [];
        const limbo = creaLoc( "limbo", [ "limbo" ], "limbo" );
        var start = null;
        var current = null;

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
            const toret = new Loc( locs.length, id, syn, desc );

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
            if ( ctrl.isGameOver() ) {
                return;
            }

            // Remove any pending answer
            ctrl.getHtmlPart( "dvAnswer", "missing div answer" ).innerHTML = "";

            // Find loc
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

            var newDesc = loc.preExamine();

            if ( newDesc != "" ) {
                desc = newDesc;
            }

            // Update description and visits
            updateDesc( loc, desc );
            ++loc.timesExamined;

            // Go to top, if first visit
            if ( loc.timesExamined == 1 ) {
                window.scrollTo( 0, 0 );
            }

            // Execute "postExamine" in loc
            loc.postExamine();
        }

        /** Shows a new pic instead of the existing one (if any).
          * Passing null or "" as path, just removes the current picture.
          * @param path The path for the new pic.
          * @param alignment Should be "left", "center", or "right".
          */
        function showPic(path, alignment)
        {
            const dvPic = document.getElementById( "dvPic" );

            if ( dvPic != null ) {
                // Remove whatever is there now.
                dvPic.innerHTML = "";

                if ( path != null
                  && path != "" )
                {
                    const img = document.createElement( "img" );
                    const p = document.createElement( "p" );

                    // Set centered alignment by default
                    if ( arguments.length < 2 ) {
                        alignment = "center";
                    }

                    // Prepare the built parts
                    p.style.textAlign = alignment;
                    p.style.width = "100%";
                    img.style = "width: auto; height: auto; max-width: 70%";
                    img.src = path;

                    // Build it up all toghether
                    dvPic.appendChild( p );
                    p.appendChild( img );
                }
            } else {
                ctrl.showError( "showPic(): dvPic was not found." );
                console.log( "showPic(): dvPic was not found." );
            }

            return;
        }

        /** Updates the whole description for a given location.
         *  @param loc The location to update the description for,
         *  @param desc The description, if different from the loc's one.
         */
        function updateDesc(loc, desc)
        {
            const dvId = ctrl.getHtmlPart( "dvId", "missing div loc.id" );
            const dvDesc = ctrl.getHtmlPart( "dvDesc", "missing div loc.desc" );

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
            const id = document.createElement( "h2" );
            id.innerHTML = loc.id;
            dvId.innerHTML = "";
            dvId.appendChild( id );

            // Set loc's pic
            showPic( loc.pic );

            // Set loc's audio
            audio.stop();
            if ( loc.audio.src != null ) {
                audio.set(
                    loc.audio.src, loc.audio.volume, loc.audio.loop
                );
            }

            // Set loc's desc
            const objsDesc = ctrl.list( loc );
            const pDesc = document.createElement( "p" );

            desc = ctrl.buildDescOfEntity( loc, desc );
            pDesc.innerHTML = ctrl.cnvtTextLinksToHtml( desc )
                            + ctrl.cnvtTextLinksToHtml( objsDesc );

            if ( loc.personas.length > 1 ) {
                    var personasDesc = ctrl.listPersonas( loc );
                    pDesc.innerHTML += "<p>Aqu&iacute; puedes ver a: "
                            + ctrl.cnvtTextLinksToHtml( personasDesc );
            }

            dvDesc.innerHTML = "";
            dvDesc.appendChild( pDesc );

            current = loc;
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
            "showPic": showPic,
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

    const audio = ( function() {
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
                if ( arguments.length == 0
                  || v == null )
                {
                    v = .5;
                }

                v = parseFloat( v );
                if ( isNaN( v ) ) {
                    v = 0;
                }

                playing.volume = v;
            }

            return;
        }

        function setInfo(audioInfo)
        {
            set( audioInfo.src, audioInfo.volume, audioInfo.loop );
        }

        function set(src, v, loop)
        {
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
            "setInfo": set,
        };
    })();

    function creaObj(id, syn, desc, loc, isScenery)
    {
        const toret = new Obj( loc.objs.length, id, syn, loc, desc );

        toret.setScenery( isScenery );
        loc.objs.push( toret );
        return toret;
    }

    const personas = ( function() {
        var player = null;
        const personas = [];

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
        const dvError = document.getElementById( "dvError" );
        const pError = document.createElement( "p" );

        pError.style.color = "white";
        pError.style.backgroundColor = "red";
        pError.innerHTML = "ERROR: " + msg;
        dvError.appendChild( pError );
        console.error( msg );
    }

    function goto(loc, persona)
    {
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

        const toret = document.getElementById( partId );

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
        if ( !booted ) {
            booted = true;

            const dvFi = getHtmlPart( "dvFi", "div Fi not found" );
            const dvIntro = getHtmlPart( "dvIntro", "div Intro not found" );
            const frmInput = getHtmlPart( "frmInput", "form Input not found" );

            // Prepare the view
            goto( ctrl.places.getStart() );
            dvIntro.style.display = "none";
            dvFi.style.display = "block";
            frmInput.style.display = "block";

            // Prepare the input
            frmInput.reset();
            frmInput[ "edInput" ].focus();
            history = "";
        }

        return false;
    }

    /**
     * This is the function to be called in order to start playing.
     */
    function start()
    {
        const dvTitle = getHtmlPart( "dvTitle", "div title not found" );
        const dvFi = getHtmlPart( "dvFi", "div Fi not found" );
        const dvIntro = getHtmlPart( "dvIntro", "div Intro not found" );
        const hdTitle = document.createElement( "h1" );

        // Call all the ini functions
        ctrl.ini();
        ctrl.places.setCurrentLoc( ctrl.places.getStart() );

        ctrl.places.locs.forEach( l => {
            l.ini();
            l.objs.forEach( o => o.ini() );
            l.personas.forEach( p => p.ini() );
        });

        // Prepare web page
        dvIntro.style.display = "block";
        dvIntro.style.width = "100%";
        dvFi.style.display = "none";
        document.title = ctrl.getTitle();
        hdTitle.innerHTML = ctrl.getTitle();
        dvTitle.appendChild( hdTitle );

        // Prepare intro
        const pIntro = document.createElement( "p" );

        pIntro.innerHTML = ctrl.getIntro();
        dvIntro.insertBefore( pIntro, getHtmlPart( "frmIntro", "missing intro form" ) );

        if ( ctrl.getPic() != null ) {
            const dvImgIntro = document.createElement( "div" );
            const imgIntro = document.createElement( "img" );

            dvImgIntro.setAttribute( "align", "center" );
            imgIntro.setAttribute( "src", ctrl.getPic() );
            imgIntro.setAttribute( "max-width", "100%" );
            dvImgIntro.appendChild( imgIntro );
            dvIntro.insertBefore( dvImgIntro, pIntro );
        }

        if ( ctrl.getVersion().length > 0 ) {
            const pInfo = document.createElement( "p" );
            pInfo.setAttribute( "id", "versionInfo" );
            pInfo.innerHTML = "<small>"
                    + "<b>" + ctrl.getTitle() + "</b>"
                    + " <i> v" + ctrl.getVersion()
                    + "</i></small> ";
            dvIntro.insertBefore( pInfo, pIntro );
        }

        if ( ctrl.getAuthor().length > 0 ) {
            let pvInfo = document.getElementById( "versionInfo" );

            if ( pvInfo == null ) {
                pvInfo = document.createElement( "p" );
                pvInfo.setAttribute( "id", "versionInfo" );
                dvIntro.insertBefore( pvInfo, pIntro );
            }

            pvInfo.innerHTML += "<small>- <i>"
                    + ctrl.getAuthor()
                    + "</i></small>";
        }



        booted = false;
        return;
    }

    /** Lists all objects
     * @param obj The vector of objects
     * @param strAction The action to apply to any object, as string.
     */
    function listVector(v, strAction)
    {
        let toret = "";

        if ( arguments === 1 ) {
            strAction = null;
        }

        if ( v.length > 0 ) {
            for(let i = 0; i < v.length; ++i) {
                let obj = v[ i ];
                let part = obj.id;

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
        const personas = loc.personas.filter( function(x) {
            return ( x != ctrl.personas.getPlayer() );
        });

        return listVector( personas, talkAction.verbs[ 0 ] );
    }

    /** Lists all objects inside a Loc
     * @param loc The Loc
     */
    function list(loc)
    {
        const player = ctrl.personas.getPlayer();
        const portableObjs = [];
        var totalObjsListed = 0;
        var toret = "<br>";
        var isInventory = false;

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
            const obj = portableObjs[ i ];
            const examineAction = actions.getAction( "examine" );
            const takeAction = actions.getAction( "take" );
            const disrobeAction = actions.getAction( "disrobe" );

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
        "audio": audio,
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
        "ini": ini,
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
        "buildDescOfEntity": buildDescOfEntity,
        "creaDescDeEntidad": buildDescOfEntity,
        "cnvtTextLinksToHtml": cnvtTextLinksToHtml,
        "cnvtEnlacesHtml": cnvtTextLinksToHtml,
        "print": print,
        "clearAnswers": clearAnswers,
        "eliminaRespuestas": clearAnswers,
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
        "updateObjects": updateObjects,
        "actualizaObjetos": updateObjects,
        "prepBuildingOrder": prepBuildingOrder,
        "addTerm": addTerm,
        "addToHistory": addToHistory,
        "save": save,
        "saveTranscript": saveTranscript,
        "load": load,
        "rnd": rnd,
        "setRndSeed": setRndSeed,
        "isGameOver": isGameOver,
        "setGameOver": setGameOver,
        "esFinJuego": isGameOver,
        "ponFinJuego": setGameOver,
        "achievements": achievements,
        "logros": achievements
    };
}() );

const parser = ( function() {
    const sentence = {
        // Objects (only filled after parsing)
        persona: null,
        act: null,
        obj1: null,
        obj2: null,

        // Terms employed by the user
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

    const IgnoredWords = ( function() {
        const Particles = [
            "el", "la", "las", "los", "un", "una", "uno", "y", "o",
            "pero", "cuidadosamente", "lentamente", "rapidamente"
        ];

        const Prepositions = [
            "a", "al", "ante", "bajo", "cabe", "con", "contra", "de", "del",
            "dentro", "desde", "en", "entre", "hacia", "hasta", "para", "por",
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
        const frmInput = ctrl.getHtmlPart( "frmInput", "missing form: input" );
        const dvAnswer = ctrl.getHtmlPart( "dvAnswer", "missing div answer" );
        const cmd = frmInput[ "edInput" ].value.trim().toLowerCase();

        if ( cmd.length > 0 ) {
            const txtAnswer = ctrl.cnvtTextLinksToHtml( parse( cmd ) );

            if ( txtAnswer != null
              && txtAnswer != "" )
            {
                dvAnswer.innerHTML = "";
                ctrl.print( txtAnswer );
            }
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
        // 0 == verb, 1 == term1, 2 == term2
        var status = 0;

        sentence.init();
        for(var i = 0; i < ws.length; ++i )
        {
            var w = canonical( ws[ i ] );

            // First particle must be mandatorily a verb
            if ( i == 0
              && IgnoredWords.isPreposition( w ) )
            {
                break;
            }

            // Set all particles
            if ( !IgnoredWords.isPreposition( w ) ) {
                if ( status == 0 ) {
                    sentence.verb = w;
                    ++status;
                }
                else
                if ( status == 1 ) {
                    sentence.term1 = w;
                    ++status;
                }
                else
                if ( status == 2 ) {
                    sentence.term2 = w;
                    break;
                }
            } else {
                if ( sentence.prep == null ) {
                    sentence.prep = w;
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
		const accentedVowels = "áéíóúäëïöüâêîôûàèìòùÁÉÍÓÚÄËÏÖÜÂÊÎÔÛÀÈÌÒÙ";
		const regularVowels = "aeiou";
		const specialChars = "ñÑçÇ";
		const regularChars = "nNcC";
		const aCode = "a".charCodeAt( 0 );
		const zCode = "z".charCodeAt( 0 );
		const zeroCode = "0".charCodeAt( 0 );
		const nineCode = "9".charCodeAt( 0 );
		var toret = "";

		cmd = cmd.trim().toLowerCase();

		for (var i = 0; i < cmd.length; i++)
		{
			const ch = cmd[ i ];
			const posVowels = accentedVowels.indexOf( ch );
			const posSpecial = specialChars.indexOf( ch );
			const code = ch.charCodeAt( 0 );

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

        cmd = prepareInput( cmd );

        if ( cmd != "" ) {
            const player = ctrl.personas.getPlayer();
            const loc = ctrl.places.getCurrentLoc();

            words = cmd.split( ' ' );

            // Interpret input
            words = stripIgnoredWords( words );
            setSentenceParticles( words );
            toret = inputTransformation();

            if ( toret == "" ) {
                toret = "No puedes hacer eso.";

                if ( ctrl.isObjAround( sentence.verb ) != null ) {
                        var examineAction = actions.getAction( "examine" );

                        sentence.term1 = sentence.verb;
                        sentence.verb = examineAction.verbs[ 0 ];
                }

                // Execute action
                identifyObjects();

                if ( sentence.act != null ) {
                    ctrl.addToHistory( cmd );
                    const playerAnswer = player.preAction();

                    if ( playerAnswer == "" ) {
                        toret = sentence.act.doIt( sentence );
                        player.postAction();
                    } else {
                        toret = playerAnswer;
                    }

                    if ( !ctrl.isGameOver() ) {
                        loc.doEachTurn();
                        ctrl.setNewTurn();
                        ctrl.updateObjects();
                    }
                }
            }

            if ( ctrl.isGameOver() ) {
                toret = "";
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

const actions = ( function() {
    const Act = function(i, v) {
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

    const actList = [];

    /**
     * Creates a new action, passing array of verbs
     * @param v array of verbs
     */
    function create(id, v)
    {
        const toret = new Act( id, v );

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
        var toret = "";

        if ( !ctrl.isGameOver() ) {
            toret = "No tiene sentido";

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
                const action = actList[ i ];

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
            let msg = "action not given";
            ctrl.showError( msg );
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
    const dvIntro = document.getElementById( "dvIntro" );

    if ( dvIntro.style.display == "block" ) {
        document.getElementById( "btBoot" ).focus();
    } else {
        document.getElementById( "edInput" ).focus();
    }

    return;
}
