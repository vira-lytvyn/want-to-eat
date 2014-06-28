function buildRecipeDetail(id) {
    var currentRecipe = data[id];

    var recipe = document.createElement('div');
    recipe.id = 'doneRecipe';

    var image = document.createElement('img');
    image.src = currentRecipe.picture;
    recipe.appendChild(image);

    var header = document.createElement('h1');
    header.innerHTML = currentRecipe.title;
    recipe.appendChild(header);

    var author = document.createElement('author');
    author.innerHTML = 'author: ' + currentRecipe.author + '; ';
    recipe.appendChild(author);

    var time = document.createElement('time');
    time.innerHTML = 'added: ' + currentRecipe.added + ';';
    recipe.appendChild(time);

    var ingredients = document.createElement('ol');
    var ingData = currentRecipe.ingredients;
    for (var i = 0; i < ingData.length; i++) {
        ingredients.innerHTML += '<li>' + ingData[i] + '</li>';
    }
    var ingSpan = document.createElement('span');
    ingSpan.innerHTML = 'you need such ingredients:<br/>';
    ingredients.insertBefore(ingSpan, ingredients.firstChild);
    recipe.appendChild(ingredients);

    var description = document.createElement('p');
    description.innerHTML = currentRecipe.description;
    recipe.appendChild(description);

    var save = document.createElement('input');
    save.value = 'save';
    save.type = 'button';
    recipe.appendChild(save);
    attachReaction('click', save, createCookie('recipe_' + id, id, 7));

    var share = document.createElement('input');
    share.value = 'share by e-mail';
    share.type = 'button';
    share.onclick = function (){
        sendEmail(currentRecipe);
    };
    recipe.appendChild(share);

    document.getElementById('placeHolder').appendChild(recipe);
}

buildRecipeDetail(5);

function sendEmail(dataRecipe) {

    console.log(dataRecipe);

    var box = document.createElement('fomr');
    box.id = 'sendEmail';
    box.style.display = 'block';
    box.setAttribute ('action', '#');

    var email = document.createElement('input');
    email.type = 'email';
    box.appendChild(email);


    var send = document.createElement('input');
    send.type = 'submit';
    send.value = 'send';
    send.onclick = function() {
        box.style.display = 'none';
    };
    box.appendChild(send);

    document.getElementById('placeHolder').appendChild(box);
    box.style.marginLeft = parseInt(getComputedStyle(box).marginLeft) - (box.clientWidth / 2) + 'px';
}
