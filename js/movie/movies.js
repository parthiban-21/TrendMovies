const IMG_URL = 'https://image.tmdb.org/t/p/w500';
$(function () {
    const tmdb = new tmdbAPI();
    getMovies(tmdb.topRatedMovies(), "#main");
    getMovies(tmdb.trendingMovies(), "#upcoming-contents");

    $("#search-content").on('click', function (e) {
        var searchTerm = $("#content-search").val().trim();
        if (searchTerm) {
            getMovies(tmdb.seachMovie(searchTerm, 1, "en-US", undefined, true));
        } else {
            alert("Couldn't Find any Search Keywords, Try Again with Different Keyword..!");
        }
    });

    $("#content-search").on('keypress', function (e) {
        var key = e.which;
        if (key == 13) {
            $("#search-content").trigger('click');
        }
    });
});

function getMovies(data, append_id) {
    if (data.results.length !== 0) {
        showMovies(data.results, append_id);
    } else {
        $(append_id).text('<h1 class="no-results">No Results Found</h1>');
    }
}

function showMovies(movieList, append_id) {
    $(append_id).empty();
    $.each(movieList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="movie" id="movie-'+ item.id +'">';
        frameHTML += '  <img>';
        frameHTML += '  <div class="cs-contents">';
        frameHTML += '      <div id="adult-flag" class="cs-content color-red">18+</div>';
        frameHTML += '      <div class="cs-content">HD</div>';
        frameHTML += '      <div id="content-rating" class="cs-content color-orange">0.0</div>';
        frameHTML += '  </div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
        frameHTML += '  </div>';
        frameHTML += '</div>';
        $(append_id).append(frameHTML);
        var c_id = append_id + " #movie-" + item.id;
        $(c_id +" #adult-flag").hide();
        $(c_id +" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
        $(c_id +" .overview h3").text(item.title);
        $(c_id +" #content-rating").text(item.vote_average.toFixed(1));
        if(item.adult){
            $(c_id +" #adult-flag").show();
        }

        /* Events */
        $(c_id +" #watch-now").on('click',function(){
            sessionStorage.setItem("movieId", item.id);
            window.location.href = "movieTemplate.html";
        });
        $(c_id).hover(function(){
            if($(c_id +" .overview").hasClass('cs-hide')){
                $(c_id +" .overview").removeClass("cs-hide");
                $(c_id +" .overview").show();
            }
            else{
                $(c_id +" .overview").addClass("cs-hide");
                $(c_id +" .overview").hide();
            }
        });
    })
}

function pageCall(page) {
    const tmdb = new tmdbAPI();
    if (document.getElementById('isSeries').checked) {
        getSeries(tmdb.discoverSeries(page, 'POP_DSC', true, false))
    }
    else {
        getMovies(tmdb.discoverMovies(page, 'POP_DSC', true, false));
    }
}