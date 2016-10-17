$(document).ready(function() {
	getUsers();
});

function getUsers() {
	$.ajax({
		type : "GET",
		url : "api/user",
		dataType : "json",
		success : printUsersTable
	}).fail(function() {
		console.log('It blew up')
	});
};
var printUsersTable = function(data) {

	var $table = $('<table>');
	var $thead = $('<thead>');
	var $tRow = $('<tr>');
	var $th = $('<th>');
	$th.text("User");
	var $th1 = $('<th>');
	$th1.text("Daily");
	var $th2 = $('<th>');
	$th2.text("Weekly");
	var $th3 = $('<th>');
	$th3.text("Avg Pain");
	var $th4 = $('<th>');
	$th4.text("Avg Duration");
	var $th5 = $('<th>');
	$th5.text("Symptoms");
	var $th6 = $('<th>');
	$th6.text("Events")
	var $tbody = $('<tbody>');
	$tRow.append($th, $th1, $th2, $th3, $th4, $th5, $th6);

	$thead.append($tRow);
	$table.append($thead)

	data.forEach(function(value, index, array) {

		var duration = [];
		var pain = [];
		var symptoms = [];
		var onset = [];

		for ( var variable in value) {
			var $tr = $('<tr>');
			if (variable === "id") {
				var $td = $('<td>');
				$td.text(value[variable]);
				var id = value[variable];
			}
			if (variable === "amtDay") {
				var $td1 = $('<td>');
				$td1.text(value[variable]);
			}
			if (variable === "amtWeek") {
				var $td2 = $('<td>');
				$td2.text(value[variable]);
			}
			if (variable === "avgPainScale") {
				var $td3 = $('<td>');
				$td3.text(value[variable]);
			}
			if (variable === "avgDuration") {
				var $td4 = $('<td>');
//				$td4.text(value[variable]);
			}
			if (variable === "overallSymptoms") {
				var $td5 = $('<td>');
				$td5.text(value[variable]);
			}

			$tr.append($td, $td1, $td2, $td3, $td4, $td5);
			$tbody.append($tr);

			if (variable === "headaches") {

				var $td6 = $('<td>');
				var $eventBtn = $('<button>');
				$eventBtn.text('Events')

				$tr.append($td6);
				$td6.append($eventBtn);
				$table.append($tbody);
				$("#table").append($table);

				$eventBtn.on('click', function() {
					$('#table').empty();

					var $htable = $('<table>');
					var $hthead = $('<thead>');
					var $htRow = $('<tr>');
					var $hth = $('<th>');
					$hth.text("Id");
					var $hth1 = $('<th>');
					$hth1.text("Onset");
					var $hth2 = $('<th>');
					$hth2.text("Duration");
					var $hth3 = $('<th>');
					$hth3.text("Amount of Sleep");
					var $hth4 = $('<th>');
					$hth4.text("Pain Scale");
					var $hth5 = $('<th>');
					$hth5.text("Symptoms")
					var $hth6 = $('<th>');
					var $newEventBtn = $('<button>');
					$newEventBtn.text('New Event')
					$newEventBtn.attr('id', value[variable])
					var $htbody = $('<tbody>');

					$htRow.append($hth, $hth1, $hth2, $hth3, $hth4, $hth5,
							$hth6);
					$hth6.append($newEventBtn);
					$hthead.append($htRow);
					$htable.append($hthead)

					$newEventBtn.on('click', function() {
						$('#table').empty();
						printEventForm(id);

					});

					value[variable].forEach(function(value, index, array) {

						for ( var variable in value) {

							var $htr = $('<tr>');
							if (variable === "id") {
								var $htd = $('<td>');
								$htd.text(value[variable]);
								var eventId = value[variable];
							}
							if (variable === "onset") {
								var $htd1 = $('<td>');
								$htd1.text(value[variable]);
								var onsetId = value[variable]
								onset.push(onsetId)

							}
							if (variable === "duration") {
								var $htd2 = $('<td>');
								$htd2.text(value[variable]);
								var durationId = value[variable];
								duration.push(durationId)

							}
							if (variable === "amtSleep") {
								var $htd3 = $('<td>');
								$htd3.text(value[variable]);
								var sleepId = value[variable];

							}
							if (variable === "painScale") {
								var $htd4 = $('<td>');
								$htd4.text(value[variable]);
								var painId = value[variable];
								pain.push(painId)

							}
							if (variable === "symptoms") {
								var $htd5 = $('<td>');
								$htd5.text(value[variable]);
								var symptomId = value[variable];
								if (symptoms.length <= array.length) {
									symptoms.push(symptomId)
								}
							}

						} // end of headache for in

						var $htd6 = $('<td>');
						var $editBtn = $('<button>');
						$editBtn.text("Edit Event")
						$htr.append($htd, $htd1, $htd2, $htd3, $htd4, $htd5,
								$htd6);
						$htd6.append($editBtn);
						$htbody.append($htr);

						$editBtn.on('click', function() {
							$('#table').empty();
							editEventForm(id, eventId, onsetId, durationId,
									sleepId, painId, symptomId);
						});

					}); // end of headache for each
					console.log(symptoms)

					var totalDuration = duration.reduce(function(a, b) {
						var avgDuration = (a + b) / duration.length;
						 console.log(avgDuration)
						return avgDuration;
					});
					var totalPain = pain.reduce(function(a, b) {
						var avgPain = (a+b)/pain.length;  
						console.log(avgPain)
						return avgPain;
					});

					
					$htable.append($htbody);
					$('#table').append($htable);
				}); // end of event eventlistener

			} // end of if statement for headache variable

		} // end of for in

	}); // end of Main forEach

} // end of print table

