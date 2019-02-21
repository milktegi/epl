import * as firebase from 'firebase';

const config = {

    apiKey: "AIzaSyCrlYVpZZyK3Ucap2h2LaPyf9-uNVY44R8",
    authDomain: "nba-wi.firebaseapp.com",
    databaseURL: "https://nba-wi.firebaseio.com",
    projectId: "nba-wi",
    storageBucket: "nba-wi.appspot.com",
    messagingSenderId: "898494512794"
  
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
	const data = [];
	snapshot.forEach((childreSnapshot)=>{
		data.push({
			...childreSnapshot.val(),
			id: childreSnapshot.key 
		})
	})
	return data;
}

export {
	firebase,
	firebaseDB,
	firebaseArticles,
	firebaseTeams,
	firebaseVideos,
	firebaseLooper 
}