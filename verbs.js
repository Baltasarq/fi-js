// verbs.js

/**
 * Acciones (fi.js IF Engine)
 * Licencia MIT (c) baltasar@gmail.com 201405
 */

// --------------------------------------------------------- Examine
var examineAction = actions.crea( "examine",
        [ "x", "ex", "examina", "examinar", "examino" ]
);

examineAction.exe = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        var takeAction = actions.getAction( "take" );
        toret = s.obj1.desc;

        if ( s.obj1.isOpen()
          && s.obj1.objs.length > 0 )
        {
            var vCogibles = [];
            var vExaminables = [];

            // Crear vector de objetos cogibles
            // y otro con aquellos solo examinables
            for(var i = 0; i < s.obj1.objs.length; ++i) {
                if ( s.obj1.objs[ i ].isScenery() ) {
                    vExaminables.push( s.obj1.objs[ i ] );
                } else {
                    vCogibles.push( s.obj1.objs[ i ] );
                }
            }

            if ( vExaminables.length > 0 ) {
                toret += "<br>Ves: ";
                toret += ctrl.listVector( vExaminables, examineAction.verbs[ 0 ] );
            }

            if ( vCogibles.length > 0 ) {
                toret += "<br>Tiene: ";
                toret += ctrl.listVector( vCogibles, takeAction.verbs[ 0 ] );
            }
        }
    }

    return toret;
};

examineAction.doIt = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( typeof( s.obj1.preExamine ) === "function" ) {
            toret = s.obj1.preExamine();
        } else {
            toret = this.exe( s );
        }

        if ( typeof( s.obj1.postExamine ) === "function" ) {
            s.obj1.postExamine();
        }
    }

    return toret;
};

// ----------------------------------------------------------- Attack
var attackAction = actions.crea( "attack",
        [ "ataca", "atacar", "ataco",
          "mata", "matar", "mato",
          "golpea", "golpear", "golpeo",
          "patea", "patear", "pateo",
          "rompe", "romper", "rompo" ]
);

attackAction.exe = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( s.obj1.isReachable() ) {
            toret = "La violencia no es la soluci&oacute;n.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
};

attackAction.doIt = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( typeof( s.obj1.preAttack ) === "function" ) {
            toret = s.obj1.preAttack();
        } else {
            toret = this.exe( s );
        }

        if ( typeof( s.obj1.postAttack ) === "function" ) {
            s.obj1.postAttack();
        }
    }

    return toret;
};

// ----------------------------------------------------------- Start
var startAction = actions.crea( "start",
        [ "enciende", "encender", "enciendo",
          "arranca", "arrancar", "arranco",
          "activa", "activar", "activo" ]
);

startAction.exe = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( s.obj1.isReachable() ) {
            toret = "Al final, decides no hacerlo.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
};

startAction.doIt = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( typeof( s.obj1.preStart ) === "function" ) {
            toret = s.obj1.preStart();
        } else {
            toret = this.exe( s );
        }

        if ( typeof( s.obj1.postStart ) === "function" ) {
            s.obj1.postStart();
        }
    }

    return toret;
};

// ----------------------------------------------------------- Shutdown
var shutdownAction = actions.crea( "shutdown",
        [ "apaga", "apagar", "apaga",
          "desactiva", "desactivar", "desactivo" ]
);

shutdownAction.exe = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( s.obj1.isReachable() ) {
            toret = "Al final, decides no hacerlo.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
};

shutdownAction.doIt = function(s) {
    var toret = "No veo de eso en derredor.";

    if ( s.term1 == null ) {
        toret = "Deber&iacute;as especificar qu&eacute;.";
    }
    else
    if ( s.obj1 != null ) {
        if ( typeof( s.obj1.preShutdown ) === "function" ) {
            toret = s.obj1.preShutdown();
        } else {
            toret = this.exe( s );
        }

        if ( typeof( s.obj1.postShutdown ) === "function" ) {
            s.obj1.postShutdown();
        }
    }

    return toret;
};

// ------------------------------------------------------------ Look
var lookAction = actions.crea( "look", [ "m", "mira", "mirar", "miro" ] );

lookAction.transInput = function(s) {
    // Look x "mirar x" = examine x
    if ( lookAction.match( s )
      && s.term1 != null
      && s.prep == null )
    {
		s.verb = examineAction.verbs[ 0 ];
    }

    return "";
}

lookAction.exe = function(s, desc) {
	ctrl.places.doDesc( ctrl.places.getCurrentLoc(), desc );
    return "";
};

lookAction.doIt = function(s) {
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preLook ) === "function" ) {
        this.exe( s, loc.preLook() );
    } else {
        this.exe( s );
    }

    if ( typeof( loc.postLook ) === "function" )
    {
        loc.postLook();
    }

    return "";
};

