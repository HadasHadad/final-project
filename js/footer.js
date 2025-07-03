function footerplace(){
document.addEventListener("DOMContentLoaded", ()=> {
const footerplace = document.getElementById("footerplace")
footerplace.style.direction = "rtl"
footerplace.innerHTML= `
<div id="footer">
<div id="a-footer">

<h1 id="footercopyright">© כל הזכויות שמורות לסטארטאפיסטים שנה א'</h1>
</div><br><br>
<a class= "nav-a" href="./index.html">home page</a>
<a class= "nav-a" href="./about.html">about</a>
<a class= "nav-a" href="./Contactandhelp.html">help/contact</a>
<a class= "nav-a" href="./Sign-Up_Page.html">sign up</a>
<a class= "nav-a" href="./Log-in_Page.html">Log in</a>

</div>
`;
})
}
footerplace()