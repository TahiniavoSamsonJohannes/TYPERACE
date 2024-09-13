const playButton = document.querySelector('.play');
var clickableElement;


document.oncontextmenu = (e) => {
    /* e.preventDefault(); */ // Prevent the context menu to display
}



playButton.onclick = () => {
    category.init();
    sections.goToSection(categorySection);
}

var clickSound = new Audio('./audio/click-sound.mp3');
updateClickableElement();


function updateClickableElement(){
    clickableElement = document.querySelectorAll('.clickable');
    clickableElement.forEach(element => {
        element.addEventListener('mousedown',handleMouseDownOnClickable);
        element.addEventListener('mouseup',handleMouseUpOnClickable);
    });
}

function handleMouseDownOnClickable() {
    if(clickSoundTimer){
        clearTimeout(clickSoundTimer);
    }
    clickSound.currentTime = 0;
    clickSound.play();
    clickSoundTimer = setTimeout(() => {
        clickSound.pause();
    },clickSound.duration * 500);
}

function handleMouseUpOnClickable() {
    clickSound.play();
}

const typeAnim = {
    i:0,n:null,cti:0,tn:null, ci:0,
    onStart:true,onBack:true,onFinished:false,
    startDelayTimer:null,typeTimer:null,backDelayTimer:null,backTimer:null,
    init:function(c,e){
        e.strings = (e.strings) ? e.strings : ['Type your text here','and Enjoy!'];
        this.n = e.strings.length;
        e.typeSpeed = (e.typeSpeed) ? e.typeSpeed : 90;
        e.backSpeed = (e.backSpeed) ? e.backSpeed : 25;
        e.loop = (e.loop) ? e.loop : true;
        e.startDelay = (e.startDelay) ? e.startDelay : 1500;
        e.backDelay = (e.backDelay) ? e.backDelay : 1500;
        this.type(c,e);
    },
    type:function(c,e){
        let startDelay;(this.onStart) ? (this.onStart=false,startDelay=e.startDelay,this.onFinished=false) : startDelay=0;
        this.startDelayTimer=setTimeout(() => {
            if(this.ci<e.strings[this.cti].length){
                c.textContent+=e.strings[this.cti][this.ci];this.ci++;
                this.typeTimer=setTimeout(() => {this.type(c,e);},e.typeSpeed);
            }else{
                (this.cti==this.n-1 && !e.loop) ? onFinished=true : this.back(c,e);
            }
        },startDelay);
    },
    back:function(c,e){
        let backDelay;(this.onBack) ? (this.onBack=false,backDelay=e.backDelay) : backDelay=0;
        this.backDelayTimer=setTimeout(() => {
            if(this.ci>this.i){
                c.textContent=e.strings[this.cti].substring(this.i,this.ci-1);this.ci--;
                this.backTimer=setTimeout(() => {this.back(c,e);},e.backSpeed);
            }else{
                this.onStart = true;this.onBack = true;this.cti++;
                (this.cti<this.n) ? this.init(c,e) : (this.cti = this.i,this.init(c,e));
            }
        },backDelay);
    },
    reinit:function(c,e){
        c.textContent='';
        clearTimeout(this.startDelayTimer);clearTimeout(this.typeTimer);clearTimeout(this.backDelayTimer);clearTimeout(this.backTimer);
        this.cti=0;this.ci=0;this.onStart=true;this.onBack=true;this.onFinished=false;
        this.init(c,e);
    }
}


const settings = document.querySelector('.settings');
const settings_options = document.querySelector('.settings-options');
const language_option = document.querySelector('.language-option');
const switch_language = document.querySelector('.settings-options .language-option .switch-language');
const info = document.querySelector('.settings-options .info-option');
settings.onclick = (e) => {
    e.stopPropagation();
    settings_options.classList.toggle('hide');
}
document.onclick = () => {
    !settings_options.classList.contains('hide') && settings_options.classList.add('hide');
}
switch_language.onclick = (e) => {
    e.stopPropagation();
    if(switch_language.querySelector('.switch').classList.contains('lang-fr')){
        switch_language.querySelector('.switch').classList.remove('lang-fr');
        switch_language.querySelector('.switch .switch-square').classList.remove('active');
    }else{
        switch_language.querySelector('.switch').classList.add('lang-fr');
        switch_language.querySelector('.switch .switch-square').classList.add('active');
    }
    if(localStorage.getItem('lang_en') === 'true'){
        localStorage.setItem('lang_en','false');
    }else if(localStorage.getItem('lang_en') === 'false'){
        localStorage.setItem('lang_en','true');
    }
    setTimeout(() => {location.reload();},200);
}

language_option.onclick = (e) => {
    e.stopPropagation();
}

info.onclick = () => {
    sections.goToSection(aboutSection);
}

window.addEventListener('resize', (e) => {
    e.preventDefault();
    console.log('resized');
});

document.onkeydown = (e) => {
    (e.ctrlKey && (e.key === '+' || e.key === '-')) && e.preventDefault();
}

const aboutText = {
    fr:"<h2>À propos de TypeRace</h2><br>"
    +"Bienvenue sur <span>TYPERACE</span>, la plateforme ultime pour améliorer vos compétences en "
    +"dactylographie tout en apprenant de nouveaux sujets passionnants ! Que vous soyez débutant cherchant"
    +"à augmenter votre vitesse de frappe ou un expert souhaitant maintenir votre niveau, TypeRace offre une"
    +"manière amusante et engageante d’améliorer vos capacités.<br><br>"
    +"Dans TypeRace, vous embarquerez pour un voyage à travers divers sujets, de la technologie"
    +"et la science à la musique et la culture. Chaque course vous met au défi de taper avec précision"
    +"et rapidité, tout en vous fournissant des retours instantanés pour suivre vos progrès.<br><br>"
    +"Créé par <span>Samson Johannès TAHINIAVO</span>, TypeRace est conçu pour rendre la pratique de"
    +"la dactylographie à la fois agréable et éducative. À chaque frappe, vous ne faites pas que gagner en"
    +"vitesse vous élargissez vos connaissances et maîtrisez de nouveaux contenus. Préparez-vous à concourir,"
    +"à apprendre, et surtout, à vous amuser en affrontant le temps et vous-même.<br><br>"
    +"Rejoignez TypeRace dès aujourd'hui et voyez à quelle vitesse vos doigts peuvent voler !",

    en:"<h2>About TypeRace</h2><br>"
    +"Welcome to <span>TYPERACE</span>, the ultimate platform to boost your typing skills while learning"
    +"new and exciting topics ! Whether you're a beginner looking to improve your typing speed or a"
    +"seasoned pro aiming to maintain your edge, TypeRace offers a fun and engaging way to enhance your"
    +"abilities.<br><br>"
    +"In TypeRace, you'll embark on a journey across various subjects, from technology and"
    +"science to music and culture. Each race challenges you to type accurately and quickly, providing"
    +"instant feedback to help you track your progress.<br><br>"
    +"Created by <span>Samson Johannès TAHINIAVO</span>,"
    +"TypeRace is designed to make typing practice both enjoyable and educational. With every keystroke,"
    +"you're not just getting faster you're expanding your knowledge and mastering new content."
    +"Get ready to compete, learn, and most importantly, have fun as you race against the clock and"
    +"against yourself.<br><br>"
    +"Join TypeRace today and see how fast your fingers can fly !"
}
