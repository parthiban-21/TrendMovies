const IMG_URL = 'https://image.tmdb.org/t/p/w500';
$(function () {
    const tmdb = new tmdbAPI();
    getSeries(tmdb.trendingSeries(), "#main");

    $("#search-content").on('click', function (e) {
        var searchTerm = $("#content-search").val().trim();
        if (searchTerm) {
            getSeries(tmdb.seachSeries(searchTerm, 1, "en-US", undefined, true), "#main");
        } else {
            alert("Couldn't Find any Search Keywords, Try Again with Different Keyword..!")
        }
    });

    $("#content-search").on('keypress', function (e) {
        var key = e.which;
        if (key == 13) {
            $("#search-content").trigger('click');
        }
    });
});

function getSeries(data, append_id) {
    if (data.results.length !== 0) {
        showSeries(data.results, append_id);
    } else {
        $(append_id).text('<h1 class="no-results">No Results Found</h1>');
    }
}

function showSeries(seriesList, append_id) {
    $(append_id).empty();
    $.each(seriesList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="carousel-vr sty-content-card" id="tvshow-'+ item.id +'">';
        frameHTML += '  <img>';
        frameHTML += '  <div class="cs-contents">';
        //frameHTML += '      <div class="cs-content" style="margin-right: 108px;">Movie</div>';
        frameHTML += '      <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>';
        frameHTML += '      <span class="cs-content cs-float-right">HD</span>';
        frameHTML += '      <span id="content-rating" class="cs-content cs-float-right color-orange">0.0</span>';
        frameHTML += '      <span class="cs-content cs-float-left">TV Series</span>';
        frameHTML += '  </div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        //frameHTML += '      <a class="btn btn-circle" id="info-dialog" title="Know More"><i class="fa-solid fa-lightbulb"></i></a>';
        frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
        frameHTML += '  </div>';
        frameHTML += '</div>';
        $(append_id).append(frameHTML);
        var c_id = append_id + " #tvshow-" + item.id;
        $(c_id+" #adult-flag").hide();
        $(c_id+" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
        $(c_id+" .overview h3").text(item.name);
        $(c_id+" #content-rating").text(item.vote_average.toFixed(1));
        if(item.adult){
            $(c_id+" #adult-flag").show();
        }

        /* Events */
        $(c_id+" #watch-now").on('click',function(){
            sessionStorage.setItem("seriesId", item.id);
            window.location.href = "series.html";
        })
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