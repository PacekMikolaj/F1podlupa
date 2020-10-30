$(document).ready(function () {
   
    //dodanie tekstu
    console.log($("#cover").attr('src'))
    let id = ($('#cover').attr('src')).split('/')[2];
    console.log(id) 
    $("#text").load(`/upload/${id}/body.html`);

})