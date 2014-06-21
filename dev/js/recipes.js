var id = 0;
var parent = document.getElementById('placeHolder');
console.log()

function buildRecipeDescription(id) {
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

    var description = document.createElement('p');
    description.innerHTML = currentRecipe.description;
    recipe.appendChild(description);

    var save = document.createElement('input');
    save.value = 'save';
    save.type = 'button';
    recipe.appendChild(save);

    var share = document.createElement('input');
    share.value = 'share by e-mail';
    share.type = 'button';
    share.onclick = function (){
        sendEmail(currentRecipe);
    };
    recipe.appendChild(share);

    return recipe;
}

function pushDoneRecipe (parentElement, recipe) {
    parentElement.appendChild(recipe);
}

function sendEmail(dataRecipe) {

    var box = document.createElement('div');
    box.id = 'sendEmail';
    box.style.display = 'block';

    var email = document.createElement('input');
    email.type = 'email';
    box.appendChild(email);


    var send = document.createElement('input');
    send.type = 'button';
    box.appendChild(send);

    document.body.apenndChild(box);
}


var doneRecipe = buildRecipeDescription(id);
pushDoneRecipe (parent, doneRecipe);