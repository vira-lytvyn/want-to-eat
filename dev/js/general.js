function attachReaction (event, element, func) {
    if (element.attachEvent) {
        return element.attachEvent('on'+event, func);
    } else {
        return element.addEventListener(event, func, false);
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

//animate(document.getElementById("a"), "top", 0, 100, 1000);