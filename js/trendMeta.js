/** Document Ready */
$(function () {
    //$("#cs-header").load("headerTemplate.html");
    loadMenuGroup();
    loadFooter();
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

function getNames(list){
    var nameList = new Array();
    $.each(list, function(i, item) {
        nameList.push(item.name);
    })  
    return nameList.join(" | ");
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
                            <a href="streamy-player.html"><i class="fa-regular fa-circle-play cs-rsmar"></i>Player</a>
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

    $("#search-content").on('click', function (e) {
        var searchTerm = $("#content-search").val().trim();
        if (searchTerm) {
            searchContent(searchTerm, $("#contentType").val());
        }
    });

    $("#content-search").on('input', function (e) {
        var key = e.which;
        if (key == 13) {
            $("#search-content").trigger('click');
        }
        setTimeout(() => {
            var searchTerm = $("#content-search").val().trim();
            if (searchTerm) {
                searchContent(searchTerm, $("#contentType").val());
            }
        }, 2000);
    });
    $("#content-search").on('blur', function (e) {
        setTimeout(() => {
            $(".sty-sugg").hide();
        }, 500);
    })
}

function searchContent(search, type){
    const tmdb = new tmdbAPI();
    var result;
    var label = "";
    if(type === "MOVIE"){
        label = "Movie";
        result = tmdb.seachMovie(search, 1, "en-US", undefined, true);
    } else if (type === "TVSHOW") {
        label = "TV Show";
        result = tmdb.seachSeries(search, 1, "en-US", undefined, true);
    }

    if (result && result.results.length > 0) {
        $(".sty-sugg-body").empty();
        $.each(result.results, function(index, item) {
            const IMG_URL = 'https://image.tmdb.org/t/p/w500';
            var name = '';
            var year = '';
            if(type === "MOVIE"){
                name = item.title;
                year = item.release_date;
            } else if (type === "TVSHOW") {
                name = item.name;
                year = item.first_air_date;
            }
            var frameHTML = `<a class="sty-sugg-entity cs-cur" id="sty-search-${item.id}"> 
                                <div class="sty-sugg-poster"> 
                                    <div><img src="${(item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg"}"></div> 
                                </div> 
                                <div class="sty-sugg-info"> 
                                    <h5>${name}</h5>
                                    <span><i class="fa-solid fa-star cs-rsmar"></i>${item.vote_average.toFixed(1)}</span> 
                                    <span>${label}</span> 
                                    <span>${parseDate(year)}</span>  
                                </div> 
                            </a>`;
            var obj = $(frameHTML).on("click", function(){
                if(type === "MOVIE"){
                    sessionStorage.setItem("movieId", item.id);
                    window.location.href = "movieTemplate.html";
                } else if (type === "TVSHOW") {
                    sessionStorage.setItem("seriesId", item.id);
                    window.location.href = "series.html";
                }
            })

            $(".sty-sugg-body").append(obj);
            $(".sty-sugg").show();
        });
    }
}

function loadFooter(){
    var htmlTags = `<div class="sty-foot-left">
                        <label><i class="fa-regular fa-copyright cs-rsmar"></i>2023 | Streamy, All Rights Reserved.</label>
                    </div>
                    <div class="sty-foot-mid">
                        <label>We don't host any of the above content. All are hosted by Third-Party sites</label>
                    </div>
                    <div class="sty-foot-right">
                        <label class="cs-lmar cs-cur sty-hi sty-anti-select"><i class="fa-regular fa-comment cs-rsmar"></i>Contact</label>
                        <label class="cs-lmar cs-cur sty-hi sty-anti-select"><i class="fa-regular fa-circle-question cs-rsmar"></i>Help</label>
                    </div>`;
    $("footer").empty();
    $("footer").append(htmlTags);
}

function setWindowTitle(title, only) {
    var win_title = "Streamy";
    win_title = (only == true) ? title : title + " | Streamy";
    document.title = win_title;
}

function invokePlayerDialog(streamList, title, isTrailer) {
    let width = (screen.width < 610) ? window.innerWidth - 30 : window.innerWidth / 1.25;
    let height = (screen.width < 610) ? "auto" : "auto";
    let max_height = window.innerHeight / 1.25;
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
        maxHeight: max_height,
        open: function(){
            $("body").addClass("sty-model-open");
        },
        close: function (event, ui) {
            $("#sty-iframe").attr({ src: "" });
            $("#sty-iframe").hide();
            $("body").removeClass("sty-model-open");
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

function getCurrency(price) {
    if (price) {
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return USDollar.format(price);
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

function compareDateToNow(inputDate) {
    const dateToCompare = new Date(inputDate);
    const currentDate = new Date();

    if (dateToCompare > currentDate) {
        return 1; // Future = 1
    } else if (dateToCompare < currentDate) {
        return -1; // Past = -1
    } else {
        return 0; // Present = 0
    }
}

function framePagination(current_page, total_page, fn_Ref) {
    total_page = (total_page > 500 ) ? 500 : total_page; //TMDB Restriction
    var pages = (total_page >=5) ? 5 : total_page;
    $(".sty-pagination").empty();
    for(let i = 1; i <= pages; i++){
        var p = (current_page > 5) ? current_page - (pages - i) : i;
        var page_tag = `<li class="page-item ${(p==current_page) ? "active" : ""}" sty-pg="${p}"><span class="page-link">${p}</span></li>`;
        $(".sty-pagination").append(page_tag);
    }
    if(total_page > 5 && current_page != total_page){
        var nxt_nav_tags = `<li class="page-item" sty-pg=${current_page + 1}><span class="page-link"><i class="fa-solid fa-angle-right"></i></span></li>
                            <li class="page-item" sty-pg=${total_page}><span class="page-link"><i class="fa-solid fa-angles-right"></i></span></li>`;
        $(".sty-pagination").append(nxt_nav_tags);
    } 
    if(current_page > 5) {
        var pre_nav_tags = `<li class="page-item" sty-pg=${1}><span class="page-link"><i class="fa-solid fa-angles-left"></i></span></li>
                            <li class="page-item" sty-pg=${current_page - 1}><span class="page-link"><i class="fa-solid fa-angle-left"></i></span></li>`;
        $(".sty-pagination").prepend(pre_nav_tags);
    }
    $(".page-item").on('click', function(){
        var p = $(this).attr('sty-pg');
        fn_Ref(p);
    })
}