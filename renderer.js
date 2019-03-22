var spotify = require('spotify-node-applescript');
 
setInterval(()=>spotify.getTrack(handleTrack),500)

var currentImgUrl='';

function handleTrack(err, track){
    /*
    track = {
        artist: 'Bob Dylan',
        album: 'Highway 61 Revisited',
        disc_number: 1,
        duration: 370,
        played count: 0,
        track_number: 1,
        starred: false,
        popularity: 71,
        id: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc',
        name: 'Like A Rolling Stone',
        album_artist: 'Bob Dylan',
        artwork_url: 'http://images.spotify.com/image/e3d720410b4a0770c1fc84bc8eb0f0b76758a358',
        spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
    }
    */
  document.getElementsByTagName('h1')[0].innerText=`${track.artist} – ${track.name}`

  startDownload(track.artwork_url)
}

function startDownload(url) {
  if(url===currentImgUrl){return;}
  currentImgUrl = url;
  let imageURL = url;
 
  downloadedImg = document.getElementsByTagName('img')[0]
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.src = imageURL;
}

function imageReceived() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = downloadedImg.width;
  canvas.height = downloadedImg.height;

  context.drawImage(downloadedImg, 0, 0);
  //document.getElementsByTagName('title')[0].innerText = context.getImageData(100, 100, 1, 1).data;
  let d = context.getImageData(100, 100, 1, 1).data;
  document.getElementsByTagName('h1')[0].style.color = `rgb(${d[0]},${d[1]},${d[2]})`;
  document.getElementsByTagName('h1')[0].style.backgroundColor = `rgba(0,0,0,.7)`;
}

