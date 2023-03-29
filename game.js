// Konfigurasi hewan
const hewan = {
    level: 1,
    makan: 0,
    minum: 0,
    tidur: 0,
    obat: 0,
    currStatus: "none"
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
    console.log(printHour + ":" + printMinutes);
    
    $("#progressBarMakan").children().attr("style", "width: " + ((100 * hour) / 24) + "%");
}, 1000);

// simulasi aktivitas
setInterval(function(){

}, 1000);

// simulasi aktivitas
activityActive = false;
makanState = false;
$("#buttonMakan").click(function(){
    if(makanState){
        $("#buttonMakan").attr("class", "btn btn-warning"); makanState = false;
    }else{
        $("#buttonMakan").attr("class", "btn btn-success"); makanState = true;
    }
});