  
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
var miId = "";
var db = firebase.firestore();
var colUsuarios = db.collection("Usuarios");

/*export default (props, { $, $f7, $on }) => {
  $on('pageInit', () => {
      snotificationWithButton = $f7.notification.create({
      icon: '<i class="icon demo-icon">7</i>',
      title: 'Framework7',
      subtitle: 'Notification with close button',
      text: 'Usuario registrado exitosamente, verifique su casilla de correo para validar',
      closeButton: true,
    });
  })
}*/

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

    miId = email;

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

    colUsuarios.doc(miId).set(datos);
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnIngresar').on('click', fnIngreso);
  $$('#btnRegistro').on('click', fnRegistro);

  function fnIngreso() {
    mainView.router.navigate('/ingreso/');
  }

  function fnRegistro() {
    mainView.router.navigate('/registro/');
  }

  

})