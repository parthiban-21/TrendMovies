function metaAjaxCall(URL, method, reqHeader) {
    var resultJSON;
    method = (method == undefined) ? "GET" : method;

    var headers = new Object();
    headers["accept"] = "application/json"
    if(reqHeader && typeof(reqHeader) == "object")
        $.extend(headers, reqHeader);

    $.ajax({
        async: false,
        url: URL,
        type: method,
        headers: headers,
        success: function (data) {
            resultJSON = data;
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
    XMLRequest.open(method, URL, true);
    XMLRequest.setRequestHeader("content-type","application/json");
    XMLRequest.setRequestHeader("Access-Control-Allow-Origin","*");
    XMLRequest.setRequestHeader("mode","no-cors");
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

function getDuration(totalMinutes){
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours + "h " + minutes + "min"
}

function getGenre(genreList){
    var genreNameList = new Array();
    $.each(genreList, function(i, genre) {
        genreNameList.push(genre.name);
    })  
    return genreNameList.join(" | ");
}

function frameYTLink(videoID, type){
    var watchURL = "https://www.youtube.com/watch?v=";
    var embedURL = "https://www.youtube.com/embed/";
    var url = "";
    if(type && type === "EMBED"){
        url = embedURL + videoID;
    } else {
        url = watchURL + videoID;
    }
    return url;
}

function formSubmitWithParams(url,method,params){
	method = (method) ? method : 'GET';
	
	var form = $("<form style='display:none;'></form>").attr({
		action: url,
		method: method
	}).appendTo(document.body);
	
	if(params){
		$.each(params, function(item, param) {
			$("<input type='hidden' />").attr({
				name: item,
				value: param
			}).appendTo(form);
		}) 
	}
	form.submit();
	form.remove();
}

function getFormData(formID) {
    const formData = new FormData(document.getElementById(formID));
    const object = {};
    formData.forEach((value, key) => {
        // Check if the key already exists in the object
        //const matches = key.match(/^STM\[(\d+)\]\.(.*)$/);
        //if (object.hasOwnProperty(key)) {
            // If it does, make sure it's an array and push the value
            // if (!Array.isArray(object[key])) {
            //     object[key] = [object[key]];
            // }
            // object[key].push(value);
            
        if (key.includes(".")) {
            var arr = key.split(".");
            const keyVO = arr[0];
            const index = parseInt(arr[1]);
            const property = arr[2];
            if (!object.hasOwnProperty(keyVO)) {
                object[keyVO] = []
            }
            if (!object[keyVO][index]) {
                object[keyVO][index] = {};
            }
            object[keyVO][index][property] = value;
        }
        else if (object.hasOwnProperty(key)) {
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        } else {
            // If it doesn't exist, create the key-value pair
            object[key] = value;
        }
    });
    var cdata = { "pageObject" : JSON.stringify(object) }
    return cdata;
}

function fillForm(formID, data) {
    $.each(data, function (key, value) {
        console.log(typeof(value))
        if (value) {
            if (typeof(value) === "object") {
                fillForm(formID, value);
            } else {
                $(`#${formID} [name="${key}"]`).val(value);
            }
        }
    });
}

function contentList2Map(contentList) {
    var contentMap = new Object();
    $.each(contentList, function (i, value) {
        contentMap[value.C_ID] = value;
    });
    return contentMap;
}

function setWindowTitle(title, only) {
    var win_title = "Streamy";
    win_title = (only == true) ? title : title + " | Streamy ✨";
    document.title = win_title;
}

function invokePlayerDialog(url, title, isTrailer) {
    if (isTrailer) {
        $(".sty-server-cont").hide();
        $("#sty-iframe").attr({ width: "100%" });
    } else {
        $(".sty-server-cont").show();
        $("#sty-iframe").attr({ width: "70%" });
    }
    $("#sty-iframe").attr({ src: url });
    $("#sty-player-dialog").dialog({
        title: (title) ? "Now Playing : " + title : "Streamy",
        modal: true,
        autoOpen: true,
        draggable: false,
        height: window.innerHeight / 1.25,
        width: window.innerWidth / 1.25,
        close: function (event, ui) {
            $("#sty-iframe").attr({ src: "" });
        }
    });
}

function getContentQualityLable(quality) {
    var obj = {
        "PreDVD - 480p": {
            "BATCH":"CAM",
            "LABEL":"CAM Rip - 480p"
        },
        "PreDVD - 720p": {
            "BATCH":"CAM",
            "LABEL":"CAM Rip - 720p"
        },
        "PreDVD - 1080p": {
            "BATCH":"CAM",
            "LABEL":"CAM Rip - 1080p"
        },
        "HD - 480p": {
            "BATCH":"HD",
            "LABEL":"High Definition - 480p"
        },
        "HD - 720p": {
            "BATCH":"HD",
            "LABEL":"High Definition - 720p"
        },
        "HD - 1080p": {
            "BATCH":"HD",
            "LABEL":"High Definition - 1080p"
        }
    }
    return obj[quality];
}