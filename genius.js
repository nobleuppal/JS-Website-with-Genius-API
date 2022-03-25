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
 .then(() => {
       loadNodes();
       modalOpener();
       modalCloser();
       pageVisits();

       setInterval(function(){  
              favorite();
              checkFav();
              checkCollection();
              removeFavs();
              alphaOrder();
              reverseOrder();
       }, 1000);
    
 })
.catch(err => console.log(err));

/*
setTimeout(function() {
       loadNodes();
       modalOpener();
       modalCloser();
}, 1500);

setTimeout(function() {
       pageVisits();
}, 2000);

setInterval(function(){  
       favorite();
       checkFav();
       checkCollection();
       removeFavs();
       alphaOrder();
       reverseOrder();
}, 1000);
*/
  




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
       const star = document.getElementsByClassName('fa-star')
       for (const elm of star) {
              elm.addEventListener('click', function() {                     
                     let button = document.createElement('i');                     
                     button.classList.add('fa','fa-times','remove');
                     elm.parentElement.appendChild(button);
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


function alphaOrder() {
       const alpha = document.getElementById('az');
       const nodes = document.getElementsByClassName('top-thirty');
       let first;
       let second;
       
     
       alpha.addEventListener('click', function() {
              let k = 0
              while (k < nodes.length) {
                     sort(nodes);
                     k++;
              }
       });
}

function reverseOrder() {
       const reverse = document.getElementById('za');
       const nodes = document.getElementsByClassName('top-thirty');
       let first;
       let second;

       reverse.addEventListener('click', function() {
              let k = 0;
              while (k < nodes.length) {
                     reverseSort(nodes);
                     k++;
              }
       });
}


function sort(nodes) {
       for (let elm = 0; elm < nodes.length; elm++) {   
              first = nodes[elm].innerText; 
           
              if (elm < 29) {
                     second = nodes[elm+1].innerText; 
              }
              else {
                     continue;
              }  

              if(first > second) {
                     nodes[elm].parentElement.insertBefore(nodes[elm+1], nodes[elm]);  
              }                   
       }
}

function reverseSort(nodes) {
       for (let elm = 0; elm < nodes.length; elm++) {   
              first = nodes[elm].innerText; 
           
              if (elm < 29) {
                     second = nodes[elm+1].innerText; 
              }
              else {
                     continue;
              }  

              if(first < second) {
                     nodes[elm].parentElement.insertBefore(nodes[elm+1], nodes[elm]);  
              }                   
       }
}

function pageVisits() {
       const visits = document.getElementById('page-views');
       let num = 0;
       for (const elm of emSongs) {
              num += elm.stats.pageviews;          
       }
       let div = document.createElement('div');
       div.innerHTML = num;
       visits.appendChild(div);
}
       




















