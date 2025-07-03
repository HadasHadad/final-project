function header() {
  document.addEventListener("DOMContentLoaded", () => {
    const headerPlace = document.getElementById("headerplace");
        const img = document.getElementById("img-get");
    img.src = "./public/img/img-header.jpg"
    img.alt = "..."
        img.style.width = "150px";
    img.style.height = "150px";
    headerPlace.innerHTML = `
    <a id="title2" href="../public/index.html">VerbaGuard</a>
    <div id="a-header">
  <nav id="main-nav"></nav>
        `;
  })
}

header()