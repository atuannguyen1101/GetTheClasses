const firebase = require('firebase');

firebase.initializeApp({
	apiKey: "AIzaSyCPxuyldQzVJ05GSgDcMK8qthfC4ZJGvPI",
	authDomain: "gettheclassdevelop.firebaseapp.com",
	databaseURL: "https://gettheclassdevelop.firebaseio.com",
	projectId: "gettheclassdevelop",
	storageBucket: "",
	messagingSenderId: "760366761022"
});

let database = firebase.database();

async function readSpecific(url, key, value) {
	return new Promise((resolve) => {
		database.ref(url).orderByChild(key).equalTo(value)
		.once('value').then((snapshot) => {
			var result = [];
			for (key in snapshot.val()) {
				result.push(snapshot.val()[key]);
			}
			resolve(result);
		});
	})
}

module.exports = {
	readSpecific
}