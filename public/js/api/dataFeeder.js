var doctorInfo = {
  key: "XDXTBDOPQQRX69FD",
  id: 1,
  avatar:
    "https://outdoorbd.com/storage/uploads/avatars/defaults/doctor_male.png",
  address:"chember Address",
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

$("#updateDoctorInfo").on("click", () => {
  doctorInfo.key="XDXTBDOPQQRX69FD";
  doctorInfo.name= $("#doctorName").html();
  doctorInfo.phone=$("#doctorNumber").html();
  updateDoctorInfo(doctorInfo);
});

function updateDoctorInfo(data) {
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
      doctorInfo = data;
      console.log(data);
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
  $("#doctorCollege").text("Medical College");
  $("#doctorNumber").text(data.phone);
  $("#doctorChemberAddress").text(data.address);
}

function setPatient(data) {
  $("#patientName").val(data.name);
  $("#patientWeight").val("wight: " + data.weight);
  $("#patientSex").val(data.gender);
  $("#patientAge").val("Age: " + data.age);
  $("#patientPregnancyStatus").val("yes");
}

// const server = "https://prescriptionapi.outdoorbd.com/"
const server = "http://localhost:3000/"
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N0b3JfaWQiOjEsImlhdCI6MTYwMTAxMzMxMX0.a0julIsHyIEnAZQD_mSZlmb-RhYZNzMfMI8z3JPwcwk";

$("#cc_form").submit(e=>{
  e.preventDefault();
  update_cc($('#ixTemplate').val())
})
function update_cc(txt){
  txt.trim()
  if(txt.length){
    let cc = $("#cc").val() + txt + '\n';
    $("#cc").val(cc);
  }
}

fetch(server + "template/", {
  headers: {
    authorization: "Bearer " + token,
  },
})
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.ok) {
        update_template_auto_complete(res.message[0], 'name', '#ixTemplate')
        update_template_auto_complete(res.message[1], "rx", "#dose_type");
        update_template_auto_complete(res.message[1], "rx", "#dose_duration-");
        update_template_auto_complete(res.message[1], "rx", "#investigation_input");
        update_template_auto_complete(res.message[1], "rx", "#advice_input");
        update_template_auto_complete(res.message[1], "rx", "#counselling_input");
      }
    })
    .catch((err) => {
      console.log(err);
    });

const update_template_auto_complete = (data, entry, jquery_selector) =>{
  $(jquery_selector).easyAutocomplete({
    data: data,
    getValue: entry,
    list: {
      match: {
        enabled: true,
      },
    },
  });
}
