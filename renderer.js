var spotify = require('spotify-node-applescript');
 
setInterval(()=>spotify.getTrack(handleTrack),500)

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
  document.body.innerHTML = `<h1>${track.artist} – ${track.name}</h1><img src="${track.artwork_url}"/>`
  //JSON.stringify(track)
}