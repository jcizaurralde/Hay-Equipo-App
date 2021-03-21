  
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
      { path: '/ver-dia-admin/', url: 'ver-dia-admin.html', },
      
    
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
var colDias = "";
var diaSelecAd = "";
var inicio = "";
var fin = "";
var notificationErrorDia = "";



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    db = firebase.firestore();
    colUsuarios = db.collection("Usuarios");
    colUsuariosAdm = db.collection("Usuarios Administrativos");
    colTurnos = db.collection("Turnos");
    colEquipos = db.collection("Equipos");
    colDias = db.collection("Dias");
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
    notificationErrorDia = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Error',
      text: 'El día seleccionado no existe en su agenda, por favor vuelva a seleccionar una fecha',
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
    console.log("Cantidad de horarios "+ (cantHoras));
    var horarios = "";
    horarios = horaInicio +"a";
    var sumatoria = parseInt(horaInicio);
    var horaFin = parseInt(horaFinal) + 1;
    for (var i = 0; i<parseInt(cantHoras+1); i++){
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


    //ACA MAS ADELANTE, DEBERIA AGREGAR PARA ELEGIR TURNOS DE MAÑANA, USANDO ESTA MISMA MANERA
    //Y TAMBIEN ESTIRAR EL RANGO DE LA TARDE    
    for (var i = 0; i < horarios.length; i++) {
      var hora = "";
      if (i == 0 || i == 6 || i == 12 || i == 18 || i == 24 || i == 30 || i == 36 || i == 42) {
        hora += horarios.slice(i, i + 5);
        switch (i) {
          case 0: var horario1 = hora;
            console.log("Este horario1: " + horario1);
            break;
          case 6: var horario2 = hora;
            console.log("Este horario2: " + horario2);
            break;
          case 12: var horario3 = hora;
            console.log("Este horario3: " + horario3);
            break;
          case 18: var horario4 = hora;
            console.log("Este horario4: " + horario4);
            break;
          case 24: var horario5 = hora;
            console.log("Este horario5: " + horario5);
            break;
          case 30: var horario6 = hora;
            console.log("Este horario6: " + horario6);
            break;
          case 36: var horario7 = hora;
            console.log("Este horario7: " + horario7);
            break;
          case 24: var horario8 = hora;
            console.log("Este horario8: " + horario8);
            break;
          default:
            console.log("Error obteniendo horarios");
        }
      }
    }

    console.log("Fecha inicio: " + fechaInicio + "Fecha Fin: " + fechaFinal);
    inicio = new Date (fechaInicio);
    fin = new Date (fechaFinal);
    var transcurso = fin.getTime() - inicio.getTime();
    console.log("Transcurso: "+ transcurso);
    var trDias= transcurso/1000/60/60/24;
    console.log("dias: "+trDias);
    console.log("Cantidad de horas de juego: "+ (cantHoras+1));
    var hoy = new Date(inicio.getTime() + 86400000);
    console.log("Hoy vale: " + hoy);
    for (var i=0; i<trDias; i++){
      hoy = new Date(hoy.getTime() + 86400000);
      console.log("Ahora el dia es: " + hoy);
      dia = hoy.getDate().toString();
      mes = (hoy.getMonth()+1).toString();
      año= hoy.getFullYear().toString();
      if (dia > 0 && dia < 10) {
        dia = '0' + dia;
      }
      if (mes > 0 && mes < 10) {
        mes = '0' + mes;
      }
      var fechaConcat = año+"-"+mes+"-"+dia;
      console.log("Fecha Concatenada: "+ fechaConcat);
      var idDias = emailLogin + fechaConcat;
      console.log("idDias: "+ idDias);
      switch ((cantHoras+1)) {
        case 1:
          var datosAgenda = { Usuario: emailLogin, Turno1: horario1 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 2:
          var datosAgenda = { Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre" }
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 3:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 3:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 4:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre", Turno4: horario4 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 5:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre", Turno4: horario4 +"-"+"Libre", Turno5: horario5 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 6:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre", Turno4: horario4 +"-"+"Libre", Turno5: horario5 +"-"+"Libre",
            Turno6: horario6 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 7:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre", Turno4: horario4 +"-"+"Libre", Turno5: horario5 +"-"+"Libre",
            Turno6: horario6 +"-"+"Libre", Turno7: horario7 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 8:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: horario1 +"-"+"Libre", Turno2: horario2 +"-"+"Libre",
            Turno3: horario3 +"-"+"Libre", Turno4: horario4 +"-"+"Libre", Turno5: horario5 +"-"+"Libre",
            Turno6: horario6 +"-"+"Libre", Turno7: horario7 +"-"+"Libre", Turno8: horario8 +"-"+"Libre"}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
      }
    }

    notificationAgenda.open();
    mainView.router.navigate('/ver-agenda-admin/');
      
  }

   
})

