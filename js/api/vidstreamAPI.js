/** 
 * Vid Stream API
 * Ref: https://vidsrc.to/#api
 */
class vidStreamAPI {
    /** To Get Movie Embed URL */
    getMovieURL(video_id){
        video_id = (video_id) ? video_id : "";
        return `https://vidsrc.to/embed/movie/${video_id}`;
    }

    /** To Get Series Embed URL */
    getSeriesURL(video_id, season, episode){
        video_id = (video_id) ? video_id : "";
        season = (season) ? "/"+season : "";
        episode = (episode) ? "/"+episode : "";
        return `https://vidsrc.to/embed/tv/${video_id}${season}${episode}`;
    }
} 