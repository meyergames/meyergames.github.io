
var audiotypes={
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}

function ss_soundbits(sound){
    var audio_element = document.createElement('audio')
    if (audio_element.canPlayType){
        for (var i=0; i<arguments.length; i++){
            var source_element = document.createElement('source')
            source_element.setAttribute('src', arguments[i])
            if (arguments[i].match(/\.(\w+)$/i))
                source_element.setAttribute('type', audiotypes[RegExp.$1])
            audio_element.appendChild(source_element)
        }
        audio_element.load()
        audio_element.playclip=function(){
            audio_element.pause()
            audio_element.currentTime=0
            audio_element.play()
        }
        return audio_element
    }
}

// $(document).on('click', '.custom-button, tile', function (e) {
//   // optional: stop the link from navigating until the sound starts
//   e.preventDefault();

//   const audio = new Audio('./index_files/windows-xp-click.ogg');
//   audio.play();

//   // If you prevented the default navigation above, you can manually follow the link
//   // after a short delay so the sound has time to start:
//   setTimeout(() => { window.location.href = $(this).closest('a').attr('href'); }, 100);
// });

$(document).on('click', '.custom-button, tile', function (e) {
  // 1. Get the link destination FIRST
  var linkHref = $(this).closest('a').attr('href');

  // 2. Play the sound IMMEDIATELY (No setTimeout for play!)
  var audio = new Audio('./index_files/sfx/windows-xp-click.ogg'); 
  
  // Optional: Handle errors if file is missing
  audio.onerror = function() {
      console.error("Audio file not found or blocked:", audio.src);
  };

  // Play immediately
  var playPromise = audio.play();

  if (playPromise !== undefined) {
      playPromise.then(_ => {
          // Sound started successfully
          console.log("Sound playing");
      })
      .catch(error => {
          // Auto-play was prevented (shouldn't happen with click, but good safety)
          console.warn("Autoplay prevented:", error);
      });
  }

  // 3. Navigate AFTER a tiny delay (only if you have a link)
  if (linkHref) {
      e.preventDefault(); // Stop immediate navigation
      setTimeout(() => {
          window.location.href = linkHref;
      }, 150); // Slightly longer delay to ensure sound buffer starts
  }
});
