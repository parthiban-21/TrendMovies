const sty_pyro_player_controls = [
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
const sty_pyro_player_settings = ['captions', 'quality', 'speed', 'loop'];
const sty_pyro_player = Plyr.setup("#myVideo", {
    controls: sty_pyro_player_controls,
    clickToPlay: true,
    captions: { active: true, update: true, language: 'en' },
    audio: { active: true, language: 'en' }
});

const STY_JW_SETUP = {
    mute: false,
    volume: 80,
    autostart: false,
    width: "100%",
    aspectratio: "16:9",
    repeat: false,
    controls: true,
    skin: {
        active: "#0b7ef4"
    }
};

const STY_JW_RESOURCE = {
	forward_svg: `<svg class="jw-svg-icon sty-jw-icon-size" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
		<path d="M29.9199 45H25.2051V26.5391L20.6064 28.3154V24.3975L29.4219 20.7949H29.9199V45ZM48.1013 35.0059C48.1013 38.3483 47.4926 40.9049 46.2751 42.6758C45.0687 44.4466 43.3422 45.332 41.0954 45.332C38.8708 45.332 37.1498 44.4743 35.9323 42.7588C34.726 41.0322 34.1006 38.5641 34.0564 35.3545V30.7891C34.0564 27.4577 34.6596 24.9121 35.8659 23.1523C37.0723 21.3815 38.8044 20.4961 41.0622 20.4961C43.32 20.4961 45.0521 21.3704 46.2585 23.1191C47.4649 24.8678 48.0792 27.3636 48.1013 30.6064V35.0059ZM43.3864 30.1084C43.3864 28.2048 43.1983 26.777 42.822 25.8252C42.4457 24.8734 41.8591 24.3975 41.0622 24.3975C39.5681 24.3975 38.7933 26.1406 38.738 29.627V35.6533C38.738 37.6012 38.9262 39.0511 39.3025 40.0029C39.6898 40.9548 40.2875 41.4307 41.0954 41.4307C41.8591 41.4307 42.4236 40.988 42.7888 40.1025C43.1651 39.2061 43.3643 37.8392 43.3864 36.002V30.1084Z"/>
		<path d="M40.0106 5.45398V0L50 7.79529L40.0106 15.5914V10.3033H4.9114V40.1506H18.7558V45H2.01875e-06V5.45398H40.0106Z"/>
		</svg>`,
	rewind_svg: `<svg class="jw-svg-icon sty-jw-icon-size" viewBox="0 0 52 50" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.9199 45H7.20508V26.5391L2.60645 28.3154V24.3975L11.4219 20.7949H11.9199V45ZM30.1013 35.0059C30.1013 38.3483 29.4926 40.9049 28.2751 42.6758C27.0687 44.4466 25.3422 45.332 23.0954 45.332C20.8708 45.332 19.1498 44.4743 17.9323 42.7588C16.726 41.0322 16.1006 38.5641 16.0564 35.3545V30.7891C16.0564 27.4577 16.6596 24.9121 17.8659 23.1523C19.0723 21.3815 20.8044 20.4961 23.0622 20.4961C25.32 20.4961 27.0521 21.3704 28.2585 23.1191C29.4649 24.8678 30.0792 27.3636 30.1013 30.6064V35.0059ZM25.3864 30.1084C25.3864 28.2048 25.1983 26.777 24.822 25.8252C24.4457 24.8734 23.8591 24.3975 23.0622 24.3975C21.5681 24.3975 20.7933 26.1406 20.738 29.627V35.6533C20.738 37.6012 20.9262 39.0511 21.3025 40.0029C21.6898 40.9548 22.2875 41.4307 23.0954 41.4307C23.8591 41.4307 24.4236 40.988 24.7888 40.1025C25.1651 39.2061 25.3643 37.8392 25.3864 36.002V30.1084Z"/>
		<path d="M11.9894 5.45398V0L2 7.79529L11.9894 15.5914V10.3033H47.0886V40.1506H33.2442V45H52V5.45398H11.9894Z"/>
		</svg>`,
	subs_upload : `<svg class="jw-svg-icon sty-jw-icon-size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>`
}
var sty_jw_player;
var dataURL;
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
	
	$("#sty-add-subs").on('click', function() {
		var subs = $("#sty-subs")[0].files;
		if (subs.length > 0) {
			console.log(subs[0])
			var fileReader = new FileReader();
			fileReader.onload = function(e){
				var content = e.target.result;
				dataURL = 'data:text/vtt;base64,' + btoa(content);
			}
			fileReader.readAsText(subs[0]);
		}
	})
})
function play(type){
    if(type == "IFRAME"){
        $("#sty-iframe").attr("src", $("#st-iframe-url").val());
    } else {
        $("#myVideo").hide();
        invokePlayer();
    }
}

function invokePlayer() {
    var play = STY_JW_SETUP;
    play['sources'] = [{
        file: $("#st-url").val(),
        type: 'video/mp4'
    }];
    play['tracks'] = [{
        "file": dataURL,
        "kind": "captions",
        "label": "English"
    }]
    sty_jw_player = jwplayer('sty-jw-player').setup(play);
    $("#st-url").val('');
    sty_jw_player.addButton(STY_JW_RESOURCE.forward_svg, "Forward 10sec", sty_forward, 'sty-jw-fast-forward');
    sty_jw_player.addButton(STY_JW_RESOURCE.rewind_svg, "Rewind 10sec", sty_rewind, 'sty-jw-rewind');
    //sty_jw_player.addButton(STY_JW_RESOURCE.subs_upload, "Upload Subs", sty_forward, 'sty-jw-addsubs');

    function sty_forward() {
        sty_jw_player.seek(sty_jw_player.getPosition() + 10);
    }
    
    function sty_rewind() {
        sty_jw_player.seek(sty_jw_player.getPosition() - 10);
    }
}