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
    return hours + "hrs " + minutes + "min"
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
    htmlTags += `<span class="cs-lrmar cs-cur" id="trend-movies"><i class="fa-solid fa-film cs-rsmar"></i>Movies</span>`;
    htmlTags += `<span class="cs-lrmar cs-cur" id="trend-series"><i class="fa-solid fa-film cs-rsmar"></i>Series</span>`;
    //htmlTags += `<span class="cs-lrmar cs-cur" id="trend-anime"><i class="fa-solid fa-house-fire cs-rsmar"></i>Anime</span>`;
    //htmlTags += `<span class="cs-lrmar cs-cur" id="trend-home"><i class="fa-solid fa-house-user cs-rsmar"></i>Home</span>`;
    $("#menu-groups").append(htmlTags);

    $(".cs-head img").on('click', function(){
		window.location.href = "index.html";
    })

    $("#trend-home").on('click', function(){
		window.location.href = "index.html";
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

function invokePlayerDialog(streamList, title, backdrop, isTrailer) {
    let width = (screen.width < 610) ? window.innerWidth - 30 : window.innerWidth / 1.25;
    if (isTrailer) {
        $(".sty-server-cont").hide();
        $("#sty-iframe").attr({ width: "100%" });
        $(".sty-player-bg").hide();
        $("#sty-iframe").show();
        $("#sty-iframe").attr({src:streamList});
    } else {
        frameServerList(streamList);
        $(".sty-server-cont").show();
        $("#sty-iframe").attr({ width: "70%" });
        $(".sty-player-bg").show();
        $(".sty-player-bg").css({'background-image':`url(${backdrop})`});
    }
    $("#sty-player-dialog").dialog({
        title: (title) ? "Now Playing : " + title : "Streamy",
        modal: true,
        autoOpen: true,
        draggable: false,
        height: window.innerHeight / 1.25,
        width: width,
        close: function (event, ui) {
            $("#sty-iframe").attr({ src: "" });
            $("#sty-iframe").hide();
        }
    });

    function frameServerList(streamList){
        $("#sty-stream-servers").empty();
        $.each(streamList, function(i, data){
            var htmlTag = $(`<div class="sty-server" server="${data.DOMAIN.toUpperCase()}">
                                <i class="fa-solid fa-server cs-rmar"></i>
                                <span>${data.DOMAIN}</span>
                            </div>`);
            htmlTag.filter(".sty-server").data("URL",data.URL);
            $("#sty-stream-servers").append(htmlTag);
        })
    
        $(".sty-server").on('click', function(){
            $(".sty-server").each(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
            $(this).addClass("active");
            $("#sty-iframe").attr({src:$(this).data("URL")});
            $(".sty-player-bg").hide();
            $("#sty-iframe").show();
        })
    }
}