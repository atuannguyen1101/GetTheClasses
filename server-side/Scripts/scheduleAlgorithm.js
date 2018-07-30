// const mockData = ['MF|12001330|W|17201800', 'MF|11001230|W|16201700',
// 'MF|13201500|W|08000901', 'MF|11001231|W|16201900', 'MF|09001030|W|14201600'];
// const weekdays = {
// 	m: [],
// 	t: [],
// 	w: [],
// 	r: [],
// 	f: [],
// 	s: []
// }

function convertTime(timeList) {
	var response = [];
	timeList.forEach((time) => {
		response.push([parseInt(time.slice(0,4)), parseInt(time.slice(4))]);
	})
	return response;
}

function putClass(scheduleRoot, classTimeString) {
	let schedule = JSON.parse(JSON.stringify(scheduleRoot));
	classTime = classTimeString.split('|');
	for (var i = 0; i < classTime.length; i += 2) {
		var startTime = parseInt(classTime[i+1].slice(0,4));
		var endTime = parseInt(classTime[i+1].slice(4));
		var dates = classTime[i].toLowerCase().split('');
		for (var j = 0; j < dates.length; j++) {
			date = dates[j];
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
				return {
					data: {},
					success: false
				}
			}
		};
	}
	return {
		data: schedule,
		success: true
	}
}

module.exports = {
	putClass
}