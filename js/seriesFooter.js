$(function(){
    const series_id = sessionStorage.getItem("seriesId");
    const tmdb = new tmdbAPI();
    var series_data = tmdb.getSeries(series_id);

    var bg_ImgURL = tmdb.BASIC_INFO.IMG_BG_URL + series_data.backdrop_path;
    $('#backdrop-poster').css('background-image', 'linear-gradient(25deg, rgba(0,0,0,0.7),rgba(0,36,71,0.9)), url("' + bg_ImgURL + '")');

    $("#content-poster").attr('src',tmdb.BASIC_INFO.IMG_URL + series_data.poster_path);
    $("#content-title").text(series_data.original_name + " ("+ series_data.first_air_date.substring(0,4) +")");
    $("#content-tagline").text(series_data.tagline);
    $("#content-overview").text(series_data.overview);
    $("#content-runtime").text(series_data.number_of_seasons + " Seasons & " + series_data.number_of_episodes + " Episodes");
    $("#content-rating").text(series_data.vote_average.toFixed(1));
    $("#content-genre").text(getGenre(series_data.genres));
    $("#content-release").text(series_data.first_air_date);
    var credits = tmdb.getSeriesCredits(series_id);
    getDirectorAndStarring(credits);

    $("#close-dialog").on('click',function(){
        $("#openPopover #iframe").attr({
			src: ""
		})
        $("#openPopover").hide();
    })

    $("#content-watch").on('click', function(){
        const superEmbedAPI = new superembedAPI();
        let season = $("#tv-season").val();
        let episode = $("#tv-episode").val();
        let embed_url = superEmbedAPI.getSeriesURL(series_id ,season ,episode ,"TMDB");
        $("#openPopover #iframe").attr({
            src: embed_url
		})
        document.getElementById("openPopover").style.display = "flex";
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(series_id);
        if(YTUrl != ''){
            //window.open(YTUrl);
            $("#openPopover #iframe").attr({
                src: YTUrl
            });
            document.getElementById("openPopover").style.display = "flex";
        }
        else
            alert("Sorry, Could Not Find Official Trailer.");
    })
    
    $("#content-bookmark").on('click', function(){
        alert("Sorry, This Feature is Currently Not Available.");
    })

    $("#content-like").on('click', function(){
        alert("Sorry, This Feature is Currently Not Available.");
    })

    $("#content-download").on('click', function(){
        alert("Sorry, This Feature is Currently Not Available.");
    })
})

function getTrailer(contentID){
    const tmdb = new tmdbAPI();
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

function getDirectorAndStarring(credits){
    $.each(credits.crew , function(i, member) {
        if(member['job'] == "Director"){
            $("#content-artists #dir-name").text(member['name']);
            return false;
        }
    })

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