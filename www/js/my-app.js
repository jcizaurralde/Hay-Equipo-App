  
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
var db = firebase.firestore();
var colUsuarios = db.collection("Usuarios");
var emailLogin="";
var passLogin="";

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
    
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnRegRegistrar').on('click', fnRegistrar);
  $$('#btnRegVolver').on('click', function fnVuelveIndex() {
    mainView.router.navigate('/index/');
  });
  
  function fnRegistrar() {
    email = $$('#registroEmail').val();
    password = $$('#registroPassword').val();
    /*password2 = $$('#registroPassword2').val();*/
    nombre = $$('#registroNombre').val();
    nacimiento = $$('#registroNacimiento').val();

    console.log("email: " + email);
    console.log("contraseña: " + password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
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
    }
    
    var datos = {
      Nombre: nombre, FechaNacimiento: nacimiento
    };

    colUsuarios.doc(email).set(datos);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnIngresar').on('click', fnIngreso);
  $$('#btnRegistro').on('click', fnRegistro);

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
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
      });
      
    console.log("email: " + emailLogin);
    console.log("contraseña: " + passLogin);
    console.log("carga la vista ingreso");
    mainView.router.navigate('/ingreso/');
  }

  function fnRegistro() {
    mainView.router.navigate('/registro/');
  }

  

})