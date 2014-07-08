/**
 * Created by Volodya on 21.06.2014.
 */
//**************************seach button function*****************************
function showSearchField() {
    var searchBox = document.querySelector('.search-box');

    if (getComputedStyle(searchBox).display == 'none') {
        searchBox.style.display = 'block';
    } else {
        searchBox.style.display = 'none';
    }

    var search = document.getElementById('search');
    search.focus();

    search.oninput = searchBy;
}

//**************************main search function*****************************
function searchBy() {
//    requestForData();
    var time = new Date/1000;
    var search = document.getElementById('search');
    var value = search.value;

    var authorArr = searchByTarget('authors', value);
    var nameArr = searchByTarget('title', value);

    var searchBox = document.getElementById('search-box');

    var byAuthor = searchBox.children[1];//<-byAuthor button
    byAuthor.onclick = function () {
        return false;
    };
    if (authorArr.length != 0) {
        byAuthor.onclick = function () {
            var searchByAuthor = new SearchResults(authorArr, 'startPage');
            searchByAuthor.init();
            var loadMore = document.querySelector('#loadMoreButton');
            attachReaction('click', loadMore, searchByAuthor.loadMore);
        };
    }
    byAuthor.value = 'by author: fined:' + authorArr.length;

    var byName = searchBox.children[2];//<-byTitle button
    byName.onclick = function () {
        return false;
    };
    if (nameArr.length != 0) {
        byName.onclick = function () {
            var searchByName = new SearchResults(nameArr, 'startPage');
            searchByName.init();
            var loadMore = document.querySelector('#loadMoreButton');
            attachReaction('click', loadMore, searchByName.loadMore);
        };
    }
    byName.value = 'by dish title: fined:' + nameArr.length;

    console.log(new Date/1000 - time);
}

//***************************search by name************************************
function searchByTarget(target, value) {
    var i,
        iTarget,
        totalArr,
        directArr = [],
        directWordsArr = [],
        withinArr = [],
        multiWordsInlineArr = [],
        multiWordsArr = [];

    var regexpValue = '\\b' + value + '\\b';
    var directWordsPattern = new RegExp(regexpValue, 'i');//<-declaration RegExp pattern for direct word hits

    regexpValue = value;
    var withinPattern = new RegExp(regexpValue, 'i');//<-declaration RegExp pattern for value like part of string

    regexpValue = value.split(' ').join('.*');
    var multiWordsInlinePattern = new RegExp(regexpValue, 'i');//<-declaration RegExp pattern for couple words inline

    var regexpValues = value.split(' ');
    var multiWordsPatterns = [];
    for (i = 0; i < regexpValues.length; i++) {
        regexpValue = '\\b' + regexpValues[i] + '\\b';
        regexpValues[i] = new RegExp(regexpValue, 'i');//<-declaration RegExp patterns for a lot of words
        multiWordsPatterns.push(regexpValues[i]);
    }

    for (i = 0; i < data.length; i++) {//<-search loop
        if (typeof data[i][target] === 'object') {
            iTarget = data[i][target].join(' ');
        } else {
            iTarget = data[i][target];
        }

        if (value.toUpperCase() === iTarget.toUpperCase()) {//<-if value == search target
            directArr.push(data[i]);
        } else if (iTarget.search(directWordsPattern) + 1) {//<-if search target is part of string
            directWordsArr.push(data[i]);
        } else if (iTarget.search(withinPattern) + 1) {//<-if search target is part of word in string
            withinArr.push(data[i]);
        } else if (iTarget.search(multiWordsInlinePattern) + 1) {//<-if search target is not one word, but inline
            multiWordsInlineArr.push(data[i]);
        } else if (iTarget.search(multiWordsPatterns[0]) + 1) {//<-if search target is not one word, not inline
            var temporalityArr = multiWordsPatterns.slice();
            searchMultiWords(data[i], temporalityArr);
        }
    }

    function searchMultiWords(object, arr) {
        var length = arr.length;
        if (length != 0) {
            if (object[target].search(arr[length-1]) + 1) {
                arr.pop();
                searchMultiWords(object, arr);
            }
        } else {
            multiWordsArr.push(object);
        }
    }

    totalArr = directArr.concat(directWordsArr, withinArr, multiWordsInlineArr, multiWordsArr);
    return totalArr;
}
