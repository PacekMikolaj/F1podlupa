$(document).ready(function () {

    ///zmiana tekstu
    //console.log(document.getElementById("text").innerHTML);
    let text_orginal = document.getElementById("text").innerHTML;

    let array = text_orginal.split('---');
    //console.log(array);

    for (let i = 0; i < array.length - 1; i += 2) {
        array[i + 1] = "<b class='highlight'>" + array[i + 1] + "</b>";
        //console.log(array[i + 1])
    }

    let text = "";

    array = array.filter(item => item);
      

    for (let i = 0; i < array.length; i++) {
        text += array[i];
        //console.log(array[i])
    }

    document.getElementById("text").innerHTML = text;


    


})