// ------------------------------------------------------- Inventory
var inventoryAction = actions.crea( "inv", [ "i", "inv", "inventario" ] );

inventoryAction.exe = function(s, persona) {
	var toret = "";

	if ( arguments.length < 2
	  || persona == null )
	{
		persona = ctrl.personas.getPlayer();
	}

    toret += persona.desc + "<br />" + ctrl.list( persona );
    return toret;
};

inventoryAction.doIt = function(s) {
    var player = ctrl.personas.getPlayer();
    var toret = "";

    if ( typeof( player.preInv ) === "function" ) {
        toret = player.preInv();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( player.postInv ) === "function" )
    {
        player.postInv();
    }

    return toret;
};

// -------------------------------------------------------------- Go
var goAction = actions.crea( "go", [ "ir", "ve", "vete", "voy" ] );

goAction.transInput = function(s) {
    var goAction = actions.getAction( "go" );

    // Shortcuts for directions
    if ( s.verb != null
      && s.term1 == null
      && s.prep == null
      && s.term2 == null )
    {
        var transformed = false;
        var loc = ctrl.places.getCurrentLoc();
        var shortCompass = loc.brevCompas;
        var compass = loc.compas;

        // Inspect short compass
        for(var i = 0; i < shortCompass.length; ++i) {
            if ( shortCompass[ i ] === s.verb ) {
                s.act = goAction;
                s.verb = goAction.verbs[ 0 ];
                s.term1 = compass[ i ];
                transformed = true;
                break;
            }
        }

        if ( !transformed ) {
            // Inspect compass
            for(var i = 0; i < compass.length; ++i) {
                if ( compass[ i ] === s.verb ) {
                    s.act = goAction;
                    s.verb = goAction.verbs[ 0 ];
                    s.term1 = compass[ i ];
                    break;
                }
            }
        }
    }

    return "";
}

goAction.exe = function(s, loc) {
	var toret = "";

	if ( arguments.length < 2
	  || loc == null )
	{
		loc = ctrl.places.getCurrentLoc();
	}

    var locDest = loc.getExit( s.term1 );

    if ( locDest != null ) {
        ctrl.goto( locDest );
    } else {
        toret = "No se puede ir por ah&iacute;.";
    }

    return toret;
}

goAction.doIt = function(s) {
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preGo ) === "function" ) {
        toret = loc.preGo();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postGo ) === "function" ) {
        loc.postGo();
    }

    return toret;
};

// --------------------------------------------------------------- Exits
var exitsAction = actions.crea( "exits",
    [ "salida", "salidas", "exits" ]
);

exitsAction.exe = function(s, loc) {
    var toret = "";
    var realExits = []

    if ( arguments.length < 2
	  || loc == null )
	{
		loc = ctrl.places.getCurrentLoc();
	}

    if ( arguments.length === 0 ) {
        s = null;
    }

    toret = "Puedes ver las siguientes salidas: ";

    // Collect all exits
    for(var i = 0; i < loc.exits.length; ++i) {
        if ( loc.exits[ i ] != null ) {
            realExits.push( i );
        }
    }

    // Compose exits
    for(var i = 0; i < realExits.length; ++i) {
        var compasDir = realExits[ i ];

        toret += "${"
            + loc.compas[ compasDir ]
            + ',' + loc.compas[ compasDir ]
            + "}";

        if ( i < ( realExits.length - 1 ) ) {
            toret += ", ";
        } else {
            toret += ".";
        }
    }

    // Unless there are no exits...
    if ( realExits.length === 0 ) {
        toret = "No hay salidas visibles.";
    }

    return toret;
}

exitsAction.doIt = function(s) {
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();


    if ( typeof( loc.preExits ) === "function" ) {
        toret = loc.preExits();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postExits ) === "function" ) {
        loc.postExits();
    }

    return toret;
};

// ------------------------------------------------------------ Enter
var enterAction = actions.crea( "enter",
    [ "entra", "entrar", "entro", "adentro", "dentro" ]
);

enterAction.getDestObj = function(s)
{
	var loc = ctrl.places.getCurrentLoc();
    var objDest = s.obj1;

    if ( objDest == null
      && s.term1 == null )
    {
		objDest = loc;
	}

	return objDest;
}

