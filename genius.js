const eminem = fetch("https://genius.p.rapidapi.com/artists/45/songs?sort=popularity&per_page=30", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "d402dd5a4dmsh4386f65a7727740p16ebbfjsncaa09364dc32"
	}
})




eminem
.then(data => data.json())
.then(data => { data.response.songs.forEach(song => {
       let div = document.createElement('div');
       document.getElementById('all-songs').appendChild(div);
       div.innerHTML += song.full_title;
       div.classList.add('top-thirty');
}); })
.catch(err => console.log(err));

//console.log(eminem.response.songs[0].full_title);
// eminem.response.songs.foreach(function (song) {
//       
// });

