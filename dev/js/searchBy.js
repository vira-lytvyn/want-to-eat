/**
 * Created by admin on 21.06.2014.
 */

//**************************main search function*****************************
function searchBy() {
    var time = new Date/1000;

    var nameArr = searchByTarget('title');
    var authorArr = searchByTarget('author');

    console.log('by name');
    console.log(nameArr);
    console.log('by author');
    console.log(authorArr);

    console.log(new Date/1000 - time);
}

//***************************search by name************************************
function searchByTarget(target) {
    var search = document.getElementById('search'),
        value = search.value,
        i,
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
        if (value === data[i][target]) {//<-if value == search target
            directArr.push(data[i]);
        } else if (data[i][target].search(directWordsPattern) + 1) {//<-if search target is part of string
            directWordsArr.push(data[i]);
        } else if (data[i][target].search(withinPattern) + 1) {//<-if search target is part of word in string
            withinArr.push(data[i]);
        } else if (data[i][target].search(multiWordsInlinePattern) + 1) {//<-if search target is not one word, but inline
            multiWordsInlineArr.push(data[i]);
        } else if (data[i][target].search(multiWordsPatterns[0]) + 1) {//<-if search target is not one word, not inline
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
