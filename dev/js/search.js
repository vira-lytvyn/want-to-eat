/**
 * Created by 1 on 21.06.2014.
 */

function searchRecipes(){
    console.log(clientIngredients, clientCategory);
    var allRecipesInCategory = searchByCategory(clientCategory);
    var minRecipesCount = 3;
    var resultArr = allRecipesInCategory;
    for (var i = 0; i < clientIngredients.length; i++) {
        console.log(resultArr);
        var temporaryArr = searchThroughIngredients(resultArr, clientIngredients[i]);
        if (temporaryArr.length < minRecipesCount) {
            console.log(temporaryArr);
            break;
        } else {
            resultArr = temporaryArr;
        }
    }
    console.log(resultArr);
}

function searchByCategory (category) {
    console.log(category);
    var arr = [];
    for (var i = 0; i < data.length; i++) {
       if (data[i].category.indexOf(category) !== -1) {
           arr.push(data[i]);
       }
    }
    return arr;
}

function searchThroughIngredients(recipes, ingredient){
    console.log(recipes);
    var newArr = [];
    for (var i = 0; i < recipes.length; i++) {
        console.log(recipes);
        var temporaryIngredientsArray = recipes[i].ingredients;
        for (var j = 0; j < temporaryIngredientsArray.length; j++) {
            if (temporaryIngredientsArray[j].indexOf(ingredient) !== -1) {
                newArr.push(recipes[i]);
                break;
            }
        }
    }
    return newArr;
}