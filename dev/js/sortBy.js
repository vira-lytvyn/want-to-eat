/**
 * Created by Administrator on 28.06.2014.
 */
function sortBy(target, data) {
    if (typeof data[0][target] === 'number') {
        console.log('hello');
        data.sort(function (a, b) {
            return b[target] - a[target];
        });
    } else if (typeof data[0][target] === 'string') {
        console.log('world');
        data.sort(function (a, b) {
            if (a[target] < b[target]) return -1;
            if (a[target] > b[target]) return 1;
            return 0;
        });
    } else {
        console.log('Error: bad type of target!');
    }
    console.log(data);
}

//sortBy('title', data);