enterAction.exe = function(s, obj) {
    var toret = "No hay de eso por aqu&iacute;.";

    if ( arguments.length < 2
      || obj == null )
    {
		obj = this.getDestObj();
	}

    if ( obj != null ) {
        if ( obj.isReachable() ) {
            toret = "No es posible.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
}

enterAction.doIt = function(s) {
    var toret = "No hay de eso por aqu&iacute;.";
    var objDest = this.getDestObj(s);

    if ( objDest != null ) {
      if ( typeof( objDest.preEnter ) === "function" ) {
          toret = objDest.preEnter();
      } else {
          toret = this.exe( s );
      }

      if ( typeof( objDest.postEnter ) === "function" ) {
        objDest.postEnter();
      }
    }

    return toret;
};

// ------------------------------------------------------------ Exit
var exitAction = actions.crea( "exit",
    [ "sal", "salir", "salgo", "fuera", "afuera" ]
);

exitAction.getDestObj = function(s)
{
	var loc = ctrl.places.getCurrentLoc();
    var objDest = s.obj1;

    if ( objDest == null
      && s.term1 == null )
    {
		objDest = loc;
	}

	return objDest;
}

exitAction.exe = function(s, obj) {
    var toret = "No hay de eso por aqu&iacute;.";

    if ( arguments.length < 2
      || obj == null )
    {
		obj = this.getDestObj( s );
	}

    if ( obj != null ) {
        if ( obj.isReachable() ) {
            toret = "No es posible.";
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
}

exitAction.doIt = function(s) {
    var toret = "No hay de eso por aqu&iacute;.";
    var objDest = this.getDestObj( s );

    if ( objDest != null ) {
      if ( typeof( objDest.preExit ) === "function" ) {
          toret = objDest.preExit();
      } else {
          toret = this.exe( s );
      }

      if ( typeof( objDest.postExit ) === "function" ) {
        objDest.postExit();
      }
    }

    return toret;
};

// ------------------------------------------------------------ Push
var pushAction = actions.crea( "push",
    [
        "empuja", "empujar", "empujo",
        "mueve", "mover", "muevo",
    ]
);

pushAction.exe = function(s, obj) {
    var toret = "";

    if ( arguments.length < 2
      || obj == null )
    {
		obj = s.obj1;
	}

    if ( obj.isReachable() ) {
        toret = "No se puede.";
    } else {
        toret = "Demasiado lejos.";
    }

    return toret;
}

pushAction.doIt = function(s) {
    var toret = "";
    var objDest = s.obj1;

    if ( objDest != null ) {
      if ( typeof( objDest.prePush ) === "function" ) {
        toret = objDest.prePush();
      } else {
        toret = this.exe( s );
      }

      if ( typeof( objDest.postPush ) === "function" ) {
        objDest.postPush();
      }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// ------------------------------------------------------------ Pull
var pullAction = actions.crea( "pull",
    [
        "tira", "tirar", "tiro",
        "arrastra", "arrastrar", "arrastro",
    ]
);

pullAction.transInput = function(s)
{
    var dropAction = actions.getAction( "drop" );

    if ( this.match( s )
      && s.term2 != null
      && s.term1 != null )
    {
        s.verb = dropAction.verbs[ 0 ];
    }

    return "";
}

pullAction.exe = function(s, obj) {
    var toret = "";

    if ( arguments.length < 2
      || obj == null )
    {
		obj = s.obj1;
	}

    if ( obj.isReachable() ) {
        toret = "No se puede.";
    } else {
        toret = "Demasiado lejos.";
    }

    return toret;
}

pullAction.doIt = function(s) {
    var toret = "";
    var objDest = s.obj1;

    if ( objDest != null ) {
      if ( typeof( objDest.prePull ) === "function" ) {
        toret = objDest.prePull();
      } else {
        toret = this.exe( s );
      }

      if ( typeof( objDest.postPull ) === "function" ) {
          objDest.postPull();
      }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// ------------------------------------------------------------ Drop
var dropAction = actions.crea( "drop",
	[ "deja", "dejar", "dejo",
    "tira", "tirar", "tiro",
    "lanzar", "lanza", "lanzo",
	  "suelta", "soltar", "suelto" ]
);

dropAction.getContainer = function(s) {
	var toret = s.obj2;

	if ( toret == null ) {
		toret = ctrl.places.getCurrentLoc();
	}

  return toret;
}

dropAction.exe = function(s, obj, cont, persona) {
    var toret = "";

    if ( arguments.length < 4
      || persona == null )
    {
        persona = ctrl.personas.getPlayer();
    }

    if ( arguments.length < 3
      || cont == null )
    {
        cont = this.getContainer( s );
    }

    if ( arguments.length < 2
      || obj == null )
    {
        obj = s.obj1;
    }

    if ( obj != null ) {
        // The very same place?
        if ( obj.owner === persona ) {
            if ( cont.isReachable() ) {
                if ( cont.isContainer() ) {

                    if ( obj.isClothing() ) {
                        obj.setWorn( false );
                    }

                    obj.moveTo( cont );
                    toret = "Hecho.";
                } else {
                    toret = "No parece apropiado.";
                }
            } else {
                toret = "Demasiado lejos.";
            }
        } else {
            toret = "No est&aacute; siendo llevado.";
        }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
}

dropAction.doIt = function(s) {
    var toret = "";
    var cont = this.getContainer( s );
    var objDest = s.obj1;
    var verb = s.verb;
    var objTerm = s.term1;

  	// No se encuentra el contenedor, pero se ha especificado
    if ( s.term2 != null
      && s.obj2 == null  )
    {
        objDest = null;
    }

    if ( objDest != null ) {
        if ( objDest.owner == ctrl.personas.getPlayer() ) {
            if ( typeof( objDest.preDrop ) === "function" ) {
                toret = objDest.preDrop();
            } else {
                toret = this.exe( s );
            }

            actions.execute( "look" );

            // Set 's' again back to "take"
            s.act = this;
            s.verb = verb;
            s.obj1 = objDest;
            s.term1 = objTerm;

            if ( typeof( objDest.postDrop ) === "function" ) {
                objDest.postDrop();
            }
        } else {
            toret = "No est&aacute; siendo llevado.";
        }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// ------------------------------------------------------------ Take
var takeAction = actions.crea( "take",
    [
        "coge", "coger", "cojo",
        "toma", "tomar", "tomo",
    ]
);

takeAction.exe = function(s, obj, persona) {
    var toret = "No hay de eso por aqu&iacute;.";

    if ( arguments.length < 3
      || persona == null )
    {
        persona = ctrl.personas.getPlayer();
    }

    if ( arguments.length < 2
      || obj == null )
    {
        obj = s.obj1;
    }

    if ( obj != null ) {
        if ( obj.isReachable() ) {
            if ( !obj.isScenery() ) {
				if ( !persona.has( obj ) ) {
					obj.moveTo( persona );

					if ( obj.isClothing() ) {
						obj.setWorn( false );
					}

					toret = "Cogido.";
				} else {
					toret = "Ya lo tienes.";
				}
            } else {
                toret = "No servir&iacute;a de nada.";
            }
        } else {
            toret = "Demasiado lejos.";
        }
    }

    return toret;
}

takeAction.doIt = function(s) {
    var toret = "";
    var objDest = s.obj1;
    var objTerm = s.term1;
    var verb = s.verb;

    if ( objDest != null ) {
      if ( typeof( objDest.preTake ) === "function" ) {
          toret = objDest.preTake();
      } else {
          toret = this.exe( s );
      }

      actions.execute( "look" );

      // Set 's' again back to "take"
      s.act = this;
      s.verb = verb;
      s.obj1 = objDest;
      s.term1 = objTerm;

      if ( typeof( objDest.postTake ) === "function" ) {
        objDest.postTake();
      }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// ---------------------------------------------------------------- Open
var openAction = actions.crea( "open",
    [ "abre", "abrir", "abro",
      "desbloquea", "desbloquear", "desbloqueo" ]
);

openAction.exe = function(s, obj) {
    var toret = "";

    if ( arguments.length < 2
      || obj == null )
    {
        obj = s.obj1;
    }

    if ( obj != null ) {
        if ( obj.isReachable() ) {
            toret = "No hay necesidad.";

            if ( obj.isCloseable()
              && !obj.isOpen() )
            {
                obj.setOpen();
                toret = "Hecho.";
            }
        } else {
            toret = "Demasiado lejos.";
        }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
}

openAction.doIt = function(s) {
    var toret = "";
    var objDest = s.obj1;

    if ( objDest != null ) {
      if ( typeof( objDest.preOpen ) === "function" ) {
        toret = objDest.preOpen();
      } else {
          toret = this.exe( s );
      }

      if ( typeof( objDest.postOpen ) === "function" ) {
        objDest.postOpen();
      }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// --------------------------------------------------------------- Close
var closeAction = actions.crea( "close",
    [ "cierra", "cerrar", "cierro" ]
);

closeAction.exe = function(s, obj) {
    var toret = "";

    if ( arguments.length < 2
      || obj == null )
    {
        obj = s.obj1;
    }

    if ( obj != null ) {
        if ( obj.isReachable() ) {
            toret = "No hay necesidad.";

            if ( obj.isCloseable()
              && obj.isOpen() )
            {
                obj.setOpen( false );
                toret = "Hecho.";
            }
        } else {
            toret = "Demasiado lejos.";
        }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
}

closeAction.doIt = function(s) {
    var toret = "";
    var objDest = s.obj1;

    if ( objDest != null ) {
      if ( typeof( objDest.preClose ) === "function" ) {
        toret = objDest.preClose();
      } else {
          toret = this.exe( s );
      }

      if ( typeof( objDest.postClose ) === "function" ) {
        objDest.postClose();
      }
    } else {
        toret = "No hay de eso por aqu&iacute;.";
    }

    return toret;
};

// ------------------------------------------------------------ Swim
var swimAction = actions.crea( "swim",
	[ "nada", "nadar", "nado", "bucear", "bucea", "buceo" ]
);

swimAction.exe = function(s) {
    return "Ahora no.";
}

swimAction.doIt = function(s) {
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preSwim ) === "function" ) {
        toret = loc.preSwim();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postSwim ) === "function" ) {
        loc.postSwim();
    }

    return toret;
};

// ---------------------------------------------------------------- Talk
var talkAction = actions.crea( "talk", [ "habla", "hablar", "hablo" ] );

talkAction.exe = function(s) {
	var toret = "";
    var persona = s.obj1;

	if ( s.term1 == null ) {
		toret = "Hablar solo no parece buena idea.";
	}
	else
	if ( persona == null ) {
		toret = "No lo veo en derredor.";
	}
	else
	if ( !( persona instanceof Persona ) ) {
		toret = "No se puede hablar con eso.";
	} else {
		if ( persona.isReachable() ) {
			toret = "No te hace caso.";
		} else {
			toret = "Est&aacute; demasiado lejos como para poder hablar.";
		}
	}

    return toret;
}

talkAction.doIt = function(s) {
    var toret = "";
    var persona = s.obj1;

	if ( s.term1 == null ) {
		toret = "Hablar solo no parece buena idea.";
	}
	else
	if ( persona == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( persona.preTalk ) === "function" ) {
			toret = persona.preTalk();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( persona.postTalk ) === "function" ) {
			persona.postTalk();
		}
	}

    return toret;
};

// -------------------------------------------------------------- Search
var searchAction = actions.crea( "search",
	[ "registra", "registrar", "registro",
	  "busca", "buscar", "busco",
	  "rebusca", "rebuscar", "rebusco" ]
);

searchAction.transInput = function(s) {
    var searchAction = actions.getAction( "search" );

    // Look in "mirar en" = search "registra"
    if ( lookAction.match( s )
      && s.prep === "en" )
    {
		s.prep = "";
		s.verb = searchAction.verbs[ 0 ];
    }

    return "";
}

searchAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacute;as especificar lo qu&eacute;.";
	}
	else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "No encuentras nada especial.";
        }
    }

    return toret;
}

searchAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacute;as especificar lo qu&eacute;.";
	}
	else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preSearch ) === "function" ) {
			toret = objDest.preSearch();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postSearch ) === "function" ) {
			objDest.postSearch();
		}
	}

    return toret;
}

// ------------------------------------------------------------- Listen
var listenAction = actions.crea( "listen",
	[ "escucha", "escuchar", "escucho",
      "oir", "oye", "oigo" ]
);

listenAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		objDest = ctrl.places.getCurrentLoc();
	}

	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "No escuchas nada especial.";
        }
    }

    return toret;
}

listenAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		objDest = ctrl.places.getCurrentLoc();
	}

	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preListen ) === "function" ) {
			toret = objDest.preListen();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postListen ) === "function" ) {
			objDest.postListen();
		}
	}

    return toret;
}

// --------------------------------------------------------------- Sing
var singAction = actions.crea( "sing",
	[ "canta", "cantar", "canto" ]
);

singAction.exe = function(s) {
    return "Mejor no: cantas fatal.";
}

singAction.doIt = function(s)
{
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preSing ) === "function" ) {
        toret = loc.preSing();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postSing ) === "function" ) {
        loc.postSing();
    }

    return toret;
}

// --------------------------------------------------------------- Jump
var jumpAction = actions.crea( "jump",
	[ "salta", "saltar", "salto" ]
);

jumpAction.transInput = function(s) {
    var climbAction = actions.getAction( "climb" );

    // "salta [a/sobre] x" => "sube a x"
    if ( this.match( s )
      && s.term1 != null )
    {
        s.verb = climbAction.verbs[ 0 ];
    }

    return "";
}

jumpAction.exe = function(s) {
    return "Al final, decides no hacerlo.";
}

jumpAction.doIt = function(s)
{
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preJump ) === "function" ) {
        toret = loc.preJump();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postJump ) === "function" ) {
        loc.postJump();
    }

    return toret;
}

