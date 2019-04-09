const { ipcRenderer } = require('electron');
const spotify = require('spotify-node-applescript');
const convert = require('color-convert');
 
setInterval(()=>spotify.getTrack(handleTrack),2500)

document.getElementById('play').onclick=()=>spotify.playPause();
document.getElementById('left').onclick=()=>spotify.previous();
document.getElementById('right').onclick=()=>spotify.next();

let currentImgUrl='';

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
  document.getElementById('artist').innerText=track.artist
  document.getElementById('song').innerText=track.name

  startDownload(track.artwork_url)

  //console.log('current track info ::: ',track)
}

function startDownload(url) {
  if(url===currentImgUrl){return;}
 
  downloadedImg = document.getElementById('cover')
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.addEventListener("load", imageReceived, false);
  downloadedImg.src = currentImgUrl = url;
}

function imageReceived() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = downloadedImg.naturalWidth;
  canvas.height = downloadedImg.naturalHeight;

  context.drawImage(downloadedImg, 0, 0);
  let data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let d=data.reduce((a,c,i)=>{a[i%4]+=c;return a},[0,0,0,0]).map(c=>(Math.round(c/(data.length/4))))
  let color = convert.rgb.hsl(d[0],d[1],d[2])
  const fgCol = `hsl(${color[0]},${color[1]}%,${color[2]}%)`
  const bgCol = `hsl(${(180+color[0])/360},${color[1]}%,${(color[2]+50)%100}%)`
  const bgColTr = `hsla(${(180+color[0])/360},${color[1]}%,${(color[2]+50)%100}%,0)`
  document.getElementById('info').style.color = fgCol;
  document.getElementById('info').style.background = `linear-gradient(0deg,${bgCol},85%,${bgColTr})`;

  ipcRenderer.send('coverURI', canvas.toDataURL())
}
