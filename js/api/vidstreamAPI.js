/** 
 * Vid Stream API
 * Ref: https://vidsrc.to/#api [Unavailable]
 * Ref: https://vidsrc.in/api/ [More Ads]
 * Ref: https://docs.vidsrc.cc/
 */
class vidStreamAPI {
    /** To Get Movie Embed URL */
    getMovieURL(video_id){
        video_id = (video_id) ? video_id : "";
        return `https://vidsrc.cc/v2/embed/movie/${video_id}`;
    }

    /** To Get Series Embed URL */
    getSeriesURL(video_id, season, episode){
        video_id = (video_id) ? video_id : "";
        season = (season) ? "/"+season : "";
        episode = (episode) ? "/"+episode : "";
        return `https://vidsrc.cc/v2/embed/tv/${video_id}${season}${episode}`;
    }
} 