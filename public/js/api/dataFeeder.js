$("#updateDoctorInfo").on("click", () => {
    const updatedData={
        key: 'XDXTBDOPQQRX69FD',
        id: 1,
        name: $("#doctorName").html(),
        // college:$("#doctorCollege").html(),      API is not available yet
        phone:$("#doctorNumber").html(),
      }
    
  $.ajax({
    type: "POST",
    url: "https://outdoorbd.com/rest-api/doctor/",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    data: JSON.stringify(updatedData),
    success: function (data) {
      console.log("updated", data);
    },
    error: (err, text, errThwon) => {
      console.log(err);
      console.log(text);
      console.log(errThwon);
    },
  });
});

$(function () {
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
    },
  });
});

$(function () {
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
      setPatient(data);
    },
  });
});

function setDoctor(data) {
  $("#doctorName").text(data.name);
  $("#doctorBMDC").text("BMDC Reg. No-" + data.bmdc);
  $("#doctorCollege").text("Unknown");
  $("#doctorNumber").text("Call :" + data.phone);
  //   $('doctorChemberContactNumber').text(data.name);
}

function setPatient(data) {
  $("#patientName").val(data.name);
  $("#patientWeight").val("wight: " + data.weight);
  $("#patientSex").val(data.gender);
  $("#patientAge").val("Age: " + data.age);
  $("#patientPregnancyStatus").val("yes");
}
