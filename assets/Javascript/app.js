const NAVBAR = document.querySelector("nav")
const NAVBARLINK = document.querySelectorAll(".navBarLink")
const GOBACKTOTOP = document.querySelector(".backToTop")
const PROGRESSBAR = document.querySelector(".progressBar")
const NAVLINKS = [...document.querySelectorAll('nav p')]
const ARTICLES = [...document.querySelectorAll('article')]
const BREAKPOINT = 900;
const NAVHEIGHT = document.querySelector('nav').offsetHeight;

window.addEventListener('scroll',()=>{
    var scroll = document.documentElement.scrollTop
    var totalheight = document.documentElement.scrollHeight; //hauteur total du document
    var clientHeight = document.documentElement.clientHeight;// hauteur total de la 'fenetre' du client
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

NAVLINKS.forEach(link => link.addEventListener("click",(e)=>{
    const linkIndex = NAVLINKS.indexOf(e.target)
    const positionCalculationArticle = ARTICLES[linkIndex].offsetTop;
    const actualTargetMarginTop = window.getComputedStyle(ARTICLES[linkIndex]).marginTop.slice(0,-2);
    const toBeInCenter = (window.document.documentElement.clientHeight * 10)/100
    window.scrollTo({
        top:positionCalculationArticle - NAVHEIGHT - actualTargetMarginTop - toBeInCenter,//position par rapport au top de la page - la hauteur de la barre de nav - le maginTop de l'article selectionne - permet de deplacer le tout de 10% vers le haut pour l'avoir au niveau des yeux
        behavior:"smooth"
    })
}))
