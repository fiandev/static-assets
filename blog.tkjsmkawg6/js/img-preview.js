$(document).ready(function(){
  $("#image").on("change", function (event){
    var files = event.target.files,
                file;
   if (files && files.length > 0) {
     file = files[0]
     try {
       var fileReader = new FileReader();
       fileReader.onload = function (e) {
         $("#preview").remove()
         $("#image").parent().before(`
           <div class="mb-3" id="preview">
              <label class="d-block">preview image</label>
              <img src="${e.target.result}" style="max-height: 300px;overflow:hidden">
            </div>
         `)
         console.log(e.target.result);
       };
       fileReader.readAsDataURL(file);
     } catch (e) {
       console.log("FileReader are not supported ");
     }
   }
   else {
     $("#preview").remove()
   }
  })
})