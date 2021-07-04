
let doctorInfo = {};
let prescriptionHeaderData = {};
let patientInfo = {};
let previousPrescriptions = [];


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
      alert(err?.responseJSON?.err ?? "Doctor data fetch error.")
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
    url: "/previous-prescription",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      console.log(err.responseJSON)
      alert(err?.responseJSON?.err ?? "Previous prescription fetch error.")
    },
    success: function (data) {
      if(data?.msg?.length){
        previousPrescriptions=data.msg;
        updatePreviousPrescription();
      }
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
      // alert()
      alert(err?.responseJSON?.err ?? "Patient data fetch error.")
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

  updatePrescriptionHeader();
}

async function setPatient(data) {
  // data manipulate for test
  data.reg_no = data.id;

  $("#patientName").val(data.name);
  $("#patientWeight").val("wight: " + data.weight);
  $("#patientSex").val(data.gender);
  $("#patientAge").val("Age: " + data.age);
  $("#patientPregnancyStatus").val("No");
  
  if(data?.gender?.toLowerCase() != 'f'){
    $("#patientPregnancyStatus").prop('disabled',true);
  }
  else{
    $("#patientPregnancyStatus").val("0");
  }
  patientInfo = data;
  
}

async function addNewPrescriptionHeader(){
  let uploadData={
    doctor_id:doctorInfo?.id ?? 0,
    name:doctorInfo?.name ?? "",
    degree:doctorInfo?.degree ?? "" ,
    speciality:doctorInfo?.speciality ?? "",
    institute: doctorInfo?.institute ?? "",
    reg_details: doctorInfo?.bmdc ? `BDMC Reg. No- ${doctorInfo?.bmdc}` : "",
    department: doctorInfo?.department ?? "",
    chember_place_name: "",
    chember_place_address: "",
    chember_contact: doctorInfo?.phone ? `Mobile: ${doctorInfo.phone}` : "",
    chember_visit_time: "",
    chember_special_note: "",
    background_color: "#f8f9fa",
    font_color: "#333333"
  }

  $.post("/header_info",uploadData,(data,status)=>{
    console.log({data,status})
    updatePrescriptionHeader()
  })
}


async function updatePrescriptionHeader(){
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/header_info",
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    jsonpCallback: "processJSONresponse",
    error: (err, text, errThwon) => {
      alert("Data fetch error.")
    },
    success: function (data) {
      if(data.data.length ){
        prescriptionHeaderData = data?.data[0];
      }
      else {
        addNewPrescriptionHeader();
      }
    },
  });
}

const updatePreviousPrescription = async ()=>{
  let html = '<option selected value=-1>Previous Prescription</option>'
  previousPrescriptions.forEach((each,index)=>{
    html += `<option value='${index}'>${each?.date} | ${each?.doctor_name}</option>`
  })


  $("#previous-prescription").html(html)
  $("#previous-prescription").on('change',(e)=>{
    let index = e.target.value;
    updateDiseaseComponentSection(previousPrescriptions[index])
    
  })
  
}





