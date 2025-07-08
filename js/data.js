let players = JSON.parse(localStorage.getItem("players")) || [
    { id: 0, name: "0", password: 0, reputation: 10 },
    { id: 1, name: "0", password: 0, reputation: 10}
];

console.log(players)

let inputarea = document.getElementById("inputarea");
let inputarea1 = document.getElementById("inputarea1");
let cnfrmbtn = document.getElementById("cnfrmbtn");
let AddToPlayerBaseBtn = document.getElementById("AddToPlayerBaseBtn");

AddToPlayerBaseBtn.disabled = true;

let username;
let password1;

function Registration() {
  username = inputarea.value.trim();
  password1 = inputarea1.value.trim();
  
  if (username && password1) {
    AddToPlayerBaseBtn.disabled = false;
  } else {
    AddToPlayerBaseBtn.disabled = true;
  }
}

cnfrmbtn.addEventListener("click", Registration);

function AddToPlayerBase(username, password1) {
  const IdUser = players.length ? players[players.length - 1].id + 1 : 1;

  const newPlayer = {
    id: IdUser,
    name: username,
    password: password1,
    reputation: 10,
    gameWon: 0,
    gameLost: 0
  };

  players.push(newPlayer);
  localStorage.setItem("players", JSON.stringify(players));

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("CurrentlyloggedIn", JSON.stringify(newPlayer));
  localStorage.setItem("currentUser", newPlayer.name);

  AddToPlayerBaseBtn.disabled = true;
  inputarea.value = "";
  inputarea1.value = "";

  window.location.href = "./index.html";
}

AddToPlayerBaseBtn.addEventListener("click", () => AddToPlayerBase(username, password1));

const example = JSON.parse(localStorage.getItem("UserInfo"));

console.log(example)