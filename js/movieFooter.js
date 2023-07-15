$(function(){
    const movie_id = sessionStorage.getItem("movieId");
    const tmdb = new tmdbAPI();
    var movie_data = tmdb.getMovie(movie_id);

    var bg_ImgURL = tmdb.BASIC_INFO.IMG_BG_URL + movie_data.backdrop_path;
    $('#backdrop-poster').css('background-image', 'linear-gradient(25deg, rgba(0,0,0,0.7),rgba(0,36,71,0.9)), url("' + bg_ImgURL + '")');

    $("#content-poster").attr('src',tmdb.BASIC_INFO.IMG_URL + movie_data.poster_path);
    $("#content-title").text(movie_data.title + " ("+ movie_data.release_date.substring(0,4) +")");
    $("#content-tagline").text(movie_data.tagline);
    $("#content-overview").text(movie_data.overview);
    $("#content-runtime").text(getDuration(movie_data.runtime));
    $("#content-rating").text(movie_data.vote_average.toFixed(1));
    $("#content-genre").text(getGenre(movie_data.genres));
    $("#content-release").text(movie_data.release_date);
    var credits = tmdb.getMovieCredits(movie_id);
    getDirectorAndStarring(credits);

    $("#close-dialog").on('click',function(){
        $("#openPopover #iframe").attr({
			src: ""
		})
        $("#openPopover").hide();
    })

    $("#content-watch").on('click', function(){
        const superEmbedAPI = new superembedAPI();
        let embed_url = superEmbedAPI.getMovieURL(movie_id, "TMDB");
        $("#openPopover #iframe").attr({
			//src: "https://www.2embed.to/embed/tmdb/movie?id=" + movie_id
            src: embed_url
		})
        document.getElementById("openPopover").style.display = "flex";
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(movie_id);
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
    let youTubeURL = '';
    var video_data = tmdb.getMovieVideos(contentID);
    var keyArr = [];
    $.each(video_data.results , function(i, video) {
        if(video.official == true && video.site == "YouTube" && video.type == "Trailer")
            keyArr.push(video.key);
    })
    console.log(keyArr);
    if(keyArr[0] != undefined && keyArr[0] != '' && keyArr[0] != null)
        youTubeURL = frameYTLink(keyArr[0],"EMBED") ;
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