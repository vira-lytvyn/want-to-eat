/**
 * Created by CHICHEK on 05.07.2014.
 */

function EmailRequestConstructor () {
    this.rootUrl = 'https://mandrillapp.com/api/1.0/messages/send.json';
    this.key  = 'h4MHieHtpFv7UTWP5oQs6w' ;
}

EmailRequestConstructor.prototype.sendRequest = function (params, onresult, onerror) {
    console.log('test2');
    var request,
        _this = this;
    if (params == null) {
        params = {};
    }
    params.key = this.key;
    params = JSON.stringify(params);
    request = new XMLHttpRequest();
    request.open('POST', this.rootUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange = function() {
        console.log('test3');
        var response;
        if (request.readyState !== 4) {
            return;
        }
        response = JSON.parse(request.responseText);
        if (response == null) {
            console.log('test4');
            response = {
                status: 'error',
                name: 'GeneralError',
                message: 'An unexpected error occurred'
            };
        }
        if (request.status !== 200) {
            if (onerror) {
                console.log('error', response);
                return onerror(response);
            } else {
                console.log('error', response);
                return _this.onerror(response);
            }
        } else {
            console.log('result', response);
            if (onresult) {
                console.log('result', response);
                return onresult(response);
            }
        }
    };
    return request.send(params);
};

//var myRequest = new EmailRequestConstructor();
console.log('test0');
var testEmailObj = {
    message: {
        'from_email': 'tangerines.epam@gmail.com',
        'to': [
            {
                'email': 'baterfluy@gmail.com',
                'name': 'Vira',
                'type': 'to'
            },
            {
                'email': 'RECIPIENT_NO_2@EMAIL.HERE',
                'name': 'ANOTHER RECIPIENT NAME (OPTIONAL)',
                'type': 'to'
            }
        ],
        'autotext': 'true',
        'subject': 'Example_Subject',
        'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML! testingtextbody'
    }
};

//myRequest.sendRequest(testEmailObj);

function fillEmailObj(recipeObj) {

}

function sendRecipe() {
    console.log('test');
}