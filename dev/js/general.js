function attachReaction (event, element, func) {
    if (element.attachEvent) {
        return element.attachEvent('on'+event, func);
    } else {
        return element.addEventListener(event, func, false);
    }
}