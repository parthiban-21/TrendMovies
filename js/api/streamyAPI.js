class streamy {
    constructor() {
        this.base_url = "https://streamy-site.onrender.com/api/";
        //this.base_url = "http://localhost:8080/api/";
    }

    /** To Keep the Server Alive */
    keepAlive() {
        return this.ajaxCaller("set-alive", "POST", true);
    }

    /** Fetch Content by TMDB ID or IMDB ID */
    fetchContent(content_id) {
        if(content_id && content_id.trim())
            return this.ajaxCaller("fetch-content", "POST", false, {'API_ID':content_id});
    }

    fetchAllMovies() {
        return this.ajaxCaller("fetch-all-content", "POST", false);
    }

    ajaxCaller(relative_path, method, async, params) {
        var response;
        params = (params && ("object" == typeof params)) ? params : new Object();
        $.ajax({
            async: async,
            url: `${this.base_url}${relative_path}`,
            type: method,
            data: params,
            headers: {
                'STY-REF': 'STREAMY',
            },
            success: function (data) {
                response = data;
            },
            error: function (data) {
                console.log(data);
            }
        });
        return response;
    }
}