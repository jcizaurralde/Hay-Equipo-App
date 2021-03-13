  
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
var btn7dias ="";
var diaSeleccionado = "";
var colTurnos = "";

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    db = firebase.firestore();
    colUsuarios = db.collection("Usuarios");
    colUsuariosAdm = db.collection("Usuarios Administrativos");
    colTurnos = db.collection("Turnos");
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
    /*$$('#btnVolverMenu').on('click', fnCierraPanel);*/
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
    //REVISAR EL CIERRE DEL PANEL
    /*function fnCierraPanel() {
      $$('#panelMenu').removeClass('panel-cover panel-init').addClass('panel-cover');
    }*/
    function fnMiequipo() {
      mainView.router.navigate('/mi-equipo/');
    }
})

$$(document).on('page:init', '.page[data-name="ingreso-admin"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnAdmAgenda').on('click', fnAgendaAdm);
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
    mainView.router.navigate('/agenda-admin/');
  }

})

$$(document).on('page:init', '.page[data-name="agenda-admin"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var weekLater = new Date().setDate(today.getDate() + 7);
  var monthLater = new Date().setDate(today.getDate() + 30);
  var twomonthLater = new Date().setDate(today.getDate() + 60);
  var threemonthLater = new Date().setDate(today.getDate() + 90);
  $$('#btn7dias').on('click', fnCalendario7);
  $$('#btn30dias').on('click', fnCalendario30);
  $$('#btn60dias').on('click', fnCalendario60);
  $$('#btn90dias').on('click', fnCalendario90);

  function fnCalendario7() {
    
    /*hoy = today.getDay();
    console.log("Hoy: " + hoy);
    switch (hoy) {
      case 1:
        dia = "Lunes"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraLunes() {} },
                    { text: 'Martes', onClick: function fnHoraMartes() {} },
                    { text: 'Miércoles', onClick: function fnHoraMiercoles() { } },
                    { text: 'Jueves', onClick: function fnHoraJueves() { } },
                    { text: 'Viernes', onClick: function fnHoraViernes() { } },
                    { text: 'Sábado', onClick: function fnHoraSabado() { } },
                    { text: 'Domingo', onClick: function fnHoraDomingo() { } }
          ]
        })
        break;
      case 2:
        dia = "Martes"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraMartes() { } },
          { text: 'Miércoles', onClick: function fnHoraMiercoles() { } },
          { text: 'Jueves', onClick: function fnHoraJueves() { } },
          { text: 'Viernes', onClick: function fnHoraViernes() { } },
          { text: 'Sábado', onClick: function fnHoraSabado() { } },
          { text: 'Domingo', onClick: function fnHoraDomingo() { } },
            { text: 'Lunes', onClick: function fnHoraLunes() { } }
          ]
        })
        break;
      case 3:
        dia = "Miércoles"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraMiercoles() { } },
          { text: 'Jueves', onClick: function fnHoraJueves() { } },
          { text: 'Viernes', onClick: function fnHoraViernes() { } },
          { text: 'Sábado', onClick: function fnHoraSabado() { } },
          { text: 'Domingo', onClick: function fnHoraDomingo() { } },
          { text: 'Lunes', onClick: function fnHoraLunes() { } },
          { text: 'Martes', onClick: function fnHoraMartes() { } }
          ]
        })
        break;
      case 4:
        dia = "Jueves"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraJueves() { } },
          { text: 'Viernes', onClick: function fnHoraViernes() { } },
          { text: 'Sábado', onClick: function fnHoraSabado() { } },
          { text: 'Domingo', onClick: function fnHoraDomingo() { } },
          { text: 'Lunes', onClick: function fnHoraLunes() { } },
          { text: 'Martes', onClick: function fnHoraMartes() { } },
          { text: 'Miércoles', onClick: function fnHoraMiercoles() { } }
          ]
        })
        break;
      case 5:
        dia = "Viernes"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraViernes() { } },
          { text: 'Sábado', onClick: function fnHoraSabado() { } },
          { text: 'Domingo', onClick: function fnHoraDomingo() { } },
          { text: 'Lunes', onClick: function fnHoraLunes() { } },
          { text: 'Martes', onClick: function fnHoraMartes() { } },
          { text: 'Miércoles', onClick: function fnHoraMiercoles() { } },
          { text: 'Jueves', onClick: function fnHoraJueves() { } }
          ]
        })
        break;
      case 6:
        dia = "Sábado"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraSabado() { } },
          { text: 'Domingo', onClick: function fnHoraDomingo() { } },
          { text: 'Lunes', onClick: function fnHoraLunes() { } },
          { text: 'Martes', onClick: function fnHoraMartes() { } },
          { text: 'Miércoles', onClick: function fnHoraMiercoles() { } },
          { text: 'Jueves', onClick: function fnHoraJueves() { } },
          { text: 'Viernes', onClick: function fnHoraViernes() { } }
          ]
        })
        break;
      case 0:
        dia = "Domingo"
        btn7dias = app.actions.create({
          buttons: [{ text: 'Hoy', bold: true, onClick: function fnHoraDomingo() { } },
          { text: 'Lunes', onClick: function fnHoraLunes() { } },
          { text: 'Martes', onClick: function fnHoraMartes() { } },
          { text: 'Miércoles', onClick: function fnHoraMiercoles() { } },
          { text: 'Jueves', onClick: function fnHoraJueves() { } },
          { text: 'Viernes', onClick: function fnHoraViernes() { } },
          { text: 'Sábado', onClick: function fnHoraSabado() { } }
          ]
        })
        break;
    
      default:
        console.log("Error obteniendo fecha");
        break;
    }*/
      calendario = app.calendar.create({
        inputEl: '#demo-calendar-modal',
        openIn: 'customModal',
        minDate: today ,
        maxDate: weekLater,
      });
      calendario.open();
      $$('#demo-calendar-modal').on('click', function () {
        diaSeleccionado = calendario.getValue();
        console.log("Dia seleccionado: " + diaSeleccionado);
      });
  }
  function fnCalendario30() {
    calendario = app.calendar.create({
      inputEl: '#demo-calendar-modal',
      openIn: 'customModal',
      minDate: today,
      maxDate: monthLater,
    });
    calendario.open();
    $$('#demo-calendar-modal').on('click', function () {
      diaSeleccionado = $$('#demo-calendar-modal').getValue();
      console.log("Dia seleccionado: " + diaSeleccionado);
    });
  }
  function fnCalendario60() {
    calendario = app.calendar.create({
      inputEl: '#demo-calendar-modal',
      openIn: 'customModal',
      minDate: today,
      maxDate: twomonthLater,
    });
    calendario.open();
    $$('#demo-calendar-modal').on('calendar : opened', function () {
      $$('#demo-calendar-modal').on('click', function () {
        diaSeleccionado = calendario.getValue();
        console.log("Dia seleccionado: " + diaSeleccionado);
      })
    });
  }
  function fnCalendario90() {
    calendario = app.calendar.create({
      inputEl: '#demo-calendar-modal',
      openIn: 'customModal',
      minDate: today,
      maxDate: threemonthLater,
    });
    calendario.open();
    $$('#demo-calendar-modal').on('click', function () {
      diaSeleccionado = calendario.getValue();
      console.log("Dia seleccionado: " + diaSeleccionado);
    });
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

  $$('.tusEquipos').on('click', () => {
    btnTusEquipos.open();
  });

  //CADA UNO ES UNA OPCION DE LOS EQUIPOS REGISTRADOS POR EL USUSARIO
    btnTusEquipos = app.actions.create({
      buttons: [{text: 'Button1',bold: true},
        {text: 'Button2'},
        {text: 'Cancel',color: 'red'},
      ]
    })
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnIngresar').on('click', fnIngreso);
  $$('#btnRegistro').on('click', fnRegistro);
  $$('#btnRegComplejo').on('click', fnRegComplejo);

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
})