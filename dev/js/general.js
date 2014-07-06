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

function clearElementContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function fixPlusAnimate() {
    animationPages('finalRecipe', 'searchResult', 900);

    var trumb = document.getElementById('trumb');
    var scroll = document.getElementById('scroll');
    if (trumb.value === 'vegetarian: yes!') {
        trumb.style.left = scroll.clientWidth - trumb.clientWidth + 'px';
    }
}