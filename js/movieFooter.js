$(function(){
    const movie_id = sessionStorage.getItem("movieId");
    if(!movie_id)
        location.href = "index.html";
    
    showOrHideOverlayAnimation("SHOW");
    $("#apiId").val(movie_id);
    const tmdb = new tmdbAPI();
    const omdb_api = new omdb();
    var movie_data = tmdb.getMovie(movie_id);
    var omdb_data = omdb_api.getContentByID(movie_data.imdb_id);
    setWindowTitle(movie_data.title)
    var bg_ImgURL = (movie_data.backdrop_path) ? tmdb.BASIC_INFO.IMG_BG_URL + movie_data.backdrop_path : "img/Streamy_BG.jpg";
    var poster_path = (movie_data.poster_path) ? tmdb.BASIC_INFO.IMG_URL + movie_data.poster_path : "img/Streamy_BG.jpg";
    //$('#backdrop-poster img').css('background-image', 'linear-gradient(25deg, rgba(0,0,0,0.7),rgba(0,36,71,0.9)), url("' + bg_ImgURL + '")');

    $('.sty-bg img').attr('src',bg_ImgURL);
    $("#content-poster").attr('src',poster_path);

    $("#content-title").text(movie_data.title);
    $("#content-tagline").text(movie_data.tagline);
    $("#content-rating").text(movie_data.vote_average.toFixed(1));
    $("#content-lang").text(getLanguage(movie_data.original_language));
    $("#content-status").text(movie_data.status);

    $("#content-overview").text(movie_data.overview);
    $("#content-runtime").fillText(getDuration(movie_data.runtime));
    $("#content-genre").fillText(getNames(movie_data.genres));
    $("#content-release").fillText(parseDate(movie_data.release_date));
    $("#content-pro-company").fillText(getNames(movie_data.production_companies));
    $("#content-pro-country").fillText(getNames(movie_data.production_countries));
    $("#content-revenue").fillText(getCurrency(movie_data.revenue));
    if (omdb_data) {
        if (omdb_data.Rated && omdb_data.Rated != "N/A") {
            $("#content-rated").text(omdb_data.Rated);
        } else {
            $("#content-rated").prev("i").hide();
            $("#content-rated").hide();
        }
        $("#content-director").fillText(omdb_data.Director);
        $("#content-casts").fillText(omdb_data.Actors);
    }
    if(movie_data.homepage){
        $("#content-homepage").attr({href : movie_data.homepage});
        $("#content-homepage").show();
    }
    
    invokeRecommandation();

    $("#content-watch").on('click', function(){
        if(movie_data.status == "Released"){
            frameSevers();
            invokePlayerDialog("", $("#content-title").text(), false);
        } else {
            alertMessage("Too Early To Watch, Stay Tuned..!", "", "", "WARNING");
        }
    })

    $("#content-trailer").on('click', function(){
        var YTUrl = getTrailer(movie_id);
        if(YTUrl)
            invokePlayerDialog(YTUrl, "Official Trailer", true);
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

    $("#content-bookmark").hide();
    $("#content-like").hide();
    $("#content-share").hide();
    setTimeout(() => {
        showOrHideOverlayAnimation("HIDE");
    }, 1500);
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
        $("#sty-player-dialog").scrollTop(0);
    })
}

function invokeRecommandation(){
    const tmdb = new tmdbAPI();
    var movie_id = $("#apiId").val();
    var recomList = tmdb.getMovieRecommendation(movie_id);
    if(!recomList.results.length > 0)
        recomList = tmdb.getSimilarMovies(movie_id);
    if(recomList.results.length > 0) {
            $("#related-contents").empty();
            $.each(recomList.results, function(index, item) {
                var frameHTML = '';
                frameHTML += '<div class="carousel-vr sty-content-card" id="movie-'+ item.id +'">';
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
        
                $("#related-contents #movie-"+ item.id +" #adult-flag").hide();
                $("#related-contents #movie-"+ item.id +" img").attr('src',(item.poster_path) ? tmdb.BASIC_INFO.IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
                $("#related-contents #movie-"+ item.id +" .overview h3").text(item.title);
                $("#related-contents #movie-"+ item.id +" #content-rating").text(item.vote_average.toFixed(1));
                if(item.adult){
                    $("#related-contents #movie-"+ item.id +" #adult-flag").show();
                }
        
                /* Events */
                $("#related-contents #movie-"+ item.id +" #watch-now").on('click',function(){
                    sessionStorage.setItem("movieId", item.id);
                    window.location.href = "movieTemplate.html";
                })
            })
    } else {
        $("#sty-recommendations").hide();
    }
}