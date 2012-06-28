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
			format: "%hh:%mm:%ss",
			labels: { day: ["day", "days"], hour: ["hour", "hours"], minute: ["minute", "minutes"], second: ["second", "seconds"] },
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

	function format($this, secs, format, defaults) {
		//Calculations
		var hr = Math.floor(secs / 3600);
		var days = Math.floor(hr / 24);

		var min = Math.floor((secs - (hr * 3600)) / 60);
		var sec = Math.floor(secs - (hr * 3600) - (min * 60));

		if (format.indexOf('dd') >= 0 || format.indexOf('d') >= 0)
			hr -= (days * 24);

		//Add a zero before single digits
		if (days < 10)
			days = "0" + days;
		if (hr < 10)
			hr = "0" + hr;
		if (min < 10)
			min = "0" + min;
		if (sec < 10)
			sec = "0" + sec;

		//Set the correct labels, singular or plural
		var labels = {};
		if (defaults.labels != null) {
			labels.day = (days * 1 === 1) ? defaults.labels.day[0] : defaults.labels.day[1]
			labels.hour = (hr * 1 === 1) ? defaults.labels.hour[0] : defaults.labels.hour[1]
			labels.min = (min * 1 === 1) ? defaults.labels.minute[0] : defaults.labels.minute[1]
			labels.sec = (sec * 1 === 1) ? defaults.labels.second[0] : defaults.labels.second[1]
		}

		var formatted_time;
		if (format != null) {
			formatted_time = format;
			formatted_time = formatted_time.replace('%dddd', days + " " + labels.day);
			formatted_time = formatted_time.replace('%ddd', days * 1 + " " + labels.day);
			formatted_time = formatted_time.replace('%dd', days);
			formatted_time = formatted_time.replace('%d', days * 1 + "");

			formatted_time = formatted_time.replace('%hhhh', hr + " " + labels.hour);
			formatted_time = formatted_time.replace('%hhh', hr * 1 + " " + labels.hour);
			formatted_time = formatted_time.replace('%hh', hr);
			formatted_time = formatted_time.replace('%h', hr * 1 + "");

			formatted_time = formatted_time.replace('%mmmm', min + " " + labels.min);
			formatted_time = formatted_time.replace('%mmm', min * 1 + " " + labels.min);
			formatted_time = formatted_time.replace('%mm', min);
			formatted_time = formatted_time.replace('%m', min * 1 + "");

			formatted_time = formatted_time.replace('%ssss', sec + " " + labels.sec);
			formatted_time = formatted_time.replace('%sss', sec * 1 + " " + labels.sec);
			formatted_time = formatted_time.replace('%ss', sec);
			formatted_time = formatted_time.replace('%s', sec * 1 + "");
		}
		else {
			formatted_time = hr + ':' + min + ':' + sec;
		}

		if (typeof(defaults.tick) === "function")
			defaults.tick($this, { days: days, hours: hr, minutes: min, seconds: sec, labels: labels, formatted_time: formatted_time });

		return formatted_time;
	}

	function setTimerText($this, seconds, defaults) {
		return $this.html(format($this, Math.round(seconds), defaults.format, defaults));
	}

	function stop(timer) {
		window.clearInterval(timer);
	}

})(jQuery);