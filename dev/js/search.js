/**
 * Created by 1 on 21.06.2014.
 */

var dataIngridients = ["ea nisi in pariatur","ut duis et culpa", "velit ipsum occaecat dolore"];

function searchIngridients () {
    var arr = data;
    for (var i = 0; i < dataIngridients.length; i++) {
       if (arr.length <= 3) {
           console.log(arr);
           break;
       }
        arr = searchThruIng(arr, dataIngridients[i]);
    }

    }

function searchThruIng(arr, param){
    console.log(arr);
    var newArr = [];
    for (var x = 0; x < arr.length; x++) {
        console.log(arr);
         var tempIng = arr[x].ingredients;
        for (var  k = 0; k < tempIng.length; k++) {
            if (param ===  tempIng[k]) {
                console.log(arr);
                newArr.push(arr[x]);
            }
        }
    }
    return newArr;
}