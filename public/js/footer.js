function footerplace(){
document.addEventListener("DOMContentLoaded", ()=> {
const footerplace = document.getElementById("footerplace")
footerplace.innerHTML= `
<div id="footer">
<div id="a-footer">
<a href="#">home page</a>
<a href="../public/about.html">about</a>
<a href="../public/Contactandhelp.html">help/contact</a>
<a href="../public/Sign-Up_Page.html">sign up</a>
<a href="../public/Log-in_Page.html">Log in</a>
</div><br><br>
<h1 id="footercopyright">© כל הזכויות שמורות לסטארטאפיסטים שנה א'</h1>
</div>
`;
})
}
footerplace()