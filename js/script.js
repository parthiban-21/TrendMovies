const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

$(function () {
    const tmdb = new tmdbAPI();
    getMovies(tmdb.discoverMovies(1, 'POP_DSC', false, false));
});

function getMovies(data) {
    if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
            prev.classList.add('disabled');
            next.classList.remove('disabled')
        } else if (currentPage >= totalPages) {
            prev.classList.remove('disabled');
            next.classList.add('disabled')
        } else {
            prev.classList.remove('disabled');
            next.classList.remove('disabled')
        }

    } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
    }
}

function showMovies(movieList) {
    $("#main").empty();
    $.each(movieList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="carousel-vr sty-content-card" id="movie-'+ item.id +'">';
        frameHTML += '  <img>';
        frameHTML += '  <div class="cs-contents">';
        //frameHTML += '      <div class="cs-content" style="margin-right: 108px;">Movie</div>';
        frameHTML += '      <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>';
        //frameHTML += '      <span class="cs-content cs-float-right">HD</span>';
        frameHTML += '      <span id="content-rating" class="cs-content cs-float-right color-orange">0.0</span>';
        frameHTML += '      <span class="cs-content cs-float-left">Movie</span>';
        frameHTML += '  </div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        //frameHTML += '      <a class="btn btn-circle" id="info-dialog" title="Know More"><i class="fa-solid fa-lightbulb"></i></a>';
        frameHTML += '      <a class="btn btn-circle cs-cur" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
        frameHTML += '  </div>';
        frameHTML += '</div>';
        $("#main").append(frameHTML);

        $("#main #movie-"+ item.id +" #adult-flag").hide();
        $("#main #movie-"+ item.id +" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
        $("#main #movie-"+ item.id +" .overview h3").text(item.title);
        $("#main #movie-"+ item.id +" #content-rating").text(item.vote_average.toFixed(1));
        if(item.adult){
            $("#main #movie-"+ item.id +" #adult-flag").show();
        }

        /* Events */
        $("#main #movie-"+ item.id +" #watch-now").on('click',function(){
            sessionStorage.setItem("movieId", item.id);
            window.location.href = "movieTemplate.html";
            //window.open(url);
        })
    })
}

prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

function pageCall(page) {
    const tmdb = new tmdbAPI();
    getMovies(tmdb.discoverMovies(page, 'POP_DSC', false, false));
}