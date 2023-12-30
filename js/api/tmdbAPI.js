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
    discoverMovies(page, sort_by, include_adult, include_video, lang){
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
        sort_by = (sort_by) ? sortBy[sort_by] : sortBy.POP_DSC;
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

    getSeason(series_id, season_number, lang){
        lang = (lang) ? lang : "en-US";
        season_number = (season_number) ? season_number : 1 ;
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?language=${lang}`;
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

    /** To Get the Trailer & Other Videos of the Movie */
    discoverSeries(page, sort_by, include_adult, include_video, lang){
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
        sort_by = (sort_by) ? sortBy[sort_by] : sortBy.POP_DSC;
        include_adult = (include_adult) ? include_adult : false;
        include_video = (include_video) ? include_video : false;
        var serviceURL = `https://api.themoviedb.org/3/discover/tv?language=${lang}&page=${page}&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    seachMulti(query, page, lang, include_adult){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        include_adult = (include_adult) ? include_adult : false;
        var serviceURL = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=${include_adult}&language=${lang}&page=${page}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    seachMovie(query, page, lang, primary_release_year, include_adult){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        include_adult = (include_adult) ? include_adult : false;
        primary_release_year = (primary_release_year) ? primary_release_year : "";
        var serviceURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${include_adult}&language=${lang}&page=${page}&primary_release_year=${primary_release_year}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    seachSeries(query, page, lang, first_air_date_year, include_adult){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        include_adult = (include_adult) ? include_adult : false;
        first_air_date_year = (first_air_date_year) ? first_air_date_year : "";
        var serviceURL = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=${include_adult}&language=${lang}&page=${page}&first_air_date_year=${first_air_date_year}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    trendingMulti(time_window, lang){
        time_window = (time_window) ? time_window : "week";
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/trending/all/${time_window}?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    trendingMovies(time_window, lang){
        time_window = (time_window) ? time_window : "week";
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/trending/movie/${time_window}?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    trendingSeries(time_window, lang){
        time_window = (time_window) ? time_window : "week";
        lang = (lang) ? lang : "en-US";
        var serviceURL = `https://api.themoviedb.org/3/trending/tv/${time_window}?language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    topRatedMovies(page, lang, region){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        region = (region) ? region : "IN";
        var serviceURL = `https://api.themoviedb.org/3/movie/top_rated?page=${page}&region=${region}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    topRatedSeries(page, lang, region){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        region = (region) ? region : "IN";
        var serviceURL = `https://api.themoviedb.org/3/tv/top_rated?page=${page}&region=${region}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    getMovieRecommendation(movie_id, page, lang){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        var serviceURL = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?page=${page}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    getSeriesRecommendation(series_id, page, lang){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}/recommendations?page=${page}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    onAirTVShows(page, lang){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        var serviceURL = `https://api.themoviedb.org/3/tv/on_the_air?page=${page}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    getSimilarMovies(movie_id, page, lang){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        var serviceURL = `https://api.themoviedb.org/3/movie/${movie_id}/similar?page=${page}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }

    getSimilarSeries(series_id, page, lang){
        lang = (lang) ? lang : "en-US";
        page = (page) ? page : 1;
        var serviceURL = `https://api.themoviedb.org/3/tv/${series_id}/similar?page=${page}&language=${lang}`;
        return metaAjaxCall(serviceURL, "GET", this.AUTH_HEADER);
    }    
}