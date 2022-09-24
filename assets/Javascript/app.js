const NAVBAR = document.querySelector("nav")
const NAVBARLINK = document.querySelectorAll(".navBarLink")
const GOBACKTOTOP = document.querySelector(".backToTop")
const PROGRESSBAR = document.querySelector(".progressBar")
const NAVLINKS = [...document.querySelectorAll('nav p')]
const ARTICLES = [...document.querySelectorAll('article')]
const BREAKPOINT = 900;
const NAVHEIGHT = document.querySelector('nav').offsetHeight;
var positionCalculationArticle;
var scroll;

window.addEventListener('scroll',()=>{
    scroll = document.documentElement.scrollTop
    var totalheight = document.documentElement.scrollHeight; //hauteur total du document
    var clientHeight = document.documentElement.clientHeight;// hauteur total de la 'fenetre' du client
    var scrollPercentage = Math.round(scroll * 100 / (totalheight - clientHeight))
    var clientWidth = document.documentElement.clientWidth;
    var distanceTopArticles = [...document.querySelectorAll('article')]

    NAVLINKS.forEach(e => e.addEventListener('click',()=>{ // changer la couleur des nav p quand on clique dessus
        for (i = 0; i < NAVBARLINK.length; ++i) {
            NAVBARLINK[i].style.color = "#4462C6";
        };
        setTimeout(() => {
            e.style.color = '#7e9cff';
        }, 600);
    }));

    styleNavBar(scrollPercentage,clientWidth);
    styleGoBackToTop(scrollPercentage);
    styleProgressBar(scrollPercentage);
    styleNavP(clientHeight,distanceTopArticles,NAVLINKS)
});

function styleNavBar(scrollValue,clientWidth){
    if(clientWidth>=BREAKPOINT){
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
            for (i = 0; i < NAVBARLINK.length; ++i) {
                NAVBARLINK[i].style.color = "#4462C6";
            };
        }
    }else{
        NAVBAR.style.backgroundColor="transparent";
        NAVBAR.style.boxShadow="none";
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
    positionCalculationArticle = ARTICLES[linkIndex].offsetTop;
    const actualTargetMarginTop = window.getComputedStyle(ARTICLES[linkIndex]).marginTop.slice(0,-2);
    const toBeInCenter = (window.document.documentElement.clientHeight * 10)/100;
    e.target.style.color='#7e9CFF';
    window.scrollTo({
        top:positionCalculationArticle - NAVHEIGHT - actualTargetMarginTop - toBeInCenter,//position par rapport au top de la page - la hauteur de la barre de nav - le maginTop de l'article selectionne - valuer qui permet de deplacer le tout de 10% vers le haut pour l'avoir au niveau des yeux
        behavior:"smooth"
    })
}))

function styleNavP(clientHeight,distanceTopArticles,NAVLINKS){
    distanceTopArticles.forEach(e => {
        if(e.getBoundingClientRect().top < clientHeight * 0.4 && e.getBoundingClientRect().bottom > clientHeight * 0.3){
            var indexP=distanceTopArticles.indexOf(e);
            NAVLINKS[indexP].style.color='#7e9CFF';
        }
    });
}
