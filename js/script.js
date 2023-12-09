const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');
//const isSeries = document.getElementById('isSeries').checked;

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

function getSeries(data) {
    if (data.results.length !== 0) {
        showSeries(data.results);
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
        frameHTML += '      <span class="cs-content cs-float-right">HD</span>';
        frameHTML += '      <span id="content-rating" class="cs-content cs-float-right color-orange">0.0</span>';
        frameHTML += '      <span class="cs-content cs-float-left">Movie</span>';
        frameHTML += '  </div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        //frameHTML += '      <a class="btn btn-circle" id="info-dialog" title="Know More"><i class="fa-solid fa-lightbulb"></i></a>';
        frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
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

function showSeries(seriesList) {
    $("#main").empty();
    $.each(seriesList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="movie" id="tvshow-'+ item.id +'">';
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
        $("#main").append(frameHTML);

        $("#main #tvshow-"+ item.id +" #adult-flag").hide();
        $("#main #tvshow-"+ item.id +" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "img/Streamy_BG.jpg");
        $("#main #tvshow-"+ item.id +" .overview h3").text(item.name);
        $("#main #tvshow-"+ item.id +" #content-rating").text(item.vote_average.toFixed(1));
        if(item.adult){
            $("#main #tvshow-"+ item.id +" #adult-flag").show();
        }

        /* Events */
        $("#main #tvshow-"+ item.id +" #watch-now").on('click',function(){
            sessionStorage.setItem("seriesId", item.id);
            window.location.href = "series.html";
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
    getMovies(tmdb.discoverMovies(page, 'POP_DSC', true, false));
    /*let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);
    }*/
}