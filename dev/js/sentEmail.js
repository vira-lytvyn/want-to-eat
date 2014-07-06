///**
// * Created by CHICHEK on 05.07.2014.
// */
//
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

var myRequest = new EmailRequestConstructor();
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
        'html': generateEmailContent()
    }
};

//myRequest.sendRequest(testEmailObj);

function fillEmailObj(recipeObj) {

}

function sendRecipeMail() {
    event.preventDefault();
    var object = JSON.parse(document.querySelector('#chosenRecipe').value);
    console.log(object);
    var form = event.target || event.srcElement;
    console.log(form.articleName.value);
}

function generateEmailContent() {
    var html = '' +
        '<div style="background: #DCECFD;width: 600px;margin: 0 auto;padding: 20px;-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;border: 1px solid;">' +
        '        <img src="http://i1268.photobucket.com/albums/jj564/Vira_Lytvyn/logo_zps9f915a7c.png" style="height: 100px;display: block;margin: 0 auto;">' +
        '        <hr style="height: 2px;background-color: #ccc;border: none;margin: 20px 0;">' +
        '        <div style="overflow: hidden;">' +
        '            <img src="http://pad1.whstatic.com/images/thumb/f/f0/Make-Starbucks-Lemon-Loaf-Step-9.jpg/670px-Make-Starbucks-Lemon-Loaf-Step-9.jpg" style="max-width: 100px;max-height: 100px;float: left;margin-right: 20px;" width="100" height="100">' +
        '            <a href="http://www.wikihow.com/Make-Starbucks-Lemon-Loaf">' +
        '                <h2 style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">Starbucks Lemon Loaf</h2>' +
        '            </a>' +
        '            <p>You might have a special place in your heart for the delicious pastries at Starbucks, but you don\'t have to go there to enjoy this one.</p>' +
        '        </div>' +
        '        <hr style="height: 2px;background-color: #ccc;border: none;margin: 20px 0;">' +
        '        <div style="font-style: italic;">This is my suggestions about our supper )) </div>' +
        '</div>';
    return html;
}