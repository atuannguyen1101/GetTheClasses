const _serviceHelper = require('./serviceHelper.js');
const db = _serviceHelper.database;
const defaultFreeTime = require('../DefaultData/freeTime');
const _scheduleAlgorithm = require('./scheduleAlgorithm.js');
const copy = require('./helper.js').copy;

let runtimeDict = {};
let combinations = [];


async function reSchedule(courseList, freeTime, crnList = []) {
    if (courseList.length == 0) {
        combinations.push(crnList);
        return;
    }
    var newCourseList = copy(courseList);

    var course = newCourseList.splice(0, 1)[0];
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

async function main(course, freeTime = defaultFreeTime) {
    await reSchedule(course, freeTime, []);
    for (combination of combinations) {
        for (var i = 0; i < combination.length; i++) {
            combination[i] = runtimeDict[combination[i]];
        }
    }
    var index = 0;
    while (index < combinations.length) {
        if (combinations[index].includes(undefined))
            combinations.splice(index, 1);
        else
            index += 1;
    }
    return combinations;
}

module.exports = main