// Konfigurasi hewan
const hewan = {
    level: 1,
    makan: 100,
    minum: 100,
    tidur: 100,
    obat: 100
}

// Simulasi jam
let hour = 23; 
let minutes = 0;
setInterval(function(){
    minutes += 30;
    // formatting jam
    if(minutes >= 60){ minutes = 0; hour++; }
    if(hour >= 24){ hour = 0; }
    if(minutes < 10){ printMinutes = minutes.toString().padStart(2, '0');}
    else{ printMinutes = minutes.toString(); } 
    if(hour < 10){ printHour = hour.toString().padStart(2, '0'); }
    else{ printHour = hour.toString(); } 
    // console.log(printHour + ":" + printMinutes);
}, 1000);

// simulasi aktivitas
setInterval(function(){
    // makan
    makanActivity();
}, 2000);

function makanActivity(){
    if(makanState && hewan.makan <= 100){
        hewan.makan += 5;
        $("#progressBarMakan").children().attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    }else if(!makanState && hewan.makan > 0){
        hewan.makan -= 5;
        $("#progressBarMakan").children().attr("class", "progress-bar bg-success");  
    }
    $("#progressBarMakan").children().attr("style", "width: " + ((100 * hewan.makan) / 100) + "%");
}

// button makan
activityActive = false;
makanState = false;
$("#buttonMakan").click(function(){
    if(makanState){
        $("#buttonMakan").attr("class", "btn btn-warning"); 
        makanState = false;
    }else{
        $("#buttonMakan").attr("class", "btn btn-success"); 
        makanState = true;
    }
});