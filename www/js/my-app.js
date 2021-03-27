  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Hay Equipo',
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
      { path: '/agenda-cliente/', url: 'agenda-cliente.html', },
      { path: '/ver-dia-cliente/', url: 'ver-dia-cliente.html', },
      { path: '/invita-amigos/', url: 'invita-amigos.html', },
      { path: '/ranking-cliente/', url: 'ranking-cliente.html', },
      { path: '/agrega-integrantes/', url: 'agrega-integrantes.html', },
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
var horaInicio = "";
var horaFinal = "";
var notificationAgenda = "";
var colDias = "";
var diaSelecAd = "";
var inicio = "";
var fin = "";
var notificationErrorDia = "";
var turno1 = "";
var turno2 = "";
var turno3 = "";
var turno4 = "";
var turno5 = "";
var turno6 = "";
var turno7 = "";
var turno8 = "";
var dispTurno = "";
var btnHorario = "";
var horario1 = "";
var horario2 = "";
var horario3 = "";
var horario4 = "";
var horario5 = "";
var horario6 = "";
var horario7 = "";
var horario8 = "";
var calendario2 = "";
var diaSelecCl = "";
var correoCancha  = "";
var inicioCliente = "";
var finalCliente = "";
var idDias = "";
var inicioClienteCorto = "";
var finalClienteCorto = "";
var turnosRef = "";
var diaRef = "";
var idBtnCancha = "";
var notificacionErrorPass="";
var notificationRegEqError="";
var dorsalJugador = "";
var nombreJugador = "";
var puestoJugador = "";
var notificationRegJuError = "";
var tabla = "";
var fechaConcat2 = "";
var pedidoUsuario = "";
var nombreJugador2 = "";
var puestoJugador2 = "";
var dorsalJugador2 = "";

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
      text: 'Seleccione: "Ver agenda", para gestionar',
      closeButton: true,
    });
    notificationErrorDia = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Error',
      text: 'El día seleccionado no existe en su agenda, por favor vuelva a seleccionar una fecha',
      closeButton: true,
    });
    notificacionErrorPass = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Atención',
      text: 'El usuario o la contraseña no son válidos',
      closeButton: true,
    });
    notificationRegEqError = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Atención',
      text: 'Ingrese un nombre de equipo',
      closeButton: true,
    });
    notificationRegJuError = app.notification.create({
      icon: '<i class="f7-icons">hand_thumbsdown</i>',
      title: 'Hay Equipo App',
      subtitle: 'Atención',
      text: 'El correo ingresado no es usuario de Hay Equipo',
      closeButton: true,
    });
    
});
$$(document).on('page:init', function (e) {
    console.log(e);
})
//************************************ VISTA "INGRESO" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="ingreso"]', function (e) {
    console.log(e);
    $$('#btnLogout').on('click', fnLogout);
    $$('#btnPerfil').on('click', function fnPerfil() {
      mainView.router.navigate('/perfil/');
    })
    $$('#btnReservar').on('click', function () {
      mainView.router.navigate('/agenda-cliente/');
    })
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
    //Función para cerrar cesión-->
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
    //Carga vista "Mi equipo"-->
    function fnMiequipo() {
      mainView.router.navigate('/mi-equipo/');
    }
  $$('#btnRanking').on('click', fnCargaRankingCL);
  function fnCargaRankingCL() {
    mainView.router.navigate('/ranking-cliente/');
  }
   
})
//************************************ VISTA "AGENDA-CLIENTE" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="agenda-cliente"]', function (e) {
  console.log(e);
  console.log("colusuariosAdm: "+ colUsuariosAdm);
  fnTraeCanchas();
  //Busco en la coleccion Usuarios Administrativos, cada uno de los nombres y correos de las canchas -->
  //ACA DEBERIA HABER UN FOR PARA TRAER TODAS LAS CANCHAS, OBTENIENDO TODO EL JSON
  function fnTraeCanchas() {
    colUsuariosAdm.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log("data:" + doc.data().NombreComplejo);
          var nombreCancha = doc.data().NombreComplejo;
          console.log("Nombre cancha: " + nombreCancha);
          correoCancha = doc.data().Correo;
          console.log("El correo de la cancha: " + correoCancha);
          /*$$('#listaCanchas').html('<li class="btnCancha" id="' + correoCancha +'" ><div class="item-content"><div class="item-media"><i class="f7-icons">sportscourt</i></div><div class="item-inner"><div class="item-title" class="muestraCanchas">'+nombreCancha+'</div><div class="item-after">ver turnos ></div></div></div></li>');*/
          $$('#btnCancha').html('<div class="item-content"><div class="item-media"><i class="f7-icons">sportscourt</i></div><div class="item-inner"><div class="item-title" class="muestraCanchas">'+nombreCancha+'</div><div class="item-after">ver turnos ></div></div></div>');
          //Busco en la coleccion Turnos, por el ID de la cancha (correo), la fecha inicio y fecha final de su agenda -->
          turnosRef = colTurnos.doc(correoCancha);
          console.log("TurnosRef: " + turnosRef);
          turnosRef.get().then((doc) => {
            if (doc.exists) {
              inicioCliente = new Date(doc.data().FechaInicio);
              console.log("Fecha de inicio de este calendario: " + inicioCliente);
              inicioClienteCorto = doc.data().FechaInicio;
              console.log("Fecha corta: " + inicioClienteCorto);
              finalCliente = new Date(doc.data().FechaFinal);
              console.log("Fecha de fin de este calendario: " + finalCliente);
              finalClienteCorto = doc.data().FechaFinal;
              console.log("Fecha corta: " + finalClienteCorto);
              //Creo el calendario para el usuario cliente -->
              calendario2 = app.calendar.create({
                inputEl: '#demo-calendar-modal2',
                openIn: 'customModal',
                header: true,
                footer: true,
                minDate: inicioCliente,
                maxDate: finalCliente,
                on: {
                  closed: function () {
                    diaSelecCl = calendario2.getValue();
                    console.log("Dia seleccionado: " + diaSelecCl);
                    fnMuestraDiaSeleccionadoCl();
                  }
                }
              });
              idBtnCancha = "#"+correoCancha;
              console.log("Se creo el calendario" + calendario2);
              console.log("idBtnCancha: " + idBtnCancha);
              /*fnMandaIdCancha(idBtnCancha);*/
            } else {
              console.log("No such document!");
            }
          }).catch((error) => {
            console.log("Error getting document:", error);
          });
        });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  }
  $$(".itemCancha").on('click', fnAbreCalendar2);
  function fnAbreCalendar2() {
    calendario2.open();
  }
  function fnMuestraDiaSeleccionadoCl() {
    var hoy = new Date(diaSelecCl);
    var dia = hoy.getDate().toString();
    var mes = (hoy.getMonth() + 1).toString();
    var año = hoy.getFullYear().toString();
    if (dia > 0 && dia < 10) {
      dia = '0' + dia;
    }
    if (mes > 0 && mes < 10) {
      mes = '0' + mes;
    }
    var fechaConcat = año + "-" + mes + "-" + dia;
    console.log("Fecha Concatenada: " + fechaConcat);
    fechaConcat2 = dia + "-" + mes + "-" + año;
    idDias = correoCancha + fechaConcat;
    console.log("ID del dia: " + idDias);
    mainView.router.navigate('/ver-dia-cliente/');
  }
  $$('#btnVolverACL').on('click', function () {
    mainView.router.navigate('/ingreso/');
  })

})
//************************************ VISTA "VER-DIA-CLIENTE" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="ver-dia-cliente"]', function (e) {
  console.log(e);
  $$('#btnVolverDiaCl').on('click', function () {
    mainView.router.navigate('/agenda-cliente/');
  })
  //Creo un botones para que el cliente reserve o desmarque turnos -->
  var accionTurnos2 = app.actions.create({
    buttons: [
      {
        text: 'Solicitar turno',
        onClick: function () {
          var disponibilidad = "Ocupado";
          fnModificaTurnoCl(disponibilidad);
          app.dialog.alert('Turno guardado con exito');
        },
        bold: true
      },
      {
        text: 'Cancelar turno',
        onClick: function () {
          var disponibilidad = "Libre";
          fnModificaTurnoCl(disponibilidad);
          app.dialog.alert('Turno cancelado con exito');
        },
      },
    ]
  })
  $$('#tituloFechaCl').text("La fecha seleccionada: "+ fechaConcat2);
  //Me traigo de la colección "Dias", los turnos, para ponerlos como texto, 
  //dentro de los botones en "ver-dia-cliente" -->
  diaRef = colDias.doc(idDias);
  console.log("El dia de referencia: " + diaRef);
  diaRef.get().then((doc) => {
    if (doc.exists) {
      turno1 = doc.data().Turno1[0];
      console.log("Turno 1: " + turno1);
      if (turno1 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos1').text(turno1);
      }
      turno2 = doc.data().Turno2[0];
      console.log("Turno 2: " + turno2);
      if (turno2 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos2').text(turno2);
      }
      turno3 = doc.data().Turno3[0];
      console.log("Turno 3: " + turno3);
      if (turno3 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos3').text(turno3);
      }
      turno4 = doc.data().Turno4[0];
      console.log("Turno 4: " + turno4);
      if (turno4 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos4').text(turno4);
      }
      turno5 = doc.data().Turno5[0];
      console.log("Turno 5: " + turno5);
      if (turno5 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos5').text(turno5);
      }
      turno6 = doc.data().Turno6[0];
      console.log("Turno 6: " + turno6);
      if (turno6 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos6').text(turno6);
      }
      turno7 = doc.data().Turno7[0];
      console.log("Turno 7: " + turno7);
      if (turno7 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos7').text(turno7);
      }
      turno8 = doc.data().Turno8[0];
      console.log("Turno 8: " + turno8);
      if (turno8 == undefined) {
        console.log("No existe este horario");
      } else {
        $$('#clienteTurnos8').text(turno8);
      }
    } else {
      console.log("No such document!");
      notificationErrorDia.open();
      mainView.router.navigate('/ver-agenda-admin/');
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  //Guardo en la variable btnHorario, el id del boton seleccionado, y llamo a accionTurnos, 
  //para que  el usuario elija -->

  $$('#clienteTurnos1').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos2').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos3').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos4').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos5').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos6').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos7').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  $$('#clienteTurnos8').on('click', function () {
    btnHorario = this.id;
    accionTurnos2.open();
  });
  //Actualizo cada uno de los turnos del dia ID (diaRef), de la coleccion (dias),
  //enviandole un nuevo valor ("disponible" u "ocupado") -->
  function fnModificaTurnoCl(dispTurno) {
    console.log("Boton seleccionado: " + btnHorario);
    pedidoUsuario = emailLogin;
    switch (btnHorario) {
      case "clienteTurnos1":
        btnHorario = turno1;
        horario1 = turno1.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        console.log("Este horario: " + horario1);
        diaRef.update({ Turno1: [horario1 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos2":
        btnHorario = turno2;
        horario2 = turno2.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        console.log("Este horario: " + horario2);
        diaRef.update({ Turno2: [horario2 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos3":
        btnHorario = turno3;
        horario3 = turno3.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno3: [horario3 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos4":
        btnHorario = turno4;
        horario4 = turno4.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno4: [horario4 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos5":
        btnHorario = turno5;
        horario5 = turno5.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno5: [horario5 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos6":
        btnHorario = turno6;
        horario6 = turno6.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno6: [horario6 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos7":
        btnHorario = turno7;
        horario7 = turno7.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno7: [horario7 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "clienteTurnos8":
        btnHorario = turno8;
        horario8 = turno8.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        diaRef.update({ Turno8: [horario8 + "-" + dispTurno, pedidoUsuario]})
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/agenda-cliente/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      default:
        console.log("Error");
        break;
    }
  }
})
//************************************ VISTA "PERFIL" ***************************************
//********************************************************************************************** 
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
//************************************ VISTA "REGISTRO-EQUIPO" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="registro-equipo"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  $$('#btnREVolver').on('click', function fnPerfil() {
    mainView.router.navigate('/mi-equipo/');
  })
  $$('#btnMERegistrar').on('click', fnRegistraEquipo);
  

  function fnRegistraEquipo() {
    nombreEquipo = $$('#nomEquipo').val();
    console.log("Nombre del equipo: " + nombreEquipo);
    if (nombreEquipo == ""){
      notificationRegEqError.open();
    }else{
      var datosEquipo = { NombreEquipo: nombreEquipo, Capitan: emailLogin, Jugadores1: "", Jugadores2: "",
        Jugadores3: "", Jugadores4: "", Jugadores5: "", Jugadores6: "", Jugadores7: "", Jugadores8: "",
        Jugadores9: "", Jugadore10: "", Jugadores11: "", Jugadores12: "", Jugadores13: "",
        Jugadores14: "", Jugadores15: "", Jugadore16: "", Jugadores17: "", Jugadore18: "",
        Jugadore19: "", Jugadores20: "", };
      colEquipos.doc(emailLogin).set(datosEquipo);
      console.log("Equipo: " + nombreEquipo + " agregado exitosamente");
      $$('#nomEquipo').val("");
      notificationRegEq.open();
      mainView.router.navigate('/mi-equipo/');
    }
  }

})
//************************************ VISTA "INGRESO-ADMIN" ***************************************
//********************************************************************************************** 
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
//************************************ VISTA "AGENDA-ADMIN" ***************************************
//********************************************************************************************** 
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
          case 0: horario1 = hora;
            console.log("Este horario1: " + horario1);
            break;
          case 6: horario2 = hora;
            console.log("Este horario2: " + horario2);
            break;
          case 12: horario3 = hora;
            console.log("Este horario3: " + horario3);
            break;
          case 18: horario4 = hora;
            console.log("Este horario4: " + horario4);
            break;
          case 24: horario5 = hora;
            console.log("Este horario5: " + horario5);
            break;
          case 30: horario6 = hora;
            console.log("Este horario6: " + horario6);
            break;
          case 36: horario7 = hora;
            console.log("Este horario7: " + horario7);
            break;
          case 24: horario8 = hora;
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
          var datosAgenda = { Usuario: emailLogin, Turno1: [horario1 +"-"+"Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 2:
          var datosAgenda = { Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario] }
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 3:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 4:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario], Turno4: [horario4 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 5:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario], Turno4: [horario4 + "-" + "Libre", pedidoUsuario], Turno5: [horario5 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 6:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario], Turno4: [horario4 + "-" + "Libre", pedidoUsuario], Turno5: [horario5 + "-" + "Libre", pedidoUsuario],
            Turno6: [horario6 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 7:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario], Turno4: [horario4 + "-" + "Libre", pedidoUsuario], Turno5: [horario5 + "-" + "Libre", pedidoUsuario],
            Turno6: [horario6 + "-" + "Libre", pedidoUsuario], Turno7: [horario7 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
        case 8:
          var datosAgenda = {
            Usuario: emailLogin, Turno1: [horario1 + "-" + "Libre", pedidoUsuario], Turno2: [horario2 + "-" + "Libre", pedidoUsuario],
            Turno3: [horario3 + "-" + "Libre", pedidoUsuario], Turno4: [horario4 + "-" + "Libre", pedidoUsuario], Turno5: [horario5 + "-" + "Libre", pedidoUsuario],
            Turno6: [horario6 + "-" + "Libre", pedidoUsuario], Turno7: [horario7 + "-" + "Libre", pedidoUsuario], Turno8: [horario8 + "-" + "Libre", pedidoUsuario]}
          console.log("Datos agenda: " + datosAgenda);
          colDias.doc(idDias).set(datosAgenda);
          break;
      }
    }

    notificationAgenda.open();
    mainView.router.navigate('/ver-agenda-admin/');
      
  }

   
})
//************************************ VISTA "VER-AGENDA-ADMIN" ***************************************
//********************************************************************************************** 
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
    calendario.open();
  }

  function fnMuestraDiaSeleccionado() {
    mainView.router.navigate('/ver-dia-admin/');
  }

})
//************************************ VISTA "VER-DIA-ADMIN" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="ver-dia-admin"]', function (e) {
  console.log(e);
  var accionTurnos = app.actions.create({
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
  console.log("Se creo el panel de botones" + accionTurnos);
 //Traigo la variable diaSelecAd, donde esta el value seleccionado en el calendario,
 // para traer y modificar datos, dentro de esta vista -->
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
  //Me traigo de BD los turnos para enviar su valor dentro de los botones-->
  var fechaRef = colDias.doc(emailLogin + buscaFecha);
  console.log(fechaRef);
  fechaRef.get().then((doc) => {
    if (doc.exists) {
      turno1 = doc.data().Turno1[0];
      var consultaUsuario1 = doc.data().Turno1[1];
      console.log("Turno 1: " + turno1);
      if (turno1 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos1').text(turno1);
        if (consultaUsuario1 == "") {
          console.log("No ocupado");
        }else{
          $$('#muestraOcupado1').text('Turno: ' + turno1 + ' por: ' + consultaUsuario1);
        }
      }
      turno2 = doc.data().Turno2[0];
      var consultaUsuario2 = doc.data().Turno2[1];
      console.log("Turno 2: " + turno2);
      if (turno2 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos2').text(turno2);
        if (consultaUsuario2 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado2').text('Turno: ' + turno2 + ' por: ' + consultaUsuario2);
        }
      }
      turno3 = doc.data().Turno3[0];
      var consultaUsuario3 = doc.data().Turno3[1];
      console.log("Turno 3: " + turno3);
      if (turno3 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos3').text(turno3);
        if (consultaUsuario3 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado3').text('Turno: ' + turno3 + ' por: ' + consultaUsuario3);
        }
      }
      turno4 = doc.data().Turno4[0];
      var consultaUsuario4 = doc.data().Turno4[1];
      console.log("Turno 4: " + turno4);
      if (turno4 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos4').text(turno4);
        if (consultaUsuario4 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado4').text('Turno: ' + turno4 + ' por: ' + consultaUsuario4);
        }
      }
      turno5 = doc.data().Turno5[0];
      var consultaUsuario5 = doc.data().Turno5[1];
      console.log("Turno 5: " + turno5);
      if (turno5 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos5').text(turno5);
        if (consultaUsuario5 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado5').text('Turno: ' + turno5 + ' por: ' + consultaUsuario5);
        }
      }
      turno6 = doc.data().Turno6[0];
      var consultaUsuario6 = doc.data().Turno6[1];
      console.log("Turno 6: " + turno6);
      if (turno6 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos6').text(turno6);
        if (consultaUsuario6 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado6').text('Turno: ' + turno6 + ' por: ' + consultaUsuario6);
        }
      }
      turno7 = doc.data().Turno7[0];
      var consultaUsuario7 = doc.data().Turno7[1];
      console.log("Turno 7: " + turno7);
      if (turno7 == undefined){
        console.log("No existe este horario");
      }else{
        $$('#btnesTurnos7').text(turno7);
        if (consultaUsuario7 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado7').text('Turno: ' + turno7 + ' por: ' + consultaUsuario7);
        }
      }
      turno8 = doc.data().Turno8[0];
      var consultaUsuario8 = doc.data().Turno8[1];
      console.log("Turno 8: " + turno8);
      if (turno8 == undefined){
        console.log("No existe este horario");
      } else{
        $$('#btnesTurnos8').text(turno8);
        if (consultaUsuario8 == "") {
          console.log("No ocupado");
        } else {
          $$('#muestraOcupado8').text('Turno: ' + turno8 + ' por: ' + consultaUsuario8);
        }
      }
    } else {
      console.log("No such document!");
      notificationErrorDia.open();
      mainView.router.navigate('/ver-agenda-admin/');
    }
  }).catch((error) => { 
    console.log("Error getting document:", error);
  });
//En las siguientes acciones, no me toma con el selector de clase, por ende tuve que poner cada uno por selector id-->
  $$('#btnesTurnos1').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos2').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos3').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos4').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos5').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos6').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos7').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
  $$('#btnesTurnos8').on('click', function () {
    btnHorario = this.id;
    accionTurnos.open();
  });
