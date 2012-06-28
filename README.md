# jQuery Countdown

## Usage

  <div id="countdown"></div>

	$("#countdown").countdown({
		start_date: 1337210700000,
		end_date: 1337210800000
	});

## Options

* start_date (required) - the starting time in epoc milliseconds
* end_date (required) - the end time in epoc milliseconds
* format - how your string will be printed
* start (function) - runs once when the countdown starts
* done (function) - runs once when the countdown reaches zero
* tick (function) - runs every second, containing all values for custom purposes

## Example

	start_date: 1337210800000,
	end_date: 1337326800000,
	format: "%dddd, %hhhh, %mmmm och %ssss",
	labels: { day: ["dag", "dagar"], hour: ["timme", "timmar"], minute: ["minut", "minuter"], second: ["sekund", "sekunder"] },
	start: function($element) {
		console.log("The final countdown has begun");
	},
	done: function($element) {
		console.log("The counter is at zero");
	},
	tick: function($element, values) {
		console.log(values);
	}


## Available formats

* %dddd - Zero padded day with label
* %ddd - Single day with label
* %dd - Zero padded day
* %d - Single day digit
* %hhhh - Zero padded hour with label
* %hhh - Single hour with label
* %hh - Zero padded hour
* %h - Single hour digit
* %mmmm - Zero padded minute with label
* %mmm - Single minute with label
* %mm - Zero padded minute
* %m - Single minute digit
* %ssss - Zero padded second with label
* %sss - Single second with label
* %ss - Zero padded second
* %s - Single second digit

The default format is: **%hh:%mm:%ss**