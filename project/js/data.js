const players = [
    { id: 1, name: "שחקן1", password: "password1", reputation: 10 },
    { id: 2, name: "שחקן2", password: "password2", reputation: 10 },
    { id: 3, name: "שחקן3", password: "password3", reputation: 10 },
];

let inputarea = document.getElementById("inputarea");
let inputarea1 = document.getElementById("inputarea1");
let cnfrmbtn = document.getElementById("cnfrmbtn");



let AddToPlayerBaseBtn = document.getElementById("AddToPlayerBase");
AddToPlayerBaseBtn.disabled = true;

let IdUser = players.length + 1;
console.log(IdUser);

let username;
let password1;

function Registration() {
    username = inputarea.value;
    password1 = inputarea1.value;
    AddToPlayerBaseBtn.disabled = false;

}

cnfrmbtn.addEventListener("click", () => Registration());

function AddToPlayerBase(username, password1) {
    players.push({ id: IdUser, name: username, password: password1, reputation: 10 });

}

AddToPlayerBaseBtn.addEventListener("click", () => AddToPlayerBase(username, password1));
