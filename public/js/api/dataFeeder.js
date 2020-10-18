var doctorInfo = {
  key: "XDXTBDOPQQRX69FD",
  id: 1,
  avatar:
    "https://outdoorbd.com/storage/uploads/avatars/defaults/doctor_male.png",
  address: "chember Address",
  bmdc: "012311122399",
  gender: "m",
  id: 1,
  name: "name",
  offline_from: "ending time",
  online_from: "opening time",
  phone: "phone",
  speciality: "Dentist",
  working_days: "working days of doctor",
};

let patientInfo = {};

$("#updateDoctorInfo").on("click", () => {
  doctorInfo.key = "XDXTBDOPQQRX69FD";
  doctorInfo.name = $("#doctorName").html();
  doctorInfo.phone = $("#doctorNumber").html();
  updateDoctorInfo(doctorInfo);
});

async function updateDoctorInfo(data) {
  $.ajax({
    type: "POST",
    url: "https://outdoorbd.com/rest-api/doctor/",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    data: JSON.stringify(doctorInfo),
    success: function (data) {
      console.log("updated", data);
    },
    error: (err, text, errThwon) => {
      console.log(err);
      console.log(text);
      console.log(errThwon);
    },
  });
}

// $("#chemberAddressUpdate").on("click",()=>{
//   doctorInfo.address=$("#doctorChemberAddress").text();
//   updateDoctorInfo(doctorInfo);
// })

$(async function () {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://outdoorbd.com/rest-api/doctor/1/XDXTBDOPQQRX69FD",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      console.log(err);
      console.log(text);
      console.log(errThwon);
    },
    success: function (data) {
      setDoctor(data);
      doctorInfo = data;
      console.log(data);
    },
  });
});

$(async function () {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://outdoorbd.com/rest-api/patient/1/XDXTBDOPQQRX69FD",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      console.log(err);
      console.log(text);
      console.log(errThwon);
    },
    success: function (data) {
      patientInfo = data;
      setPatient(data);
    },
  });
});

async function setDoctor(data) {
  $("#doctorName").text(data.name);
  $("#doctorBMDC").text("BMDC Reg. No-" + data.bmdc);
  $("#doctorCollege").text("Medical College");
  $("#doctorNumber").text(data.phone);
  $("#doctorChemberAddress").text(data.address);
}

async function setPatient(data) {
  $("#patientName").val(data.name);
  $("#patientWeight").val("wight: " + data.weight);
  $("#patientSex").val(data.gender);
  $("#patientAge").val("Age: " + data.age);
  $("#patientPregnancyStatus").val("yes");
}
