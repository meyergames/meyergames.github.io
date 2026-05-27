
// POSTS

function initPosts() {
  var chboxes = document.getElementsByName( "ContentFilter" );
  for( var i=0; i<chboxes.length; i++ ) {
    togglePosts( chboxes[i] )
  }
}

function togglePosts( chbox ) {
  var vis = "none";
  if( chbox.checked ) {
    vis = "block";
  }

  var posts = document.getElementsByTagName( "post" )
  for( var i=0; i<posts.length; i++ ) {
    if( posts[i].className == chbox.className ) {
      posts[i].style.display = vis
    }
  }
}



// TILES

function initTiles() {
  var chboxes = document.getElementsByName( "contentFilterA" );
  for( var i=0; i<chboxes.length; i++ ) {
    toggleTiles( chboxes[i] )
  }
}

function toggleTiles( chbox ) {
  var vis = "none";
  if( chbox.checked ) {
    vis = "block";
  }

  var posts = document.getElementsByTagName( "tilecontainer" )
  for( var i=0; i<posts.length; i++ ) {
    // console.debug( posts[i].id + " = " + chbox.id + "?" )
    if( posts[i].id.includes( chbox.id ) ) {
      posts[i].style.display = vis

      if (vis == "none") {
        console.debug( "Hidden: " + posts[i].id )
      } else {
        console.debug( "Shown: " + posts[i].id )
      }
    }
  }
}

function toggleTilesSecondary( chbox ) {
  var vis = "none";
  if( chbox.checked ) {
    vis = "block";
  }

  var posts = document.getElementsByTagName( "tilecontainer" )
  for( var i=0; i<posts.length; i++ ) {
    if( posts[i].className.includes( chbox.className ) ) {
      posts[i].style.display = vis
    }
  }
}
