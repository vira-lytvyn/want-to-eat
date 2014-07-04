/**
 * Created by Administrator on 05.07.2014.
 */
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

function addSortEvent (array) {
    var filterBox = document.getElementById('filter-box');
    filterBox.children[0].onclick = function() {
        var resultArr = sortBy('rate', array);
        showSearchResult(0, resultArr);
    };

    filterBox.children[1].onclick = function() {
        var resultArr = sortBy('title', array);
        showSearchResult(0, resultArr);
    };


    var scroll = document.getElementById('trumb');
    scroll.onmousedown = function() {
        var self = this;
        var coords = document.getElementById('scroll').getBoundingClientRect();
        function moveAt() {
            self.style.left = event.clientX - coords.left - 100 +'px';
            if (parseInt(self.style.left) > 400) self.style.left = '400px';
            if (parseInt(self.style.left) < 0) self.style.left = '0px';
        }

        document.onmousemove = function() {
            moveAt();
        };

        window.onmouseup = function() {
            document.onmousemove = self.onmouseup = null;

            if (parseInt(self.style.left) > 200) {
                self.style.left = '400px';
                showSearchResult(0, findByVegetarian(array));
                self.style.background = 'yellowgreen';
                self.value = 'vegetarian: yes!';
                self.onmousedown = function() {
                    return false;
                };
            } else {
                self.style.left = '0';
            }

        }

    }
}

function findByVegetarian(arr) {
    var typeArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].vegetarian) {
            typeArr.push(arr[i]);
        }
    }
    return typeArr;
}