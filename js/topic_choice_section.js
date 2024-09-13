const lefttopic = document.querySelector('.topic-choice-section .bx.bx-chevron-left');
const righttopic = document.querySelector('.topic-choice-section .bx.bx-chevron-right');
const topicContainer = document.querySelector('.topic-choice-section > .container');

var difficulty, typingSpeed; // typing speed per character
var categoryChosen, topicChosen;

const topic = {
    index: null, // Current index of topic
    size: null, // Number of topics
    init: function(category){
        const topics = Object.keys(database[lang][category]);
        this.index = 1;
        this.size = topics.length-1; // Minus 1 because description is not included
        topicContainer.innerHTML = '';
        topics.forEach((topic,index) => {
            if(topic !== 'Description'){
                const name = topic;
    
                const divTopic = document.createElement('div');
                divTopic.classList.add('topic');
    
                if(index != 1){
                    divTopic.style.transform = `translateX(500px)`;
                }
    
                const divTopicName = document.createElement('div');
                divTopicName.classList.add('topic-name');
                divTopicName.textContent = name;
                
                const divTopicSentences = document.createElement('div');
                divTopicSentences.classList.add('topic-sentences');
                divTopicSentences.textContent = database[lang][category][topic][0] + ' ' + database[lang][category][topic][1] + '..';

                const labelDifficulty = document.createElement('label');
                labelDifficulty.setAttribute('for', 'difficulty');
                labelDifficulty.textContent = (lang_en) ? 'Difficulty : ' : 'Difficulté : ';

                const divCustomSelect = document.createElement('div');
                divCustomSelect.classList.add('custom-select');
                divCustomSelect.classList.add('clickable');

                const spanDifficulty = document.createElement('span');
                spanDifficulty.textContent = (lang_en) ? 'Easy' : 'Facile';
                
                const iconChevronLeft = document.createElement('i');
                iconChevronLeft.classList.add('bx');
                iconChevronLeft.classList.add('bx-chevron-left');

                const difficultyList = document.createElement('ul');
                difficultyList.classList.add('hide');

                const listItem1 = document.createElement('li');
                listItem1.textContent = (lang_en) ? 'Easy' : 'Facile';
                const listItem2 = document.createElement('li');
                listItem2.textContent = (lang_en) ? 'Medium' : 'Moyen';
                const listItem3 = document.createElement('li');
                listItem3.textContent = (lang_en) ? 'Hard' : 'Difficile';

                const breakLine = document.createElement('br');

                const iconKeyboard = document.createElement('i');
                iconKeyboard.classList.add('bx');
                iconKeyboard.classList.add('bxs-keyboard');
                iconKeyboard.classList.add('clickable');

                difficultyList.appendChild(listItem1);
                difficultyList.appendChild(listItem2);
                difficultyList.appendChild(listItem3);

                divCustomSelect.appendChild(spanDifficulty);
                divCustomSelect.appendChild(iconChevronLeft);
                divCustomSelect.appendChild(difficultyList);
    
                divTopic.appendChild(divTopicName);
                divTopic.appendChild(divTopicSentences);
                divTopic.appendChild(labelDifficulty);
                divTopic.appendChild(divCustomSelect);
                divTopic.appendChild(breakLine);
                divTopic.appendChild(iconKeyboard);

                topicContainer.appendChild(divTopic);

            }

        });

        /* Event listeners */
        const topicsNode = document.querySelectorAll('.topic');
        const customSelect = document.querySelectorAll('.custom-select');
        const difficultyUlList = document.querySelectorAll('.topic-choice-section .topic .custom-select ul');

        /* database.en.Technologie['Intelligence Artificielle'][2] */
        topicsNode.forEach(node => {
            const playKeyboard = node.querySelector('.bx.bxs-keyboard');
            playKeyboard.onclick = () => {
                categoryChosen = category;
                topicChosen = node.querySelector('.topic-name').textContent;
                difficulty = node.querySelector('.custom-select span').textContent;
                if(difficulty === 'Easy' || difficulty === 'Facile'){
                    typingSpeed = 0.5;
                }else if(difficulty === 'Medium' || difficulty === 'Moyen'){
                    typingSpeed = 0.35;
                }else if(difficulty === 'Hard' || difficulty === 'Difficile'){
                    typingSpeed = 0.2;
                }
                sections.goToSection(gameSection);

            }
        });
        
        customSelect.forEach(select => {
            const currentDifficulty = select.querySelector('span');
            const iconChevronLeft = select.querySelector('i');
            const difficultyList = select.querySelector('ul');
            const listItems = difficultyList.querySelectorAll('li');
            select.onclick = (e) => {
                e.stopPropagation();
                difficultyList.classList.toggle('hide');
                iconChevronLeft.classList.toggle('down');

            }
            listItems.forEach(item => {
                item.onclick = () => {
                    currentDifficulty.textContent = item.textContent;
                    if(iconChevronLeft.classList.contains('down')){
                        iconChevronLeft.style.transform = 'rotate(0deg) !important';
                    }
                }
            });
            
            document.addEventListener('click', () => {
                if(!difficultyList.classList.contains('hide')){
                    difficultyList.classList.add('hide');
                }
                if(iconChevronLeft.classList.contains('down')){
                    iconChevronLeft.classList.remove('down');
                }
            });
        });


        // Update clickable element
        updateClickableElement();

        // Initially disable the left button and able the right button
        disableButton(lefttopic);
        enableButton(righttopic);

    },
    moveToLeft: function(){
        if(this.index > 1){
            document.querySelector(`.topic-choice-section > div .topic:nth-child(${this.index})`).style.transform = 'translateX(500px)';
            this.index--;
            document.querySelector(`.topic-choice-section > div .topic:nth-child(${this.index})`).style.transform = 'translateX(0px)';
            if(this.index < this.size && righttopic.classList.contains('disabled')){
                enableButton(righttopic);
            }
            if(this.index == 1){
                disableButton(lefttopic);
            }
            updateClickableElement();
        }
    },
    moveToRight: function(){
        if(this.index < this.size){
            document.querySelector(`.topic-choice-section > div .topic:nth-child(${this.index})`).style.transform = 'translateX(-500px)';
            this.index++;
            document.querySelector(`.topic-choice-section > div .topic:nth-child(${this.index})`).style.transform = 'translateX(0px)';
            if(this.index > 1 && lefttopic.classList.contains('disabled')){
                enableButton(lefttopic);
            }
            if(this.index == this.size){
                disableButton(righttopic);
            }
            updateClickableElement();
        }
    }
}

lefttopic.onclick = () => {
    topic.moveToLeft();
}
righttopic.onclick = () => {
    topic.moveToRight();
}

