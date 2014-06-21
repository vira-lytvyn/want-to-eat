function attachReaction (event, element) {
    if (element.attachEvent) {
        return element.attachEvent('on'+event, showHideSublist);
    } else {
        return element.addEventListener(event, showHideSublist, false);
    }
}