function start(func) {
  if(document.readyState != 'loading') {
    func();
  } else {
    document.addEventListener('DOMContentLoaded', func);
  }
}

var rating = 0;

start(function(){

  stars = document.getElementsByClassName("star");
  container = document.getElementById("container").getContext("2d");
  container.font = "20px Arial"
  container.fillStyle = "#26517a";

  for (var i = 0; i < 5; i++){

    stars[i].addEventListener("click", function(event){
      productUrl = event.target.parentElement.getAttribute('url');
      
      productId = productUrl.substring(productUrl.lastIndexOf('/') + 1)
      rating = parseInt(event.target.getAttribute('id')) + 1;

      
      $.ajax({
        type: "POST",
        url: productUrl,
        data: ({ "pid" : productId, "productRating" : rating })
      });

      for (j = 0; j < 5; j++){
        stars[j].classList.remove("hover");
        if(j < rating){
          stars[j].classList.add("selected");
        }
      }
      event.preventDefault();

      container.clearRect(0, 0, 200, 30);
      container.fillText("Your rating: " + rating, 0, 20);

    });

    stars[i].addEventListener("mouseover", function(event){
      for (var j = 0; j < 5; j++){
        stars[j].classList.remove("selected");

        if (j <= parseInt(event.target.getAttribute('id'))){
          stars[j].classList.add("hover");
        }
      }
    });

    stars[i].addEventListener("mouseout", function(){
      for (var j = 0; j < 5; j++){
        stars[j].classList.remove("hover");
      }
      if (rating != 0){
        for (var j = 0; j < rating; j++){
          stars[j].classList.add("selected");
        }
      }
    });
  }
});
