  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/ingreso/', url: 'ingreso.html', },
      { path: '/index/', url: 'index.html', },
      { path: '/registro/', url: 'registro.html', },
      { path: '/mi-equipo/', url: 'mi-equipo.html', },
      { path: '/registro-canchas/', url: 'registro-canchas.html', },
      { path: '/ingreso-admin/', url: 'ingreso-admin.html', },
      { path: '/agenda-admin/', url: 'agenda-admin.html', },
      { path: '/perfil/', url: 'perfil.html', },
      { path: '/registro-equipo/', url: 'registro-equipo.html', },
      { path: '/ver-agenda-admin/', url: 'ver-agenda-admin.html', },
      
    
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var email = "";
var password = "";
var password2 = "";
var nombre = "";
var celular = "";
var notificationWithButton ="";
var emailLogin="";
var passLogin="";
var db = "";
var colUsuarios ="";
var colUsuariosAdm = "";
var nombreLogin = "";
var emailAdmin = ""; 
var passwordAdmin = ""; 
var password2Admin = ""; 
var nombreAdmin = ""; 
var calleAdmin = ""; 
var alturaAdmin = ""; 
var localidadAdmin = ""; 
var CPAdmin = ""; 
var provinciaAdmin = "";
var notificationWithButton = "";
var btnTusEquipos = "";
var notificationPass = "";
var nombreLoginAdm = "";
var tipoUs1 = "";
var tipoUs2 = "";
var tipoUsuario1 = "";
var tipoUsuario2 = "";
var usuAdmRef = "";
var usuRef = "";
var calendario = "";
var hoy = "";
var dia = "";
var colTurnos = "";
var fechaInicio = "";
var fechaFinal = "";
var colEquipos = "";
var nombreEquipo = "";
var notificationRegEq = "";
var jugadoresEquipo = "";
var horaInicio = "";
var horaFinal = "";
var notificationAgenda = "";


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    db = firebase.firestore();
    colUsuarios = db.collection("Usuarios");
    colUsuariosAdm = db.collection("Usuarios Administrativos");
    colTurnos = db.collection("Turnos");
    colEquipos = db.collection("Equipos");
    notificationWithButton = app.notification.create({
      icon: '<i class="f7-icons">bell_fill</i>',
      title: 'Hay Equipo App',
      subtitle: 'Bienvenido',
      text: 'Usuario registrado exitosamente, verifique su casilla de correo para validar',
      closeButton: true,
    });
      notificationPass = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Atención',
      text: 'Las contraseñas no coinciden, por favor vuelve a ingresar contraseñas',
      closeButton: true,
    });
    notificationPassDeb = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Atención',
      text: 'La clave es muy débil (mínimo: 8 caracteres). Debe contener al menos una mayúscula y un número',
      closeButton: true,
    });
    notificationRegEq = app.notification.create({
      icon: '<i class="f7-icons">bell_fill</i>',
      title: 'Hay Equipo App',
      subtitle: 'Nuevo equipo ',
      text: 'El equipo fue registrado exitosamente',
      closeButton: true,
    });
    notificationRegJu = app.notification.create({
      icon: '<i class="f7-icons">bell_fill</i>',
      title: 'Hay Equipo App',
      subtitle: 'Nuevo jugador del equipo',
      text: 'El jugador fue registrado exitosamente',
      closeButton: true,
    });
    notificationAgenda = app.notification.create({
      icon: '<i class="f7-icons">bell_fill</i>',
      title: 'Hay Equipo App',
      subtitle: 'Agenda de turnos creada exitosamente',
      text: 'Ir a: ver agenda, para gestionar',
      closeButton: true,
    });
    
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="ingreso"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    $$('#btnLogout').on('click', fnLogout);
    $$('#btnPerfil').on('click', function fnPerfil() {
      mainView.router.navigate('/perfil/');
    })
    $$('#btnVolverMenu').on('click', fnCierraPanel);
    $$('#btnMiequipo').on('click', fnMiequipo);
    usuRef = colUsuarios.doc(emailLogin);
    //Tomo de la colección Usuarios de la BD, el dato "Nombre", para poder darle una bienvenida al usuario en el inicio.
    usuRef.get().then((doc) => {
      if (doc.exists) {
        nombreLogin = doc.data().Nombre;
        console.log("Nombre del usuario: " + nombreLogin);
        $$('#bienvenida').text('Hola ' + nombreLogin + ' !');
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    //Función para cerrar cesión.
    function fnLogout() {
      var user = firebase.auth().currentUser;
      if (user) {
        firebase.auth().signOut()
          .then(() => {
            console.log('Cerrar sesión');
            mainView.router.navigate('/index/');
          })
          .catch((error) => {
            console.log('error ' + error);
          });
      } else {
        console.log('Ya cerre sesion');
      }
    }
    //NO FUNCIONA ESTA:
    function fnCierraPanel() {
      $$('.panel').on('panel: close', function (panel) {
        console.log('Panel ' + panel.side + ': close');
      });
    }
    function fnMiequipo() {
      mainView.router.navigate('/mi-equipo/');
    }
})

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnPerfil').on('click', function fnPerfil() {
    mainView.router.navigate('/perfil/');
  })
  $$('#btnPEVolver').on('click', function fnPerfil() {
    mainView.router.navigate('/ingreso/');
  })
  
})

