const sections = {
    d:700, // delay (milliseconds)
    t:500, // transition duration of sections (milliseconds)
    home: document.querySelector('.home-section'),
    category: document.querySelector('.category-choice-section'),
    topic: document.querySelector('.topic-choice-section'),
    game: document.querySelector('.game-section'),
    gameover: document.querySelector('.game-over-section'),
    congratulation: document.querySelector('.congratulation-section'),
    about: document.querySelector('.about-section'),
    backHome: document.querySelector('.back-home'),back: document.querySelector('.back'),
    trophy: document.querySelector('.trophy'),
    settings: document.querySelector('.settings'),
    goToSection:function(section){
        this.hideAllSections();
        switch (section) {
            case this.home:{
                typeAnim.reinit(document.querySelector('.subtitle'),{strings: subtitle,startDelay:3500});
                this.back.classList.add('fadeout');disableButton(this.back);
                this.backHome.classList.add('fadeout');disableButton(this.backHome);
                this.trophy.classList.remove('fadeout');enableButton(this.trophy);
                this.settings.classList.remove('hide');enableButton(this.settings);
                this.settings.classList.remove('fadeout');
            }break;
            case this.category:{
                this.back.classList.add('fadeout');disableButton(this.back);
                this.backHome.classList.remove('fadeout');enableButton(this.backHome);
                this.settings.classList.add('fadeout');disableButton(this.settings);
                this.settings.classList.add('hide');
            }break;
            case this.topic:{
                this.back.classList.remove('fadeout');enableButton(this.back);
                this.backHome.classList.remove('fadeout');enableButton(this.backHome);
            }break;
            case this.game:{
                this.back.classList.remove('fadeout');enableButton(this.back);
                this.backHome.classList.add('fadeout');disableButton(this.backHome);
                game.init();

            }break;
            case this.gameover:{
                this.back.classList.add('fadeout');disableButton(this.back);
                this.backHome.classList.add('fadeout');disableButton(this.backHome);
            }break;
            case this.congratulation:{
                this.back.classList.add('fadeout');disableButton(this.back);
                this.backHome.classList.add('fadeout');disableButton(this.backHome);
            }break;
            case this.about:{
                this.back.classList.remove('fadeout');enableButton(this.back);
                this.backHome.classList.add('fadeout');disableButton(this.backHome);
                this.trophy.classList.add('fadeout');disableButton(this.trophy);
                this.settings.classList.add('fadeout');disableButton(this.settings);
                this.settings.classList.add('hide');
            }break;
        }
        let delay = (section===this.home) ? 100 : 0;
        setTimeout(() => {
            section.classList.remove('hide');
            setTimeout(() => {section.classList.remove('fadeout');},delay);
        },this.d);

    },
    hideAllSections:function(){
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fadeout');
            setTimeout(() => {section.classList.add('hide');}, 500);
        });
    }
}

sections.goToSection(homeSection);


