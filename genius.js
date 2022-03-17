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

       let img = document.createElement('img');
       img.src = '/assets/Elogo.png';
       img.classList.add('logo');
       img.setAttribute('data-open', 'songs-details');
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


setTimeout(function() {
       loadNodes();
       modalOpener();
       modalCloser();
}, 1500);

setInterval(function(){  
       favorite();
       checkFav();
       checkCollection();
       removeFavs();
}, 1000);
  




function loadNodes() {
       const singles = document.getElementsByClassName('top-thirty');

       for (let i = 0; i < singles.length;) {
              singles[i].remove();
       }
       for (const elm of emNodes) {
            document.getElementById('all-songs').appendChild(elm);
       }
}

function modalOpener() {
       const singles = document.getElementsByClassName('logo');
       
       for (const elm of singles) {
              elm.addEventListener('click', function() {
                     const modalID = this.dataset.open;
                     document.getElementById(modalID).classList.add(isVisible);  
                                  
                     let div = document.createElement('div');
                     document.getElementById('song-info').appendChild(div);
                     div.innerHTML += emSongs[elm.parentElement.id].full_title;

                     let img = document.createElement('img');
                     document.getElementById('song-info').appendChild(img);
                     img.src = emSongs[elm.parentElement.id].song_art_image_url;

                     let a = document.createElement('a');
                     document.getElementById('song-info').appendChild(a);
                     a.href = emSongs[elm.parentElement.id].url;
                     a.innerHTML += 'See Lyrics';
                                 
              });  
       }
}

function modalCloser() {
       for (const elm of closeModal) {
              elm.addEventListener('click', function() {
                     this.parentElement.classList.remove(isVisible);
                     let element = document.getElementById('song-info');
                     while(element.firstChild) {
                            element.removeChild(element.firstChild);
                     }
              });  
       }
}

function favorite() {
       for (const elm of document.getElementsByClassName('fa-star')) {
              elm.addEventListener('click', function() {                     
                     let button = document.createElement('i');                     
                     button.classList.add('fa','fa-times','remove');
                     this.parentElement.appendChild(button);
                     this.parentElement.remove();
                     elm.remove();
              });
       }
}

function checkFav() {
       const favButton = document.getElementById('favorites');
       favButton.addEventListener('click', function() {
              for (const elm of emNodes) {
                     if (elm.childNodes[2].classList != 'fa fa-times remove') {
                            elm.remove();
                     }
                     else {
                            document.getElementById('all-songs').appendChild(elm);
                     }                    
              }                        
       });     
}

function checkCollection() {
       const collectionButton = document.getElementById('collection');
       
       collectionButton.addEventListener('click', function() {
              for (const elm of emNodes) {
                     document.getElementById('all-songs').appendChild(elm);   
                     if (elm.childNodes[2].classList == 'fa fa-times remove') {
                            elm.remove();
                     }              
              }
       });

}


function removeFavs() {   
       const remove = document.getElementsByClassName('remove'); 

       for (const elm of remove) {
              elm.addEventListener('click', function() {
                     for (const node of emNodes) {
                            if (node === elm.parentElement) {
                                   node.childNodes[2].remove();
                                   let icon = document.createElement('i');
                                   icon.classList.add('fa', 'fa-star');
                                   node.appendChild(icon);
                                   node.remove();
                            }
                     }   
              });
       }
                                  
}


       




















