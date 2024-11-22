

function nodeToString (node) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}

var posts = document.getElementsByClassName("post");

var cols = ["","",""];
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
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
	if (posts.item(i).innerHTML.replaceAll(/\s/g,'').length == 0) {
		posts.item(i).innerHTML = `<div class="author ${posts.item(i).dataset.author}">${posts.item(i).dataset.author}</div>`;
	} else {
		posts.item(i).innerHTML = `<div class="author ${posts.item(i).dataset.author}">${posts.item(i).dataset.author}</div><div class="inner">${posts.item(i).innerHTML}</div>`;
	}
	cols[i%cols.length]+=nodeToString(posts.item(i));
}
var content = document.getElementById("content");
var tmp = "";
for (var i = 0; i < cols.length; i++) {
	tmp+=`<div class="content-column">${cols[i]}</div>`;
}
content.innerHTML = tmp;



$("div.imager").each(function(){
	var tmp = this.dataset.img.replaceAll("img","").replaceAll("/","").split(".");
	const idImg = `${this.dataset.author}-${tmp[tmp.length-1]}`;
	// console.log(idImg)
	const newCanvas = $('<canvas/>',{
	                    id: idImg                 
	                }).prop({
	                    width: 200,
	                    height: 200
	                });
	$('#canvas-holder').append(newCanvas);
	const canvas = document.getElementById(idImg);
	canvas.style.display = "none";
	const context = canvas.getContext('2d'); 
	this.style.backgroundImage = `url(${this.dataset.img})`;
	const img = new Image();        
	img.src = this.dataset.img;        
	img.onload = () => {          
		context.drawImage(img, 0, 0);      
		const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
		// console.log(imgData);
		const rgb = buildRGB(imgData.data);
		// console.log(rgb);
		const quantizationRes = quantization(rgb,1)[0];
		const lum = luminance(quantizationRes);
		console.log(lum);
		if (lum < 1) {
			 this.classList.add("bright");
		} else {
			this.classList.add("dark");
		}
	};
	
});

$(".content-column").each(function() {
	this.style.width = `${100/cols.length}%`;
});

content.hidden = false;















