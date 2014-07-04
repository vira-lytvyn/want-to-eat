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

function sortBy(target, data) {
    if (typeof data[0][target] === 'number') {
        data.sort(function (a, b) {
            return b[target] - a[target];
        });
    } else if (typeof data[0][target] === 'string') {
        data.sort(function (a, b) {
            if (a[target] < b[target]) return -1;
            if (a[target] > b[target]) return 1;
            return 0;
        });
    } else {
        console.log('Error: bad type of target!');
    }
    return data;
}

function clearElementContent(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function animate(object, property, start_value, end_value, time) {
    var frame_rate = 0.06; // 60 frame per second
    var frame = 0;
    var delta = (end_value - start_value) / time / frame_rate;
    var handle = setInterval(function() {
        frame++;
        var value = start_value + delta * frame;
        object.style[property] = value + "px";
        if (value == end_value) {
            clearInterval(handle);
        }
    }, 1 / frame_rate);
}