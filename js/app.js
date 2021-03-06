/* Servidor */
var config = {
    apiKey: "AIzaSyCQmJhU4rGSzM9eER5wWKYbHqXNFC1YHSQ",
    authDomain: "golazzo-472c0.firebaseapp.com",
    databaseURL: "https://golazzo-472c0.firebaseio.com",
    projectId: "golazzo-472c0",
    storageBucket: "golazzo-472c0.appspot.com",
    messagingSenderId: "717601290131"
};

firebase.initializeApp(config);

/*FUNCION SPLASH*/
$(function () {
    setTimeout(function () {
        $('#splash').fadeOut(500);
    }, 3000);
    $('.d-none').removeClass("d-none");
    $('.hide-start').removeClass("hide-start");
});

/* Log in */
var provider = new firebase.auth.GoogleAuthProvider();

$('#login-btn').click(function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        $('#login-btn').hide();
        //console.log(result);
        saveUser(result.user);
        $('.photo-login').append("<img src='" + result.user.photoURL + "' />");
        $('#user-name').append(result.user.displayName);
        //$('#user-name').append(result.user.displayName);
        //$('#logout-btn').removeClass("d-none");
        $('#logout-btn').removeClass("disabled");
        $('#profile-user').removeClass("disabled");
    });
});

var userInfo = {};

/* Función para guardar la info de los usuarios */
function saveUser(user) {
    userInfo = {
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
    }
    firebase.database().ref("users/" + user.uid).set(userInfo);
}

/* Subir archivos grales */
$('#input-Upload-File').change(function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images/' + file.name);
    var task = storageRef.put(file);

    var imgInput = storageRef.location.path;
    $('#goals').append('<img src="https://console.firebase.google.com/project/golazzo-472c0/storage/golazzo-472c0.appspot.com/"' +imgInput+' />');
    //console.log(imgInput);
});

/* Subir bm's */
$('#input-bm-File').change(function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('images-bm/' + file.name).put(file);
    var pathReference = firebase.database().ref().child('img-bm/' + file.name);
});

$('.carousel').carousel('pause');

/*rating*/
$(document).ready(function () {
    $("#btn3").click(function () {
        $("#button-3").append('<li id="btn-3"><i class="fas fa-heartbeat --indigo"></i></li>');
    });
    $("#btn4").click(function () {
        $("#button-4").append('<li id="btn-4"><i class="fas fa-heartbeat --indigo"></i></li>');
    });
    $("#btn5").click(function () {
        $("#button-5").append('<li id="btn-5"><i class="fas fa-heartbeat --indigo"></i></li>');
    });
    $("#btn6").click(function () {
        $("#button-6").append('<li id="btn-6"><i class="fas fa-heartbeat --indigo"></i></li>');
    });
});


/*creando seccion de comentarios*/
$("#commit").click(function () {
    var commit = $("#textArea").val();
    //console.log(commit);
    addCommit(commit);

    $("#textArea").val('');
});

var template = '<section class="texto text-center">' +
                    '<div class="card w-100">' +
                        '<div class="card-body">' +
                            '<h5 class="float-left"> _UserName_</h5>' +
                            '<div id="comment-user">'+
                            '<img src="_Photo-User__"/>'+'<textarea name="textArea" id="textArea" class="Text card-text col-sm-10">__commit__</textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</section>';


function addCommit(comment) {
    var finalTemplate = "";
    console.log(userInfo.name);
    finalTemplate = template.replace(" _UserName_",userInfo.name + " dice: ")
    .replace("_Photo-User__", userInfo.photo)
    .replace("__commit__", comment);
    $("#goals").append(finalTemplate);
};




