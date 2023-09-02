const IMG_URL = 'https://image.tmdb.org/t/p/w500';
$(function () {
    const tmdb = new tmdbAPI();
    getMovies(tmdb.topRatedMovies(), "#main", "VER");
    getMovies(tmdb.trendingMovies(), "#upcoming-contents", "HOR");

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

    $("#carousel-right").on('click', function(){
        scrollCarousel('right');
    });

    $("#carousel-left").on('click', function(){
        scrollCarousel('left');
    });
});

function getMovies(movieList, append_id, type) {
    if (movieList.results.length !== 0) {
        $(append_id).empty();
        $.each(movieList.results, function (index, item) {
            let className = (type == "VER") ? "carousel-vr" : "carousel-hr cs-horizontal";
            var frameHTML = '';
            frameHTML += '<div class="'+ className +' movie" id="movie-' + item.id + '">';
            frameHTML += '  <img>';
            frameHTML += '  <div class="cs-contents">';
            frameHTML += '      <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>';
            frameHTML += '      <span class="cs-content cs-float-right">HD</span>';
            frameHTML += '      <span id="content-rating" class="cs-content cs-float-right color-orange">0.0</span>';
            frameHTML += '  </div>';
            frameHTML += '  <div class="overview cs-hide">';
            frameHTML += '      <h3></h3>';
            frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
            frameHTML += '  </div>';
            frameHTML += '</div>';
            $(append_id).append(frameHTML);
            var c_id = append_id + " #movie-" + item.id;
            $(c_id + " #adult-flag").hide();
            if (type == "VER")
                $(c_id + " img").attr('src', (item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
            else 
                $(c_id + " img").attr('src', (item.backdrop_path) ? IMG_URL + item.backdrop_path : "img/Streamy_BG.jpg");
            $(c_id + " .overview h3").text(item.title);
            $(c_id + " #content-rating").text(item.vote_average.toFixed(1));
            if (item.adult) {
                $(c_id + " #adult-flag").show();
            }

            /* Events */
            $(c_id + " #watch-now").on('click', function () {
                sessionStorage.setItem("movieId", item.id);
                window.location.href = "movieTemplate.html";
            });
            $(c_id).hover(function () {
                if ($(c_id + " .overview").hasClass('cs-hide')) {
                    $(c_id + " .overview").removeClass("cs-hide");
                    $(c_id + " .overview").show();
                }
                else {
                    $(c_id + " .overview").addClass("cs-hide");
                    $(c_id + " .overview").hide();
                }
            });
        })
    } else {
        $(append_id).text('<h1 class="no-results">No Results Found</h1>');
    }
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

let scrollAmount = 0;
function scrollCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const increment = direction === 'right' ? 1 : -1;
    const movieWidth = carousel.querySelector('.movie').offsetWidth + 10;
    scrollAmount += increment * movieWidth;
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}