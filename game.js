// Konfigurasi hewan
const hewan = {
  nama: "Default",
  level: 1,
  avatar: 0,
};

const act = {
  // I = Jumlah naik saat aktivitas dilakukan
  // II = Jumlah naik saat aktivitas dilakukan, di increment ini saat naik level
  // D = Jumlah turun saat aktivitas tidak dilakukan
  // DI = Jumlah turun saat aktivitas tidak dilakukan, di increment ini saat naik level
  makan: 50,
  makanI: 10,
  makanII: 5,
  makanD: 1,
  makanDI: 1,

  tidur: 50,
  tidurI: 10,
  tidurII: 5,
  tidurD: 1,
  tidurDI: 1,

  main: 50,
  mainI: 10,
  mainII: 5,
  mainD: 1,
  mainDI: 1,

  obat: 50,
  obatI: 10,
  obatII: 5,
  obatD: 1,
  obatDI: 1,
};

const xp = {
  xp: 0, // xp saat mulai
  xpI: 1, // xp naik berapa per detik
  xpLevelUp: 40, // xp diperlukan untuk naik lvl
  xpIncrement: 50, // xpLevelUp ditambah ini tiap naik level
};

let deathState = false;
let makanState = false;
let tidurState = false;
let mainState = false;
let obatState = false;

// Simulasi jam
let day = 1;
let hour = 8;
let minutes = 0;
setInterval(function () {
  if (!tidurState) minutes += 5;
  else minutes += 15;

  if (minutes >= 60) {
    minutes = minutes - 60;
    hour++;
  }
  if (hour >= 24) {
    hour = 0;
    day++;
    notify("Sekarang hari ke-" + day + "..");
  }
  if (minutes < 10) printMinutes = minutes.toString().padStart(2, "0");
  else printMinutes = minutes.toString();
  if (hour < 10) printHour = hour.toString().padStart(2, "0");
  else printHour = hour.toString();

  if (hour == 19) {
    $("#backgroundImage").attr("style", "background-image: url('assets/bgforestnight.jpg'); height: 53em");
    notify("Selamat malam " + hewan.nama + "!");
  } else if (hour == 15) {
    $("#backgroundImage").attr("style", "background-image: url('assets/bgforestevening.jpg'); height: 53em");
    notify("Selamat sore " + hewan.nama + "!");
  } else if (hour == 12) {
    $("#backgroundImage").attr("style", "background-image: url('assets/bgforestday.jpg'); height: 53em");
    notify("Selamat siang " + hewan.nama + "!");
  } else if (hour == 5) {
    $("#backgroundImage").attr("style", "background-image: url('assets/bgforestevening.jpg'); height: 53em");
    notify("Selamat pagi " + hewan.nama + "!");
  }
  document.getElementById("hourDisplay").innerHTML = "Jam: " + printHour + ":" + printMinutes;
}, 1000);

// simulasi aktivitas
setInterval(function () {
  makanActivity();
  tidurActivity();
  obatActivity();
  mainActivity();
  progressBarColor();
  if (hewan.level < 3) xpCalculate();
}, 1000);

// Kalkulasi
function xpCalculate() {
  xp.xp += xp.xpI;
  if (xp.xp >= xp.xpLevelUp) {
    xp.xp = 0;
    xp.xpLevelUp += xp.xpIncrement;
    hewan.level++;
    hewanCalculateStats();
  }
}
function hewanCalculateStats() {
  if (hewan.level == 1) {
    $("#levelDisplay").text("Bayi");
  } else if (hewan.level == 2) {
    act.makanI += act.makanII;
    act.makanD += act.makanDI;
    act.tidurI += act.tidurII;
    act.tidurD += act.tidurDI;
    act.mainI += act.mainII;
    act.mainD += act.mainDI;
    act.obatI += act.obatII;
    act.obatD += act.obatDI;
    notify(hewan.nama + " naik level menjadi Remaja!");
    $("#levelDisplay").text("Remaja");
  } else if (hewan.level == 3) {
    act.makanI += act.makanII;
    act.makanD += act.makanDI;
    act.tidurI += act.tidurII;
    act.tidurD += act.tidurDI;
    act.mainI += act.mainII;
    act.mainD += act.mainDI;
    act.obatI += act.obatII;
    act.obatD += act.obatDI;
    notify(hewan.nama + " naik level menjadi Dewasa!");
    $("#levelDisplay").text("Dewasa");
  }
}
function checkIfGameOver() {
  //
}

