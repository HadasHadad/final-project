let timesClicked = 0;

function toggleLogin() {
  const overlay = document.getElementById("overlay");
  overlay.classList.toggle("hidden");
}

function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const captcha = document.getElementById("captcha");
  const captchaContainer = document.getElementById("captcha-container");
  const message = document.getElementById("message");

  const players = JSON.parse(localStorage.getItem("players")) || [];

  if (captchaContainer.style.display === "block" && !captcha.checked) {
    message.textContent = "Please confirm you are not a robot.";
    return;
  }

 const userFound = players.find(player => 
  player.name === username && player.password === password
);

if (userFound) {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", userFound.name);
  localStorage.setItem("CurrentlyloggedIn", JSON.stringify(userFound));
  window.location.href = "./index.html";
}
else {
    timesClicked++;
    message.style.color = "#d9534f";
    message.textContent = "Invalid username or password.";
    if (timesClicked >= 2) {
      captchaContainer.style.display = "block";
    }
  }
}