$$(document).on('page:init', '.page[data-name="ver-agenda-admin"]', function (e) {
  console.log(e);

  calendario = app.calendar.create({
    inputEl: '#demo-calendar-modal',
    openIn: 'customModal',
    header: true,
    footer: true,
    minDate: inicio,
    maxDate: fin,

    on: {
      closed: function () {
        diaSelecAd = calendario.getValue();
        console.log("Dia seleccionado: " + diaSelecAd);
        fnMuestraDiaSeleccionado();
      }
    }
  });

  $$('#btnVerAgenda').on('click', fnAbreCalendar);
  $$('#btnCrearAgenda').on('click', fnCreaAgenda);
  $$('#btnVEVolver').on('click', function() {
    mainView.router.navigate('/ingreso-admin/');
  });

  function fnCreaAgenda() {
    mainView.router.navigate('/agenda-admin/');
  }

  function fnAbreCalendar() {
    // VER PARA ABRIR EL CALENDARIO Y QUE QUEDE EL VALOR GUARDADO PARA LUEGO PODER VER ESE DIA EN PARTICULAR
    //LOS HORARIOS DE ESE DIA, CON EL VALOR "LIBRE" U "OCUPADO" (SI UN USUARIO TOMO EL TURNO)
    calendario.open();
  }

  function fnMuestraDiaSeleccionado() {
    mainView.router.navigate('/ver-dia-admin/');
  }

})

