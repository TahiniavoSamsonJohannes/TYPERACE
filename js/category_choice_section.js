const leftCategory = document.querySelector('.category-choice-section .bx.bx-chevron-left');
const rightCategory = document.querySelector('.category-choice-section .bx.bx-chevron-right');
const categoryContainer = document.querySelector('.category-choice-section > div');




const category = {
    index: null, // Current index of category
    size: null, // Number of categories
    init: function(){
        const categories = Object.keys(database[lang]);
        this.index = 1;
        this.size = categories.length;
        categoryContainer.innerHTML = '';
        categories.forEach((category,index) => {
            const name = category;
            const description = database[lang][category]['Description'];

            const divCategory = document.createElement('div');
            divCategory.classList.add('category');
            divCategory.classList.add('clickable');

            if(index != 0){
                divCategory.style.transform = `translateX(500px)`;
            }

            const divCategoryName = document.createElement('div');
            divCategoryName.classList.add('category-name');
            divCategoryName.textContent = name;

            const divCategoryDesc = document.createElement('div');
            divCategoryDesc.classList.add('category-description');
            divCategoryDesc.classList.add('fadeout');
            divCategoryDesc.textContent = description;

            divCategory.appendChild(divCategoryName);
            divCategory.appendChild(divCategoryDesc);
            categoryContainer.appendChild(divCategory);

        });
        // Update clickable element
        updateClickableElement();

        const categoriesNode = document.querySelectorAll('.category');
        // Event listener of categories
        categoriesNode.forEach(node => {
            const name = node.querySelector('.category-name').textContent;
            const description = node.querySelector('.category-description');
            node.onclick = () => {
                topic.init(name);
                sections.goToSection(topicSection);
            }
            node.onmouseover = () => {
                description.style.marginTop = '15px';
                description.style.padding = '15px';
                description.style.height = 'fit-content';
                description.classList.remove('fadeout');
            }
            node.onmouseout = () => {
                description.style.marginTop = '0';
                description.style.padding = '0';
                description.style.height = '0';
                description.classList.add('fadeout');
            }
        });

        // Initially disable the left button and able the right button
        disableButton(leftCategory);
        enableButton(rightCategory);

    },
    moveToLeft: function(){
        if(this.index > 1){
            document.querySelector(`.category-choice-section > div .category:nth-child(${this.index})`).style.transform = 'translateX(500px)';
            this.index--;
            document.querySelector(`.category-choice-section > div .category:nth-child(${this.index})`).style.transform = 'translateX(0px)';
            if(this.index < this.size && rightCategory.classList.contains('disabled')){
                enableButton(rightCategory);
            }
            if(this.index == 1){
                disableButton(leftCategory);
            }
            updateClickableElement();
        }
    },
    moveToRight: function(){
        if(this.index < this.size){
            document.querySelector(`.category-choice-section > div .category:nth-child(${this.index})`).style.transform = 'translateX(-500px)';
            this.index++;
            document.querySelector(`.category-choice-section > div .category:nth-child(${this.index})`).style.transform = 'translateX(0px)';
            if(this.index > 1 && leftCategory.classList.contains('disabled')){
                enableButton(leftCategory);
            }
            if(this.index == this.size){
                disableButton(rightCategory);
            }
            updateClickableElement();
        }
    }
}

leftCategory.onclick = () => {
    category.moveToLeft();
}
rightCategory.onclick = () => {
    category.moveToRight();
}