$$(document).on('page:init', '.page[data-name="registro-equipo"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnREVolver').on('click', function fnPerfil() {
    mainView.router.navigate('/mi-equipo/');
  })
  $$('#btnMERegistrar').on('click', fnRegistraEquipo);
  

  function fnRegistraEquipo() {
    nombreEquipo = $$('#nomEquipo').val();
    var datosEquipo = { NombreEquipo: nombreEquipo, Capitan: emailLogin };
    colEquipos.doc(emailLogin).set(datosEquipo);
    console.log("Equipo: " + nombreEquipo + " agregado exitosamente");
    $$('#nomEquipo').val("");
    notificationRegEq.open(); 
    mainView.router.navigate('/mi-equipo/');
  }

})

$$(document).on('page:init', '.page[data-name="ingreso-admin"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnAdmAgenda').on('click', fnAgendaAdm);
  $$('#btnPerfil').on('click', function fnPerfil() {
    mainView.router.navigate('/perfil/');
  })
  $$('#btnLogout').on('click', fnLogout);
  usuAdmRef = colUsuariosAdm.doc(emailLogin);
  //Tomo de la colección Usuarios Adm. de la BD, el dato "Nombre", para poder darle una bienvenida al usuario en el inicio.
  usuAdmRef.get().then((doc) => {
    if (doc.exists) {
      nombreLoginAdm = doc.data().NombreComplejo;
      console.log("Nombre del usuario: " + nombreLoginAdm);
      $$('#bienvenidaAdmin').text('Hola ' + nombreLoginAdm + ' !');
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  //Función para cerrar cesión. 
  function fnLogout() {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut()
        .then(() => {
          console.log('Cerrar sesión');
          mainView.router.navigate('/index/');
        })
        .catch((error) => {
          console.log('error ' + error);
        });
    } else {
      console.log('Ya cerre sesion');
    }
  }

  function fnAgendaAdm() {
    mainView.router.navigate('/ver-agenda-admin/');
  }

})

