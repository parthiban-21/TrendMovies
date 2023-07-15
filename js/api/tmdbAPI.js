class tmdbAPI {
    constructor() {
        this.API_KEY = "4e30dfcb81c11681f7e64bf0bd367a3a";
        this.AUTH_HEADER = {'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTMwZGZjYjgxYzExNjgxZjdlNjRiZjBiZDM2N2EzYSIsInN1YiI6IjYzOWU5Y2Y4OWJjZDBmMjdkNmZjNDY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NCw_mPY4I9tam2CQsY-0IRZcpLy0pqLwE9wGQbrK-44'};
        this.BASIC_INFO = {
            'IMG_URL' : "https://image.tmdb.org/t/p/w500",
            'IMG_BG_URL' : "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"
        }
    }

    /** To Get the Details for Movie */
    getMovie(movie_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/movie/${movie_id}?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Credits of the Movie */
    getMovieCredits(movie_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Trailer & Other Videos of the Movie */
    getMovieVideos(movie_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Trailer & Other Videos of the Movie */
    getMovies(page, sort_by, include_adult, include_video, lang){
        const sortBy = {
            POP_ASC : "popularity.asc",
            POP_DSC : "popularity.desc",
            REV_ASC: "revenue.asc",
            REV_DSC: "revenue.desc",
            REL_ASC : "primary_release_date.asc",
            REL_DSC: "primary_release_date",
            VAVG_ASC: "vote_average.asc",
            VAVG_DSC: "vote_average.desc",
            VCNT_ASC: "vote_count.asc",
            VCNT_DSC: "vote_count.desc"
        }
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        sort_by = (sort_by) ? sortBy.sort_by : sortBy.POP_DSC;
        include_adult = (include_adult) ? include_adult : false;
        include_video = (include_video) ? include_video : false;
        var serviceURL = `https://api.themoviedb.org/3/discover/movie?language=${lang}&page=${page}&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Details for Series */
    getSeries(series_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Credits of the Series */
    getSeriesCredits(series_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}/credits?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    /** To Get the Trailer & Other Videos of the Series */
    getSeriesVideos(series_id, lang){
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}/videos?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }
}