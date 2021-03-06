$(document).ready(function() {
	getUsers();
});

function getUsers() {
	$.ajax({
		type : "GET",
		url : "api/user",
		dataType : "json",
		success : printUsersList
	}).fail(function() {
		console.log('It blew up')
	});
};

var printUsersList = function(dataArr) {
	$('#table').empty();
	$('#user').empty();
	var $header = $('<h3>');
	$header.text('Headache Event Logger')
	var $ul = $('<ul>');
	$ul.text("Select User");
	dataArr.forEach(function(value, index, array) {
	
		for ( var variable in value) {
	
			if (variable === "id") {
				var $li = $('<li>');
				var id = value[variable];
				var $userBtn = $('<button>');
				$userBtn.attr('id', value[variable])
				$userBtn.text("User Id: " + value[variable]);
			}
			$("#table").append($header)
			$ul.append($li);
			$li.append($userBtn)
			$("#table").append($ul);
			if (variable === "headaches") {

				$userBtn.on('click', function() {
					event.preventDefault()
					getUser(id);
				})
		}
	}
})
}

var getUser = function(id){
	
$.ajax({
	type : "GET",
	url : "api/user/" +id,
	dataType : "json",
	success : printUserEvents
}).fail(function() {
	console.log('It blew up')
});
};


var printUserEvents = function(dataArr) {
	$('#table').empty();
	$('#user').empty();
	console.log(dataArr)

		var duration = [];
		var pain = [];
		var symptoms = [];
		
	
		for ( var variable in dataArr) {
			if(variable === "id"){
				var id = dataArr[variable]
				
			}
			if(variable === "headaches") {
				var $header2 = $('<h3>');
				$header2.text('User ' + id + ": Headache Events")
				var $table = $('<table>');
				var $thead = $('<thead>');
				var $tRow = $('<tr>');
				var $th = $('<th>');
				$th.text("Id");
				var $th1 = $('<th>');
				$th1.text("Onset");
				var $th2 = $('<th>');
				$th2.text("Duration");
				var $th3 = $('<th>');
				$th3.text("Amount of Sleep");
				var $th4 = $('<th>');
				$th4.text("Pain Scale");
				var $th5 = $('<th>');
				$th5.text("Symptoms")
				var $th6 = $('<th>');
				$th6.text("Edit Event")
				var $th7 = $('<th>');
				$th7.text("Delete Event")

				var $btnRow = $('<tr>');

				var $newEventBtn = $('<button>');
				$newEventBtn.text('New Event')
				$newEventBtn.attr('id', dataArr[variable])
				var $viewComprehensive = $('<button>');
				$viewComprehensive.text("View Calculated Data");
				$viewComprehensive.attr('id', dataArr[variable])
				var $tbody = $('<tbody>');

				$tRow.append($th, $th1, $th2, $th3, $th4, $th5, $th6, $th7);

				

				$newEventBtn.on('click', function() {
					event.preventDefault()
					$('#table').empty();
					printEventForm(id);
				});

				dataArr[variable].forEach(function(value, index, array) {

					for ( var variable in value) {
						console.log(value+"+++++++++++++++++++")
						var $tr = $('<tr>');
						if (variable === "id") {
							var $td = $('<td>');
							$td.text(value[variable]);
							var eventId = value[variable];
							
						}
						if (variable === "onset") {
							var $td1 = $('<td>');
							$td1.text(value[variable]);
							var onsetId = value[variable]
							console.log(value[variable])
						}
						if (variable === "duration") {
							var $td2 = $('<td>');
							$td2.text(value[variable] + " minutes");
							var durationId = value[variable];
							duration.push(durationId)

						}
						if (variable === "amtSleep") {
							var $td3 = $('<td>');
							$td3.text(value[variable] + " minutes");
							var sleepId = value[variable];

						}
						if (variable === "painScale") {
							var $td4 = $('<td>');
							$td4.text(value[variable]);
							var painId = value[variable];
							pain.push(painId)
						}
						if (variable === "symptoms") {
							var $td5 = $('<td>');
							$td5.text(value[variable]);
							var symptomId = value[variable];
							if (symptoms.length <= array.length) {
								symptoms.push(symptomId)
							}
						}

					} // end of headache
					// for in

					var $td6 = $('<td>');
					var $editBtn = $('<button>');
					$editBtn.text("Edit Event")
					var $td7 = $('<td>');
					var $deleteBtn = $('<button>');
//					$deleteBtn.attr("id", index);
					$deleteBtn.text('Delete Event')
					$tr.append($td, $td1, $td2, $td3, $td4, $td5, $td6, $td7);
					$td6.append($editBtn);
					$td7.append($deleteBtn);
					$tbody.append($tr);

					$btnRow.append($newEventBtn)
					$btnRow.append($viewComprehensive)
					$('#user').append($btnRow);
					$editBtn.on('click', function() {
						$('#table').empty();
						editEventForm(id, eventId, onsetId, durationId,
								sleepId, painId, symptomId);
					}); //end of edit btn
					
					$deleteBtn.on('click', function() {
						event.preventDefault()
						confirm("Confirm Deletion of Event")
						if (response) {
							deleteEvent(id, eventId)
						}
					}); //end of delete btn
					$thead.append($tRow);
					$table.append($thead)
					$('#table').append($header2);
					$table.append($tbody);
					$('#table').append($table);
				}); //end of headache forEach
				
					
				
				var sum = pain.reduce(function(total, num) {
					return total + num
				}, 0);

				var apain = parseInt(sum/ pain.length)
				var sum = duration.reduce(function(total, num) {
					return total + num
				}, 0);

				var aduration = parseInt(sum/ duration.length)
				
				var uniqSymptoms = symptoms.sort().filter(function(val, i, a) {
						if (i == a.indexOf(val))
							return 1;
							return 0
						})
				var tSymptoms = uniqSymptoms.join().split(",")

				var totalSymptoms = tSymptoms.sort().filter(function(val, i, a) {
						if (i == a.indexOf(val))
							return 1;
							return 0
						})
				$viewComprehensive.on('click',function() {
					event.preventDefault()
					$('#table').empty();
					$('#user').empty();
					comprehensiveUser(id,apain,aduration,totalSymptoms,symptoms);
				}); // end of viewCom event
			}
		};
	
} //end of print UserEvents

