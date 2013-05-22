( function( $ ) {
	"use strict";

	$.tipInfo = $.tipInfo || { };

	$.tipInfo.config = {
		options: {
				singleton 		: true
			,	width			: 'auto'
			,	height			: '25px'
			,	iconType		: 'success'
			,	title			: 'demo please input title'
			,	hideTime		: 10000
		}
	};

	/*
		
	*/
	$.fn.tip = function( params ) {
		var options = $.extend({}, $.tipInfo.config.options, params);
		tip(this, options);
	};

	function tip( root, options ) {
		var oWrapper 		= root
		,	$tip 			= undefined
		,	sTipId			= "tip" + parseInt(Math.random() * 500)
		,	timerId			= 0
		;

		function initialize() {
			if((options.singleton === true) && (oWrapper.attr("hasTip") === 'true')) {
				return;
			}

			if (oWrapper.data("sTipId") == null) {
				oWrapper.data("sTipId", sTipId);
				create(options);
			} else {
				sTipId = oWrapper.data("sTipId");
				$tip = $("#" + sTipId);
			}

			setSize(options);
			setPosition();
			setEvent();
			$tip.show();

			timerId = setTimeout(function() {
				timerId = 0;
				hideTip();
			}, options.hideTime);
			oWrapper.attr("hasTip", "true");
		};

		function create(oTipInfo) {
			var html = []
			;

			html[html.length] = '<div id="' + sTipId + '" class="tip">';

			html[html.length] = '<a close=1 class="tip_close">&times;</a>';
			//html[html.length] = '<div class="' + oTipInfo.iconType + '"></div>';

			html[html.length] = '<div class="tip_title">' + oTipInfo.title + '</div>';

			html[html.length] = '</div>';

			$('body').append(html.join(''));
			$tip = $("#" + sTipId);
		};

		function setSize(oTipInfo) {
			$tip.css('width', oTipInfo.width);
			$tip.css('height', oTipInfo.height);
		};

		function setPosition() {
			$tip.css('top', oWrapper.offset().top + oWrapper.height());
			$tip.css('left', oWrapper.offset().left);
		};

		function hideTip() {
			$tip.hide();
			oWrapper.attr("hasTip", "false");
			if (timerId != 0) {
				clearTimeout(timerId);
				timerId = 0;
			}
		}

		function setEvent() {
			$tip.click(function(event) {
				if($(event.target).attr('close') == 1) {
					hideTip();
				}
			});
		};

		initialize();
	};



}(jQuery));