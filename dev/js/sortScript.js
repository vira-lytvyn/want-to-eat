/**
 * Created by Volodya on 05.07.2014.
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
        var searchByRate = new SearchResults(resultArr);
        searchByRate.init();
        var loadMore = document.querySelector('#loadMoreButton');
        attachReaction('click', loadMore, searchByRate.loadMore);
    };

    filterBox.children[1].onclick = function() {//<-added event for sort by title
        var resultArr = sortBy('title', array);
        var searchByTitle = new SearchResults(resultArr);
        searchByTitle.init();
        var loadMore = document.querySelector('#loadMoreButton');
        attachReaction('click', loadMore, searchByTitle.loadMore);
    };

    /*slider*/
    var trumb = document.getElementById('trumb');
    var slider = document.getElementById('slider');
    slider.onselectstart = function() {//<-ban for text selection in slider
        return false;
    };

    trumb.onmousedown = function() {
        var coords = slider.getBoundingClientRect();

        function moveAt() {
            trumb.style.left = event.clientX - coords.left - trumb.clientWidth / 2 + 'px';
            if (parseInt(trumb.style.left) > slider.clientWidth - trumb.clientWidth) {//<-ban for going beyond the end line
                trumb.style.left = slider.clientWidth - trumb.clientWidth - 2 + 'px';//1 px to enter next if statment
            }
            if (parseInt(trumb.style.left) < 0) {//<-ban for going beyond the start line
                trumb.style.left = 2 + 'px';//1 px to enter next if statment
            }
        }

        document.onmousemove = moveAt;

        window.onmouseup = function() {
            document.onmousemove = trumb.onmouseup = null;

            if (parseInt(trumb.style.left) != slider.clientWidth - trumb.clientWidth && parseInt(trumb.style.left) != '0') {
                var arr;
                if (parseInt(trumb.style.left) > slider.clientWidth / 2 - trumb.clientWidth / 2) {
                    arr = findByVegetarian(array);

                    var searchByVegan = new SearchResults(arr);
                    searchByVegan.init();
                    var loadMore = document.querySelector('#loadMoreButton');
                    attachReaction('click', loadMore, searchByVegan.loadMore);
                    trumb.style.left = slider.clientWidth - trumb.clientWidth + 'px';
                    trumb.style.background = 'rgb(154, 205, 50)';
                    trumb.value = 'vegetarian: yes!';
                    slider.children[1].innerHTML = '<<< slide <<<';
                } else {
                    arr = findByVegetarian(array);

                    var searchByMeat = new SearchResults(arr.old);
                    searchByMeat.init();
                    var loadMore = document.querySelector('#loadMoreButton');
                    attachReaction('click', loadMore, searchByMeat.loadMore);
                    trumb.style.left = '0';
                    trumb.style.background = 'rgb(233, 55, 55)';
                    trumb.value = 'vegetarian: no!';
                    slider.children[1].innerHTML = '>>> slide >>>';
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