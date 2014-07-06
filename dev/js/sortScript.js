/**
 * Created by Administrator on 05.07.2014.
 */

//**********************sort function**********************
function sortBy(target, data) {
    if (typeof data[0][target] === 'number') {
        data.sort(function(a, b) {
            return b[target] - a[target];
        });
    } else if (typeof data[0][target] === 'string') {
        data.sort(function(a, b) {
            if (a[target] < b[target]) return -1;
            if (a[target] > b[target]) return 1;
            return 0;
        });
    } else {
        console.log('Error: bad type of target!');
    }
    return data;
}

//************function, that added events for sort buttons*******
function addSortEvent (array) {
    var filterBox = document.getElementById('filter-box');
    filterBox.children[0].onclick = function() {//<-added event for sort by rate
        var resultArr = sortBy('rate', array);
        showSearchResult(0, resultArr);
    };

    filterBox.children[1].onclick = function() {//<-added event for sort by title
        var resultArr = sortBy('title', array);
        showSearchResult(0, resultArr);
    };

    /*slider*/
    var trumb = document.getElementById('trumb');
    var scroll = document.getElementById('scroll');
    scroll.onselectstart = function() {//<-ban for text selection in slider
        return false;
    };

    trumb.onmousedown = function() {
        var coords = scroll.getBoundingClientRect();

        function moveAt() {
            trumb.style.left = event.clientX - coords.left - trumb.clientWidth / 2 + 'px';
            if (parseInt(trumb.style.left) > scroll.clientWidth - trumb.clientWidth) {//<-ban for going beyond the end line
                trumb.style.left = scroll.clientWidth - trumb.clientWidth - 2 + 'px';//1 px to enter next if statment
            }
            if (parseInt(trumb.style.left) < 0) {//<-ban for going beyond the start line
                trumb.style.left = 2 + 'px';//1 px to enter next if statment
            }
        }

        document.onmousemove = moveAt;

        window.onmouseup = function() {
            document.onmousemove = trumb.onmouseup = null;

            if (parseInt(trumb.style.left) != scroll.clientWidth - trumb.clientWidth && parseInt(trumb.style.left) != '0') {
                var arr;
                if (parseInt(trumb.style.left) > scroll.clientWidth / 2 - trumb.clientWidth / 2) {
                    arr = findByVegetarian(array);
                    showSearchResult(0, arr);
                    trumb.style.left = scroll.clientWidth - trumb.clientWidth + 'px';
                    trumb.style.background = 'rgb(154, 205, 50)';
                    trumb.value = 'vegetarian: yes!';
                    scroll.children[1].innerHTML = '<<< slide <<<';
                } else {
                    arr = findByVegetarian(array);
                    showSearchResult(0, arr.old);
                    trumb.style.left = '0';
                    trumb.style.background = 'rgb(233, 55, 55)';
                    trumb.value = 'vegetarian: no!';
                    scroll.children[1].innerHTML = '>>> slide >>>';
                }
            }
        }
    }
}

//***find vegetarian dishes, and return Object with new and old dishes arrays***
function findByVegetarian(arr) {
    var vegArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].vegetarian) {
            vegArr.push(arr[i]);
        }
    }
    return {
        new: vegArr,
        old: arr
    };
}