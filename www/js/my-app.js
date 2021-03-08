  
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
var emailLogin="";
var passLogin="";
var db = "";
var colUsuarios ="";
var nombreLogin = "";

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
    nombreLogin = colUsuarios.doc(emailLogin).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log("data:" + doc.datos().nombre);
          });
        })
          .catch(function (error) {
            console.log("Error: ", error);
          });

    
      $$('#bienvenida').text('Hola' + nombreLogin + '!');
    
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
    }
    
    
    
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

  

})