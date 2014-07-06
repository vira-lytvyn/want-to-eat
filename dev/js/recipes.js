function buildFinalRecipe(currentRecipe) {
    animationPages('searchResult', 'finalRecipe',900);

    var i;

    var chosenRecipe = document.querySelector('#chosenRecipe');
    chosenRecipe.setAttribute('value', JSON.stringify(currentRecipe));

    //->start of header block
    var image = document.getElementById('finalImg');
    image.src = currentRecipe.picture;

    var title = document.getElementById('finalTitle');
    title.innerHTML = currentRecipe.title;
    document.getElementById('articleName').setAttribute('value', currentRecipe.title);
    //X end of header block

    //->start of info block
    var showAuthors = document.getElementById('showAuthors');
    showAuthors.value = 'authors: ' + currentRecipe.authors.join(', ');
    showAuthors.onclick = function() {
        showHide(authors);
    };

    var rank = document.getElementById('rank');
    rank.value = 'social rank: ' + currentRecipe.rate;

    var authors = document.getElementById('authors');
    authors.style.display = 'none';
    authors.innerHTML = '';
    for (i = 0; i < currentRecipe.authors.length; i++) {
        var authorButt = document.createElement('input');
        authorButt.className = 'navigationButtons search-authors';
        authorButt.type = 'button';
        authorButt.value = currentRecipe.authors[i];
        authors.appendChild(authorButt);
        authorButt.onclick = function() {
            showSearchResult(0, searchByTarget('authors', this.value), 'finalRecipe');
        };
    }
    //X end of info block

    //->start of description block
    var description = document.getElementById('description');
    description.innerHTML = currentRecipe.description;

    var category = description.nextElementSibling;
    category.innerHTML = currentRecipe.category;
    category.style.background = 'rgb(255, 187, 11)';

    var vegetarian = category.nextElementSibling;
    if(currentRecipe.vegetarian) {
        vegetarian.innerHTML = 'vegetarian: yes';
    } else {
        vegetarian.innerHTML = 'vegetarian: no';
    }
    vegetarian.style.background = 'yellow';
    //X end of description block

    //->start of ingredients block
    var ingredients = document.getElementById('ingredients');
    ingredients.innerHTML = '';
    ingredients.style.display = 'none';
    ingredients.previousElementSibling.style.cursor = 'pointer';
    ingredients.previousElementSibling.onclick = function() {
        showHide(ingredients);
    };

    for (i = 0; i < currentRecipe.ingredients.length; i ++) {
        var ingCheck = document.createElement('input');
        ingCheck.type = 'checkbox';

        var ingLi = document.createElement('li');
        var ingLabel = document.createElement('label');
        ingLabel.className = 'navigationButtons';
        ingLabel.innerHTML = currentRecipe.ingredients[i];
        ingLabel.style.color = 'rgb(255, 255, 255)';
        ingLabel.style.cursor = 'pointer';
        ingLabel.insertBefore(ingCheck, ingLabel.firstChild);
        ingLi.appendChild(ingLabel);
        ingredients.appendChild(ingLi);

        if (clientIngredients) {
            for (var j = 0; j < clientIngredients.length; j++) {
                if (currentRecipe.ingredients[i].indexOf(clientIngredients[j]) !== -1) {
                    ingCheck.checked = true;
                    ingCheck.parentNode.style.color = 'rgba(255, 255, 255, 0.5)';
                }
            }
        }

        ingCheck.onchange = function() {
            if(this.checked) {
                this.parentNode.style.color = 'rgba(255, 255, 255, 0.5)';
            } else {
                this.parentNode.style.color = 'rgb(255, 255, 255)';
            }
        }
    }
    //X end of ingredients block

    //->start of steps block
    var steps = document.getElementById('steps');
    steps.innerHTML = '';
    steps.style.display = 'none';
    steps.previousElementSibling.style.cursor = 'pointer';
    steps.previousElementSibling.onclick = function() {
        showHide(steps);
    };

    for (i = 0; i < currentRecipe.steps.length; i ++) {
        steps.innerHTML += '<li><span>' + currentRecipe.steps[i].name + '</span><br/><span>' + currentRecipe.steps[i].description + '</span></li>';
    }
    var li = steps.getElementsByTagName('li');
    for (i = 0; i < li.length; i ++) {
        li[i].firstChild.style.fontWeight = 'bold';
    }
    //X end of steps block

    //->start of tips block
    var tips = document.getElementById('tips');
    tips.innerHTML = '';
    tips.style.display = 'none';
    tips.previousElementSibling.style.cursor = 'pointer';
    tips.previousElementSibling.onclick = function() {
        showHide(tips);
    };

    for (i = 0; i < currentRecipe.tips.length; i++) {
        tips.innerHTML += '<li>' + currentRecipe.tips[i] + '</li>';
    }
    //X end of tips block

    //->start of save block
    var source = document.getElementById('source');
    source.innerHTML = 'Source';
    source.href = currentRecipe.source_url;

    var save = document.getElementById('save');
//    attachReaction('click', save, createCookie('recipe_' + id, id, 7));

//    var send = document.getElementById('sendBy');
//    send.onclick = function() {
//       alert('send e-mail');
//    };
    //X end of save block

    function showHide(hiddenBlock) {
        if (hiddenBlock.style.display == 'none') {
            hiddenBlock.style.display = 'block';
        } else {
            hiddenBlock.style.display = 'none';
        }
    }
}