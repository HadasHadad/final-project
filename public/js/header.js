

function header() {
  document.addEventListener("DOMContentLoaded", () => {
    const headerPlace = document.getElementById("headerplace");
    const header = document.createElement("header");

    const logo = document.createElement("img");
    logo.src = (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) ? "./public/img/img-header.jpg" : "./img/img-header.jpg";
    logo.src = "./img/img-header.jpg";
    logo.alt = "Logo";
    logo.style.width = "150px";
    logo.style.height = "150px";

    const navContainer = document.createElement("nav");
    navContainer.id = "main-nav";
    
    header.appendChild(logo);
    header.appendChild(navContainer);
    headerPlace.appendChild(header);

    createNav();
  });
}

header();

function createNav() {
  const nav = document.getElementById("main-nav");
  const loggedIn = localStorage.getItem("loggedIn");

  if (!nav) return;

  if (loggedIn === "true") {
    nav.innerHTML = `
      <a href="/index.html">בית</a>
      <a href="/public/game.html">🎮המשחק</a>
      <a href="/public/profile.html">פרופיל שחקן</a>
      <a href="/public/contactandhelp.html">צור קשר</a>
      <a href="/public/about.html">אודות</a>
      <a href="#" id="logout-link">התנתק</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="/index.html">בית</a>
      <a href="/public/game.html">🎮המשחק</a>
      <a href="/public/about.html">אודות</a>
      <a href="/public/Log-in_Page.html">התחברות</a>
      <a href="/public/Sign-Up_Page.html">הרשמה</a>
      <a href="/public/contactandhelp.html">צור קשר</a>
    `;
  }

  // Handle logout event
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  // Handle game button (if exists)
  const playButton = document.getElementById("PlayButton");
  if (playButton) {
    playButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (loggedIn === "true") {
        window.location.href = "/public/game.html";
      } else {
        window.location.href = "/public/Log-in_Page.html";
      }
    });
  }
}

function logoutUser() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("CurrentlyloggedIn");
  window.location.href = "/index.html";
}

