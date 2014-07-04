function searchRecipes(){
    var allRecipesInCategory = searchByCategory(clientCategory);
    var resultArr = sortBy('weigth', calculateWeight(allRecipesInCategory, clientIngredients)); // move the 'heaviest' recipe up
    showSearchResult(0, resultArr, 'ingredientsSection');
}

function showSearchResult(position, array, sectionFrom) {
    var showStep = 3;
    var container = document.getElementById('recipes');
    clearElementContent(container);
    for (var i = position; i < position + showStep; i++) {
        if (array[i]) {
            container.appendChild(genrateRecipeItem(array[i]));
        }
    }
    if (sectionFrom) {
        animationPages(sectionFrom, 'searchResult', 900);
    }
    addSortEvent(array);
}

function searchByCategory (category) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
       if (data[i].category.indexOf(category) !== -1) {
           data[i].weigth = 0; // set 'weigth' property to each recipe from selected category
           arr.push(data[i]);
       }
    }
    return arr;
}

function calculateWeight(recipes, ingredients){
    var resultArray = [];
    for (var i = 0; i < recipes.length; i++) {
        var currentRecipeIngredients = recipes[i].ingredients.join();
        for (var j = 0; j < ingredients.length; j++) {
            if (currentRecipeIngredients.indexOf(ingredients[j]) !== -1) {
                recipes[i].weigth += 1; // increase weight of recipe if it contains more ingredients
            }
        }
        if (recipes[i].weigth !== 0) {
            resultArray.push(recipes[i]); // push recipe to result array if it contains at least one ingredient
        }
    }
    return resultArray;
}