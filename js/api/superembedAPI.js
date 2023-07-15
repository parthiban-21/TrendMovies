/** 
 * Super Embed API
 * Ref: https://www.superembed.stream/ 
 */
class superembedAPI {

    /** To Get Movie Embed URL */
    getMovieURL(video_id, id_type, custome_url){
        let base_url = (custome_url) ? custome_url : "https://multiembed.mov"
        video_id = (id_type == 'IMDB') ? video_id : video_id + "&tmdb=1"
        return `${base_url}/?video_id=${video_id}`;
    }

    /** To Get Series Embed URL */
    getSeriesURL(video_id, season, episode, id_type, custome_url){
        let base_url = (custome_url) ? custome_url : "https://multiembed.mov"
        video_id = (id_type == 'IMDB') ? video_id : video_id + "&tmdb=1"
        return `${base_url}/?video_id=${video_id}&s=${season}&e=${episode}`;
    }
} 