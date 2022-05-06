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

  //Criando o usuario 
  function create() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
  .then((user) => {
    login(email, password);
  })
  .catch((error) => {
    alert(error.message);
  });

  }


//Função para logar após criação de conta
  function login(email, password) {

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Usuário logado!");
      window.location.href = "/app/app.html";
    })
    .catch((error) => {
      alert(error.message);
    });
  }