const controls = [
    'play-large', // The large play button in the center
    'restart', // Restart playback
    'rewind', // Rewind by the seek time (default 10 seconds)
    'play', // Play/pause playback
    'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'captions', // Toggle captions
    'settings', // Settings menu
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
    //'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
    'fullscreen', // Toggle fullscreen
  ];
const settings = ['captions', 'quality', 'speed', 'loop'];
const player = Plyr.setup("#myVideo", {
    controls: controls,
    clickToPlay: true
});
$(function () {
    window.addEventListener("devtoolschange", function (e) {
        if (e.detail.opened) {
            console.log("Developer tools are open. Please close them.");
            // Optionally, take additional actions.
        }
    });

    $("#st-url").on('click', function () {
        if(!$(this).val())
            navigator.clipboard.readText()
                .then(clipboardData => {
                    if(confirm('Do You Want to Paste Below Copied Content? \n\nCopied Content: ' + clipboardData))
                        $(this).val(clipboardData);
                })
                .catch(error => {
                    console.error('Failed to read clipboard data:', error);
                });
    })
})
function play(type){
    if(type == "IFRAME"){
        $("#sty-iframe").attr("src", $("#st-iframe-url").val());
    } else {
        var videoPath = $("#st-url").val();
        $("#myVideo").attr("src", videoPath);
    }
    //player.download = videoPath;
    // jwplayer("myElement").setup({
    //     file: videoPath,
    //     width: '100%',
    //     aspectratio: '16:9' // Adjust as needed
    // });
}