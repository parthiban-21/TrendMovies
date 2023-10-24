class cs_templates {
    /** Vertical Card */
    getTempVertical(){
        var htmlTag = `<div class="carousel-vr movie" id="${id}">  
                            <img src="${img}">
                            <div class="cs-contents">      
                                <span id="adult-flag" class="cs-content cs-float-right color-red" style="display: none;">18+</span>
                                <span class="cs-content cs-float-right">${quality}</span>      
                                <span id="content-rating" class="cs-content cs-float-right color-orange">${rating}</span>
                            </div>  
                            <div class="overview cs-hide" style="display: none;">      
                                <h3>${title}</h3>      
                                <a class="btn btn-circle" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>  
                            </div>
                        </div>`;
        return htmlTag;
    }
}