var printEventForm = function(id) {
	var id = id;
	var $form = $('<form>');
	$form.attr("id", "myForm");
	var $newEventHeader = $('<h3>');
	$newEventHeader.text("Input New Headache Event")
	var $onSet = $('<input>');
	$onSet.attr("placeholder", "time started: in minutes");
	$onSet.val("");
	$onSet.attr("id", "onSet");
	var $break1 = $('<br>')
	var $break2 = $('<br>')
	var $duration = $('<input>');
	$duration.attr("placeholder", "duration: in minutes");
	$duration.val("");
	$duration.attr("id", "duration");
	var $break3 = $('<br>')
	var $break4 = $('<br>')
	var $sleep = $('<input>');
	$sleep.attr("placeholder", "Amt Slept: in minutes");
	$sleep.val("");
	$sleep.attr("id", "sleep");
	var $break5 = $('<br>')
	var $break6 = $('<br>')
	var $pain = $('<input>');
	$pain.attr("placeholder", "Pain Level: 1-10");
	$pain.val("");
	$pain.attr("id", "pain");
	var $break7 = $('<br>')
	var $break8 = $('<br>')
	var $symptoms = $('<input>');
	$symptoms.attr("placeholder", "List Symptoms");
	$symptoms.val("");
	var $break9 = $('<br>')
	var $break10 = $('<br>')
	var $submit = $('<button>');
	$submit.attr("type", "input");
	$submit.val("submit");
	$submit.text("submit");

	$form.append($newEventHeader,$onSet, $break1,$break2, $duration, $break3,$break4, $sleep, $break5,$break6, $pain,
			$break7,$break8, $symptoms, $break9,$break10, $submit);

	$('#table').append($form);

	$submit.on('click', function() {
		
		event.preventDefault()
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
			success : getUser
		}).fail(function() {
			console.log('It blew up')
		});

	}; // end of newUserEvent function
}; // end of print Event form
var deleteEvent = function(id, eventId) {

	$.ajax({
		type : "DELETE",
		url : "api/user/" + id + "/headache/" + eventId,
		success : getUser
	}).fail(function() {
		console.log('It blew up')
	});

}  // end of deleteEvent

