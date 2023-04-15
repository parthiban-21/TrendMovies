function metaFetch(URL, method){
    var resultJSON;
    method = (method == undefined) ? "GET" : method;
    metaPrimaryFetch(URL,method).then(data => {
        console.log(data);
        resultJSON = data;
    })
    return resultJSON;
}

async function metaPrimaryFetch(url,method) {
    const response = await fetch(url,{method: method});
    const resultJSON = await response.json();
    return resultJSON;
}

function metaAjaxCall(URL, method) {
    var resultJSON;
    method = (method == undefined) ? "GET" : method;
    jQuery.ajax({
        async: false,
        url: URL,
        type: method,
        dataType: "json",
        success: function (data) {
            resultJSON = data;
            console.log(data);
        },
        error: function(data){
            resultJSON = data;
            console.log(data);
        }
    });
    return resultJSON;
}

function metaXMLRequest(URL, method) {
    var resultJSON;
    var XMLRequest = new XMLHttpRequest();
    method = (method == undefined) ? "GET" : method;
    XMLRequest.open(method, URL, false);
    //XMLRequest.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //XMLRequest.setRequestHeader("Access-Control-Allow-Origin","*");
    //XMLRequest.setRequestHeader("mode","no-cors");
    XMLRequest.onload = () => {
        if (XMLRequest.status === 200) {
            console.log("Request successful");
        } else {
            console.log("Error occurred!")
        }
        resultJSON = JSON.parse(XMLRequest.response);
        console.log(resultJSON);
    }
    XMLRequest.send();
    return resultJSON;
}