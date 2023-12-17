function showOrHideOverlayAnimation(action) {
	if (action == "SHOW") {
		document.getElementById('cs-load-amimation').style.visibility = 'visible';
	} else {
		document.getElementById('cs-load-amimation').style.visibility = 'hidden';
	}
}

function showMessage() {
	$.meow({
		title: 'Transaction Failed',
		icon: 'fa-regular fa-circle-xmark',
		message: 'All red marked fields are mandatory',
		transaction: 'trans-message',
		type: 'danger-light',
		showHideTransition: 'slide',
		sticky: true
	});
}

function alertMessage(title, message, msglist, type, sticky, closeable, customicon) {
	var messageType = "info";
	var icon = "fa-regular fa-circle-check";
	sticky = (sticky != undefined || sticky != "") ? sticky : false;
	closeable = (closeable != undefined || closeable != "") ? closeable : true;
	if (type == "WARNING") {
		messageType = "warning-light";
		icon = "fa-solid fa-circle-radiation";
		closeable = false;
	} else if (type == "INFO") {
		messageType = "success-light";
		icon = "fa-regular fa-circle-check";
	} else if (type == "ERROR") {
		messageType = "danger-light";
		icon = "fa-regular fa-circle-xmark";
		closeable = false;
	}
	icon = (customicon) ? customicon : icon;
	
	if (title) {
		$.meow({
			title: title,
			message: message,
			icon: icon,
			transaction: 'trans-message',
			type: messageType,
			showHideTransition: 'slide',
			sticky: sticky,
			closeable: closeable,
			moreinfo: msglist,
			duration: 2000
		});
	}
}

function invokeTransactionMessage(messageObj) {
	if (messageObj.type == "business" || messageObj.type == "status") {
		var msg = (typeof messageObj.TRNMESSAGE == 'undefined') ? "" : JSON.parse(messageObj.TRNMESSAGE);
		var msgList = (typeof messageObj.TRNMESSAGELIST == 'undefined') ? null : JSON.parse(messageObj.TRNMESSAGELIST);
		var moreinfo = "";
		var msgType;
		if (msg == "")
			return true;

		if (isNotNull(msgList) && msgList.length > 0) {
			moreinfo = "<ul class=\"cs-list-unstyled cs-vmar cs-noti-scroll cs-rmar\">";
			$.each(msgList, function (index, value) {
				moreinfo += "<li>";
				if (value.type.name == "INFO" || value.type == "INFO") {
					moreinfo += "<i class=\"fa fa-check-circle cs-ts-14\"></i>";
				} else if (value.type.name == "WARNING" || value.type == "WARNING") {
					moreinfo += "<i class=\"fa fa-warning cs-ts-14\"></i>";
				} else if (value.type.name == "ERROR" || value.type == "ERROR") {
					moreinfo += "<i class=\"cs-inline cs-redc cs-hsmar fa fa-times\"></i>";
				}
				moreinfo += " " + value.message;
				moreinfo += "</li>";
			});
			moreinfo += "</ul>";
		}
		if (isNotNull(msg.type.name))
			msgType = msg.type.name;
		else
			msgType = msg.type;
		alertMessage(msg.message, '', msgType, true, '', moreinfo);
	}
	$(".cs-more-alert-block").hover(function () {
		$('.cs-noti-scroll').perfectScrollbar();
	});
}
function invokeExceptionMessage(messageObj) {
	if (messageObj.type == "exception") {
		var msg = (typeof messageObj.TRNMESSAGE == 'undefined') ? "" : JSON.parse(messageObj.TRNMESSAGE);
		var msgList = (typeof messageObj.TRNMESSAGELIST == 'undefined') ? null : JSON.parse(messageObj.TRNMESSAGELIST);
		var showErrorLog = isNotNull(messageObj.showErrorLog) ? messageObj.showErrorLog : "N";
		var moreinfo = "";
		if (msg == "")
			return true;
		if (msgList != null) {
			moreinfo = "<ul class=\"cs-list-unstyled cs-vmar\">";
			$.each(msgList, function (index, value) {
				moreinfo += "<li>";
				if (value.type.name == "INFO" || value.type == "INFO") {
					moreinfo += "<i class=\"fa fa-check-circle cs-ts-14\"></i>";
				} else if (value.type.name == "WARNING" || value.type == "WARNING") {
					moreinfo += "<i class=\"fa fa-warning cs-ts-14\"></i>";
				} else if (value.type.name == "ERROR" || value.type == "ERROR") {
					moreinfo += "<i class=\"fa fa-times-circle cs-ts-14\"></i>";
				}
				moreinfo += " " + value.message;
				moreinfo += "</li>";
			});
			moreinfo += "</ul>";
		}
		if (showErrorLog == "Y") {
			var message = '<div id="exceptionMessage" style="overflow:auto;top:1px;z-index: 5001">';
			message += '<h1>' + msg.message + '</h1>';
			message += '<br>';
			message += moreinfo;
			message += '</div>';
			$("#exceptionMessage").remove();
			$('body').append(message);
			$('#exceptionMessage').dialog({
				modal: true,
				close: function () {
					$("#exceptionMessage").remove();
				},
				width: $(window).width() * 0.75,
				height: $(window).height() * 0.85
			});
		} else {
			alertMessage(msg.message, '', 'ERROR', true, null, moreinfo);
		}
	}
}

