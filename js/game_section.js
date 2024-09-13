var clickSoundTimer,
trueSound = new Audio('./audio/true-sound.mp3'),
wrongSound = new Audio('./audio/wrong-sound.mp3'),
applauseSound = new Audio('./audio/applause-sound.mp3'),
gameoverSound = new Audio('./audio/gameover-sound.mp3');
beepSound = new Audio('./audio/beep-sound.mp3');
endbeepSound = new Audio('./audio/endbeep-sound.mp3');


const game = {
    d:700, // delay (milliseconds)
    t:500, // transition duration of sections (milliseconds)
    s:1000, // 1 second
    level:0,startNumber:null,
    countdown:null,
    countdownBar: document.querySelector('.countdown-bar span'),
    preGameCountdown: document.querySelector('.pre-game-countdown'),
    textContainer: document.querySelector('#text-to-type'),
    userInput: document.querySelector('#user-input'),
    completedSentences: document.querySelector('.game-section .completed-sentences'),
    typedWords: document.querySelector('.game-section .typed-words'),
    completed:0,totalSentences:0,typed:0,totalWords:0,

    start:true,
    preStartCountdownTimer:null,preStartGameTimer:null,preStartGameTimerEnd:null,
    countdownTimer:null, clickSoundTimer:null,preGameCountdownTimer:null,focusTimer:null,

    init:function(){
        this.typedWords.classList.add('fadeout');
        this.completedSentences.classList.add('fadeout');
        this.userInput.value = '';this.countdownBar.style.transitionDuration = '0s';
        this.countdownBar.classList.remove('countdown');
        this.level = 0;this.start = true;

        this.typed=0;this.totalWords = database[lang][categoryChosen][topicChosen][this.level].length;
        this.typedWords.textContent = `${this.typed}/${this.totalWords}`;

        this.completed=0;this.totalSentences = database[lang][categoryChosen][topicChosen].length;
        this.completedSentences.textContent = `${this.completed}/${this.totalSentences}`;
        
        this.textContainer.textContent = database[lang][categoryChosen][topicChosen][this.level];

        (this.preGameCountdown.classList.contains('fadeout')) && this.preGameCountdown.classList.remove('fadeout');
        
        this.preStartCountdown(3);
        this.focusTimer = setTimeout(() => {
            this.userInput.focus();
            this.keepFocusOnUserInput();
            this.typedWords.classList.remove('fadeout');
            this.completedSentences.classList.remove('fadeout');
        },this.d+this.t+this.startNumber*this.s);


        this.userInput.onmousedown = (event) => {
            event.preventDefault(); // Prevent the mouse selection
        }
        /* Play clickSound each time the user types */
        this.userInput.onkeypress = () => {
            (this.clickSoundTimer) && clearTimeout(this.clickSoundTimer);
            clickSound.currentTime = 0;clickSound.play();
            this.clickSoundTimer = setTimeout(() => {clickSound.pause();},clickSound.duration * 500);
        }
        this.userInput.oninput = () => {
            let textToType = this.textContainer.textContent.trim(),
            typedText = this.userInput.value, coloredText = '', isIncorrect = false;
        
            /* When user starts to type, start the countdown bar and the countdown timer */
            for(let i=0; i<textToType.length; i++) {
                if(i<typedText.length) {
                    /* When user types correct character, color it in blue */
                    if(!isIncorrect && textToType[i] === typedText[i]){
                        coloredText += `<span style='color:blue;'>${textToType[i]}</span>`;
                    }else{
                        /* At the first incorrect character, leave the rest in white */
                        isIncorrect = true;coloredText += textToType[i];
                        wrongSound.currentTime = 0;wrongSound.play();
                    }
                }else{
                    /* Leave the characters the user didn't reach yet in white */
                    coloredText += textToType[i];
                }
            }
            document.querySelector('#text-to-type').innerHTML = coloredText;
        
            let correctText = document.querySelectorAll('#text-to-type span');
            this.typed=correctText.length;this.typedWords.textContent = `${this.typed}/${this.totalWords}`;
            
        
            /* When all text has been well-typed, re-initialize countdown bar and countdown timer */
            /* Reset the user input and generate a new text to type */
            if(textToType.length == correctText.length){
                this.reinit();
                if(this.level < this.totalSentences){
                    trueSound.currentTime = 0;trueSound.play();
                    /* Generate new text to type, then restart the countdown */
                    this.typed=0;this.totalWords = database[lang][categoryChosen][topicChosen][this.level].length;
                    this.typedWords.textContent = `${this.typed}/${this.totalWords}`;
                    this.completed++;this.completedSentences.textContent = `${this.completed}/${this.totalSentences}`;
                    this.textContainer.textContent = database[lang][categoryChosen][topicChosen][this.level];
                    setTimeout(() => {
                        this.startCountdown(textToType,typingSpeed);
                    },this.d);
                }else{
                    applauseSound.currentTime = 0;applauseSound.play();
                    this.countdown=this.startNumber;
                    this.typed=correctText.length;this.typedWords.textContent = `${this.typed}/${this.totalWords}`;
                    this.completed++;this.completedSentences.textContent = `${this.completed}/${this.totalSentences}`;
                    game.stopCountdownTimer();
                    sections.goToSection(congratulationSection); // CONGRATULATIONS
                }
            }
        }
    },
    preStartCountdown:function(n){
        this.countdown=n;
        let delay = (this.start) ? (this.d+this.t) : 0;
        (this.start) && (this.startNumber=n,this.preGameCountdown.textContent = this.startNumber);
        this.preStartCountdownTimer = setTimeout(() => {
            (this.start) && (beepSound.currentTime=0,beepSound.play());
            if(this.countdown <= 1){
                this.preStartGameTimerEnd = setTimeout(() => {
                    endbeepSound.currentTime=0;endbeepSound.play();
                    this.preGameCountdown.textContent = 'Go!';
                    let textToType = this.textContainer.textContent.trim();
                    this.startCountdown(textToType,typingSpeed); // STARTING GAME
                    this.preGameCountdownTimer = setTimeout(() => {
                        this.preGameCountdown.style.transitionDuration = '1s';
                        this.preGameCountdown.classList.add('fadeout');
                    },this.s);
                },this.s);
            }else{
                this.preStartGameTimer = setTimeout(() => {
                    this.countdown--;this.preGameCountdown.textContent = this.countdown;
                    this.start = false;beepSound.currentTime=0;beepSound.play();
                    this.preStartCountdown(this.countdown);
                },this.s);
            }
        },delay);
    },
    startCountdown:function(textToType,typingSpeed){
        let typingDuration = parseInt(textToType.length)*typingSpeed;
        this.countdownBar.style.transitionDuration = `${typingDuration}s`;
        this.countdownBar.classList.add('countdown');
        this.countdownTimer = setTimeout(() => {
            gameoverSound.currentTime = 0;gameoverSound.play();
            this.countdown=this.startNumber;
            game.stopCountdownTimer();
            sections.goToSection(gameoverSection); // GAME OVER
        },typingDuration*this.s);
    },
    stopCountdownTimer:function(){
        this.countdown=this.startNumber;
        (this.countdownTimer) && clearTimeout(this.countdownTimer);
        (this.preStartCountdownTimer) && clearTimeout(this.preStartCountdownTimer);
        (this.preStartGameTimer) && clearTimeout(this.preStartGameTimer);
        (this.preStartGameTimerEnd) && clearTimeout(this.preStartGameTimerEnd);
        (this.preGameCountdownTimer) && clearTimeout(this.preGameCountdownTimer);
        (this.focusTimer) && clearTimeout(this.focusTimer);
    },
    reinit:function(){
        this.userInput.value = '';this.countdownBar.style.transitionDuration = '0s';
        this.countdownBar.classList.remove('countdown');
        this.stopCountdownTimer();
        this.level++;
    },
    keepFocusOnUserInput:function(){
        this.userInput.onblur = () => {
            /* Check if the game section is not hidden, 
            to prevent the focus to be placed in the user input when in another section */
            (!gameSection.classList.contains('hide')) && this.userInput.focus();
        }
        this.userInput.onkeydown = (event) => {
            (event.key === "Tab") && event.preventDefault(); // Prevent the Tab button to move the focus
        }
    }
}





/* CONGRATULATIONS */
const replay = document.querySelectorAll('.replay');
const backToTopic = document.querySelectorAll('.back-to-topic');

replay.forEach(button => {
    button.onclick = () => {
        sections.goToSection(gameSection);
    }
});
backToTopic.forEach(button => {
    button.onclick = () => {
        sections.goToSection(topicSection);
    }
});
