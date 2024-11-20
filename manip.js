// console.log("manip");
const posts = document.getElementsByClassName("post");
// console.log(posts);
// posts.item(0).innerHTML = "mdr";
// console.log(posts.item(0));
// console.log($(".post")[0])

for (var i = posts.length - 1; i >= 0; i--) {
	posts.item(i).innerHTML = `<div class="author ${posts.item(i).dataset.author}">${posts.item(i).dataset.author}</div><div class="inner"><div class="date">${posts.item(i).dataset.date}</div>${posts.item(i).innerHTML}</div>`;
}