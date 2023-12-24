function invokeContentCredits(type, id) {
    const tmdb = new tmdbAPI();
    var credits;
    if (type && type == "MOVIE") {
        credits = tmdb.getMovieCredits(id);
    } else if (type && type == "TVSHOW") {
        credits = tmdb.getSeriesCredits(id)
    }

    frame("#sty-cr-cast", credits.cast, "CAST");
    frame("#sty-cr-crew", credits.crew, "CREW");

    $(".sty-creator-card h4").on('click', function(){
        var id = $(this).attr('cr-id');
        if(id)
            window.open("https://www.themoviedb.org/person/"+id);
    })

    let width = (screen.width < 610) ? window.innerWidth - 30 : window.innerWidth / 1.15;
    let height = window.innerHeight / 1.25;
    $("#sty-cast-crew").dialog({
        title: "Cast & Crew",
        modal: true,
        autoOpen: true,
        draggable: false,
        closeText: "",
        height: height,
        width: width,
        open: function(){
            $("body").addClass("sty-model-open");
        },
        close: function (event, ui) {
            $("body").removeClass("sty-model-open");
        }
    });

    function frame(id, list, type){
        list = list.sort(compare);
        $(id).empty();
        $.each(list, function(index, item) {
            var label = (type == "CAST") ? item.character : item.department;
            var tag = `<div class="cs-cflex sty-creator-card">
                            <img loading="lazy" src="${(item.profile_path) ? tmdb.BASIC_INFO.IMG_URL + item.profile_path : "img/Streamy_BG.jpg"}" alt="${label}">
                            <div class="cs-cflex">
                                <h4 class="cr-name cs-cur" cr-id="${item.id}">${item.original_name}</h4>
                                <label class="cr-role" title="${label}">${label}</label>
                            </div>    
                        </div>`;
            $(id).append(tag);
        })
    }

    function compare(a, b) {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    }
}