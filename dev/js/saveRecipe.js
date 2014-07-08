function isAnyRecipeSaved() {
    return !(localStorage.getItem('cockBook') === null);
}

function saveRecipeToLocalStorage () {
    var recipe = JSON.parse(document.getElementById('chosenRecipe').value);
    var savedRecipes = JSON.parse(localStorage.getItem('cockBook')) || [];
    try {
        if (savedRecipes.indexOf(recipe) !== -1) {
            alert('Recipe is already saved in you Cook Book.');
            return false;
        } else if (savedRecipes.length >= 10){
            alert('Sorry, you can save only 10 recipes in your Cook Book. Limit expires. \nYou should clear your Cook Book to save new recipes.');
            if (confirm('Would you like to delete all saved recipes now?')) {
                localStorage.removeItem('cockBook');
            }
        } else {
            savedRecipes.push(recipe);
            localStorage.setItem('cockBook', JSON.stringify(savedRecipes));
            alert('Recipe was successfully saved. You can view it in your Cook Book.');
            return true;
        }
    } catch(e) {
        alert('Sorry, there were some errors with saving this recipe in your Cook Book');
        return false;
    }
}

function showCockBook () {
    if (isAnyRecipeSaved()) {
        var savedRecipes = JSON.parse(localStorage.getItem('cockBook'));
        var cookBook = new SearchResults(savedRecipes, 'startPage');
        cookBook.init();
        var loadMore = document.querySelector('#loadMoreButton');
        attachReaction('click', loadMore, cookBook.loadMore);
    } else {
        alert('Sorry, you\'ve saved no one recipe to you Cook Book.');
    }
}