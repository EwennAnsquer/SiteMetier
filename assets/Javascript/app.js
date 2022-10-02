const NAVBAR = document.querySelector("nav")
const GOBACKTOTOP = document.querySelector(".backToTop")
const PROGRESSBAR = document.querySelector(".progressBar")
const NAVLINKS = [...document.querySelectorAll('nav p')]
const ARTICLES = [...document.querySelectorAll('article')]
const LOADER = document.querySelector('.loaderScreen')
const BODY = document.querySelector('body')
const BREAKPOINT = 900;
const NAVHEIGHT = document.querySelector('nav').offsetHeight;
const HAMBURGERBUTTON = document.querySelector('nav button')
const NAVLIST = document.querySelector('nav ul')
const HAMBURGERBARS = [...document.querySelectorAll('nav button div')]
var positionCalculationArticle;
var scroll;
var totalheight;
var clientHeight;
var scrollPercentage;
var clientWidth;
var distanceTopArticles;

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load",()=>{
    LOADER.classList.add('disapearLoader');
    BODY.classList.remove('noScroll');
    NAVLIST.style.transition='all 0.4s linear'; //set to 0s in css and after set to 0.4 to hide weird moving effect
    setTimeout(() => {
        LOADER.style.display="none";
    }, 400);
})

NAVLINKS.forEach(e => {
    var index = NAVLINKS.indexOf(e);
    var trigger = ARTICLES[index]
    // console.log(trigger)
    var marginTopTrigger = parseInt(window.getComputedStyle(trigger).marginTop) //ne compte pas le maregin top donc on fait moins le nombre de pixel du margin top pour mettre l'event plus haut
    var marginBottomTrigger = parseInt(window.getComputedStyle(trigger).marginBottom.slice(0,-2)) + ARTICLES[index].offsetHeight//meme chose que le mqrgin top mais on doit ajouter la hauteur du doc
    ScrollTrigger.create({
        trigger:trigger,
        start:"-"+marginTopTrigger+" 35%",
        end: marginBottomTrigger+"px 35%",
        onEnter: ()=> NAVLINKS[index].style.color='#7e9CFF',
        onEnterBack: ()=> NAVLINKS[index].style.color='#7e9CFF',
        onLeave: ()=> NAVLINKS[index].style.color='#4462C6',
        onLeaveBack: ()=> NAVLINKS[index].style.color='#4462C6',
        markers:false,
    });
})

function getValue(){
    scroll = document.documentElement.scrollTop
    totalheight = document.documentElement.scrollHeight; //hauteur total du document
    clientHeight = document.documentElement.clientHeight;// hauteur total de la 'fenetre' du client
    scrollPercentage = Math.round(scroll * 100 / (totalheight - clientHeight))
    clientWidth = document.documentElement.clientWidth;
    distanceTopArticles = [...document.querySelectorAll('article')]
}

window.addEventListener('load',()=>{
    getValue();
});

window.addEventListener('scroll',()=>{
    getValue();
    styleNavBar(scrollPercentage,clientWidth);
    styleGoBackToTop(scrollPercentage);
    styleProgressBar(scrollPercentage);
});

function styleNavBar(scrollValue,clientWidth){
    if(scrollValue==0){
        NAVBAR.style.backgroundColor="#4462C6";
        NAVBAR.style.boxShadow="none";
        if(clientWidth>=BREAKPOINT){
            NAVLINKS.forEach(e =>{
                e.style.color="white";
            })
        }
        if(clientHeight<BREAKPOINT){
            HAMBURGERBARS.forEach(e=>{
                e.style.backgroundColor='white';
            })
        }
    }else{
        NAVBAR.style.backgroundColor="#FFF";
        NAVBAR.style.boxShadow="0 20px 50px 0 rgb(0 0 0 / 5%)";
        if(scrollValue==1){
            NAVLINKS.forEach(e =>{
                e.style.color="#4462C6";
            })
        }
        if(clientHeight<BREAKPOINT){
            HAMBURGERBARS.forEach(e=>{
                e.style.backgroundColor='#7e9cff';
            })
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
    positionCalculationArticle = ARTICLES[linkIndex].offsetTop;
    const actualTargetMarginTop = window.getComputedStyle(ARTICLES[linkIndex]).marginTop.slice(0,-2);
    const toBeInCenter = (window.document.documentElement.clientHeight * 5)/100;
    e.target.style.color='#7e9CFF';
    window.scrollTo({
        top:positionCalculationArticle - NAVHEIGHT - actualTargetMarginTop - toBeInCenter,//position par rapport au top de la page - la hauteur de la barre de nav - le maginTop de l'article selectionne - valuer qui permet de deplacer le tout de 10% vers le haut pour l'avoir au niveau des yeux
        behavior:"smooth"
    })
}))

HAMBURGERBUTTON.addEventListener('click',()=>{
    if(NAVLIST.style.visibility=='hidden' || NAVLIST.style.visibility==''){
        NAVLIST.style.height='20px';
        NAVLIST.style.opacity='1';
        NAVLIST.style.visibility='visible';
        NAVLIST.style.height='368.9px';
    }else{
        NAVLIST.style.height='0px';
        NAVLIST.style.opacity='0';
        NAVLIST.style.visibility='hidden';
    }
    if(HAMBURGERBARS[0].className==''){
        HAMBURGERBARS.forEach(e=>{
            e.classList.add('open');
        })
    }else{
        HAMBURGERBARS.forEach(e=>{
            e.classList.remove('open');
        })
    }
})
