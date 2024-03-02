class streamy {
    constructor() {
        this.base_url = "https://streamy-site.onrender.com/api/";
    }

    /** To Keep the Server Alive */
    keepAlive() {
        return this.ajaxCaller("set-alive", "POST");
    }

    /** Fetch Content by TMDB ID or IMDB ID */
    fetchContent(content_id) {
        if(content_id && content_id.trim())
            return this.ajaxCaller("fetch-content", "POST", {'API_ID':content_id});
    }

    fetchAllMovies() {
        return this.ajaxCaller("fetch-all-content", "POST");
    }

    ajaxCaller(relative_path, method, params) {
        params = (params && ("object" == typeof params)) ? params : new Object();
        $.ajax({
            async: true,
            url: `${this.base_url}${relative_path}`,
            type: method,
            data: params,
            headers: {
                'STY-REF': 'STREAMY',
            },
            success: function (data) {
                return data;
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
}