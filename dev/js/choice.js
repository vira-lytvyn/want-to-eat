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