// Tombol Aktivitas & Aktivitas
$("#buttonMakan").click(function () {
  if (makanState) {
    makanState = false;
  } else {
    tidurState = mainState = obatState = false;
    makanState = true;
  }
  redrawButtons();
  redrawAvatar();
});
$("#buttonTidur").click(function () {
  if (tidurState) {
    tidurState = false;
  } else {
    makanState = mainState = obatState = false;
    tidurState = true;
  }
  redrawButtons();
  redrawAvatar();
});
$("#buttonMain").click(function () {
  if (mainState) {
    mainState = false;
  } else {
    makanState = tidurState = obatState = false;
    mainState = true;
  }

  redrawButtons();
  redrawAvatar();

  if (mainState) {
    startGameBermain();
  } else {
    exitGameBermain();
  }
});
$("#buttonObat").click(function () {
  if (obatState) {
    obatState = false;
  } else {
    makanState = mainState = tidurState = false;
    obatState = true;
  }
  redrawButtons();
  redrawAvatar();
});
function makanActivity() {
  if (makanState && act.makan <= 100) {
    act.makan += act.makanI;
  } else if (!makanState && act.makan > 0) {
    act.makan -= act.makanD;
  }
  $("#progressBarMakan")
    .children()
    .attr("style", "width: " + (100 * act.makan) / 100 + "%");
}
function tidurActivity() {
  if (tidurState && act.tidur <= 100) {
    act.tidur += act.tidurI;
  } else if (!tidurState && act.tidur > 0) {
    act.tidur -= act.tidurD;
  }
  $("#progressBarTidur")
    .children()
    .attr("style", "width: " + (100 * act.tidur) / 100 + "%");
}
function mainActivity() {
  if (mainState && act.main <= 100) {
    act.main += act.mainI;
  } else if (!mainState && act.main > 0) {
    act.main -= act.mainD;
  }
  $("#progressBarMain")
    .children()
    .attr("style", "width: " + (100 * act.main) / 100 + "%");
}
function obatActivity() {
  if (obatState && act.obat <= 100) {
    act.obat += act.obatI;
  } else if (!obatState && act.obat > 0) {
    act.obat -= act.obatD;
  }
  $("#progressBarObat")
    .children()
    .attr("style", "width: " + (100 * act.obat) / 100 + "%");
}

