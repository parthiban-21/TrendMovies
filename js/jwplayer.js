function play(){
    var videoPath = $("#st-url").val();
    jwplayer("myElement").setup({
        file: videoPath,
        width: '100%',
        aspectratio: '16:9' // Adjust as needed
    });
}