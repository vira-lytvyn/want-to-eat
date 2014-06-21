/**
 * Created by admin on 21.06.2014.
 */

function searchByName() {
    var search = document.getElementById('search');
    var value = search.value;

    for(var i = 0; i < data.length; i++){
        if (data[i].title === value) {
            console.log(data[i]);
        }
    }
}