$$(document).on('page:init', '.page[data-name="agenda-admin"]', function (e) {
  console.log(e);
  $$('#btnPerfil').on('click', function fnPerfil() {
    mainView.router.navigate('/perfil/');
  })
  $$('#btnVolverTur').on('click', function () {
    mainView.router.navigate('/ver-agenda-admin/');
  })
  $$('#btnGenerarTur').on('click', fnGeneraTurnos);
  
  //Genero Fecha de inicio y Fin, Hora Inicio y fin de los turnos, creo horarios. Todo en BD (Col Turnos)
  function fnGeneraTurnos() {
    horaInicio = $$('#horDesde').val();
    horaFinal = $$('#horHasta').val();
    fechaInicio = $$('#fechaDesde').val();
    fechaFinal = $$('#fechaHasta').val();
    var cantHoras = parseInt(horaFinal) - parseInt(horaInicio);
    console.log("Cantidad de horas"+cantHoras);
    var horarios = "";
    horarios = horaInicio +"a";
    var sumatoria = parseInt(horaInicio);
    var horaFin = parseInt(horaFinal) + 1;
    for (var i = 0; i<parseInt(cantHoras); i++){
      sumatoria += 1;
      console.log("Sumatoria: " + sumatoria);
      horarios += sumatoria.toString() + "," + sumatoria.toString() + "a" ;
      console.log("horarios ahora vale: "+ horarios);
    }
    horarios += horaFin.toString();
    console.log("Horarios generados: " + horarios);
    var datosTurnos = { FechaInicio: fechaInicio, FechaFinal: fechaFinal, 
      HoraInicio: horaInicio, HoraFinal: horaFinal, Horarios: horarios };
    colTurnos.doc(emailLogin).set(datosTurnos);


    for (var i=0; i<horarios.length; i++){
      console.log(horarios[i]);
      var hora = ""; 
      hora += horarios[i,i+5];
      console.log(hora);
    }

    calendario = app.calendar.create({
      inputEl: '#demo-calendar-date-format',
      dateFormat: {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'},
      closeOnSelect: true,
      minDate: new Date(),
      /*maxDate: fechaFinal,*/

        /*on: {
          closed: function () {
            $$('#horarios').empty()
          console.log(calendar.getValue());
          }
        }*/ 
    });
    notificationAgenda.open();
    mainView.router.navigate('/ver-agenda-admin/');
      
  }

   
})

$$(document).on('page:init', '.page[data-name="ver-agenda-admin"]', function (e) {
  console.log(e);
  $$('#btnVerAgenda').on('click', fnAbreCalendar);
  $$('#btnCrearAgenda').on('click', fnCreaAgenda);
  $$('#btnVEVolver').on('click', function() {
    mainView.router.navigate('/ingreso-admin/');
  });

  function fnCreaAgenda() {
    mainView.router.navigate('/agenda-admin/');
  }

  function fnAbreCalendar() {
    calendario.open();
  }
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnRegRegistrar').on('click', fnRegistrar);
  $$('#btnRegVolver').on('click', function fnVuelveIndex() {
    mainView.router.navigate('/index/');
  });
  //Funcion de registro de un nuevo usuario con correo electronico como ID.
  function fnRegistrar() {
    email = $$('#registroEmail').val();
    password = $$('#registroPassword').val();
    password2 = $$('#registroPassword2').val();
    nombre = $$('#registroNombre').val();
    celular = $$('#registroCelular').val();
    tipoUs1 = "usuario" ;
    console.log("email: " + email);
    console.log("contraseña: " + password);
    if (password == password2){
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            var datos = {Nombre: nombre, Celular: celular, TipoUsuario: tipoUs1};
            colUsuarios.doc(email).set(datos);
            notificationWithButton.open();
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              notificationPassDeb.open();
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
        mainView.router.navigate('/index/');
    }else{
      notificationPass.open();
    }
  }
})

$$(document).on('page:init', '.page[data-name="registro-canchas"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnRegComp').on('click',fnRegAdmnistrador);
  $$('#btnVolverComp').on('click', function fnVuelveIndexComp() {
    mainView.router.navigate('/index/');
  });
//Funcion de registro de un nuevo usuario administrador (complejos de canchas) con correo electronico como ID.
  function fnRegAdmnistrador() {
    emailAdmin = $$('#regEmailAdmin').val();
    passwordAdmin = $$('#regPassAdmin').val();
    password2Admin = $$('#regPass2Admin').val();
    nombreAdmin = $$('#regNombreAdmin').val();
    calleAdmin = $$('#regCalleAdmin').val();
    alturaAdmin = $$('#regAlturaAdmin').val();
    localidadAdmin = $$('#regLocalidaddmin').val();
    provinciaAdmin = $$('#regProvinciaaddmin').val();
    telefonoAdmin = $$('#regTelefonoadmin').val();
    CPAdmin = $$('#regCPAdmin').val();
    tipoUs2 = "administrador";
    console.log("email: " + emailAdmin);
    console.log("contraseña: " + passwordAdmin);
    if (passwordAdmin == password2Admin){
      firebase.auth().createUserWithEmailAndPassword(emailAdmin, passwordAdmin)
        .then((user) => {
          var datosAdm = { NombreComplejo: nombreAdmin, Calle: calleAdmin, Altura: alturaAdmin, 
          Localidad: localidadAdmin, Provincia:provinciaAdmin, CodigoPostal: CPAdmin,
          Teléfono: telefonoAdmin, TipoUsuario: tipoUs2 };
          colUsuariosAdm.doc(emailAdmin).set(datosAdm);
          notificationWithButton.open();
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            notificationPassDeb.open();
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      mainView.router.navigate('/index/');
    }else{
      notificationPass.open();
    }
  }
  
})

$$(document).on('page:init', '.page[data-name="mi-equipo"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  var usuEquip = colEquipos.doc(emailLogin);
  usuEquip.get().then((doc) => {
    if (doc.exists) {
      var nombreEq = doc.data().NombreEquipo;
      console.log("Nombre del equipo: " + nombreEq);
      $$('#tituloEquipo').text(nombreEq);
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
    $$('#agregaBtnRE').html('<button class="col button button-raised button-fill" id="btnRegistraEquipo">Registra un equipo</button>');
  });

  $$('#btnPerfil').on('click', function fnVistaPerfil() {
    mainView.router.navigate('/perfil/');
  })
 
  $$('#btnMEVolver').on('click', function fnVistaIngreso() {
    mainView.router.navigate('/ingreso/');
  })

  $$('#btnRegistraEquipo').on('click', function fnVistaEquipo() {
    mainView.router.navigate('/registro-equipo/');
  })

  $$('#agregaIntegrantes').on('click', fnScreenJugadores);

  
  
  

  function fnAgregaJug() {
    nombreEquipo = $$('#ingresaEq').val();
    nombreJugador = $$('#nomJugador').val();
    puestoJugador = $$('#puesJugador').val();
    jugadoresEquipo += nombreJugador + puestoJugador;
    console.log("Los jugadores agregados: " + jugadoresEquipo);
    $$('#nomJugador').val("");
    $$('#puesJugador').val("");
    $$('#ingresaEq').val();
    var datosEquipo = { Jugadores: jugadoresEquipo };
    colEquipos.doc(emailLogin).set(datosEquipo);
    notificationRegJu.open();
  }
    
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnIngresar').on('click', fnIngreso);
  $$('#btnRegistro').on('click', fnRegistro);
  $$('#btnRegComplejo').on('click', fnRegComplejo);
  $$('#volverLogin').on('click', fnCierraLogin);

  
  function fnIngreso() {
    $$('.login-screen').on('loginscreen:opened', function (e) {
      console.log('Login screen opened');
      $$('#ingresoLogin').on('click', fnLogueado);
    });
  }

  function fnLogueado() {
    emailLogin = $$('#usuarioLogin').val();
    passLogin = $$('#passwordLogin').val();
    var usuClRef = colUsuarios.doc(emailLogin);
    var usuAdmRef = colUsuariosAdm.doc(emailLogin);
    
    usuAdmRef.get().then((doc) => {
      if (doc.exists) {
        fnActivaLoginAd(emailLogin, passLogin);
      } else {
        console.log("Es un usuario cliente");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    usuClRef.get().then((doc) => {
      if (doc.exists) {
        fnActivaLoginCl(emailLogin, passLogin);
      } else {
        console.log("Es un usuario administrador");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  function fnActivaLoginCl(email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log("email: " + emailLogin);
        console.log("contraseña: " + passLogin);
        $$('.login-screen').removeClass('login-screen').addClass('login-screen-close');
        mainView.router.navigate('/ingreso/');
        console.log("carga la vista ingreso");
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
      });
  }

  function fnActivaLoginAd(email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log("email: " + email);
        console.log("contraseña: " + pass);
        $$('.login-screen').removeClass('login-screen').addClass('login-screen-close');
        mainView.router.navigate('/ingreso-admin/');
        console.log("carga la vista ingreso administracion");
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
      });
  }

  function fnRegistro() {
    mainView.router.navigate('/registro/');
  }

  function fnRegComplejo() {
    mainView.router.navigate('/registro-canchas/');
  }

  function fnCierraLogin() {
    $$('.login-screen').on('loginscreen:close', function (e) {
      console.log('Login screen close')
    })
  }

})