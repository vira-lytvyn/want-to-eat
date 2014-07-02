function buildFinalRecipe(currentRecipe) {
    var i;

    //->start of header block
    var image = document.getElementById('finalImg');
    image.src = currentRecipe.picture;

    var title = document.getElementById('finalTitle');
    title.innerHTML = currentRecipe.title;
    //X end of header block

    //->start of info block
    var showAuthors = document.getElementById('showAuthors');
    showAuthors.innerHTML = 'authors: ' + currentRecipe.authors.join(', ');
    showAuthors.onclick = function() {
          if (authors.style.display == 'none') {
              authors.style.display = 'block';
          } else {
              authors.style.display = 'none';
          }
    };

    var rank = document.getElementById('rank');
    rank.innerHTML = 'social rank: ' + currentRecipe.rate;

    var authors = document.getElementById('authors');
    authors.style.display = 'none';
    for (i = 0; i < currentRecipe.authors.length; i++) {
        var authorButt = document.createElement('input');
        authorButt.type = 'button';
        authorButt.value = currentRecipe.authors[i];
        authors.appendChild(authorButt);
        authorButt.onclick = function() {
            console.log(searchByTarget('authors', this.value));
        };
    }
    //X end of info block

    //->start of description block
    var description = document.getElementById('description');
    description.innerHTML = currentRecipe.description;

    var category = description.nextSibling;
    category.innerHTML = currentRecipe.category;
    category.style.background = 'green';

    var vegetarian = category.nextSibling;
    if(currentRecipe.vegetarian) {
        vegetarian.innerHTML = 'vegetarian: yes';
    } else {
        vegetarian.innerHTML = 'vegetarian: no';
    }
    vegetarian.style.background = 'yellow';
    //X end of description block

    //->start of ingredients block
    var ingredients = document.getElementById('ingredients');
    for (i = 0; i < currentRecipe.ingredients.length; i ++) {
        ingredients.innerHTML += '<li>' + currentRecipe.ingredients[i] + '</li>';
    }
    //X end of ingredients block

    //->start of steps block
    var steps = document.getElementById('steps');
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

    var send = document.getElementById('sendBy');
    send.onclick = function() {
       alert('send e-mail');
    };
    //X end of save block
}

buildFinalRecipe(data[10]);



