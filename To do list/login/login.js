const firebaseConfig = {
    apiKey: "AIzaSyAMQ7Bld4vfnMDWbeeTihLCSDOLn0C2kD0",
    authDomain: "to-do-list-8a549.firebaseapp.com",
    projectId: "to-do-list-8a549",
    storageBucket: "to-do-list-8a549.appspot.com",
    messagingSenderId: "433679126334",
    appId: "1:433679126334:web:f086bd82d2981cc673266f",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

let user = auth.currentUser;

//verificando se a pessoa já está logada
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "/app/app.html";
  } else {
    console.log("nenhum usuário logado!");
  }
});




// Função para logar o usuario
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log("Usuário logado!");
    window.location.href = "/app/app.html";
  })
  .catch((error) => {
    alert(error.message);
  });
}




