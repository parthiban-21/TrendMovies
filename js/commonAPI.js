var trendMeta = {
    dropLink: {
        API_Key: "3a076b83232e2a66a0f0c858842bcd396f63b49a",
        ID: "dropLink",
        addLink: {
            actionURL: "https://droplink.co/api",
            paramName: ['api', 'url', 'alias']
        }
    },
    doodStream: {
        API_Key: "35875uugpb0g90z6qdujq",
        ID: "doodStream",
        remortUpload: {
            actionURL: "https://doodapi.com/api/upload/url",
            paramName: ['key','url','fld_id','new_title']
        },
        uploadStatus: {
            actionURL: "https://doodapi.com/api/urlupload/status",
            paramName: ['key','file_code']
        },
        fileInfo: {
            actionURL: "https://doodapi.com/api/file/info",
            paramName: ['key','file_code']
        }
    }
}

function metaFetch(URL){
    var resultJSON;
    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };
    fetch(URL,{
        method : "GET",
        mode: 'no-cors'
    }).then(res => res.json()).then(data => {
        console.log(data);
        resultJSON = data;
    })
    return resultJSON;
}

function metaAjaxCall(URL) {
    jQuery.ajax({
        url: URL,
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json'
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function(data){
            console.log(data);
        }
    });
}

function metaHTTP(URL) {
    var XMLRequest = new XMLHttpRequest();
    // creating get request to dummy API call
    XMLRequest.open('GET', URL);
    //XMLRequest.setRequestHeader("content-type","application/x-www-form-urlencoded");
    //XMLRequest.setRequestHeader("Access-Control-Allow-Origin","*");
    //XMLRequest.setRequestHeader("mode","no-cors");
    XMLRequest.send();
    XMLRequest.onload = () => {
        if (XMLRequest.status === 200) {
            console.log("Request successful");
        } else {
            console.log("Error occurred!")
        }
        console.log(JSON.parse(XMLRequest.response))
    }
}

function metaGetValue(id){ 
    var element = document.getElementById(id);
    if(element != null) 
        return element.value;
    else
        return undefined;
}

function metaGetParams(PropertyJson, action){
    var commonId = PropertyJson.ID;
    var paramMap = PropertyJson[action].paramName;
    var valueMap = [];
    for(let i=0; paramMap.length > i ; i++) {
        var uniqueId = commonId+'-'+paramMap[i];
        var val = metaGetValue(uniqueId);
        var temp = ( val == undefined ) ? "" : val ;
        valueMap.push(temp);
    }
    return valueMap;
}

function metaBuildURL(PropertyJson, action, valueMap, keyIndex){
    var URL = PropertyJson[action].actionURL;
    var paramMap = PropertyJson[action].paramName;
    if(paramMap.length == valueMap.length){
        for(let i=0; paramMap.length > i ; i++) {
            if(i == 0)
                URL = URL.concat("?");
            if(i == keyIndex)
                URL = URL.concat(paramMap[i]+"="+PropertyJson.API_Key);
            if(valueMap[i] != "" && i != keyIndex )
                URL = URL.concat("&"+paramMap[i]+"="+valueMap[i]);
        }
    }
    return URL;
}

/** Drop Link */
$("#dropLink-add").on('click', function(){
    dropLink_addLink();
});

function dropLink_addLink(){
    var valueMap = metaGetParams(trendMeta.dropLink,'addLink');
    var fullURL = metaBuildURL(trendMeta.dropLink, 'addLink', valueMap, 0);
    metaHTTP(fullURL);
}

/** Dood Stream */
var doodStream_Upload = document.getElementById('doodStream-upload');
var doodStream_Status = document.getElementById('doodStream-status');

$("#doodStream-upload").on('click', function(){
    doodStream_RemortUpload();
})
$("#doodStream-status").on('click', function(){
    //Need To Implement
})

function doodStream_RemortUpload(){
    var valueMap = metaGetParams(trendMeta.doodStream,'remortUpload');
    var fullURL = metaBuildURL(trendMeta.doodStream, 'remortUpload', valueMap, 0);
    var response = metaHTTP(fullURL);
    console.log(response);
}
