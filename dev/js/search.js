function searchRecipes(){
    var selected = detectCheckedIngredients();
//    requestForData();
    var allRecipes = selected.category === 'all' ? data : searchByCategory(selected.category);
    var resultArr = calculateWeight(allRecipes, selected.ingredients); // calculate occurrence frequency of ingredients in recipe
    resultArr = sortBy('weigth', resultArr); // move the 'heaviest' recipe up
    var searchByIngredients = new SearchResults(resultArr, 'ingredientsSection');
    searchByIngredients.init();
    var loadMore = document.querySelector('#loadMoreButton');
    attachReaction('click', loadMore, searchByIngredients.loadMore);
//    showSearchResult(0, resultArr, 'ingredientsSection');
}

function detectCheckedIngredients() {
    var selectedCategory = document.querySelector('input[name="category"]:checked') || '';
    if (selectedCategory) {
        selectedCategory = selectedCategory.id;
        var checkboxes = document.querySelectorAll('#' + selectedCategory + 'Ingredients input[type="checkbox"]:checked');
        var ingredients = [];
        for(var i = 0, l = checkboxes.length; i < l; i++) {
            ingredients.push(checkboxes[i].name);
        }
        return {category: selectedCategory, ingredients: ingredients};
    } else {
        return {};
    }
}

function SearchResults(data, sectionId) {
    var _this = this;
    this.container = document.getElementById('recipes');
    this.step = 3;
    this.show = function (position) {
        var i;
        if (!('new' in _this.data)) {
            for (i = position; i < position + _this.step; i++) {
                if (_this.data[i]) {
                    _this.container.appendChild(genrateRecipeItem(_this.data[i]));
                }
            }
            addSortEvent(_this.data);
        } else {
            for (i = position; i < position + _this.step; i++) {
                if (_this.data.new[i]) {
                    _this.container.appendChild(genrateRecipeItem(_this.data.new[i]));
                }
            }
        }
    };
    this.clear = function () {
        while (_this.container.firstChild) {
            _this.container.removeChild(_this.container.firstChild);
        }
    };
    this.init = function(){
        _this.data = data;
        _this.section = sectionId;
        _this.count = _this.step;
        _this.clear();
        if (_this.section) {
            animationPages(_this.section, 'searchResult', 900);
        }
        if (_this.checkMore()) {
            document.querySelector('#loadMoreButton').style.display = 'inline-block';
        }
        _this.show(0);
    };
    this.loadMore = function (){
        if (_this.checkMore()) {
            this.style.display = 'inline-block';
            _this.show(_this.count);
            _this.count += _this.step;
        } else {
            this.style.display = 'none';
            _this.show(_this.data.length);
        }
    };
    this.checkMore = function() {
        return _this.data.length > _this.count
    }
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
                if (recipes[i].weigth) {
                    recipes[i].weigth += 1; // increase weight of recipe if it contains more ingredients
                } else {
                    recipes[i].weigth = 1;
                }
            }
        }
        if (recipes[i].weigth !== 0) {
            resultArray.push(recipes[i]); // push recipe to result array if it contains at least one ingredient
        }
    }
    return resultArray;
}