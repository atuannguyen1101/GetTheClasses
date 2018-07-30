const _serviceHelper = require('./Scripts/serviceHelper.js');
const db = _serviceHelper.database;
const mockData = require('./mockData.js');
const _scheduleAlgorithm = require('./Scripts/scheduleAlgorithm.js');
const copy = require('./Scripts/helper.js').copy;

let runtimeDict = {};
let combinations = [];


async function reSchedule(courseList, freeTime = mockData.mockFreeTime, crnList = []) {
	if (courseList.length == 0) {
        combinations.push(crnList);
        console.log(combinations);
		return ;
	}
	var newCourseList = copy(courseList);

	var course = newCourseList.splice(0,1)[0];
	var allCourses = await new Promise((resolve) => {
		db.ref('majors/' + course.major + '/' + course.courseNumber)
		.once('value').then((courseInfo) => {
			resolve(courseInfo.val());
		})
	})
	for (key in allCourses) {
		runtimeDict[allCourses[key].crn] = allCourses[key]
		var newFreeTime = copy(freeTime);
		var execute = _scheduleAlgorithm.putClass(newFreeTime, allCourses[key].time);
		if (execute.success) {
			var newCrnList = copy(crnList);
			newCrnList.push(allCourses[key].crn);
			newFreeTime = execute.data;
			await reSchedule(newCourseList, newFreeTime, newCrnList);
		}
	}
}

async function main() {
	await reSchedule(mockData.mockCourses, mockData.mockFreeTime, []);
	for (combination of combinations) {
		for (var i = 0; i < combination.length; i++) {
			combination[i] = runtimeDict[combination[i]];
		}
	}
	console.log(combinations);
	return combinations;
}

main()












	// db.ref('majors/' + criteria.major + '/' + i).once('value').then((snapshot) => {
	// 	resolve(snapshot.val());
	// })