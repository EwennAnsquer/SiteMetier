const NAVBAR = document.querySelector("nav")
const NAVBARLINK = document.querySelectorAll(".navBarLink")
const GOBACKTOTOP = document.querySelector(".backToTop")

window.addEventListener('scroll',()=>{
    var scroll = document.documentElement.scrollTop
    var totalheight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var scrollPercentage = Math.round(scroll * 100 / (totalheight - clientHeight))

    styleNavBar(scrollPercentage);
    styleGoBackToTop(scrollPercentage);
});

function styleNavBar(scrollValue){
    if(scrollValue==0){
        NAVBAR.style.backgroundColor="#4462C6";
        NAVBAR.style.boxShadow="none";
        for (i = 0; i < NAVBARLINK.length; ++i) {
            NAVBARLINK[i].style.color = "white";
        };
    }else{
        NAVBAR.style.backgroundColor="#FFF";
        NAVBAR.style.boxShadow="0 20px 50px 0 rgb(0 0 0 / 5%)";
        for (i = 0; i < NAVBARLINK.length; ++i) {
            NAVBARLINK[i].style.color = "#4462C6";
        };
    }
}

function styleGoBackToTop(scrollValue){
    if(scrollValue<20){
        GOBACKTOTOP.style.visibility="hidden";
        GOBACKTOTOP.style.opacity="0";
    }else{
        GOBACKTOTOP.style.visibility="visible";
        GOBACKTOTOP.style.opacity="1";
    }
}
