/**
 * Created by JohnnyRevolver on 21.06.14.
 * choose category and ingredients
 */

function selectCategory(){
    animationPages('categoriesSection', 'ingredientsSection', 900);
    var divId = this.id;

    var ingredientsSection = document.getElementById('ingredientsSection');
    var categories = ingredientsSection.getElementsByTagName('div');//select all div(categories)

    for(var i = 0, l = categories.length; i < l; i++) {//assigns the value of all 'none'
        categories[i].style.display = 'none';
    }

    var category = document.getElementById(divId + 'Ingredients');
    category.style.display = 'block';//makes visible the selected block(by id)

//some effect animation-------------------------------------
    var labels = category.getElementsByClassName('ingredient');
    for(var ii = 0; ii < labels.length; ii++){
        labels[ii].style.display = 'none';
    }
    ii = 0;
    var stop = setInterval(function(){
        labels[ii].style.display = 'inline-block';
        ii++;
        if(ii >= labels.length){
            clearInterval(stop);
        }
    }, 45);
//-----------------------------------------------------------
}

function generateCategoriesControls() {
    var xhr = new XMLHttpRequest();
    var url = '../database/categories.json';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return; //return if not complete

        if (xhr.status != 200) { //check request status
            alert('Error ' + xhr.status + ': ' + xhr.statusText);
            return;
        }
        createDOMforCategories(JSON.parse(xhr.responseText));//вивід в дів
    };

    xhr.send();
}

function createDOMforCategories(json) {
    var spanRadioButtons = document.getElementById('radioButtons');

    for(var cIndex = 0, jsonLng = json.length; cIndex < jsonLng; cIndex++) {
        var categoryBlock = document.createElement('div');
        categoryBlock.className = 'category-item wrapper-div';

        var radioButton = document.createElement('input');
        var categoryLabel = document.createElement('label');

        radioButton.type = 'radio';
        radioButton.className = 'categoryRadio';
        radioButton.name = 'category';
        radioButton.id = json[cIndex].name;
        radioButton.value = json[cIndex].name + 'Category';
        attachReaction('click', radioButton, selectCategory);

        categoryLabel.innerHTML = json[cIndex].name;
        categoryLabel.setAttribute('for', json[cIndex].name);

        categoryBlock.appendChild(radioButton);
        categoryBlock.appendChild(categoryLabel);
        spanRadioButtons.appendChild(categoryBlock);

        crtCheckboxForCategories(json[cIndex], 'ingredientsSection');
    }

}

function crtCheckboxForCategories(category, location) {
    var ingredientsSection = document.getElementById(location);
    var divCategory = document.createElement('div');//create category Div

    divCategory.className = 'ingredients_div wrapper';
    divCategory.id = category.name + 'Ingredients';
    divCategory.innerHTML = '<h3>' + category.name + '</h3>';

    for(var chIndex = 0, catLng = category.ingredients.length; chIndex < catLng; chIndex++) {
        var label = document.createElement('label');
        label.className = 'ingredient wrapper-div';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = category.ingredients[chIndex];

        label.appendChild(checkbox);
        label.innerHTML += category.ingredients[chIndex];//add name ingredient

        divCategory.appendChild(label);
    }

    ingredientsSection.appendChild(divCategory);//add div to ingredientsSection
}

generateCategoriesControls();