function confirmationMessage(message, okProperty, cancelProperty, noneProperty, isAutoAdjustable, messageContent) {
	message = message ? message : "";
	var okLable = okProperty.lable;
	var okFunction = okProperty.method;

	var cancelLable = cancelProperty.lable;
	var cancelFunction = cancelProperty.method;
	var autoAdjustable = isAutoAdjustable != undefined ? isAutoAdjustable : false;

	var confirmationHtmlTag = '';
	confirmationHtmlTag += '<div id="confirmation-dialog-confpopup" class="cs-pr" style="display:none;">';
	confirmationHtmlTag += '<div class="clearfix cs-vpad">';
	confirmationHtmlTag += '<div class="cs-tr cs-pa cs-close-bn cs-conmes-close-pos cs-cur" title="close">';
	confirmationHtmlTag += '<a href="#"><i class="cs-ts-18 cs-whitec icon-cs-reject-o cs-tooltip-top"></i></a>';
	confirmationHtmlTag += '</div>';
	confirmationHtmlTag += '<h3 class="cs-ts-21 cs-tc cs-tsmar cs-tn cs-tw-500 cs-graylightc">' + message + '</h3>';
	if (messageContent != undefined) {
		confirmationHtmlTag += '<div class="cs-confirmpopup-height cs-scroll-2 cs-pr">';
		confirmationHtmlTag += '<p class="cs-ts-14 cs-hpad  cs-bpad cs-tn cs-graylightc cs-hmar">';
		confirmationHtmlTag += messageContent;
		confirmationHtmlTag += '</p>';
		confirmationHtmlTag += '</div>';
	}
	confirmationHtmlTag += '<div class="cs-tc cs-tsmar">';
	confirmationHtmlTag += '<button class="ok-btn cs-btn cs-btn-default cs-close-bn cs-hmar">' + okLable + '</button>';
	confirmationHtmlTag += '<button class="cancel-btn cs-btn cs-btn-default cs-close-bn cs-hmar">' + cancelLable + '</button>';
	confirmationHtmlTag += '</div>';
	confirmationHtmlTag += '</div>';
	confirmationHtmlTag += '</div>';
	var confirmationHtmlObject = $(confirmationHtmlTag);
	confirmationHtmlObject.find(".ok-btn").on("click", function () {
		if (typeof okFunction === "string") {
			window[okFunction]();
		} else {
			okFunction();
		}
		$('#confirmation-dialog-confpopup').dialog('close');
	});
	confirmationHtmlObject.find(".cancel-btn").on("click", function () {
		if (typeof cancelFunction === "string") {
			window[cancelFunction]();
		} else {
			cancelFunction();
		}
		$('#confirmation-dialog-confpopup').dialog('close');
	});
	if (noneProperty == "noneProperty") {
		confirmationHtmlObject.find(".cs-close-bn").on("click", function () {
			if (typeof cancelFunction === "string") {
				window[cancelFunction]();
			} else {
				cancelFunction();
			}
			$('#confirmation-dialog-confpopup').dialog('close');
		});
	} else {
		confirmationHtmlObject.find(".cs-close-bn").on("click", function () {
			$('#confirmation-dialog-confpopup').dialog('close');
		});
	}

	confirmationHtmlObject.find(".cs-tooltip-top").tooltip({
		position: {
			my: "center bottom",
			at: "center top-10",
			using: function (position, feedback) {
				$(this).css(position);
				$(this).addClass("cs-tooltip-top-block");

			}
		}
	});
	$('body #confirmation-dialog-confpopup').remove();
	if ($('body #confirmation-dialog-confpopup').length) {
		$("#confirmation-dialog-confpopup").dialog("destroy");
	}
	$('body').append(confirmationHtmlObject);
	var tempWidth = $("#confirmation-dialog-confpopup").width();
	tempWidth = (autoAdjustable) ? ((tempWidth + 20 <= 650) ? tempWidth + 20 : 650) : 330;
	$("#confirmation-dialog-confpopup").dialog({
		modal: true,
		width: tempWidth,
		show: {
			effect: "fade",
			duration: 500
		},
		hide: {
			effect: "fade",
			duration: 500
		},
		open: function () {
			if (noneProperty == "noneProperty") {
				$('.ui-widget-overlay').on('click', function () {
					if (typeof cancelFunction === "string") {
						window[cancelFunction]();
					} else {
						cancelFunction();
					}
					$('#confirmation-dialog-confpopup').dialog('close');
				})
			} else {
				$('.ui-widget-overlay').on('click', function () {
					$('#confirmation-dialog-confpopup').dialog('close');
				})
			}
		}
	});
	$("#confirmation-dialog-confpopup").dialog().siblings(".ui-dialog-titlebar").hide();
	$(".cs-scroll-2").perfectScrollbar();

}

function dialogWindow(message) {
	var tableRow = "";
	tableRow += '<div id="dialog" title="Delete Validation Message" class ="cs-default-theme">';
	tableRow += '<div class="cs-pad">';
	tableRow += '<div class="cs-ts-12 cs-hpad  cs-bpad cs-tn cs-graylightc cs-hmar">' + message + '</div>';
	tableRow += '</div>';
	tableRow += '</div>';
	$('body').append(tableRow);
	$("#dialog").dialog({
		resizable: true,
		close: function () {
			$("#dialog").remove();
		}
	});
	$("#dialog").dialog("option", "width", 680);

	return false;


}

function invokeAlertMessage(title, message, type, transaction, icon, info) {
	var moreinfo = "";
	moreinfo = "<ul class=\"cs-list-unstyled cs-vmar cs-noti-scroll cs-rmar\">";
	$.each(info, function (index, value) {
		moreinfo += "<li>";
		moreinfo += value;
		moreinfo += "</li>";
	});
	moreinfo += "</ul>";
	alertMessage(title, message, type, transaction, icon, moreinfo);
	$(".cs-more-alert-block").hover(function () {
		$('.cs-noti-scroll').perfectScrollbar();
	});
}