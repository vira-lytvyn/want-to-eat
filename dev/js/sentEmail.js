/**
 * Created by CHICHEK on 05.07.2014.
 */

function EmailRequestConstructor () {
    console.log('test1');
    this.rootUrl = 'https://api.sendgrid.com/api/mail.send.json';
    this.api_user  = 'tangerines-team';
    this.api_key  = 'tangerine2014' ;
}

EmailRequestConstructor.prototype.sendRequest = function (params, onresult, onerror) {
    console.log('test2');
    var request,
        _this = this;
    if (params == null) {
        params = {};
    }
    params.api_key = this.api_key;
    params.api_user = this.api_user;
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
    to: 'baterfluy@gmail.com',
    toname: 'Vira',
    subject: 'Example_Subject',
    text: 'testingtextbody',
    from: 'tangerines.epam@gmail.com'
};
//    \api_user=your_sendgrid_username&
// api_key=your_sendgrid_password&
// to=destination@example.com&
// toname=Destination&
// subject=Example_Subject&
// text=testingtextbody&
// from=info@domain.com

myRequest.sendRequest(testEmailObj);
