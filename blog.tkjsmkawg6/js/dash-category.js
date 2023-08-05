$(document).ready(function (){
  $("#btnAddCategory").on("click", function (){
    let self = $(this)
    $(this).css({
      "transition": "1s",
      "opacity": "0",
    })
    setTimeout(function() {
      $(self).remove()
      $("#addCategory").toggleClass("d-none")
      $("#addCategory input").focus()
      
    }, 1000);
  })
})