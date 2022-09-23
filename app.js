const NAVBAR = document.querySelector("nav")
const NAVBARLINK = document.querySelectorAll(".navBarLink")
const GOBACKTOTOP = document.querySelector(".backToTop")
const PROGRESSBAR = document.querySelector(".progressBar")
const BREAKPOINT = 900;

window.addEventListener('scroll',()=>{
    var scroll = document.documentElement.scrollTop
    var totalheight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    var scrollPercentage = Math.round(scroll * 100 / (totalheight - clientHeight))
    var clientWidth = document.documentElement.clientWidth;

    styleNavBar(scrollPercentage,clientWidth);
    styleGoBackToTop(scrollPercentage);
    styleProgressBar(scrollPercentage);
});

function styleNavBar(scrollValue,clientWidth){
    if(scrollValue==0){
        NAVBAR.style.backgroundColor="#4462C6";
        NAVBAR.style.boxShadow="none";
        if(clientWidth>=BREAKPOINT){
            for (i = 0; i < NAVBARLINK.length; ++i) {
                NAVBARLINK[i].style.color = "white";
            };
        }
    }else{
        NAVBAR.style.backgroundColor="#FFF";
        NAVBAR.style.boxShadow="0 20px 50px 0 rgb(0 0 0 / 5%)";
        if(clientWidth>=BREAKPOINT){
            for (i = 0; i < NAVBARLINK.length; ++i) {
                NAVBARLINK[i].style.color = "#4462C6";
            };
        }
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

function styleProgressBar(scrollValue){
    PROGRESSBAR.style.width=scrollValue+'%';
}