$$(document).on('page:init', '.page[data-name="ver-dia-admin"]', function (e) {
  console.log(e);
  /*var accionTurnos = app.actions.create({
    buttons: [
      {
        text: 'Disponible',
        onClick: function () {
          var disponibilidad = "Libre";
          fnValorTurno(disponibilidad);
          app.dialog.alert('El turno cambio a: "Libre"');
        },
        bold: true
      },
      {
        text: 'No disponible',
        onClick: function () {
          var disponibilidad = "Ocupado";
          fnValorTurno(disponibilidad);
          app.dialog.alert('El turno cambio a: "Ocupado"');
        },
      },
    ]
  })
  console.log("Se creo el panel de botones" + accionTurnos);*/
 
  diaSelecAd = new Date (diaSelecAd);
  var diaSelec = diaSelecAd.getDate().toString();
  var mesSelec = (diaSelecAd.getMonth() + 1).toString();
  var añoSelec = diaSelecAd.getFullYear().toString();
  if (diaSelec > 0 && diaSelec < 10) {
    diaSelec = '0' + diaSelec;
  }
  if (mesSelec > 0 && mesSelec < 10) {
    mesSelec = '0' + mesSelec;
  }
  var buscaFecha = añoSelec + "-" + mesSelec + "-" + diaSelec;
  console.log("Busca fecha: " + buscaFecha);
  var tituloFecha = diaSelec + "-" + mesSelec + "-" + añoSelec;
  $$('#tituloFecha').text('Fecha seleccionada: ' + tituloFecha);
  var fechaRef = colDias.doc(emailLogin + buscaFecha);
  console.log(fechaRef);
  fechaRef.get().then((doc) => {
    if (doc.exists) {
      var turno1 = doc.data().Turno1;
      console.log("Turno 1: " + turno1);
      if (turno1 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos1').append('<button class="col-50 button btnturno button-raised button-round" id="turno1">'+turno1+'</button>')
      }
      var turno2 = doc.data().Turno2;
      console.log("Turno 2: " + turno2);
      if (turno2 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos1').append('<button class="col-50 button btnturno button-raised button-round" id="turno2">'+turno2+'</button>')
      }
      var turno3 = doc.data().Turno3;
      console.log("Turno 3: " + turno3);
      if (turno3 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos2').append('<button class="col-50 button btnturno button-raised button-round" id="turno3">'+turno3+'</button>')
      }
      var turno4 = doc.data().Turno4;
      console.log("Turno 4: " + turno4);
      if (turno4 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos2').append('<button class="col-50 button btnturno button-raised button-round" id="turno4">'+turno4+'</button>')
      }
      var turno5 = doc.data().Turno5;
      console.log("Turno 5: " + turno5);
      if (turno5 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos3').append('<button class="col-50 button btnturno button-raised button-round" id="turno5">'+turno5+'</button>')
      }
      var turno6 = doc.data().Turno6;
      console.log("Turno 6: " + turno6);
      if (turno6 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos3').append('<button class="col-50 button btnturno button-raised button-round" id="turno6">'+turno6+'</button>')
      }
      var turno7 = doc.data().Turno7;
      console.log("Turno 7: " + turno7);
      if (turno7 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos4').append('<button class="col-50 button btnturno button-raised button-round" id="turno7">'+turno7+'</button>')
      }
      var turno8 = doc.data().Turno8;
      console.log("Turno 8: " + turno8);
      if (turno8 == undefined){
        console.log("No existe este horario");
      } else{
        $$('#btnesTurnos4').append('<button class="col-50 button btnturno button-raised button-round" id="turno8">'+turno8+'</button>')
      }
    } else {
      console.log("No such document!");
      notificationErrorDia.open();
      mainView.router.navigate('/ver-agenda-admin/');
    }
  }).catch((error) => { 
    console.log("Error getting document:", error);
  });

  $$('.btnturno').on('click', fnAbreBotones);
  $$('#btnDisponible').on('click', fnDisponibilidadSi);
  $$('#btnNoDisponible').on('click', fnDisponibilidadNo);

  function fnAbreBotones() {
    /*accionTurnos.open();*/
    var btnHorario = $$(this.id).text();
    console.log("horario a cambiar: " + btnHorario);
    $$('#btnDisponible').text("Disponible");
    $$('#btnNoDisponible').text("No disponible");
  }

  function fnDisponibilidadSi() {
    var disponibilidad = "Libre"
    app.dialog.alert('El turno cambio a: "Libre"');
    fnValorTurno(disponibilidad);
  }

  function fnDisponibilidadNo() {
    var disponibilidad = "Ocupado"
    app.dialog.alert('El turno cambio a: "Ocupado"');
    fnValorTurno(disponibilidad);
  }

  function fnValorTurno(disponibilidad) {
    var dispTurno = disponibilidad;
    switch (btnHorario) {
      case turno1:
        fechaRef.update({ Turno1: horario1 + "-" + dispTurno})
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno2:
        fechaRef.update({ Turno2: horario2 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno3:
        fechaRef.update({ Turno3: horario3 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turnobutton:
        fechaRef.update({ Turno4: horario4 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno5:
        fechaRef.update({ Turno5: horario5 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno6:
        fechaRef.update({ Turno6: horario6 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno7:
        fechaRef.update({ Turno7: horario7 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case turno8:
        fechaRef.update({ Turno8: horario8 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      default:
        console.log("Nada se modificó")
        break;
    }
    
}

  $$('#btnVolverDia').on('click', function () {
    mainView.router.navigate('/ver-agenda-admin/');
  })
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
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