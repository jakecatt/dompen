$('.yes').on("click", function(e){
  e.preventDefault();
document.cookie = "verified=true"
window.location.replace("./index.html");
});

$('.no').on("click", function(){
// jake can figure out what he wants to do here. who knows what jake wants to do. jake could want to do a number of things. the number of things jake might want to do is indeterminate. there may, in fact, be an infinite number of things jake would want to do. all i'm saying is that i'm leaving it up to him. jake's the big boss man and he calls the shots. here's to jake!
console.log("yo boy yo amnesia");
document.cookie = "verified=false"
})