var editEventForm = function(id, eventId, onsetId, durationId, sleepId, painId,
		symptomId) {
	var $form = $('<form>');
	$form.attr("id", "myForm");
	var $formHeader = $('<h3>');
	$formHeader.text("Edit Event")
	var $onSet = $('<input>');
	$onSet.val(onsetId);
	$onSet.text(onsetId);
	$onSet.attr("id", "onSet");
	var $time = $('<p>');
	$time.text('Time of Onset: 24Hr Clock');
	var $break1 = $('<br>')
	var $duration = $('<input>');
	$duration.val(durationId);
	$duration.attr("id", "duration");
	var $dur = $('<p>');
	$dur.text('Duration of symptoms: Length in minutes');
	var $break2 = $('<br>')
	var $sleep = $('<input>');
	$sleep.val(sleepId);
	$sleep.text(sleepId + ": minutes");
	$sleep.attr("id", "sleep");
	var $sleeptext = $('<p>');
	$sleeptext.text('Amount of sleep before symptoms: Length in minutes');
	var $break3 = $('<br>')
	var $pain = $('<input>');
	$pain.val(painId);
	$pain.attr("id", "pain");
	var $painIndex = $('<p>');
	$painIndex.text('Scale of Pain: 1-10');
	var $break4 = $('<br>')
	var $symptoms = $('<input>');
	$symptoms.val(symptomId);
	var $symptIndex = $('<p>');
	$symptIndex.text('List Symptoms');
	var $break5 = $('<br>')
	var $break6 = $('<br>')
	var $submit = $('<button>');
	$submit.attr("type", "input");
	$submit.val("submit");
	$submit.text("submit");


	$form.append($formHeader,$time, $onSet, $break1,$dur, $duration, $break2,$sleeptext, $sleep,
			$break3,$painIndex, $pain, $break4,$symptIndex, $symptoms, $break5,$break6, $submit);

	$('#table').append($form);

	$submit.on('click', function() {
//		event.preventDefault()
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
			success : printUserEvents
		}).fail(function() {
			console.log('It blew up')
		});

	}; // end editUserEvent

} // end editEventForm
var comprehensiveUser = function(id, apain, aduration, totalSymptoms, symptoms) {
	var $ctable = $('<table>');
	var $cthead = $('<thead>');
	var $ctRow = $('<tr>');
	var $cth = $('<th>');
	$cth.text("User");
	var $cth1 = $('<th>');
	$cth1.text("Avg Pain");
	var $cth2 = $('<th>');
	$cth2.text("Avg Duration");
	var $cth3 = $('<th>');
	$cth3.text("Experienced Symptoms");
	var $cth4 = $('<th>');
	$cth4.text("Events")
	var $ctbody = $('<tbody>');
	$ctRow.append($cth, $cth1, $cth2, $cth3, $cth4);

	$cthead.append($ctRow);
	$ctable.append($cthead)

	var $ctdRow = $('<tr>');
	var $ctd = $('<td>');
	$ctd.val(id);
	$ctd.text(id);
	var $ctd1 = $('<td>');
	$ctd1.val(apain);
	$ctd1.text(apain);
	var $ctd2 = $('<td>');
	$ctd2.val(aduration);
	$ctd2.text(aduration + " minutes");
	var $ctd3 = $('<td>');
	var $ctd4 = $('<td>');
	var $cBtn = $('<button>')
	$cBtn.text("Go Back");
	$ctdRow.append($ctd, $ctd1, $ctd2, $ctd3, $ctd4);

	var $symptomsList = $('<ul>');
	totalSymptoms.forEach(function(value, index, array) {

		var $symptomsData = $('<li>');
		$symptomsData.attr("id", "sympList")
		$symptomsData.val(value);
		$symptomsData.text(value);

		$symptomsList.append($symptomsData);
		$ctd3.append($symptomsList);
		$ctd4.append($cBtn);
		$ctable.append($ctdRow)
		$('#table').append($ctable);

	})

	$cBtn.on('click', function() {
		event.preventDefault()
		getUser(id)
	});

} // comprehensive userTable