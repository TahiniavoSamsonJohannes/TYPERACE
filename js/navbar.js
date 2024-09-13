var subtitle, lang_en;
const en = document.querySelectorAll('span[data-lang="en"]');
const fr = document.querySelectorAll('span[data-lang="fr"]');

const backHome = document.querySelector('.back-home');
const trophy = document.querySelector('.trophy');
const back = document.querySelector('.back');

/* ALL SECTIONS */
const homeSection = document.querySelector('.home-section');
const categorySection = document.querySelector('.category-choice-section');
const topicSection = document.querySelector('.topic-choice-section');
const gameSection = document.querySelector('.game-section');
const gameoverSection = document.querySelector('.game-over-section');
const congratulationSection = document.querySelector('.congratulation-section');
const aboutSection = document.querySelector('.about-section');

if(localStorage.getItem('lang_en') === 'true'){
    lang_en = true;
    aboutSection.innerHTML = aboutText['en'];
}else if(localStorage.getItem('lang_en') === 'false'){
    lang_en = false;
    switch_language.querySelector('.switch').classList.add('lang-fr');
    switch_language.querySelector('.switch .switch-square').classList.add('active');
    aboutSection.innerHTML = aboutText['fr'];
}else{
    localStorage.setItem('lang_en','true');
    lang_en = true;
    aboutSection.innerHTML = aboutText['en'];
}

var lang = (lang_en) ? 'en' : 'fr';
if(lang_en){
    document.querySelector('#user-input').setAttribute('placeholder','Get ready to type...');
    subtitle = ['Boost your typing speed !','Explore diverse topics...','while enhancing your typing.','Expand your knowledge !'];
    en.forEach(item => {item.classList.remove('hide');});
    fr.forEach(item => {item.classList.add('hide');});
}else{
    document.querySelector('#user-input').setAttribute('placeholder','Préparez-vous à taper...');
    subtitle = ['Améliorez votre vitesse de frappe !','Explorez divers sujets...','tout en perfectionnant votre saisie.','Élargissez vos connaissances !'];
    fr.forEach(item => { item.classList.remove('hide');});
    en.forEach(item => {item.classList.add('hide');});
}




backHome.onclick = () => {
    sections.goToSection(homeSection);
}
back.onclick = () => {
    if(!gameSection.classList.contains('hide')){
        game.stopCountdownTimer();
        sections.goToSection(topicSection);
    }else if(!topicSection.classList.contains('hide')){
        sections.goToSection(categorySection);
    }else if(!aboutSection.classList.contains('hide')){
        sections.goToSection(homeSection);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    disableButton(back);
});

function enableButton(button){
    button.classList.remove('disabled');
    button.classList.add('clickable');
    button.addEventListener('mousedown',handleMouseDownOnClickable);
    button.addEventListener('mouseup',handleMouseUpOnClickable);
}
function disableButton(button){
    button.classList.add('disabled');
    button.classList.remove('clickable');
    button.removeEventListener('mousedown',handleMouseDownOnClickable);
    button.removeEventListener('mouseup',handleMouseUpOnClickable);
}

