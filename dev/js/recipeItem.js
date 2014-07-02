/**
 * Created by Administrator on 02.07.2014.
 */

function genrateRecipeItem(recipe) {
    var recipeItem = document.createElement('div');
    recipeItem.className = 'recipeItem';

    //->start of general info block
    var generalInfo = document.createElement('div');
    generalInfo.className = 'general-info';
    recipeItem.appendChild(generalInfo);

    var title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = recipe.title;
    generalInfo.appendChild(title);

    var buttonDesc = document.createElement('input');
    buttonDesc.className = 'buttonDesc';
    buttonDesc.type = 'button';
    buttonDesc.value = 'Info     ⇓';
    generalInfo.appendChild(buttonDesc);
    buttonDesc.onclick = showDetail;
    //X end of general info block

    function showDetail() {
        if (detailInfo.style.display == 'none') {
            detailInfo.style.display = 'block';
            buttonDesc.value = 'Info     ⇑';
        } else {
            detailInfo.style.display = 'none';
            buttonDesc.value = 'Info     ⇓';
        }

    }

    //->start of detail info block
    var detailInfo = document.createElement('div');
    detailInfo.className = 'detail-info';
    detailInfo.style.display = 'none';
    recipeItem.appendChild(detailInfo);

    var img = document.createElement('img');
    img.className = 'infoImg';
    img.src = recipe.picture;
    detailInfo.appendChild(img);

    //->start of text block
    var infoText = document.createElement('div');
    infoText.className = 'info-text';
    detailInfo.appendChild(infoText);

    var detailTitle = document.createElement('h4');
    detailTitle.className = 'detailTitle';
    detailTitle.innerHTML = recipe.title;
    infoText.appendChild(detailTitle);

    var detailPar = document.createElement('p');
    detailPar.className = 'detail-par';
    detailPar.innerHTML = recipe.description;
    infoText.appendChild(detailPar);

    var detailButton = document.createElement('input');
    detailButton.className = 'detailButton';
    detailButton.type = 'button';
    detailButton.value = 'Detail';
    infoText.appendChild(detailButton);
    detailButton.onclick = function() {
        alert('go to id ' + recipe.id +  ' final recipe section');
    };
    //X end of text block
    //X end of detail info block

    return recipeItem;
}

document.body.appendChild(genrateRecipeItem(data[5]));
document.body.appendChild(genrateRecipeItem(data[1]));
document.body.appendChild(genrateRecipeItem(data[16]));