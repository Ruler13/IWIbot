var dispatcher = require('./dispatcher');
var conversation = require('./conversation');
var locationEvents = require('./locationEvents');


function main(params) {

    console.log("------Router started!------");
    console.log('Router Action Params: ' + JSON.stringify(params));

    var semester;
    var courseOfStudies;
    var position;

    if ("onlyPositionDataFlag" in params) {
        var positionObj = {latitude: params.position[1],
                            longitude: params.position[0]
        }

        return locationEvents.getEventsForPosition(positionObj).then(function (response) {
            console.log("Responding... " + JSON.stringify(response));
            return {
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
                body: JSON.stringify(response),
                code: 200
            };       
        })
    }

    if("__ow_body" in params) { // For testing this action!!
        params = JSON.parse(params.__ow_body);
    }

    if ("semester" in params && "courseOfStudies" in params) {
        semester = params.semester;
        courseOfStudies = params.courseOfStudies;
    }
    
    if ("position" in params) {
        position = params.position;
    }

    return conversation.sendMessage("conInit" in params, params).then(function (response) {

        response.semester = semester;
        response.courseOfStudies = courseOfStudies;
        response.position = typeof position !== 'undefined' ? {
            latitude: position[1],
            longitude: position[0]
        } : position;
        return dispatcher.dispatch(response);

    }, function (reason) {

        console.error("Conversation Error: " + reason);
        throw reason;

    }).then(function (response) {

        return {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
            body: JSON.stringify(response),
            code: 200
        };

    }, function (reason) {

        console.log("Dispatcher Error: " + reason);

        var response = {};
        response.payload = reason.toString();

        return {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
            body: JSON.stringify(response),
            code: 200
        };

    });
}
exports.main = main;
