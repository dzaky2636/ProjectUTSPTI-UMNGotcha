// Konfigurasi hewan
const hewan = {
    level: 1,
    makan: 50,
    tidur: 50,
    main: 50,
    obat: 50,
    xp: 0
}

activityActive = false;
makanState = false;
tidurState = false;
mainState = false;
obatState = false;

// Simulasi jam
let hour = 12; 
let minutes = 0;
setInterval(function(){
    minutes += 10;
    if(minutes >= 60){ minutes = 0; hour++; }
    if(hour >= 24){ hour = 0; }
    if(minutes < 10){ printMinutes = minutes.toString().padStart(2, '0');}
    else{ printMinutes = minutes.toString(); } 
    if(hour < 10){ printHour = hour.toString().padStart(2, '0'); }
    else{ printHour = hour.toString(); } 

    if(hour > 19 || hour < 6){
        $("#backgroundImage").attr("style", "background-image: url('assets/bgforestnight.jpg'); height: 53em");
    }else if(hour > 15){
        $("#backgroundImage").attr("style", "background-image: url('assets/bgforestevening.jpg'); height: 53em");
    }else{
        $("#backgroundImage").attr("style", "background-image: url('assets/bgforestday.jpg'); height: 53em");
    }
    document.getElementById("hourDisplay").innerHTML = "Jam: " + printHour + ":" + printMinutes;
}, 1000);

// simulasi aktivitas
setInterval(function(){
    makanActivity();
    tidurActivity();
    obatActivity();
    mainActivity();
    progressBarColor();
}, 1000);

// Pilih Avatar
avatarSelectIndex = 0;
$("#buttonSelectLeft").click(function(){
    avatarSelectIndex--;
    if(avatarSelectIndex <= -1) avatarSelectIndex = 2;
    selectCharacter(avatarSelectIndex);
});
$("#buttonSelectRight").click(function(){
    avatarSelectIndex++; 
    if(avatarSelectIndex >= 3) avatarSelectIndex = 0;
    selectCharacter(avatarSelectIndex);
});
function selectCharacter(index){
    switch(index){
        case 0: $("#displaySelectedAvatar").attr("src", "assets/avatars/Styracosaurus/idle.gif"); break;
        case 1: $("#displaySelectedAvatar").attr("src", "assets/avatars/Carnotaurus/idle.gif"); break;
        case 2: $("#displaySelectedAvatar").attr("src", "assets/avatars/Baryonyx/idle.gif"); break;
    }
}

// Display
function progressBarColor(){
    barMakan = $("#progressBarMakan").children();
    if(hewan.makan <= 25){
        if(makanState) barMakan.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
        else barMakan.attr("class", "progress-bar bg-danger");
    }else if(hewan.makan <= 50){
        if(makanState) barMakan.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
        else barMakan.attr("class", "progress-bar bg-warning");
    }else{
        if(makanState) barMakan.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
        else barMakan.attr("class", "progress-bar bg-success");
    }

    barTidur = $("#progressBarTidur").children();
    if(hewan.tidur <= 25){
        if(tidurState) barTidur.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
        else barTidur.attr("class", "progress-bar bg-danger");
    }else if(hewan.tidur <= 50){
        if(tidurState) barTidur.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
        else barTidur.attr("class", "progress-bar bg-warning");
    }else{
        if(tidurState) barTidur.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
        else barTidur.attr("class", "progress-bar bg-success");
    }

    barMain = $("#progressBarMain").children();
    if(hewan.main <= 25){
        if(mainState) barMain.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
        else barMain.attr("class", "progress-bar bg-danger");
    }else if(hewan.main <= 50){
        if(mainState) barMain.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
        else barMain.attr("class", "progress-bar bg-warning");
    }else{
        if(mainState) barMain.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
        else barMain.attr("class", "progress-bar bg-success");
    }
    
    barObat = $("#progressBarObat").children();
    if(hewan.obat <= 25){
        if(obatState) barObat.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
        else barObat.attr("class", "progress-bar bg-danger");
    }else if(hewan.obat <= 50){
        if(obatState) barObat.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
        else barObat.attr("class", "progress-bar bg-warning");
    }else{
        if(obatState) barObat.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
        else barObat.attr("class", "progress-bar bg-success");
    }
}
function redrawButtons(){
    if(!makanState) $("#buttonMakan").attr("class", "btn btn-info"); else $("#buttonMakan").attr("class", "btn btn-success");
    if(!tidurState) $("#buttonTidur").attr("class", "btn btn-info"); else $("#buttonTidur").attr("class", "btn btn-success");
    if(!mainState) $("#buttonMain").attr("class", "btn btn-info"); else $("#buttonMain").attr("class", "btn btn-success");
    if(!obatState) $("#buttonObat").attr("class", "btn btn-info"); else $("#buttonObat").attr("class", "btn btn-success");
}

// Tombol Aktivitas & Aktivitas
$("#buttonMakan").click(function(){
    if(makanState){
        makanState = false;
    }else{
        tidurState = mainState = obatState = false;
        makanState = true;
    }
    redrawButtons();
});
$("#buttonTidur").click(function(){
    if(tidurState){ 
        tidurState = false;
    }else{
        makanState = mainState = obatState = false;
        tidurState = true;
    }
    redrawButtons();
});
$("#buttonMain").click(function(){
    if(mainState){ 
        mainState = false;
    }else{
        makanState = tidurState = obatState = false;
        mainState = true;
    }
    redrawButtons();
});
$("#buttonObat").click(function(){
    if(obatState){
        obatState = false;
    }else{
        makanState = mainState = tidurState = false;
        obatState = true;
    }
    redrawButtons();
});
function makanActivity(){
    if(makanState && hewan.makan <= 100){
        hewan.makan += 4;
    }else if(!makanState && hewan.makan > 0){
        hewan.makan -= 4;      
    }
    $("#progressBarMakan").children().attr("style", "width: " + ((100 * hewan.makan) / 100) + "%");
}
function tidurActivity(){
    if(tidurState && hewan.tidur <= 100){
        hewan.tidur += 5;
    }else if(!tidurState && hewan.tidur > 0){
        hewan.tidur -= 2.5;  
    }
    $("#progressBarTidur").children().attr("style", "width: " + ((100 * hewan.tidur) / 100) + "%");
}
function mainActivity(){
    if(mainState && hewan.main <= 100){
        hewan.main += 5;
    }else if(!mainState && hewan.main > 0){
        hewan.main -= 2.5;  
    }
    $("#progressBarMain").children().attr("style", "width: " + ((100 * hewan.main) / 100) + "%");
}
function obatActivity(){
    if(obatState && hewan.obat <= 100){
        hewan.obat += 5;
    }else if(!obatState && hewan.obat > 0){
        hewan.obat -= 1;  
    }
    $("#progressBarObat").children().attr("style", "width: " + ((100 * hewan.obat) / 100) + "%");
}