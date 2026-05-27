
function toggleCollapse( header ) {
  var post = header.closest("post");
  var content = post.querySelector("post-content")

  var vis;
  var img = post.querySelector("img")
  if( content.style.display == "none" || content.style.display == "" ) {
    vis = "block";
    img.src = "./index_files/ui/collapse-open.png"
  } else {
    vis = "none";
    img.src = "./index_files/ui/collapse-closed.png"
  }

  content.style.display = vis
}

function hidePost( post ) {
  post.parentNode.parentNode.parentNode.style.display = "none"
}
