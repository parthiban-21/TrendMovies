/** 
 * Vid Stream API
 * Ref: https://vidsrc.to/#api [Unavailable]
 * Ref: https://vidsrc.in/api/
 */
class vidStreamAPI {
    /** To Get Movie Embed URL */
    getMovieURL(video_id){
        video_id = (video_id) ? video_id : "";
        return `https://vidsrc.xyz/embed/movie?tmdb=${video_id}`;
    }

    /** To Get Series Embed URL */
    getSeriesURL(video_id, season, episode){
        video_id = (video_id) ? video_id : "";
        //season = (season) ? "/"+season : "";
        //episode = (episode) ? "/"+episode : "";
        return `https://vidsrc.xyz/embed/tv?tmdb=${video_id}&season=${season}&episode=${episode}`;
    }
} 