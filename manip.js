function nodeToString (node) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}


// console.log("manip");
var posts = document.getElementsByClassName("post");
// console.log(posts);
// posts.item(0).innerHTML = "mdr";
// console.log(posts.item(0));
// console.log($(".post")[0])

var cols = ["","",""];
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log($("#lat-bar"));
$("div#lat-bar")[0].style.visibility = "hidden";
if (width < 400) {
	cols = [""];
}
else if (width < 770) {
	cols = ["",""];
} else {
	$("#lat-bar")[0].style.visibility = "visible";
}

for (var i = 0; i < posts.length; i++) {
	posts.item(i).innerHTML = `<div class="author ${posts.item(i).dataset.author}">${posts.item(i).dataset.author}</div><div class="inner">${posts.item(i).innerHTML}</div>`;
	cols[i%cols.length]+=nodeToString(posts.item(i));
}
var content = document.getElementById("content");
var tmp = "";
for (var i = 0; i < cols.length; i++) {
	tmp+=`<div class="content-column">${cols[i]}</div>`;
}
content.innerHTML = tmp;

$("div.imager").each(function(){
	this.style.backgroundImage = `url(${this.dataset.img})`;
});

$(".content-column").each(function() {
	this.style.width = `${100/cols.length}%`;
});

content.hidden = false;