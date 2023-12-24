$(function(){
    const series_id = sessionStorage.getItem("seriesId");
    if(!series_id)
        location.href = "index.html";
    
    $("#apiId").val(series_id);
    const tmdb = new tmdbAPI();
    var series_data = tmdb.getSeries(series_id);

    $('.sty-bg img').attr('src',tmdb.BASIC_INFO.IMG_BG_URL + series_data.backdrop_path);
    $("#content-poster").attr('src',tmdb.BASIC_INFO.IMG_URL + series_data.poster_path);
    $("#content-title").text(series_data.original_name);
    $("#content-tagline").text(series_data.tagline);
    $("#content-overview").text(series_data.overview);
    $("#content-runtime").text((series_data.episode_run_time && series_data.episode_run_time[0]) ? getDuration(series_data.episode_run_time[0]) : "--");
    $("#content-rating").text(series_data.vote_average.toFixed(1) + " / 10");
    $("#content-genre").text(getGenre(series_data.genres));
    $("#content-first-aired").text(parseDate(series_data.first_air_date));
    $("#content-last-aired").text(parseDate(series_data.last_air_date));
    $("#content-status").text(series_data.status);
    $("#content-lang").text(getLanguage(series_data.original_language));
    //var credits = tmdb.getSeriesCredits(series_id);
    //getDirectorAndStarring(credits, series_data.created_by);

    console.log(getSeasonCount(series_data.seasons));
    frameEpisode();

    invokeRecommandation();

    $("#tv-season").on("change", function(){
        frameEpisode();
    })

    $("#content-watch").on('click', function(){
        //$(".sty-bg img").attr({'src':$('#backdrop-poster img').attr('src')});
        frameSevers();
        invokePlayerDialog("", $("#content-title").text(), false);
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(series_id);
        if(YTUrl){
            $(".sty-ser-container").hide();
            invokePlayerDialog(YTUrl, "Official Trailer", true);
        }
        else
            alertMessage("Sorry", "Could Not Find Official Trailer.", "", "ERROR");
    })
    
    $("#content-bookmark").on('click', function(){
        alertMessage("Sorry", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-like").on('click', function(){
        alertMessage("Sorry", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-download").on('click', function(){
        alertMessage("Sorry", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-share").on('click', function(){
        alertMessage("Sorry", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-cast-crew").on('click', function(){
        invokeContentCredits($("#contentType").val(), $("#apiId").val());
    })

    $("#tv-info").on('click', function(){
        var info = "";
        $.each(series_data.seasons , function(i, s) {
            if(s.name != "Specials")
                info += `${i}) Season: ${s.name} Episodes: ${s.episode_count}\n`;
        });
        if(info)
            alert(info);
        else
            alertMessage("Sorry", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-bookmark").hide();
    $("#content-like").hide();
    $("#content-share").hide();
})

function getSeasonCount(seasons){
    var count = 0;
    $.each(seasons , function(i, s) {
        if(s.name != "Specials"){
            var option = `<option value="${s.season_number}" ep="${s.episode_count}">Season ${s.season_number}</option>`;
            $("#tv-season").append(option);
            count++;
        }
    });
    return count;
}

function frameEpisode(){
    var ep = $("#tv-season option:selected").attr("ep");
    $(".sty-episode-container").empty();
    for(var i = 1 ; i <= ep ; i++){
        var option = `<li class="sty-episode" ep="${i}">Episode ${i}</li>`;
        $(".sty-episode-container").append(option);
    }

    $(".sty-episode").on('click', function(){
        $(".sty-episode").each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        $(this).addClass("active");
        $("#tv-episode").val($(this).attr("ep"));
        invokeSeriesPlayer();
    })
}

function frameSevers() {
    var generalServers = [{
        "SERVER": "VIDSTR",
        "NAME": "Vid Stream",
        "CLASS": new vidStreamAPI()
    },
    {
        "SERVER": "SUPEREMBED",
        "NAME": "Super Embed",
        "CLASS": new superembedAPI()
    }];

    $("#sty-stream-servers").empty();
    $.each(generalServers, function (i, data) {
        var htmlTag = $(`<div class="sty-server" server="${data.SERVER}">
                                <i class="fa-solid fa-server cs-rmar"></i>
                                <span>${data.NAME}</span>
                            </div>`);
        htmlTag.filter(".sty-server").data("DATA", data);
        if (i == 0) {
            htmlTag.filter(".sty-server").addClass("active");
        }
        $("#sty-stream-servers").append(htmlTag);
    });

    $(".sty-server").on('click', function () {
        $(".sty-server").each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        $(this).addClass("active");
        invokeSeriesPlayer();
    })
}

function invokeSeriesPlayer() {
    var id = $("#apiId").val();
    var s = ($("#tv-season").val()) ? $("#tv-season").val() : 1;
    var e = ($("#tv-episode").val()) ? $("#tv-episode").val() : 1;
    $("#sty-iframe").attr({ src: $(".sty-server.active").data("DATA").CLASS.getSeriesURL(id, s, e) });
    $(".sty-bg").hide();
    $("#sty-iframe").show();
    //location.href = "#sty-ply-container";
}

function getTrailer(contentID){
    const tmdb = new tmdbAPI();
    let youTubeURL = '';
    var video_data = tmdb.getSeriesVideos(contentID);
    var keyArr = [];
    $.each(video_data.results , function(i, video) {
        if(video.official == true && video.site == "YouTube" && video.type == "Trailer")
            keyArr.push(video.key);
    })
    console.log(keyArr);
    if(keyArr[0] != undefined && keyArr[0] != '' && keyArr[0] != null)
        youTubeURL = frameYTLink(keyArr[0], "EMBED");
    return youTubeURL;
}

function getDirectorAndStarring(credits, created_by){
    var crew = new Array();
    $.each(created_by , function(i, member) {
        if(member['name']){
            crew.push(member['name']);
        }
    })
    $("#dir-name").text(crew.join(", "));

    var stars = "";
    $.each(credits.cast , function(i, member) {
        if(member['order'] <= 3){
            stars += member['name'] + ", "
        } else {
            return false;
        }
    })
    stars = stars.substring(0,stars.length - 2) + " & more";
    $("#starring").text(stars);
}

function invokeRecommandation(){
    const tmdb = new tmdbAPI();
    var series_id = $("#apiId").val();
    var recomList = tmdb.getSeriesRecommendation(series_id);
    if(recomList.results.length > 0) {
            $("#related-contents").empty();
            $.each(recomList.results, function(index, item) {
                var frameHTML = '';
                frameHTML += '<div class="carousel-vr sty-content-card" id="series-'+ item.id +'">';
                frameHTML += '  <img>';
                frameHTML += '  <div class="cs-contents">';
                frameHTML += '      <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>';
                frameHTML += '      <span id="content-rating" class="cs-content cs-float-right color-orange">0.0</span>';
                //frameHTML += '      <span class="cs-content cs-float-left">Movie</span>';
                frameHTML += '  </div>';
                frameHTML += '  <div class="overview cs-hide">';
                frameHTML += '      <h3></h3>';
                frameHTML += '      <a class="btn btn-circle cs-cur" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
                frameHTML += '  </div>';
                frameHTML += '</div>';
                $("#related-contents").append(frameHTML);
        
                $("#related-contents #series-"+ item.id +" #adult-flag").hide();
                $("#related-contents #series-"+ item.id +" img").attr('src',(item.poster_path) ? tmdb.BASIC_INFO.IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
                $("#related-contents #series-"+ item.id +" .overview h3").text(item.title);
                $("#related-contents #series-"+ item.id +" #content-rating").text(item.vote_average.toFixed(1));
                if(item.adult){
                    $("#related-contents #series-"+ item.id +" #adult-flag").show();
                }
        
                /* Events */
                $("#related-contents #series-"+ item.id +" #watch-now").on('click',function(){
                    sessionStorage.setItem("seriesId", item.id);
                    window.location.href = "series.html";
                })
            })
    } else {
        $("#sty-recommendations").hide();
    }
}