$(function(){
    const movie_id = sessionStorage.getItem("movieId");
    if(!movie_id)
        location.href = "index.html";
    
    $("#apiId").val(movie_id);
    const tmdb = new tmdbAPI();
    var movie_data = tmdb.getMovie(movie_id);

    var bg_ImgURL = (movie_data.backdrop_path) ? tmdb.BASIC_INFO.IMG_BG_URL + movie_data.backdrop_path : "img/Streamy_BG.jpg";
    var poster_path = (movie_data.poster_path) ? tmdb.BASIC_INFO.IMG_URL + movie_data.poster_path : "img/Streamy_BG.jpg";
    //$('#backdrop-poster img').css('background-image', 'linear-gradient(25deg, rgba(0,0,0,0.7),rgba(0,36,71,0.9)), url("' + bg_ImgURL + '")');

    $('.sty-bg img').attr('src',bg_ImgURL);
    $("#content-poster").attr('src',poster_path);
    $("#content-title").text(movie_data.title);
    $("#content-tagline").text(movie_data.tagline);
    $("#content-overview").text(movie_data.overview);
    $("#content-runtime").text(getDuration(movie_data.runtime));
    $("#content-rating").text(movie_data.vote_average.toFixed(1));
    $("#content-genre").text(getGenre(movie_data.genres));
    $("#content-release").text(parseDate(movie_data.release_date));
    $("#content-lang").text(getLanguage(movie_data.original_language));
    var credits = tmdb.getMovieCredits(movie_id);
    getDirectorAndStarring(credits);

    $("#content-watch").on('click', function(){
        frameSevers();
        invokePlayerDialog("", $("#content-title").text(), false);
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(movie_id);
        if(YTUrl)
            invokePlayerDialog(YTUrl, "Official Trailer", true);
        else
            alertMessage("Sorry..!", "Could Not Find Official Trailer.", "", "ERROR");
    })
    
    $("#content-bookmark").on('click', function(){
        alertMessage("Sorry..!", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-like").on('click', function(){
        alertMessage("Sorry..!", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-download").on('click', function(){
        alertMessage("Sorry..!", "This Feature is Currently Not Available.", "", "ERROR");
    })

    $("#content-share").on('click', function(){
        alertMessage("Sorry..!", "This Feature is Currently Not Available.", "", "WARNING");
    })

    $("#content-bookmark").hide();
    $("#content-like").hide();
    $("#content-share").hide();
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
            $("#dir-name").text(member['name']);
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
    $("#starring").text(stars);
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
        
        var id = $("#apiId").val();
        $("#sty-iframe").attr({ src: $(".sty-server.active").data("DATA").CLASS.getMovieURL(id) });
        $(".sty-bg").hide();
        $("#sty-iframe").show();
        location.href = "#sty-ply-container";
    })
}