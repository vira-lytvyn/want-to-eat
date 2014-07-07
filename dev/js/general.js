var data = []; // declare empty data array as global variable to be enable from all places of the site
var requestTime = 0;
console.log(data);
function attachReaction (event, element, func) {
    if (element.attachEvent) {
        return element.attachEvent('on'+event, func);
    } else {
        return element.addEventListener(event, func, false);
    }
}

function animationPages(objectStart, objectEnd, time) {
    var boxStart = document.getElementById(objectStart);
    var boxHeight = boxStart.clientHeight;
    var winHeight = window.innerHeight;
    var startPosition = scrollY;
    var boxEnd = document.getElementById(objectEnd);
    if(boxEnd.clientHeight < winHeight){
        boxEnd.style.height = winHeight + 'px';
    }
    boxEnd.style.display = 'block';


    var frameRate = 0.06; // 60 frame per second
    var frame = 0;
    var delta = boxHeight / time / frameRate;
    var handle = setInterval(function() {
        frame++;
        var value = startPosition + delta * frame;
        scroll(0, value);
        if (value >= boxHeight) {
            boxStart.style.display = 'none';
            scroll(0, 0);
            clearInterval(handle);
        }
    }, 1 / frameRate);
}

function animationPagesBack(objectStart, objectEnd, time) {
    var boxStart = document.getElementById(objectStart);
    var boxEnd = document.getElementById(objectEnd);
    var startPosition = scrollY;
    boxEnd.style.display = 'block';

    var route = boxEnd.clientHeight + startPosition;

    scroll(0, route);

    var frameRate = 0.06; // 60 frame per second
    var frame = 0;
    var delta = route / time / frameRate;

    var handle = setInterval(function() {
        frame++;
        var value = route - delta * frame;
        scroll(0, value);
        if (value <= 0) {
            boxStart.style.display = 'none';
            scroll(0, 0);
            clearInterval(handle);
        }
    }, 1 / frameRate);
}


function clearElementContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function fixPlusAnimate() {
    animationPagesBack('finalRecipe', 'searchResult', 900);

    var trumb = document.getElementById('trumb');
    var slider = document.getElementById('slider');
    if (trumb.value === 'vegetarian: yes!') {
        trumb.style.left = slider.clientWidth - trumb.clientWidth + 'px';
    }
}

function getRecipesFromJson () {
//    some loading block showing must star here
    var request =  new XMLHttpRequest();
    request.open('GET', '../database/recipes.json', true);
    request.onreadystatechange =  function () {
        if (request.readyState != 4)  return ; //return if not complete
        if (request.status != 200) {  //check request status
            clearTimeout(requestTime);
            alert('Error ' + request.status + ': ' + request.statusText);
            return ;
        }
        clearTimeout(requestTime);
        processRecipeRequest(request.responseText);  // process result
    };
    request.send();
}

function processRecipeRequest (arr) {
    data = JSON.parse(arr);
}

function requestForData () {
    if (!data.length) {
        requestTime = setTimeout(getRecipesFromJson(), 3000); // setting time out to 3 seconds
    }
}