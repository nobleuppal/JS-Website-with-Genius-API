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
const emNodes = [];
const emFav = [];
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

       let icon = document.createElement('i');
       icon.classList.add('fa', 'fa-star');
       div.appendChild(icon);

       emSongs.push(song);
       emNodes.push(document.getElementById(i));
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
                                  
                     let div = document.createElement('div');
                     document.getElementById('song-info').appendChild(div);
                     div.innerHTML += emSongs[elm.id].full_title;

                     let img = document.createElement('img');
                     document.getElementById('song-info').appendChild(img);
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

setTimeout(function() {
       for (const elm of document.getElementsByClassName('fa-star')) {
              elm.addEventListener('click', function() {
                     this.parentElement.classList.add('fav'); 
                     emFav.push(this.parentElement);
              });
       };
}, 1500);

setTimeout(function() {
       const favButton = document.getElementById('favorites');
       const singles = document.getElementsByClassName('top-thirty');
       favButton.addEventListener('click', function() {
              for (const fav of emFav) {
                     document.getElementById('all-songs').appendChild(fav);
              }

              for (let element = 0; element < singles.length;) {
                     if (singles[element].className != 'top-thirty fav') {
                            singles[element].remove();                                                  
                     }
                     else {
                            singles[element].childNodes[2].remove();
                            let button = document.createElement('button');
                            button.classList.add('remove');
                            singles[element].appendChild(button);
                            button.innerHTML += 'Remove';
                     
                            element++;
                     }
              }

       });
       
     
}, 1500);

setTimeout(function () {
       const favorites = document.getElementsByClassName('fav');
       const collectionButton = document.getElementById('collection');
       
       collectionButton.addEventListener('click', function() {
              for (const song of emNodes) {
                     document.getElementById('all-songs').appendChild(song);
                     for (const fav of favorites) {
                            if (song.firstChild == fav.firstChild) {
                                   song.remove();
                                   fav.remove();
                            }
                     }
              }
       });

}, 1500);



















