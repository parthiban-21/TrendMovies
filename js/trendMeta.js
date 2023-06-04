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
    },
    tmdb:{
        API_Key: "4e30dfcb81c11681f7e64bf0bd367a3a",
        ID: "tmdb",
        base_URL: "https://api.themoviedb.org/3",
        img_URL: "https://image.tmdb.org/t/p/w500",
        backdropImg_URl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces",
        fetchMovie: {
            actionURL: "/movie/",
            paramName: ['movie_id','api_key']
        }
    }
}

/** Document Ready */
$(function () {
    $("#cs-header").load("headerTemplate.html");
});

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }
// Incomplete
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

function getDuration(totalMinutes){
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours + "h " + minutes + "min"
}

function getGenre(genreList){
    var returnString = "";
    $.each(genreList, function(i, genre) {
        returnString += genre.name +", ";
    })  
    returnString = returnString.substring(0,returnString.length - 2);
    return returnString;
}

function frameYTLink(videoID){
    var url = "https://www.youtube.com/watch?v=";
    url += videoID;
    return url;
}