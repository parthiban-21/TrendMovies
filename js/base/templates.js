function getTemplateByCode(code) {
    const temp = new sty_templates();
    var fn = temp.getTempObject(code)
    if(fn) {
        return fn();
    }
}

class sty_templates {
    getTempObject(code) {
        var tempObj = {
            "MOV-VR-1" : this.getVerticalMovie_1,
            "TV-VR-1" : this.getVerticalSeries_1,
            "MOV-HR-1" : this.getHorizontalMovie_1
        }
        return tempObj[code];
    }
    /** Vertical Movie Card */
    getVerticalMovie_1(){
        var htmlTag = `<div class="carousel-vr sty-content-card content-id">  
                            <img src="/img/Streamy_BG.jpg">
                            <div class="cs-contents">      
                                <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>
                                <span id="content-quality" class="cs-content cs-float-right color-orange"></span>      
                                <span class="cs-content cs-float-left">Movie</span>
                            </div>  
                            <div class="overview">      
                                <h3></h3>      
                                <a class="btn btn-circle cs-cur" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>  
                            </div>
                        </div>`;
        return htmlTag;
    }

    getVerticalSeries_1(){
        var htmlTag = `<div class="carousel-vr sty-content-card content-id">  
                            <img src="/img/Streamy_BG.jpg">
                            <div class="cs-contents">      
                                <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>
                                <span class="cs-content cs-float-right color-orange"></span>
                                <span class="cs-content cs-float-left">TV Series</span>
                            </div>  
                            <div class="overview cs-hide">      
                                <h3></h3>      
                                <a class="btn btn-circle cs-cur" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>  
                            </div>
                        </div>`;
        return htmlTag;
    }

    getHorizontalMovie_1(){
        var htmlTag = `<div class="carousel-hr cs-horizontal sty-content-card content-id">  
                            <img src="/img/Streamy_BG.jpg">
                            <div class="cs-contents">      
                                <span id="adult-flag" class="cs-content cs-float-right color-red">18+</span>
                                <span id="content-quality" class="cs-content cs-float-right color-orange"></span>
                                <span class="cs-content cs-float-left">Movie</span>
                            </div>  
                            <div class="overview cs-hide">      
                                <h3></h3>      
                                <a class="btn btn-circle cs-cur" id="watch-now" title="Watch Now"><i class="fa-solid fa-play"></i></a>  
                            </div>
                        </div>`;
        return htmlTag;
    }
}