//Funcion que toma el valor de la variable disponibilidad para ver si esta "Libre" u "Ocupado". Llama a Modifica Turno -->
  function fnValorTurno(disponibilidad) {
    dispTurno = disponibilidad;
    fnModificaTurno();
  }
 //Funcion para que modifique el turno elegido, en la base de datos (A "Libre" u "Ocupado")---> 
  function fnModificaTurno() {
    console.log("Boton seleccionado: " + btnHorario);
    switch (btnHorario) {
      case "btnesTurnos1":
        btnHorario = turno1;
        horario1 = turno1.slice(0,5);
        console.log("El turno a modificar es: " + btnHorario);
        console.log("Este horario: " + horario1);
        fechaRef.update({ Turno1: horario1 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos2":
        btnHorario = turno2;
        horario2 = turno2.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        console.log("Este horario: " + horario2);
        fechaRef.update({ Turno2: horario2 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos3":
        btnHorario = turno3;
        horario3 = turno3.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno3: horario3 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos4":
        btnHorario = turno4;
        horario4 = turno4.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno4: horario4 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos5":
        btnHorario = turno5;
        horario5 = turno5.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno5: horario5 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos6":
        btnHorario = turno6;
        horario6 = turno6.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno6: horario6 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos7":
        btnHorario = turno7;
        horario7 = turno7.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno7: horario7 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      case "btnesTurnos8":
        btnHorario = turno8;
        horario8 = turno8.slice(0, 5);
        console.log("El turno a modificar es: " + btnHorario);
        fechaRef.update({ Turno8: horario8 + "-" + dispTurno })
          .then(function () {
            console.log("actualizado ok");
            mainView.router.navigate('/ver-agenda-admin/');
          })
          .catch(function (error) {
            console.log("Error: " + error);
          });
        break;
      default:
        console.log("Error");
        break;
    }
  }
//Accion para volver a vista "Ver agenda administrador"-->
  $$('#btnVolverDia').on('click', function () {
    mainView.router.navigate('/ver-agenda-admin/');
  })
})
//************************************ VISTA "REGISTRO" ***************************************
//********************************************************************************************** 
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
//************************************ VISTA "REGISTRO-CANCHAS" ***************************************
//********************************************************************************************** 
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
          var datosAdm = { NombreComplejo: nombreAdmin, Correo: emailAdmin, Calle: calleAdmin, Altura: alturaAdmin, 
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
//************************************ VISTA "RANKING-CLIENTE" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="ranking-cliente"]', function (e) {
  console.log(e);
  var url = "https://livescore-api.com/api-client/leagues/table.json?competition_id=23&key=6nb3rgrddqoI79Ab&secret=kwrWQACpEPASxk2EIdH9u8mHzLpGU0Se";
  app.request.json(url, function (datos) {
    tabla = datos.data.table;
    console.log("Tabla: " + tabla);
    for (var i = 0; i <tabla.length; i++) {
      var equipo = tabla[i].name;
      console.log("Equipo: " + equipo);
      var puntos = tabla[i].points;
      console.log("Puntos: " + puntos);
      var parJugados = tabla[i].matches;
      console.log("parJugados: " + parJugados);
      var parGanados = tabla[i].won;
      console.log("parGanados: " + parGanados);
      var parEmpatados = tabla[i].drawn;
      console.log("parEmpatados: " + parEmpatados);
      var parPerdidos = tabla[i].lost;
      console.log("parPerdidos: " + parPerdidos);
      var difGol = tabla[i].goal_diff;
      console.log("difGol: " + difGol);
      var indice = "indice";
      indice += [i];
      var indicePTS = "indicePTS";
      indicePTS += [i];
      var indiceJUG = "indiceJUG";
      indiceJUG += [i];
      var indiceGAN = "indiceGAN";
      indiceGAN += [i];
      var indiceEMP = "indiceEMP";
      indiceEMP += [i];
      var indicePER = "indicePER";
      indicePER += [i];
      var indiceDIF = "indiceDIF";
      indiceDIF += [i];
      $$('#' + indice).text(equipo);
      $$('#' + indicePTS).text(puntos);
      $$('#' + indiceJUG).text(parJugados);
      $$('#' + indiceGAN).text(parGanados);
      $$('#' + indiceEMP).text(parEmpatados);
      $$('#' + indicePER).text(parPerdidos);
      $$('#' + indiceDIF).text(difGol);
    }
  }); 
  $$('#btnRVolver').on('click', function () {
    mainView.router.navigate('/ingreso/');
  })
})
//************************************ VISTA "INVITA-AMIGOS" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="invita-amigos"]', function (e) {
  console.log(e);
  $$('#btnPerfil').on('click', function fnVistaPerfil() {
    mainView.router.navigate('/perfil/');
  })
  var usuEquip = colEquipos.doc(emailLogin);
  usuEquip.get().then((doc) => {
    if (doc.exists) {
      var nombreEq = doc.data().NombreEquipo;
      console.log("Nombre del equipo: " + nombreEq);
      $$('#tituloEquipoInt').text(nombreEq);
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  })
//ACA FALTA HACER QUE VAYA AGREGANDO JUGADORES A BD, EN CAMBPO JUGADORES, Y NO QUE LOS REEMPLACE
  $$('#agregaAmigo').on('click', fnAgregaAmigo);
  function fnAgregaAmigo() {
    nombreJugador = $$('#nomJugador').val();
    puestoJugador = $$('#puesJugador').val();
    dorsalJugador = $$('#dorsalJugador').val();
    console.log("Correo Jugador: " + nombreJugador);
    var usuInvitadoRef = colUsuarios.doc(nombreJugador);
    usuInvitadoRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Esto funciona: " + doc.data().Nombre);
        var datosEquipo = { Jugadores1: [nombreJugador, puestoJugador, dorsalJugador]};
        colEquipos.doc(emailLogin).update(datosEquipo);
        notificationRegJu.open();
        mainView.router.navigate('/mi-equipo/');
      } else {
        console.log("No such document!");
        notificationRegJuError.open();
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    })

    
  }

  $$('#invitaAmigoV').on('click', function () {
    mainView.router.navigate('/mi-equipo/');
  })
})
//************************************ VISTA "MI-EQUIPO" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="mi-equipo"]', function (e) {
  console.log(e);
  var usuEquip = colEquipos.doc(emailLogin);
  //ACA FALTA UN FOR PARA QUE AGREGUE A TODOS LOS JUGADORES DEL EQUIPO, A LA TABLA
  usuEquip.get().then((doc) => {
    if (doc.exists) {
      var nombreEq = doc.data().NombreEquipo;
      console.log("Nombre del equipo: " + nombreEq);
      var jugadoresEq = doc.data().Jugadores1;
      console.log("Jugadores del equipo: " + jugadoresEq);
      var jugadoresEq2 = doc.data().Jugadores2;
      console.log("Jugadores del equipo2: " + jugadoresEq2);
      var usuarioEq = jugadoresEq[0];
      var posicionEq = jugadoresEq[1];
      var dorsalEq = jugadoresEq[2];
      console.log("Usuario jugador: " + usuarioEq);
      console.log("Posicion jugador: " + posicionEq);
      console.log("Dorsal jugador: " + dorsalEq);
      $$('#tituloEquipo').text(nombreEq);
      $$('#tablaDorsal').text(dorsalEq);
      $$('#tablaUsuario').text(usuarioEq);
      $$('#tablaPuesto').text(posicionEq);
      var usuarioEq2 = jugadoresEq2[0];
      var posicionEq2 = jugadoresEq2[1];
      var dorsalEq2= jugadoresEq2[2];
      console.log("Usuario jugador2: " + usuarioEq2);
      console.log("Posicion jugador2: " + posicionEq2);
      console.log("Dorsal jugador2: " + dorsalEq2);
      $$('#tituloEquipo2').text(nombreEq2);
      $$('#tablaDorsal2').text(dorsalEq2);
      $$('#tablaUsuario2').text(usuarioEq2);
      $$('#tablaPuesto2').text(posicionEq2);
    } else {
      console.log("No such document!");
      $$('#agregaBtnRE').html('<button class="col button button-raised button-fill" id="btnRegistraEquipo">Registra un equipo</button>');
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  $$('#btnPerfil').on('click', function fnVistaPerfil() {
    mainView.router.navigate('/perfil/');
  })
 
  $$('#btnMEVolver').on('click', function fnVistaIngreso() {
    mainView.router.navigate('/ingreso/');
  })

  $$('#agregaBtnRE').on('click', function fnVistaEquipo() {
    mainView.router.navigate('/registro-equipo/');
  })

  $$('#agregaIntegrantes').on('click', function () {
    mainView.router.navigate('/agrega-integrantes/');
  });

  $$('#btnReInvita').on('click', function () {
    mainView.router.navigate('/invita-amigos/');
  })
})
//************************************ VISTA "AGREGA-INTEGRANTES" ***************************************
//********************************************************************************************** 
$$(document).on('page:init', '.page[data-name="agrega-integrantes"]', function (e) {
  console.log(e);
  $$('#btnPerfil').on('click', function fnVistaPerfil() {
    mainView.router.navigate('/perfil/');
  })
  var usuEquip = colEquipos.doc(emailLogin);
  usuEquip.get().then((doc) => {
    if (doc.exists) {
      var nombreEq = doc.data().NombreEquipo;
      console.log("Nombre del equipo: " + nombreEq);
      $$('#tituloEquipoInt2').text(nombreEq);
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  })
  //ACA FALTA HACER QUE VAYA AGREGANDO JUGADORES A BD, EN CAMBPO JUGADORES, Y NO QUE LOS REEMPLACE
  $$('#agregaIntegrante').on('click', fnAgregaAmigo);
  function fnAgregaAmigo() {
    nombreJugador2 = $$('#nomJugador2').val();
    puestoJugador2 = $$('#puesJugador2').val();
    dorsalJugador2 = $$('#dorsalJugador2').val();
    var datosEquipo = { Jugadores2: [nombreJugador2, puestoJugador2, dorsalJugador2] };
    colEquipos.doc(emailLogin).update(datosEquipo);
    notificationRegJu.open();
    mainView.router.navigate('/mi-equipo/');
  }

  $$('#invitaIntegranteV').on('click', function () {
    mainView.router.navigate('/mi-equipo/');
  })
})
//************************************ VISTA "INDEX" ***************************************
//********************************************************************************************** 
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
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  function fnActivaLoginCl(email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        console.log("email: " + email);
        console.log("contraseña: " + pass);
        $$('.login-screen').removeClass('login-screen').addClass('login-screen-close');
        mainView.router.navigate('/ingreso/');
        console.log("carga la vista ingreso");
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
        notificacionErrorPass.open();
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
        notificacionErrorPass.open();
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
      console.log('Login screen close');
    })
  }

})