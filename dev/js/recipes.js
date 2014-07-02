


//function buildRecipeDetail(id) {
//    var currentRecipe = data[id];
//
//    var recipe = document.createElement('div');
//    recipe.id = 'doneRecipe';
//
//    //->start of header block
//    var header = document.createElement('div');
//    header.className = 'main-blocks';
//    recipe.appendChild(header);
//
//    var image = document.createElement('img');
//    image.src = currentRecipe.picture;
//    header.appendChild(image);
//
//    var title = document.createElement('h1');
//    title.innerHTML = currentRecipe.title;
//    header.appendChild(title);
//    //X end of header block
//
//    //->start of info block
//    var authors = document.createElement('a');
//    authors.className = 'main-blocks info';
//    authors.id = 'authors';
//    authors.innerHTML = 'authors: ' + currentRecipe.authors;
//    authors.onclick = function() {
//          alert('search by author ' + currentRecipe.authors);
//    };
//    recipe.appendChild(authors);
//
//    var rank = document.createElement('div');
//    rank.className = 'main-blocks info';
//    rank.innerHTML = 'social rank: ' + currentRecipe.rate;
//    recipe.appendChild(rank);
//    //X end of info block
//
//    //->start of ingredients block
//    var ingredients = document.createElement('div');
//    ingredients.className = 'main-blocks';
//    ingredients.id = 'ingredients';
//
//    var ingTitle = document.createElement('div');
//    ingTitle.innerHTML = 'ingredients you need to...';
//    ingTitle.id = 'ingTitle';
//    ingTitle.onclick = function() {
//        if (ingList.style.display == 'none') {
//            ingList.style.display = 'block';
//        } else {
//            ingList.style.display = 'none';
//        }
//    };
//    ingredients.appendChild(ingTitle);
//
//    var ingList = document.createElement('ol');
//    ingList.id = 'ingList';
//    ingList.className = 'sub-blocks';
//    ingList.style.display = 'none';
//    var ingData = currentRecipe.ingredients;
//    for (var i = 0; i < ingData.length; i++) {
//        ingList.innerHTML += '<li>' + ingData[i] + '</li>';
//    }
//    ingredients.appendChild(ingList);
//
//    recipe.appendChild(ingredients);
//    //->X end of ingredients block
//
//    //->start of description block
//    var description = document.createElement('div');
//    description.className = 'main-blocks';
//
//    var descText = document.createElement('p');
//    descText.innerHTML = currentRecipe.description;
//    description.appendChild(descText);
//
//    var mealCat = document.createElement('span');
//    mealCat.id = 'mealCat';
//    mealCat.innerHTML = currentRecipe.category;
//    description.appendChild(mealCat);
//
//    var mealType = document.createElement('span');
//    mealType.id = 'mealType';
//    mealType.innerHTML = currentRecipe.type_of_meal;
//    description.appendChild(mealType);
//
//    var time = document.createElement('p');
//    time.innerHTML = 'added: ' + currentRecipe.added;
//    description.appendChild(time);
//
//    recipe.appendChild(description);
//    //->X end of description block
//
//    //->start of links block
//    var source = document.createElement('a');
//    source.className = 'main-blocks';
//    source.href = currentRecipe.source_url;
//    source.id = 'source';
//    source.innerHTML = 'Source';
//    recipe.appendChild(source);
//
//    var save = document.createElement('input');
//    save.value = 'save';
//    save.type = 'button';
//    save.className = 'main-blocks button';
//    recipe.appendChild(save);
//    attachReaction('click', save, createCookie('recipe_' + id, id, 7));
//
//    var share = document.createElement('input');
//    share.value = 'share by e-mail';
//    share.type = 'button';
//    share.className = 'main-blocks button';
//    share.onclick = function (){
//        alert('send E-mail');
//    };
//    recipe.appendChild(share);
//    //->X end of links block
//
//    document.getElementById('placeHolder').appendChild(recipe);
//}
//
//buildRecipeDetail(5);