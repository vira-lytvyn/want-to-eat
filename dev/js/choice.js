/**
 * Created by JohnnyRevolver on 21.06.14.
 * choose category and ingredients
 */

var clientIngredients;
var clientCategory;

function selectCategory(id){
    var form = document.getElementById('category_form');
    var categories = form.getElementsByTagName('div');//select all div(categories)

    for(var i = 0, l = categories.length; i < l; i++) {//assigns the value of all 'none'
        categories[i].style.display = 'none';
    }

    var category = document.getElementById(id);
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
        clientCategory = id;
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

function createDOMforCategories(json, location) {
    console.log(json);
    var form = document.getElementById('category_form');
    var spanRadioButtons = document.getElementById('radioButtons');

    for(var cIndex = 0, jsonLng = json.length; cIndex < jsonLng; cIndex++) {
        var radioButton = document.createElement('input');
        var spanCategoryName = document.createElement('span');

        radioButton.type = 'radio';
        radioButton.className = 'categoryRadio';
        radioButton.name = 'choice';
        radioButton.value = 'cat' + json[cIndex].id;

        spanCategoryName.innerHTML = json[cIndex].name;

        spanRadioButtons.appendChild(radioButton);
        spanRadioButtons.appendChild(spanCategoryName);

        crtCheckboxForCategories(json[cIndex], 'category_form');
    }

}

function crtCheckboxForCategories(category, location) {
    var form = document.getElementById(location);
    var divCategory = document.createElement('div');//create category Div

    divCategory.className = 'ingredients_div';
    divCategory.id = 'cat_' + category.id;
    divCategory.innerHTML = '<h3>' + category.name + '</h3>';

    for(var chIndex = 0, catLng = category.ingredients.length; chIndex < catLng; chIndex++) {
        var spanDiv = document.createElement('span');
        spanDiv.className = 'ingredient';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = category.ingredients[chIndex];

        spanDiv.appendChild(checkbox);
        spanDiv.innerHTML += category.ingredients[chIndex];//add name ingredient

        divCategory.appendChild(spanDiv);
    }

    form.appendChild(divCategory);//add div to Form
}

makeRequest();