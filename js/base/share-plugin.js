function metaShare(platform, title, share_url) {
    var is_mobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var is_ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var is_android = /Android/i.test(navigator.userAgent);

    /* To Build Query Params */
    function params (params) {
        var results = new Array();
        $.each(params, function (key, value) {
            if (value != null)
                results.push(`${key}=${encodeURIComponent(value)}`);
        });
        return results.join('&');
    };

    var plateformAPI = {
        EMAIL: "mailto:?" + params({
            subject: title,
            body: share_url
        }),
        FACEBOOK: "https://www.facebook.com/sharer.php?" + params({
            t: title,
            u: share_url
        }),
        GMAIL: "https://mail.google.com/mail/?view=cm&" + params({
            to: '',
            su: title,
            body: share_url,
            bcc: '',
            cc: ''
        }),
        LINKEDIN: "https://www.linkedin.com/shareArticle?" + params({
            title: title,
            url: share_url
        }),
        MESSENGER: {
            "true": "fb-messenger://share/?" + params({
                link: share_url,
                app_id: 291494419107518
            }),
            "false": "https://www.facebook.com/dialog/send?" + params({
                link: share_url,
                app_id: 291494419107518,
                redirect_uri: "https://www.sharethis.com"
            })
        }[is_mobile],
        OUTLOOK: "https://outlook.live.com/mail/deeplink/compose?" + params({
            path: 'mail inbox',
            subject: title,
            body: share_url
        }),
        SMS: "sms:" + (is_ios ? '&' : '?') + "body=" + (encodeURIComponent(share_url)),
        SNAPCHAT: "https://snapchat.com/scan?" + params({
            attachmentUrl: share_url,
            utm_source: 'sharethis'
        }),
        TELEGRAM: "https://telegram.me/share/url?" + params({
            url: share_url,
            text: title,
            to: ''
        }),
        TUMBLR: "https://www.tumblr.com/share?" + params({
            t: title,
            u: share_url,
            v: 3
        }),
        TWITTER: "https://twitter.com/intent/tweet?" + params({
            text: title,
            url: share_url,
            //via: username
        }),
        WHATSAPP: (!is_mobile ? "https://web.whatsapp.com/send?" : "whatsapp://send?") + params({
            text: share_url
        }),
        YAHOOMAIL: "http://compose.mail.yahoo.com/?" + params({
            to: '',
            subject: title,
            body: share_url
        }),
    };

    if(plateformAPI[platform])
        window.open(plateformAPI[platform]);
    else if (platform == "COPY") {
        navigator.clipboard.writeText(share_url);
        alertMessage("Copied","","","INFO");
    }
}

function getPlatformImage() {
    st.img = function (name) {
        var alt;
        if (!name) {
            return;
        }
        alt = (name.replace('.svg', '').replace('.png', '')) + " sharing button";
        return "<img alt='" + alt + "' src='https://platform-cdn.sharethis.com/img/" + name + "' />";
    };
}

function frameShareButtons(appendID, networks){
    $(appendID).empty();
    if(!networks)
        networks = ["TELEGRAM", "WHATSAPP", "TWITTER", "FACEBOOK", "GMAIL", "SMS", "COPY"];
    $.each(networks, function (i, platform) {
        var img = $(`<div class='sty-button cs-hover' title='${platform.toLowerCase()}' >
                        <img src="https://platform-cdn.sharethis.com/img/${platform.toLowerCase()}.svg" alt="${platform}" platform="${platform}">
                    </div>`);
        img.on('click', function(){
            metaShare(platform,"Hey, Check this Out..!", document.location.href);
        })
        $(appendID).append(img)
    });
}

function invokeShareDialog() {
    var networks = ["TELEGRAM", "WHATSAPP", "TWITTER", "FACEBOOK", "GMAIL", "SMS"];
    var html = `<div id="sty-share-dialog" class="cs-hide">
                    <div class="sty-share-container">
                        <div id="sty-share-platform">
                        </div>
                    </div>
                    <div style="margin: 10px 0px 10px 0px;">
                        <input class="sty-copy-url" type="url" readonly>
                        <span id="copy-url" class="sty-button cs-hover" title="Copy URL"><i class="fa-solid fa-clone"></i></span>
                    </div>
                </div>`;
    $("body").append(html);
    frameShareButtons("#sty-share-platform", networks);
    $(".sty-copy-url").val(window.location.href);
    $("#copy-url").on('click', function(){
        $(".sty-copy-url").select();
        navigator.clipboard.writeText(window.location.href);
    })
    $("#sty-share-dialog").dialog({
        title: "Share",
        modal: true,
        autoOpen: true,
        draggable: false,
        width:  405,
        close: function (event, ui) {
            $("#sty-share-dialog").remove();
        }
    });
}