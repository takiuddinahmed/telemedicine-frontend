let doctorInfo = {};

let patientInfo = {};

$("#updateDoctorInfo").on("click", () => {
  doctorInfo.key = "XDXTBDOPQQRX69FD";
  doctorInfo.name = $("#doctorName").html();
  doctorInfo.phone = $("#doctorNumber").html();
  updateDoctorInfo(doctorInfo);
});

$(async function () {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/info/doctor/",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      alert("Doctor data fetch error.")
    },
    success: function (data) {
      setDoctor(data);
      doctorInfo = data;
      // console.log(data);
    },
  });
});

$(async function () {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/info/patient/",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      alert("patient data fetch error.")
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
  $("#patientPregnancyStatus").val("No");
  patientInfo = data;
  
}
