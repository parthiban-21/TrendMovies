/** Document Ready */
$(function () {
    //$("#cs-header").load("headerTemplate.html");
    loadMenuGroup();
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
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
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
    const hoursText = hours > 0 ? hours + " hr" + (hours > 1 ? "s" : "") : "";
    const minutesText = minutes > 0 ? minutes + " min" + (minutes > 1 ? "s" : "") : "";

    const separator = (hoursText && minutesText) ? " " : "";

    return hoursText + separator + minutesText;
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

function loadMenuGroup(){
    let htmlTags = "";
    //htmlTags += `<span class="cs-lrmar cs-cur" id="trend-movies"><i class="fa-solid fa-film cs-rsmar"></i>Movies</span>`;
    //htmlTags += `<span class="cs-lrmar cs-cur" id="trend-series"><i class="fa-solid fa-film cs-rsmar"></i>Series</span>`;
    //htmlTags += `<span class="cs-lrmar cs-cur" id="trend-anime"><i class="fa-solid fa-house-fire cs-rsmar"></i>Anime</span>`;
    htmlTags += `<span class="cs-lrmar cs-cur" id="trend-home"><i class="fa-solid fa-bars"></i></span>
                    <div class="sty-side-overlay"></div>
                    <div id="sty-side-menu" class="sty-side-menu">
                        <div class="sty-side-menu-head">
                            <a class="cs-btn-max sty-close cs-cur" id="close-menu"><i class="fa-solid fa-angle-left"></i><span>Close Menu</span></a>
                        </div>
                        <div class="sty-side-menu-list">
                            <a href="#" class="cs-cur" id="trend-movies"><i class="fa-solid fa-clapperboard cs-rsmar"></i>Movies</a>
                            <a href="#" class="cs-cur" id="trend-series"><i class="fa-solid fa-tv cs-rsmar"></i>Series</a>
                            <a href="#"><i class="fa-solid fa-feather-pointed cs-rsmar"></i>About</a>
                            <a href="#"><i class="fa-regular fa-comment cs-rsmar"></i>Contact</a>
                        </div>
                    </div>`;
    $("#menu-groups").append(htmlTags);

    $(".cs-head img").on('click', function(){
		window.location.href = "index.html";
    })

    $("#trend-home, #close-menu, .sty-side-overlay").on('click', function(){
        $("#sty-side-menu").toggleClass("active");
        $(".sty-side-overlay").toggleClass("active");
    })

    $("#trend-movies").on('click', function(){
        window.location.href = "index.html";
    })

    $("#trend-series").on('click', function(){
        window.location.href = "tvshows.html";
    })

    $("#trend-anime").on('click', function(){
        if(confirm("You will be Re-directed to Third-Party Website.\nDo You Want to Continue?")){
            window.open("https://aniwatch.to/");
        }
    })

    
}

function setWindowTitle(title, only) {
    var win_title = "Streamy";
    win_title = (only == true) ? title : title + " | Streamy ✨";
    document.title = win_title;
}

function invokePlayerDialog(streamList, title, isTrailer) {
    let width = (screen.width < 610) ? window.innerWidth - 30 : window.innerWidth / 1.25;
    let height = (screen.width < 610) ? window.innerHeight / 2 : window.innerHeight / 1.25;
    if (isTrailer) {
        $(".sty-ser-container").hide();
        $(".sty-player-bg , .sty-bg").hide();
        $("#sty-iframe").show();
        $("#sty-iframe").attr({src:streamList});
    } else {
        $(".sty-ser-container").show();
        $(".sty-player-bg , .sty-bg").show();
    }
    $("#sty-player-dialog").dialog({
        title: (title) ? "Now Playing : " + title : "Streamy",
        modal: true,
        autoOpen: true,
        draggable: false,
        closeText: "",
        height: height,
        width: width,
        close: function (event, ui) {
            $("#sty-iframe").attr({ src: "" });
            $("#sty-iframe").hide();
        }
    });
}

function getLanguage(code, native){
    if(code){
        var lang = (native == true) ? code : "en";
        const intl = new Intl.DisplayNames([lang], { type: 'language' });
        return intl.of(code);
    } else {
        return null;
    }
}

function parseDate(dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
        return '--';
    }
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const longDateFormat = parsedDate.toLocaleDateString("en-US", options);
    return longDateFormat;
}