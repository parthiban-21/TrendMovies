class omdb {
    constructor() {
        this.API_KEY = "7a52001a";
        this.API_URL = `https://www.omdbapi.com/?apikey=${this.API_KEY}`;
    }

    getContentByID(id){
        if(id){
            var serviceURL = this.API_URL + `&i=${id}`;
            return metaAjaxCall(serviceURL, "GET");
        }
    }
}