var printEventForm = function(id) {
	var id = id;
	var $form = $('<form>');
	$form.attr("id", "myForm");
	var $onSet = $('<input>');
	$onSet.attr("placeholder", "time started: in minutes");
	$onSet.val("");
	$onSet.attr("id", "onSet");

	var $duration = $('<input>');
	$duration.attr("placeholder", "duration: in minutes");
	$duration.val("");
	$duration.attr("id", "duration");
	var $sleep = $('<input>');
	$sleep.attr("placeholder", "Amt Slept: in minutes");
	$sleep.val("");
	$sleep.attr("id", "sleep");
	var $pain = $('<input>');
	$pain.attr("placeholder", "Pain Level: 1-10");
	$pain.val("");
	$pain.attr("id", "pain");

	var $symptoms = $('<input>');
	$symptoms.attr("placeholder", "List Symptoms");
	$symptoms.val("");
	var $submit = $('<button>');
	$submit.attr("type", "input");
	$submit.val("submit");
	$submit.text("submit");

	$form.append($onSet, $duration, $sleep, $pain, $symptoms, $submit);

	$('#table').append($form);

	$submit.on('click', function() {
		newUserEvent(id);
	});

	var newUserEvent = function(id) {

		var newEvent = {
			"onset" : $onSet.val(),
			"duration" : $duration.val(),
			"amtSleep" : $sleep.val(),
			"painScale" : $pain.val(),
			"symptoms" : $symptoms.val()
		};

		var eventString = JSON.stringify(newEvent);
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "api/user/" + id + "/headache",
			dataType : "json",
			data : eventString,
			success : printUpdatedTable
		}).fail(function() {
			console.log('It blew up')
		});

	}; // end of newUserEvent function
}; // end of print Event form

var editEventForm = function(id, eventId, onsetId, durationId, sleepId, painId,
		symptomId) {
	var $form = $('<form>');
	$form.attr("id", "myForm");
	var $onSet = $('<input>');
	$onSet.val(onsetId);
	$onSet.attr("id", "onSet");

	var $duration = $('<input>');
	$duration.val(durationId);
	$duration.attr("id", "duration");
	var $sleep = $('<input>');
	$sleep.val(sleepId);
	$sleep.attr("id", "sleep");
	var $pain = $('<input>');
	$pain.val(painId);
	$pain.attr("id", "pain");

	var $symptoms = $('<input>');
	$symptoms.val(symptomId);
	var $submit = $('<button>');
	$submit.attr("type", "input");
	$submit.val("submit");
	$submit.text("submit");

	$form.append($onSet, $duration, $sleep, $pain, $symptoms, $submit);

	$('#table').append($form);

	$submit.on('click', function() {
		editUserEvent(eventId);
	});
	var editUserEvent = function() {

		var editEvent = {
			"onset" : $onSet.val(),
			"duration" : $duration.val(),
			"amtSleep" : $sleep.val(),
			"painScale" : $pain.val(),
			"symptoms" : $symptoms.val()
		};

		var eventString = JSON.stringify(editEvent);
		$.ajax({
			type : "PUT",
			contentType : "application/json",
			url : "api/user/" + id + "/headache/" + eventId,
			dataType : "json",
			data : eventString,
			success : printUpdatedTable
		}).fail(function() {
			console.log('It blew up')
		});

	}; // end editUserEvent

} // end editEventForm