// Display
function progressBarColor() {
  barMakan = $("#progressBarMakan").children();
  if (act.makan <= 25) {
    if (makanState) barMakan.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
    else barMakan.attr("class", "progress-bar bg-danger");
  } else if (act.makan <= 50) {
    if (makanState) barMakan.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
    else barMakan.attr("class", "progress-bar bg-warning");
  } else {
    if (makanState) barMakan.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    else barMakan.attr("class", "progress-bar bg-success");
  }

  barTidur = $("#progressBarTidur").children();
  if (act.tidur <= 25) {
    if (tidurState) barTidur.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
    else barTidur.attr("class", "progress-bar bg-danger");
  } else if (act.tidur <= 50) {
    if (tidurState) barTidur.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
    else barTidur.attr("class", "progress-bar bg-warning");
  } else {
    if (tidurState) barTidur.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    else barTidur.attr("class", "progress-bar bg-success");
  }

  barMain = $("#progressBarMain").children();
  if (act.main <= 25) {
    if (mainState) barMain.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
    else barMain.attr("class", "progress-bar bg-danger");
  } else if (act.main <= 50) {
    if (mainState) barMain.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
    else barMain.attr("class", "progress-bar bg-warning");
  } else {
    if (mainState) barMain.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    else barMain.attr("class", "progress-bar bg-success");
  }

  barObat = $("#progressBarObat").children();
  if (act.obat <= 25) {
    if (obatState) barObat.attr("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
    else barObat.attr("class", "progress-bar bg-danger");
  } else if (act.obat <= 50) {
    if (obatState) barObat.attr("class", "progress-bar bg-warning progress-bar-striped progress-bar-animated");
    else barObat.attr("class", "progress-bar bg-warning");
  } else {
    if (obatState) barObat.attr("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
    else barObat.attr("class", "progress-bar bg-success");
  }
}
function redrawButtons() {
  if (!makanState) $("#buttonMakan").attr("class", "btn btn-info");
  else $("#buttonMakan").attr("class", "btn btn-success");
  if (!tidurState) $("#buttonTidur").attr("class", "btn btn-info");
  else $("#buttonTidur").attr("class", "btn btn-success");
  if (!mainState) $("#buttonMain").attr("class", "btn btn-info");
  else $("#buttonMain").attr("class", "btn btn-success");
  if (!obatState) $("#buttonObat").attr("class", "btn btn-info");
  else $("#buttonObat").attr("class", "btn btn-success");
}
function redrawAvatar() {
  if (document.contains(document.getElementById("displayAvatar"))) {
    document.getElementById("displayAvatar").remove();
  }

  let avatarHeight;
  switch (hewan.level) {
    case 1:
      avatarHeight = 12;
      break;
    case 2:
      avatarHeight = 16;
      break;
    case 3:
      avatarHeight = 20;
      break;
  }

  switch (hewan.avatar) {
    case 0:
      if (deathState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Styracosaurus/death.webm" type="video/webm" /></video>');
      else if (!makanState && !tidurState && !mainState && !obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Styracosaurus/idle.gif" style="height: ' + avatarHeight + 'em;">');
      else if (makanState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Styracosaurus/atack.gif" style="height: ' + avatarHeight + 'em;">');
      else if (tidurState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Styracosaurus/death.webm" type="video/webm" /></video>');
      else if (mainState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Styracosaurus/cry.gif" style="height: ' + avatarHeight + 'em;">');
      else if (obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Styracosaurus/cry.gif" style="height: ' + avatarHeight + 'em;">');
      break;
    case 1:
      if (deathState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Carnotaurus/death.webm" type="video/webm" /></video>');
      else if (!makanState && !tidurState && !mainState && !obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Carnotaurus/idle.gif" style="height: ' + avatarHeight + 'em;">');
      else if (makanState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Carnotaurus/atack.gif" style="height: ' + avatarHeight + 'em;">');
      else if (tidurState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Carnotaurus/death.webm" type="video/webm" /></video>');
      else if (mainState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Carnotaurus/cry.gif" style="height: ' + avatarHeight + 'em;">');
      else if (obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Carnotaurus/cry.gif" style="height: ' + avatarHeight + 'em;">');
      break;
    case 2:
      if (deathState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Baryonyx/death.webm" type="video/webm" /></video>');
      else if (!makanState && !tidurState && !mainState && !obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Baryonyx/idle.gif" style="height: ' + avatarHeight + 'em;">');
      else if (makanState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Baryonyx/atack.gif" style="height: ' + avatarHeight + 'em;">');
      else if (tidurState) $("#displayAvatarContainer").append('<video id="displayAvatar" height="' + avatarHeight * 9 + '" autoplay="autoplay"><source src="assets/avatars/Baryonyx/death.webm" type="video/webm" /></video>');
      else if (mainState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Baryonyx/cry.gif" style="height: ' + avatarHeight + 'em;">');
      else if (obatState) $("#displayAvatarContainer").append('<img id="displayAvatar" class="p-5" src="assets/avatars/Baryonyx/cry.gif" style="height: ' + avatarHeight + 'em;">');
      break;
  }
}
function notify(message) {
  redrawAvatar();
  $("#displayNotifications").text(message);
}

// Saat mulai
hewan.nama = namaHewan;
hewan.avatar = avatarSelectIndex;
progressBarColor();
redrawAvatar();
notify("Selamat datang " + hewan.nama + "!");

// Bermain
function startGameBermain() {
  $("#activityButtonsCard").hide();
  $("#displayAvatarContainer").hide();
  $("#gameControlsCard").show();
  $("#grid").show();
}
function exitGameBermain() {
  $("#activityButtonsCard").show();
  $("#displayAvatarContainer").show();
  $("#gameControlsCard").hide();
  $("#grid").hide();
  redrawAvatar();
}

$("#mainExitButton").click(function () {
  if (mainState) {
    mainState = false;
  } else {
    makanState = tidurState = obatState = false;
    mainState = true;
  }

  redrawButtons();
  redrawAvatar();

  exitGameBermain();
});