// --------------------------------------------------------------- Shout
var shoutAction = actions.crea( "shout",
	[ "grita", "gritar", "grito" ]
);

shoutAction.exe = function(s) {
    return "Al final, decides no hacerlo.";
}

shoutAction.doIt = function(s)
{
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preShout ) === "function" ) {
        toret = loc.preShout();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postShout ) === "function" ) {
        loc.postShout();
    }

    return toret;
}

// ------------------------------------------------------------- Sleep
var sleepAction = actions.crea( "sleep",
	[ "duerme", "duermete", "dormir", "dormirte", "dormirse", "duermo" ]
);

sleepAction.exe = function(s) {
    return "Al final, decides no hacerlo.";
}

sleepAction.doIt = function(s)
{
    var toret = "";
    var loc = ctrl.places.getCurrentLoc();

    if ( typeof( loc.preSleep ) === "function" ) {
        toret = loc.preSleep();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( loc.postSleep ) === "function" ) {
        loc.postSleep();
    }

    return toret;
}

// --------------------------------------------------------------- Taste
var tasteAction = actions.crea( "taste",
	[ "prueba", "probar", "pruebo", "lame", "lamer", "lamo" ]
);

tasteAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

tasteAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preTaste ) === "function" ) {
			toret = objDest.preTaste();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postTaste ) === "function" ) {
			objDest.postTaste();
		}
	}

    return toret;
}

