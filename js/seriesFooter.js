$(function(){
    const series_id = sessionStorage.getItem("seriesId");
    if(!series_id)
        location.href = "index.html";
    
    showOrHideOverlayAnimation("SHOW");
    $("#apiId").val(series_id);
    const tmdb = new tmdbAPI();
    var series_data = tmdb.getSeries(series_id);
    //var omdb_data = new omdb().getContentByID(series_data.imdb_id);
    setWindowTitle(series_data.name);
    var bg_ImgURL = (series_data.backdrop_path) ? tmdb.BASIC_INFO.IMG_BG_URL + series_data.backdrop_path : "img/Streamy_BG.jpg";
    var poster_path = (series_data.poster_path) ? tmdb.BASIC_INFO.IMG_URL + series_data.poster_path : "img/Streamy_BG.jpg";
    $('.sty-bg img').attr('src', bg_ImgURL);
    $("#content-poster").attr('src', poster_path);

    $("#content-title").text(series_data.name);
    $("#content-tagline").text(series_data.tagline);
    $("#content-rating").text(series_data.vote_average.toFixed(1));
    $("#content-status").fillBatchText(series_data.status);
    $("#content-lang").fillBatchText(getLanguage(series_data.original_language, false));

    $("#content-overview").text(series_data.overview);
    $("#content-runtime").fillText((series_data.episode_run_time && series_data.episode_run_time[0]) ? getDuration(series_data.episode_run_time[0]) : "");
    $("#content-genre").fillText(getNames(series_data.genres));
    $("#content-first-aired").fillText(parseDate(series_data.first_air_date));
    let last_aired_episode = (series_data.last_episode_to_air) ? `S ${series_data.last_episode_to_air.season_number} : EP ${series_data.last_episode_to_air.episode_number} on ${parseDate(series_data.last_episode_to_air.air_date)}` : "";
    $("#content-last-aired").fillText(last_aired_episode);
    let next_episode = (series_data.next_episode_to_air) ? `S ${series_data.next_episode_to_air.season_number} : EP ${series_data.next_episode_to_air.episode_number} on ${parseDate(series_data.next_episode_to_air.air_date)}` : "";
    $("#content-next-aired").fillText(next_episode);
    // $("#content-pro-company").fillText(getNames(series_data.production_companies));
    $("#content-pro-country").fillText(getNames(series_data.production_countries));

    let rated = getContentRating(series_data);
    $("#content-rated").fillBatchText((rated == "N/A") ? null : rated);

    if(series_data.homepage){
        $("#content-homepage").attr({href : series_data.homepage});
        $("#content-homepage").show();
    }

    getSeasonCount(series_data.seasons);
    frameEpisode();

    frameProduction(series_data.production_companies);
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
            alertMessage("Couldn't find Official Trailer..!", "", "", "ERROR");
    })
    
    $("#content-bookmark").on('click', function(){
        alertMessage("This Feature is Not Available Now..!", "", "", "WARNING");
    })

    $("#content-like").on('click', function(){
        alertMessage("This Feature is Not Available Now..!", "", "", "WARNING");
    })

    $("#content-download").on('click', function(){
        alertMessage("This Feature is Not Available Now..!", "", "", "ERROR");
    })

    $("#content-share").on('click', function(){
        alertMessage("This Feature is Not Available Now..!", "", "", "WARNING");
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
    setTimeout(() => {
        showOrHideOverlayAnimation("HIDE");
    }, 1500);
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
    var epi = new tmdbAPI().getSeason($("#apiId").val(), $("#tv-season").val());
    var ep = $("#tv-season option:selected").attr("ep");
    $(".sty-episode-container").empty();
    $.each(epi.episodes , function(i, s) {
        if(s.air_date && compareDateToNow(s.air_date) <= 0){
            var option = `<li class="sty-episode" ep="${s.episode_number}" title="${s.name}"><span class="count">EP ${s.episode_number}</span> : ${s.name}</li>`;
            $(".sty-episode-container").append(option);
        }
    })

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
    $("#sty-player-dialog").scrollTop(0);
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
    if(!recomList.results.length > 0)
        recomList = tmdb.getSimilarSeries(series_id);
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
                $("#related-contents #series-"+ item.id +" .overview h3").text(item.name);
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

function getContentRating(tmdb_data){
    var ratings = new tmdbAPI().getTVContentRating(tmdb_data.id);
    var rateMap = new Object();
    var country = (tmdb_data.origin_country && tmdb_data.origin_country.length > 0 ) ? tmdb_data.origin_country[0] : "US";
    if(ratings && ratings.results && ratings.results.length > 0){
        $.each(ratings.results, function(index, item) {
            if(item.rating)
                rateMap[item.iso_3166_1] = item.rating;
        })
        return rateMap[country];
    }
}