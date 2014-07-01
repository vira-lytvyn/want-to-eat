/**
 * Created by JohnnyRevolver on 21.06.14.
 * choose category and ingredients
 */

var clientIngredients;
var clientCategory;

function selectCategory(){
    var divId = this.id;

    var form = document.getElementById('category_form');
    var categories = form.getElementsByTagName('div');//select all div(categories)

    for(var i = 0, l = categories.length; i < l; i++) {//assigns the value of all 'none'
        categories[i].style.display = 'none';
    }

    var category = document.getElementById(divId + 'Ingredients');
    category.style.display = 'block';//makes visible the selected block(by id)

    var button = document.getElementById('getRecipe');

    button.onclick = function(){//button onclick function
        var checkbox = category.getElementsByTagName('input');//selected all inputs
        var ingredients = [];
        for(var i = 0, l = checkbox.length; i < l; i++) {//if checkbox.checked is true - push 'name(ingredient)' in arr
            if(checkbox[i].checked === true) {
                ingredients.push(checkbox[i].name);
            }
        }
        clientIngredients = ingredients;
        clientCategory = divId;
        console.log(clientIngredients, clientCategory);
    };
}

function makeRequest() {
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
    console.log(json);
    var spanRadioButtons = document.getElementById('radioButtons');

    for(var cIndex = 0, jsonLng = json.length; cIndex < jsonLng; cIndex++) {
        var radioButton = document.createElement('input');
        var categoryLabel = document.createElement('label');

        radioButton.type = 'radio';
        radioButton.className = 'categoryRadio';
        radioButton.name = 'choice';
        radioButton.id = json[cIndex].name;
        radioButton.value = json[cIndex].name + 'Category';
        attachReaction('click', radioButton, selectCategory);

        categoryLabel.innerHTML = json[cIndex].name;
        categoryLabel.setAttribute('for', json[cIndex].name);

        spanRadioButtons.appendChild(radioButton);
        spanRadioButtons.appendChild(categoryLabel);

        crtCheckboxForCategories(json[cIndex], 'category_form');
    }

}

function crtCheckboxForCategories(category, location) {
    var form = document.getElementById(location);
    var divCategory = document.createElement('div');//create category Div

    divCategory.className = 'ingredients_div';
    divCategory.id = category.name + 'Ingredients';
    divCategory.innerHTML = '<h3>' + category.name + '</h3>';

    for(var chIndex = 0, catLng = category.ingredients.length; chIndex < catLng; chIndex++) {
        var label = document.createElement('label');
        label.className = 'ingredient';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = category.ingredients[chIndex];

        label.appendChild(checkbox);
        label.innerHTML += category.ingredients[chIndex];//add name ingredient

        divCategory.appendChild(label);
    }

    form.appendChild(divCategory);//add div to Form
}

makeRequest();