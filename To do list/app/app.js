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
let objList = [];
var collection = "";



/*Função para iniciar e buscar o nome da coleção através de
quem está logado*/

auth.onAuthStateChanged(user => {
  if (user) {
    collection = user.email;
    update(collection);
  } else {
    console.log("nenhum usuário logado!")
  }
})





//Adicionando os objetos do banco de dados dentro de um array
function update(collection) {
  db.collection(collection).onSnapshot((snapshot) => {
    objList = [];

    snapshot.forEach((doc) => {
      var task = doc.data();
      task.id = doc.id;
      objList.push(task);
      console.log(task)
    });
    createList();
  });

}

//Criando a lista na interface
function createList() {
  let listElement = document.getElementById("containerList");
  listElement.innerHTML = "";

  objList.forEach((obj) => {
    listElement.innerHTML += `<li class="task ${obj.state}" id="${obj.id}">
                ${obj.tarefa}
                <div class="containerButton">
                <button onclick="done(this)" class="check">Concluído</button>
                <button onclick="del(this)" class="delete">Remover</button>
                </div>
                </li>`;
  });
}

//Adicionando objeto ao banco de dados
function add() {
  let newTask = document.getElementById("inputTask").value;

  console.log(newTask)
  if (newTask != "") {
    db.collection(collection)
      .add({
        tarefa: newTask,
        state: "incomplete",
      })
      .then(() => {
        console.log("Documento inserido com sucesso");
      })
      .catch((err) => {
        alert(err);
      });

  }

  document.getElementById("inputTask").value = "";
}

// Removendo objeto do banco de dados
function del(element) {
  let taskElement = element.closest("li");
  let objTask = taskElement.id

  db.collection(collection).doc(objTask).delete()
    .then(() => {
      console.log("Documento removido com sucesso");
    })
    .catch((error) => {
      alert(error);
    });
}

// Removendo todos os objetos do banco de dados
function delAll() {
  objList.forEach(doc => {
    let objID = doc.id;
    db.collection(collection).doc(objID).delete()
      .then(() => {
        console.log("Documento removido com sucesso");
      })
      .catch((error) => {
        alert(error);
      });
  })
}






//Mudando a aparência de tarefa concluida
function done(element) {
  let taskElement = element.closest("li");
  let objTask = taskElement.id

  if (taskElement.classList.value === "task completed") {
    db.collection(collection).doc(objTask).update(
      {

        state: "incomplete",

      }
    )
      .then(() => {
        console.log("Documento alterado com sucesso");
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    db.collection(collection).doc(objTask).update(
      {

        state: "completed",

      }
    )
      .then(() => {
        console.log("Documento alterado com sucesso");
      })
      .catch((error) => {
        alert(error);
      });
  }
}




//função para deslogar
function signOut() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  }).catch((error) => {
    alert(error.message)
  });

}