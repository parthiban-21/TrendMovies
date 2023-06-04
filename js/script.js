//TMDB 

const API_KEY = 'api_key=4e30dfcb81c11681f7e64bf0bd367a3a';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const tvsearchURL = BASE_URL + '/search/tv?' + API_KEY;
const embedMovie = 'https://www.2embed.to/embed/tmdb/movie?id=';
const embedSeries = 'https://www.2embed.to/embed/tmdb/tv?id=';
const tv = 'https://api.themoviedb.org/3/tv/';
var list;
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
const isSeries = document.getElementById('isSeries').checked;

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;
/*
var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('highlight')
    } else {

        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }

}
*/
getMovies(API_URL);

function getMovies(url) {
    lastUrl = url;
    var data = metaAjaxCall(url);
    list = data.results;
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

        tagsEl.scrollIntoView({ behavior: 'smooth' })

    } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
    }
}

function getSeries(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        list = data.results;
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

            tagsEl.scrollIntoView({ behavior: 'smooth' })

        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }

    })
}

function showMovies(movieList) {
    $("#main").empty();
    $.each(movieList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="movie" id="movie-'+ item.id +'">';
        frameHTML += '  <img>';
        frameHTML += '  <div class="cs-content movie-quality">HD</div>';
        frameHTML += '  <div class="cs-content movie-rating">9.9</div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        frameHTML += '      <a class="btn btn-circle" id="info-dialog" title="Know More"><i class="fa-solid fa-lightbulb"></i></a>';
        frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
        frameHTML += '  </div>';
        frameHTML += '</div>';
        $("#main").append(frameHTML);

        $("#main #movie-"+ item.id +" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "http://via.placeholder.com/1080x1580");
        $("#main #movie-"+ item.id +" .overview h3").text(item.title);
        $("#main #movie-"+ item.id +" .movie-rating").text(item.vote_average.toFixed(1));

        /* Events */
        $("#main #movie-"+ item.id +" #watch-now").on('click',function(){
            var url = embedMovie + item.id;
            sessionStorage.setItem("movieId", item.id);
            window.location.href = "/Programs/Website/TrendMovies/movieTemplate.html";
            //window.open(url);
        })
        $("#main #movie-"+ item.id +" #info-dialog").on('click',function(){
            alert("We are Working on it, Stay Tuned...");
        })
        $("#main #movie-"+ item.id).hover(function(){
            if($("#main #movie-"+ item.id +" .overview").hasClass('cs-hide')){
                $("#main #movie-"+ item.id +" .overview").removeClass("cs-hide");
                $("#main #movie-"+ item.id +" .overview").show();
            }
            else{
                $("#main #movie-"+ item.id +" .overview").addClass("cs-hide");
                $("#main #movie-"+ item.id +" .overview").hide();
            }
        })
    })
}

function showSeries(seriesList) {
    $("#main").empty();
    $.each(seriesList, function(index, item) {
        var frameHTML = '';
        frameHTML += '<div class="movie" id="tvshow-'+ item.id +'">';
        frameHTML += '  <img>';
        frameHTML += '  <div class="cs-content movie-quality">HD</div>';
        frameHTML += '  <div class="cs-content movie-rating">0.0</div>';
        frameHTML += '  <div class="overview cs-hide">';
        frameHTML += '      <h3></h3>';
        frameHTML += '      <a class="btn btn-circle" id="info-dialog" title="Know More"><i class="fa-solid fa-lightbulb"></i></a>';
        frameHTML += '      <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>';
        frameHTML += '  </div>';
        frameHTML += '</div>';
        $("#main").append(frameHTML);

        $("#main #tvshow-"+ item.id +" img").attr('src',(item.poster_path) ? IMG_URL + item.poster_path : "http://via.placeholder.com/1080x1580");
        $("#main #tvshow-"+ item.id +" .overview h3").text(item.name);
        $("#main #tvshow-"+ item.id +" .movie-rating").text(item.vote_average.toFixed(1));

        /* Events */
        $("#main #tvshow-"+ item.id +" #watch-now").on('click',function(){
            alert("We are Working on it, Stay Tuned...");
        })
        $("#main #tvshow-"+ item.id +" #info-dialog").on('click',function(){
            buttonAction(item.id);
        })
        $("#main #tvshow-"+ item.id).hover(function(){
            if($("#main #tvshow-"+ item.id +" .overview").hasClass('cs-hide')){
                $("#main #tvshow-"+ item.id +" .overview").removeClass("cs-hide");
                $("#main #tvshow-"+ item.id +" .overview").show();
            }
            else{
                $("#main #tvshow-"+ item.id +" .overview").addClass("cs-hide");
                $("#main #tvshow-"+ item.id +" .overview").hide();
            }
        })
    })
}

