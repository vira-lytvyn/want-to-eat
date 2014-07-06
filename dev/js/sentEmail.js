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

EmailRequestConstructor.prototype.onError = function () {
    alert('Sorry, some error occurrence. Please, try again.')
};

EmailRequestConstructor.prototype.onSuccess = function () {
    if (!confirm('Your message was successfully sent to recipients. \nWould you like to send this recipe again?')) {
        animationPages('sendRecipeByEmail', 'finalRecipe', 900);
    }
};

var emailRequest = new EmailRequestConstructor();

function sendRecipeMail() {
    event.preventDefault();
    var form = event.target || event.srcElement;
    var object = JSON.parse(document.querySelector('#chosenRecipe').value);
    generateEmailContent(object, form.comment.value);
    console.log();
    var recipients = form.recipientsEmails.value.split(',');

    if (!form.senderEmail.value || !recipients.length) {
        emailRequest.onError();
        return;
    }

    var toArray = [];
    for (var i = 0; i < recipients.length; i++){
        toArray.push({
            'email': recipients[i],
            'type': 'to'
        });
    }

    var emailObj = {
        message: {
            'from_email': form.senderEmail.value,
            'to': toArray,
            'autotext': 'true',
            'subject': form.articleName.value,
            'html': generateEmailContent(object, form.comment.value)
        }
    };
    emailRequest.sendRequest(emailObj, emailRequest.onSuccess(), emailRequest.onError());
}

function generateEmailContent(obj, message) {
    message = message || 'Just look at this awesome recipe =)';
    var html = '' +
        '<div style="background: #DCECFD;width: 600px;margin: 0 auto;padding: 20px;-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;border: 1px solid;">' +
        '        <img src="http://i1268.photobucket.com/albums/jj564/Vira_Lytvyn/logo_zps9f915a7c.png" style="height: 100px;display: block;margin: 0 auto;">' +
        '        <hr style="height: 2px;background-color: #ccc;border: none;margin: 20px 0;">' +
        '        <div style="overflow: hidden;">' +
        '            <img src="' + obj.picture + '" style="max-width: 100px;max-height: 100px;float: left;margin-right: 20px;" width="100" height="100">' +
        '            <a href="' + obj.source_url + '">' +
        '                <h2 style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + obj.title + '</h2>' +
        '            </a>' +
        '            <p>' + obj.description + '</p>' +
        '        </div>' +
        '        <hr style="height: 2px;background-color: #ccc;border: none;margin: 20px 0;">' +
        '        <div style="font-style: italic;">' + message + '</div> ' +
        '        <hr style="height: 2px;background-color: #ccc;border: none;margin: 20px 0;">' +
        '        <div style="text-align: center">&copy; Want to Eat, 2014</div>' +
        '</div>';
    return html;
}
