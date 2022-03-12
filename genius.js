const eminem = fetch("https://genius.p.rapidapi.com/artists/45/songs?sort=popularity&per_page=30", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "d402dd5a4dmsh4386f65a7727740p16ebbfjsncaa09364dc32"
	}
})

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';
const emSongs = [];
let i = 0;
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

eminem
.then(data => data.json())
.then(data => { data.response.songs.forEach((song) => {
       let div = document.createElement('div');
       document.getElementById('all-songs').appendChild(div);
       div.innerHTML += song.full_title;
       div.classList.add('top-thirty');
       div.setAttribute('id', i);
       div.setAttribute('data-open', 'songs-details');

       let img = document.createElement('img');
       img.src = '/assets/Elogo.png';
       div.appendChild(img);

       emSongs.push(song);
       i++;

       });
 })
.catch(err => console.log(err));

setTimeout(function () {
       const singles = document.getElementsByClassName('top-thirty');
       
       for (const elm of singles) {
              elm.addEventListener('click', function() {
                     const modalID = this.dataset.open;
                     document.getElementById(modalID).classList.add(isVisible);  
                     
                     console.log(emSongs[elm.id].full_title); 

              
                     let div = document.createElement('div');
                     document.getElementById('song-info').appendChild(div);
                     div.innerHTML += emSongs[elm.id].full_title;

                     let img = document.createElement('img');
                     document.getElementById('song-info').appendChild(img);
                     console.log(emSongs);
                     img.src = emSongs[elm.id].song_art_image_url;

                     let a = document.createElement('a');
                     document.getElementById('song-info').appendChild(a);
                     a.href = emSongs[elm.id].url;
                     a.innerHTML += 'See Lyrics';
                                 
              });  
       }
}, 1500);



setTimeout(function () {
       for (const elm of closeModal) {
              elm.addEventListener('click', function() {
                     this.parentElement.classList.remove(isVisible);
                     let element = document.getElementById('song-info');
                     while(element.firstChild) {
                            element.removeChild(element.firstChild);
                     }
              });  
       }
}, 1000);



