function buildSeasonAndEpisode(id) {
  document.getElementById("tv-watch").setAttribute('tmdbID', id);
  var tvurl = tv + id + '?' + API_KEY + '&language=en-US';
  fetch(tvurl).then(res => res.json()).then(data => {
    console.log(data);
    document.getElementById("info-name").innerHTML = data.name;
    if(!data.adult){
      document.getElementById("info-adult").style.display = "none";
    } else {
      document.getElementById("info-adult").style.display = "block";
    }
    document.getElementById("info-year").innerHTML = data.first_air_date;
    document.getElementById("info-overview").innerHTML = data.overview;
    document.getElementById("info-season").innerHTML = data.number_of_seasons;
    document.getElementById("info-episode").innerHTML = data.number_of_episodes;
    document.getElementById("info-status").innerHTML = data.status;
    const table = document.getElementById("tv-info-count");
    let td = '';
    for(let i=0; i<data.seasons.length; i++){
      var s = data.seasons[i];
      console.log(s.season_number,s.episode_count);
      td += '<tr><td>'+s.name+'  >>>  </td><td>'+s.episode_count+' Episodes</td></tr>';
    }
    table.innerHTML = td;
  })
}

const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(res => res.json()).then(videoData => {
        console.log(videoData);
        if (videoData) {
            document.getElementById("myNav").style.width = "100%";
            if (videoData.results.length > 0) {
                var embed = [];
                var dots = [];
                videoData.results.forEach((video, idx) => {
                    let { name, key, site } = video

                    if (site == 'YouTube') {

                        embed.push(`
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
  `)

                        dots.push(`
      <span class="dot">${idx + 1}</span>
    `)
                    }
                })

                var content = `
<h1 class="no-results">${movie.original_title}</h1>
<br/>

${embed.join('')}
<br/>
<div class="dots">${dots.join('')}</div>

`
                overlayContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            } else {
                overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
            }
        }
    })
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos() {
    let embedClasses = document.querySelectorAll('.embed');
    let dots = document.querySelectorAll('.dot');

    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        if (activeSlide == idx) {
            embedTag.classList.add('show')
            embedTag.classList.remove('hide')

        } else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show')
        }
    })

    dots.forEach((dot, indx) => {
        if (activeSlide == indx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active')
        }
    })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
    if (activeSlide > 0) {
        activeSlide--;
    } else {
        activeSlide = totalVideos - 1;
    }

    showVideos()
})

rightArrow.addEventListener('click', () => {
    if (activeSlide < (totalVideos - 1)) {
        activeSlide++;
    } else {
        activeSlide = 0;
    }
    showVideos()
})


function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        if (document.getElementById('isSeries').checked) {
            getSeries(tvsearchURL + '&query=' + searchTerm + '&language=en-US')
        }
        else {
            getMovies(searchURL + '&query=' + searchTerm + '&language=en-US')
        }
    } else {
        getMovies(API_URL);
    }

})

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
    let urlSplit = lastUrl.split('?');
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
    }
}

let modal = document.getElementById("myModal");

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];

let tvWatch = document.getElementById('tv-watch');

function buttonAction(id) {
    buildSeasonAndEpisode(id);
    modal.style.display = "block";
}

tvWatch.onclick = function () {
  var tv_id = document.getElementById("tv-watch").getAttribute('tmdbID');
  var season = document.getElementById('tv-season').value;
  var episode = document.getElementById('tv-episode').value;
  var url = embedSeries + tv_id + '&s=' + season + '&e=' + episode;
  console.log(tv_id, season, episode);
  window.open(url);
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}