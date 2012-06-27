(function ($) {

	// replace 'pluginName' with the name of your plugin
	$.fn.countdown = function(options) {
		// plugin default options
		var defaults = {
			intervals: new Array(),
			timers: new Array(),
			interval: 1,
			start_date: null,
			end_date: null,
			format: "hh:mm:ss",
			success: null,
			done: null,
			tick: null
		};

		// extends defaults with options provided
		if (options) {
			$.extend(defaults, options);
		}

		window.countdownIntervals = defaults.intervals;

		if (defaults.end_date === null)
			return;

		//Iterate over matched elements
		return this.each(function () {
			var $this = $(this);
			var index = $this.index();
			console.log(index)

			//Set initial seconds
			defaults.start_date = defaults.start_date / 1000;
			defaults.end_date = defaults.end_date / 1000;
			var now = new Date(defaults.start_date);
			var to = new Date(defaults.end_date);
			var difference = (to - now);
			defaults.timers[index] = difference;

			//Run the start callback
			if (typeof(defaults.start) === "function")
				defaults.start($this);

			setTimerText($this, defaults.timers[index], defaults);

			//Start the interval
			defaults.intervals[index] = window.setInterval(function () {
				defaults.timers[index] -= defaults.interval;
				setTimerText($this, defaults.timers[index], defaults);
				if (defaults.timers[index] < 1) {
					stop(defaults.intervals[index]);
					//Run the done callback
					if (typeof(defaults.done) === "function")
						defaults.done($this);
				}
			}, 1000);
		});

	};

	// private functions definition
	function format(secs, format, defaults) {
		var hr = Math.floor(secs / 3600);
		var days = Math.floor(hr / 24);

		var min = Math.floor((secs - (hr * 3600)) / 60);
		var sec = Math.floor(secs - (hr * 3600) - (min * 60));

		if (format.indexOf('dd') >= 0 || format.indexOf('d') >= 0)
			hr -= (days * 24);

		if (days < 10)
			days = "0" + days;
		if (hr < 10)
			hr = "0" + hr;
		if (min < 10)
			min = "0" + min;
		if (sec < 10)
			sec = "0" + sec;

		if (typeof(defaults.tick) === "function")
			defaults.tick({ days: days, hours: hr, minutes: min, seconds: sec});

		if (format != null) {
			var formatted_time = format;
			formatted_time = formatted_time.replace('(dd)', days);
			formatted_time = formatted_time.replace('(d)', days * 1 + ""); // check for single day formatting
			formatted_time = formatted_time.replace('(hh)', hr);
			formatted_time = formatted_time.replace('(h)', hr * 1 + ""); // check for single hour formatting
			formatted_time = formatted_time.replace('(mm)', min);
			formatted_time = formatted_time.replace('(m)', min * 1 + ""); // check for single minute formatting
			formatted_time = formatted_time.replace('(ss)', sec);
			formatted_time = formatted_time.replace('(s)', sec * 1 + ""); // check for single second formatting
			return formatted_time;
		}
		else {
			return hr + ':' + min + ':' + sec;
		}
	}

	function setTimerText($this, seconds, defaults) {
		return $this.text(format(Math.round(seconds), defaults.format, defaults));
	}

	function stop(timer) {
		window.clearInterval(timer);
	}

})(jQuery);