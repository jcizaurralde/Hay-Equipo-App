  
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
    
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var email = "";
var password = "";
var password2 = "";
var nombre = "";
var nacimiento = "";
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

//REVISAR ESTA NOTIFICACION
/*var notificationWithButton = $$.notification.create({
icon: '<i class="icon demo-icon">7</i>',
title: 'Framework7',
subtitle: 'Notification with close button',
text: 'Usuario registrado exitosamente, verifique su casilla de correo para validar',
closeButton: true,
});*/


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    db = firebase.firestore();
    colUsuarios = db.collection("Usuarios");
    colUsuariosAdm = db.collection("Usuarios Administrativos");
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
    var usuRef = colUsuarios.doc(emailLogin);
    //Tomo de la colección Usuarios de la BD, el dato "Nombre", para poder darle una bienvenida al usuario en el inicio.
    usuRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Nombre: ", doc.data().Nombre);
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
    nacimiento = $$('#registroNacimiento').val();
    console.log("email: " + email);
    console.log("contraseña: " + password);
    if (password == password2){
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            var datos = {Nombre: nombre, FechaNacimiento: nacimiento };
            colUsuarios.doc(email).set(datos);
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('Clave muy débil.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
        /*notificationWithButton.open();*/
        mainView.router.navigate('/index/');
    }else{
    console.log("Las contraseñas no coinciden, vuelva a ingresar contraseña");
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
    CPAdmin = $$('#regCPAdmin').val();
    console.log("email: " + emailAdmin);
    console.log("contraseña: " + passwordAdmin);
    if (passwordAdmin == password2Admin){
      firebase.auth().createUserWithEmailAndPassword(emailAdmin, passwordAdmin)
        .then((user) => {
          var datosAdm = { NombreComplejo: nombreAdmin, Calle: calleAdmin, Altura: alturaAdmin, 
          Localidad: localidadAdmin, Provincia:provinciaAdmin, CodigoPostal: CPAdmin };
          colUsuariosAdm.doc(emailAdmin).set(datosAdm);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('Clave muy débil.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      /*notificationWithButton.open();*/
      mainView.router.navigate('/index/');
    }else{
    console.log("Las contraseñas no coinciden, vuelva a ingresar contraseña");
    }
  }
  
})

$$(document).on('page:init', '.page[data-name="mi-equipo"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);

  $('.tusEquipos').on('click', () => {
    btnTusEquipos.open();
  });


  //REVISAR ESTOS BOTONES Y DARLE FUNCION (CADA UNO ES UNA OPCION DE LOS EQUIPOS REGISTRADOS POR EL USUSARIO)
  /*$on('pageInit', () => {
    var btnTusEquipos = $f7.actions.create({
      buttons: [
        {text: 'Button1',bold: true},
        {text: 'Button2'},
        {text: 'Cancel',color: 'red'},
      ]
    })*/

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
    firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin)
      .then((user) => {
        console.log("email: " + emailLogin);
        console.log("contraseña: " + passLogin);
        console.log("carga la vista ingreso");
        $$('.login-screen').removeClass('login-screen').addClass('login-screen-close');
        mainView.router.navigate('/ingreso/');
        
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