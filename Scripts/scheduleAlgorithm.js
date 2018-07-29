const firebase = require('./firebase.js');
const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');
const db = firebase.database
const mockData = ['MF|12001330|W|17201800', 'MF|11001230|W|16201700',
'MF|13201500|W|08000901', 'MF|11001231|W|16201900', 'MF|09001030|W|14201600'];
const weekdays = {
	m: [],
	t: [],
	w: [],
	r: [],
	f: [],
	s: []
}

async function fetchList(reference) {
	return new Promise((resolve) => {
		db.ref().once('value', (snapshot) => {
			var response = [];
			snapshot.forEach((snapshotChild) => {
				response.push(snapshotChild.val());
			});
			resolve(response);
		})
	})
}

function convertTime(timeList) {
	var response = []
	timeList.forEach((time) => {
		response.push([parseInt(time.slice(0,4)), parseInt(time.slice(4))])
	})
	return response
}

function putClass(scheduleRoot, classTimeString) {
	let schedule = JSON.parse(JSON.stringify(scheduleRoot));
	classTime = classTimeString.split('|');
	for (var i = 0; i < classTime.length; i += 2) {
		var startTime = parseInt(classTime[i+1].slice(0,4));
		var endTime = parseInt(classTime[i+1].slice(4));
		var dates = classTime[i].toLowerCase().split('');
		for (var i = 0; i < dates.length; i++) {
			date = dates[i]
			var flag = false;
			for (var periodIndex = 0; periodIndex < schedule[date].length; periodIndex++) {
				if (schedule[date][periodIndex][0] <= startTime && schedule[date][periodIndex][1] >= endTime) {
					if (endTime != schedule[date][periodIndex][1]) {
						schedule[date].splice(periodIndex+1, 0, [endTime, schedule[date][periodIndex][1]]);
					}
					if (startTime != schedule[date][periodIndex][0]) {
						schedule[date].splice(periodIndex+1, 0, [schedule[date][periodIndex][0], startTime]);
					}
					schedule[date].splice(periodIndex, 1);
					flag = true;
					break;
				}
			}
			if (!flag) {
				return false;
			}
		};
	}
	return schedule;
}

async function test(m = ['12001330'], t = ['00002400'], 
	w = ['00002400'], r = ['00002400'], 
	f = ['00002400'], s = ['00002400']) {
	let selectedTime = JSON.parse(JSON.stringify(weekdays));
	let classTime = JSON.parse(JSON.stringify(weekdays));

	// Set default time
	selectedTime.m = convertTime(m);
	selectedTime.t = convertTime(t);
	selectedTime.w = convertTime(w);
	selectedTime.r = convertTime(r);
	selectedTime.f = convertTime(f);
	selectedTime.s = convertTime(s);

	mockData.forEach((string) => {
		console.log(putClass(selectedTime, string));
	})

	// Populate time using mock data.
	mockData.forEach((time) => {
		time = time.split('|');
		for (var i = 0; i < time.length; i += 2) {
			time[i].toLowerCase().split('').forEach((date) => {
				classTime[date].push([time[i+1].slice(0,4), time[i+1].slice(4)]);
			});
		}
	});
	Object.keys(classTime).forEach((key) => {
		classTime[key].sort();
	})

	// console.log(classTime);
}


// test();

(function(a) {
	db.ref('/CS').orderByChild('className')
	.equalTo('CS1100').once('value').then((snapshot) => {
		snapshot.val().forEach((snap) => {
			console.log(snap);
		})
	})
})()

