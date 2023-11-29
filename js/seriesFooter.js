$(function(){
    const series_id = sessionStorage.getItem("seriesId");
    if(!series_id)
        location.href = "index.html";
    const tmdb = new tmdbAPI();
    var series_data = tmdb.getSeries(series_id);

    $('#backdrop-poster img').attr('src',tmdb.BASIC_INFO.IMG_BG_URL + series_data.backdrop_path);
    $("#content-poster").attr('src',tmdb.BASIC_INFO.IMG_URL + series_data.poster_path);
    $("#content-title").text(series_data.original_name + " ("+ series_data.first_air_date.substring(0,4) +")");
    $("#content-tagline").text(series_data.tagline);
    $("#content-overview").text(series_data.overview);
    $("#content-runtime").text((series_data.episode_run_time && series_data.episode_run_time[0]) ? getDuration(series_data.episode_run_time[0]) : "--");
    $("#content-rating").text(series_data.vote_average.toFixed(1) + " / 10");
    $("#content-genre").text(getGenre(series_data.genres));
    $("#content-first-aired").text(parseDate(series_data.first_air_date));
    $("#content-last-aired").text(parseDate(series_data.last_air_date));
    $("#content-status").text(series_data.status);
    $("#content-lang").text(getLanguage(series_data.original_language));
    var credits = tmdb.getSeriesCredits(series_id);
    getDirectorAndStarring(credits, series_data.created_by);

    console.log(getSeasonCount(series_data.seasons));

    $("#tv-season").on("change", function(){
        frameEpisode(this.options[this.selectedIndex].getAttribute('ep'));
    })

    $("#content-watch").on('click', function(){
        let season = $("#tv-season").val();
        let episode = $("#tv-episode").val();
        if(season && episode) {
        var api = [
            {
                "DOMAIN": "Vid Stream",
                "URL": new vidStreamAPI().getSeriesURL(series_id, season, episode)
            },
            {
                "DOMAIN": "Super Embed",
                "URL": new superembedAPI().getSeriesURL(series_id, season ,episode, "TMDB")
            }
        ];
        invokePlayerDialog(api, $("#content-title").text(), $('#backdrop-poster img').attr('src'), false);
    } else {
        alertMessage("Choose Valid Season and Episode", "", "", "ERROR");
    }
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(series_id);
        if(YTUrl){
            invokePlayerDialog(YTUrl, "Official Trailer","", true);
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

function frameEpisode(ep){
    $("#tv-episode").empty();
    for(var i = 0 ; i <= ep ; i++){
        var option = "";
        if(i==0){
            option = `<option value="">-- Select --</option>`;
        } else {
            option = `<option value="${i}">Episode ${i}</option>`;
        }
        $("#tv-episode").append(option);
    }
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
    $("#content-artists #dir-name").text(crew.join(", "));

    var stars = "";
    $.each(credits.cast , function(i, member) {
        if(member['order'] <= 3){
            stars += member['name'] + ", "
        } else {
            return false;
        }
    })
    stars = stars.substring(0,stars.length - 2) + " & more";
    $("#content-artists #starring").text(stars);
}