// --------------------------------------------------------------- Touch
var touchAction = actions.crea( "touch",
	[ "toca", "tocar", "toco",
      "acaricia", "acariciar", "acaricio" ]
);

touchAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

touchAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preTouch ) === "function" ) {
			toret = objDest.preTouch();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postTouch ) === "function" ) {
			objDest.postTouch();
		}
	}

    return toret;
}

// --------------------------------------------------------------- Smell
var smellAction = actions.crea( "smell",
	[ "huele", "huelele", "oler", "olerle", "huelo" ]
);

smellAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "No huele a nada especial.";
        }
    }

    return toret;
}

smellAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preSmell ) === "function" ) {
			toret = objDest.preSmell();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postSmell ) === "function" ) {
			objDest.postSmell();
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Have
var haveAction = actions.crea( "have",
	[ "come", "comete", "comer", "comerse", "como",
      "bebe", "bebete", "beber", "beberse", "bebo" ]
);

haveAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

haveAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preHave ) === "function" ) {
			toret = objDest.preHave();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postHave ) === "function" ) {
			objDest.postHave();
		}
	}

    return toret;
}

// ------------------------------------------------------------- Descend
var descendAction = actions.crea( "descend",
    [ "bajar", "baja", "bajo", "destrepar", "destrepa", "destrepo",
      "descender", "desciende", "desciendo" ]
);

descendAction.transInput = function(s) {
    var loc = ctrl.places.getCurrentLoc();

    // Baja => ir abajo
    if ( this.match( s )
      && s.term1 == null )
    {
        s.verb = actions.getAction( "go" ).verbs[ 0 ];
        s.term1 = loc.compas[ 5 ];
    }

    return "";
}

descendAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar a d&oacute;nde.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

descendAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar a d&oacute;nde.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preDescend ) === "function" ) {
			toret = objDest.preDescend();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postDescend ) === "function" ) {
			objDest.postDescend();
		}
	}

    return toret;
}


// --------------------------------------------------------------- Climb
var climbAction = actions.crea( "climb",
	[ "sube", "subete", "súbete", "subir", "subirse", "subo",
      "escala", "escalar", "escalo",
      "trepar", "trepa", "trepo" ]
);

climbAction.transInput = function(s) {
    var loc = ctrl.places.getCurrentLoc();

    // Sube => ir arriba
    if ( this.match( s )
      && s.term1 == null )
    {
        s.verb = actions.getAction( "go" ).verbs[ 0 ];
        s.term1 = loc.compas[ 4 ];
    }

    return "";
}

climbAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar a qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

climbAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar a qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preClimb ) === "function" ) {
			toret = objDest.preClimb();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postClimb ) === "function" ) {
			objDest.postClimb();
		}
	}

    return toret;
}

// --------------------------------------------------------------- Shake
var shakeAction = actions.crea( "shake",
	[ "agita", "agitar", "agito",
	  "sacude", "sacudir", "sacudo" ]
);

shakeAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar a qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
    else {
        if ( !objDest.isReachable() ) {
            toret = "Demasiado lejos.";
        } else {
            toret = "Al final, decides no hacerlo.";
        }
    }

    return toret;
}

shakeAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar s qu&eacute;.";
	}
    else
	if ( objDest == null ) {
		toret = "No lo veo en derredor.";
	}
	else {
		if ( typeof( objDest.preShake ) === "function" ) {
			toret = objDest.preShake();
		} else {
			toret = this.exe( s );
		}

		if ( typeof( objDest.postShake ) === "function" ) {
			objDest.postShake();
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Show
var showAction = actions.crea( "show",
	[ "muestra", "mostrar", "muestro" ]
);

showAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;
    var pnjDest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar a qui&eacute;n.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( pnjDest == null ) {
			toret = "No le veo en derredor.";
		}
		else {
			if ( !( pnjDest instanceof Persona ) ) {
				toret = "No tiene sentido.";
			}
			else
			if ( !objDest.isReachable()
			  || !pnjDest.isReachable() )
			{
				toret = "Demasiado lejos.";
			} else {
				toret = "Al final, decides no hacerlo.";
			}
		}
	}

    return toret;
}

showAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;
    var pnjDest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar a qui&eacute;n.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( pnjDest == null ) {
			toret = "No le veo en derredor.";
		}
		else {
			if ( typeof( objDest.preShow ) === "function" ) {
				toret = objDest.preShow();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( objDest.postShow ) === "function" ) {
				objDest.postShow();
			}
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Give
var giveAction = actions.crea( "give",
	[ "da", "dale", "dar", "darle", "doy",
	  "entrega", "entregale", "entregar", "entregarle", "entrego" ]
);

giveAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;
    var pnjDest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar a qui&eacute;n.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( pnjDest == null ) {
			toret = "No le veo en derredor.";
		}
		else {
			if ( !( pnjDest instanceof Persona ) ) {
				toret = "No tiene sentido.";
			}
			else
			if ( !objDest.isReachable()
			  || !pnjDest.isReachable() )
			{
				toret = "Demasiado lejos.";
			} else {
				toret = actions.execute( "drop", objDest.id, pnjDest.id );
			}
		}
	}

    return toret;
}

giveAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;
    var pnjDest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar a qui&eacute;n.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( pnjDest == null ) {
			toret = "No le veo en derredor.";
		}
		else {
			if ( typeof( objDest.preGive ) === "function" ) {
				toret = objDest.preGive();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( objDest.postGive ) === "function" ) {
				objDest.postGive();
			}
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Tie
var tieAction = actions.crea( "tie",
	[ "ata", "atale", "atar", "atarle", "ato" ]
);

tieAction.exe = function(s) {
    var toret = "";
    var obj1Dest = s.obj1;
    var obj2Dest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar con qu&eacute;.";
	}
    else {
		if ( obj1Dest == null
          || obj2Dest == null )
        {
			toret = "No veo eso en derredor.";
		}
		else {
			if ( !obj1Dest.isReachable()
			  || !obj2Dest.isReachable() )
			{
				toret = "Demasiado lejos.";
			} else {
				toret = "Al final, decides no hacerlo.";
			}
		}
	}

    return toret;
}

tieAction.doIt = function(s)
{
    var toret = "";
    var obj1Dest = s.obj1;
    var obj2Dest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar con qu&eacute;.";
	}
    else {
		if ( obj1Dest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( obj2Dest == null ) {
			toret = "No lo veo en derredor.";
		}
		else {
			if ( typeof( obj1Dest.preTie ) === "function" ) {
				toret = obj1Dest.preTie();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( obj1Dest.postTie ) === "function" ) {
				obj1Dest.postTie();
			}
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Dig
var digAction = actions.crea( "dig",
	[ "cava", "cavar", "cavo", "excava", "excavar", "excavo" ]
);

digAction.exe = function(s) {
    var toret = "";
    var obj1Dest = s.obj1;
    var obj2Dest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar con qu&eacute;.";
	}
    else {
		if ( obj1Dest == null
          || obj2Dest == null )
        {
			toret = "No veo eso en derredor.";
		}
		else {
			if ( !obj1Dest.isReachable()
			  || !obj2Dest.isReachable() )
			{
				toret = "Demasiado lejos.";
			} else {
				toret = "Al final, decides no hacerlo.";
			}
		}
	}

    return toret;
}

digAction.doIt = function(s)
{
    var toret = "";
    var obj1Dest = s.obj1;
    var obj2Dest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else
	if ( s.term2 == null ) {
		toret = "Deber&iacuteas especificar con qu&eacute;.";
	}
    else {
		if ( obj1Dest == null ) {
			toret = "No veo eso en derredor.";
		}
		else
		if ( obj2Dest == null ) {
			toret = "No lo veo en derredor.";
		}
		else {
			if ( typeof( obj1Dest.preDig ) === "function" ) {
				toret = obj1Dest.preDig();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( obj1Dest.postDig ) === "function" ) {
				obj1Dest.postDig();
			}
		}
	}

    return toret;
}

// ----------------------------------------------------------------- Put
var putAction = actions.crea( "put",
	[ "pon", "poner", "pongo" ]
);

putAction.transInput = function(s) {
    var dropAction = actions.getAction( "drop" );
    var wearAction = actions.getAction( "wear" );

    if ( this.match( s ) ) {
        if ( s.prep === "sobre"
          || s.prep === "en" )
        {
            s.verb = dropAction.verbs[ 0 ];
        } else {
            s.verb = wearAction.verbs[ 0 ];
        }
    }

    return "";
}

// -------------------------------------------------------------- Insert
var insertAction = actions.crea( "insert",
	[ "mete", "meter", "meto", "inserta", "insertar", "inserto",
      "introduce", "introducir", "introduzco" ]
);

insertAction.transInput = function(s) {
    var dropAction = actions.getAction( "drop" );
    var toret = "";

    if ( this.match( s ) ) {
        if ( s.term1 != null
          && s.term2 != null )
        {
            s.verb = dropAction.verbs[ 0 ];
        } else {
            toret = "Debes especificar en d&oacute;nde...";
        }
    }

    return toret;
}

// ------------------------------------------------------------- Extract
var extractAction = actions.crea( "extract",
	[ "saca", "sacar", "saco", "extrae", "extraer", "extraigo" ]
);

extractAction.transInput = function(s) {
    var takeAction = actions.getAction( "take" );
    var toret = "";

    if ( this.match( s ) ) {
        if ( s.term1 != null
          && s.term2 != null )
        {
            s.verb = takeAction.verbs[ 0 ];
        } else {
            toret = "Debes especificar de d&oacute;nde...";
        }
    }

    return toret;
}

// ---------------------------------------------------------------- Wear
var wearAction = actions.crea( "wear",
	[ "viste", "vestir", "vestirse", "visto",
      "ponte", "ponerse", "ponerte", "pongo"
    ]
);

wearAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else {
			if ( !objDest.isReachable() ) {
				toret = "Demasiado lejos.";
			} else {
                if ( objDest.isClothing() ) {
                    if ( !objDest.isWorn() ) {
                        objDest.setWorn();
                        toret = "Hecho.";
                    } else {
                        toret = "Ya lo est&aacute;.";
                    }
                } else {
                    toret = "No es algo para vestir.";
                }
			}
		}
	}

    return toret;
}

wearAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;
    var player = ctrl.personas.getPlayer();

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else {
            if ( !player.has( objDest ) ) {
                actions.execute( "take", s.term1 );

                if ( !player.has( objDest ) ) {
                    return;
                }
            }

			if ( typeof( objDest.preWear ) === "function" ) {
				toret = objDest.preWear();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( objDest.postWear ) === "function" ) {
				objDest.postWear();
			}
		}
	}

    return toret;
}

// ----------------------------------------------------------- Disrobe
var disrobeAction = actions.crea( "disrobe",
	[ "desviste", "desvestir", "desvestirse", "desvisto",
      "quitate", "quitarse", "quitate", "quito", "quita"
    ]
);

disrobeAction.exe = function(s) {
    var toret = "";
    var objDest = s.obj1;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else {
			if ( !objDest.isReachable() ) {
				toret = "Demasiado lejos.";
			} else {
                if ( objDest.owner === ctrl.personas.getPlayer()
                  && objDest.isClothing()
                  && objDest.isWorn() )
                {
                    objDest.setWorn( false );
                    toret = "Hecho.";
                } else {
                    toret = "No lo llevas puesto.";
                }
			}
		}
	}

    return toret;
}

disrobeAction.doIt = function(s)
{
    var toret = "";
    var objDest = s.obj1;
    var pnjDest = s.obj2;

	if ( s.term1 == null ) {
		toret = "Deber&iacuteas especificar lo qu&eacute;.";
	}
    else {
		if ( objDest == null ) {
			toret = "No veo eso en derredor.";
		}
		else {
			if ( typeof( objDest.preDisrobe ) === "function" ) {
				toret = objDest.preDisrobe();
			} else {
				toret = this.exe( s );
			}

			if ( typeof( objDest.postDisrobe ) === "function" ) {
				objDest.postDisrobe();
			}
		}
	}

    return toret;
}

// ---------------------------------------------------------------- Status
var statusAction = actions.crea( "status",
	[ "status", "stats", "estado", "turnos", "puntos", "puntuacion" ]
);

statusAction.exe = function(s) {
	var player = ctrl.personas.getPlayer();
	var turns = ctrl.getTurns();
	var toret = "Has jugado " + turns;

	if ( turns == 1 ) {
		toret += " turno.";
	} else {
		toret += " turnos.";
	}

	if ( ctrl.hasScore() ) {
		toret += "<br> Tu puntuación es de: " + player.score;
	}

    return toret;
}

statusAction.doIt = function(s) {
    var toret = "";
    var player = ctrl.personas.getPlayer();

    if ( typeof( player.preStatus ) === "function" ) {
        toret = player.preStatus();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( player.postStatus ) === "function" ) {
        objDest.postStatus();
    }

    return toret;
}

// ---------------------------------------------------------------- Wait
var waitAction = actions.crea( "wait",
	[ "espera", "z" ]
);

waitAction.exe = function(s) {
    return "Esperas un rato.";
}

waitAction.doIt = function(s) {
    var toret = "";
    var player = ctrl.personas.getPlayer();

    if ( typeof( player.preWait ) === "function" ) {
        toret = player.preWait();
    } else {
        toret = this.exe( s );
    }

    if ( typeof( player.postWait ) === "function" ) {
        objDest.postWait();
    }

    return toret;
}
