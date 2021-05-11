// const server = "http://localhost:3000/prescription/";
const server = "https://prescription.outdoorbd.com/";

const template_source = [
  { form: "#cc_form", source: "#ixTemplate", target: "#cc" ,summernote: true, name: "cc"},
  {
    form: "#investigation_form",
    source: "#investigation_input",
    target: "#ix",
    summernote: true,
    name: "investigation"
  },
  {
    form: "#advice_form",
    source: "#advice_input",
    target: "#advice-summernote",
    summernote: true,
    name: "advice"
  },
  {
    form: "#counselling_form",
    source: "#counselling_input",
    target: "#counselling_summernote",
    summernote: true,
    name: "counselling"
  },
];

let ccList = [];
let doseList = [];
let durationList = [];
let investigationList = [];
let adviceList = [];
let counsellingList = [];
let diseaseList = [];
let drugList = [];

let templateDataAll = {};

// disease selection

$(document).ready(() => {
  $("#new-prescription-btn").click(() => {
    let diseaseInput = $("#disease").val();
    diseaseInput.trim();
    if (diseaseInput.length) {
      let d = diseaseList.filter((d) => d.name == diseaseInput)[0];
      updateDiseaseComponentSection(d);
    } else {
      alert("Add a disease");
    }
  });
});
$(document).ready(() => {
  fetch(server + "template/")
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      if (res.ok) {
        ccList = res.message[0];
        doseList = res.message[1];
        durationList = res.message[2];
        investigationList = res.message[3];
        adviceList = res.message[4];
        counsellingList = res.message[5];
        diseaseList = res.message[6];
        drugList = res.message[7];
        templateDataAll = {cc:ccList,investigation:investigationList,advice:adviceList,counselling:counsellingList}
        update_template_auto_complete(res.message[0], "title", "#ixTemplate");
        update_template_auto_complete(res.message[1], "name", "#dose_type");
        update_template_auto_complete(
          res.message[2],
          "name",
          "#dose_duration-"
        );
        update_template_auto_complete(
          res.message[3],
          "title",
          "#investigation_input"
        );
        update_template_auto_complete(res.message[4], "title", "#advice_input");
        update_template_auto_complete(
          res.message[5],
          "title",
          "#counselling_input"
        );
        update_template_auto_complete(res.message[6], "name", "#disease");
        update_template_auto_complete(
          res.message[7],
          "trade_name",
          "#drug_brand_name"
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

  const update_template_auto_complete = (data, entry, jquery_selector) => {
    $(jquery_selector).easyAutocomplete({
      data: data,
      getValue: entry,
      list: {
        match: {
          enabled: true,
        },
      },
    });
  };
});
$(document).ready(() => {
  template_source.forEach((temp) => {
    $(temp.form).submit((e) => {
      e.preventDefault();
      let txt = $(temp.source).val();
      $(temp.source).val("");
      txt.trim();
      if (txt.length) {
        // check if available in data list
        const d = templateDataAll[temp.name]?.filter(each=>each.title == txt)
        if(d.length) {
          console.log(d);
          txt = d[0]?.details;
        }
        else{
          txt = '<p>' + txt + '</p>'
        }
        if (!temp.summernote) {
          $(temp.target).val($(temp.target).val() + txt + "\n");
        } else {
          let  finalText = $(temp.target).summernote("code") + txt;
          finalText = finalText.replace("<p><br></p>","")
          console.log(finalText)
          $(temp.target).summernote(
            "code",
            finalText
          );
        }
      }
    });
  });
});
const updateDiseaseComponentSection = (d) => {
  $(".bpBox").text(d.bp);
  $(".pluseBox").text(d.pulse);
  $(".tempBox").text(d.temp);
  $(".heartBo").text(d.heart);
  $(".lungsBox").text(d.lungs);
  $(".abdBox").text(d.abd);
  $(".anaemiaBox").text(d.anaemia);
  $(".jaundiceBox").text(d.jaundice);
  $(".cyanosisBox").text(d.cyanosis);
  $(".oedemaBox").text(d.oedema);
  $("#bp").val(d.bp);
  $("#pluse").val(d.pulse);
  $("#temp").val(d.temp);
  $("#heart").val(d.heart);
  $("#lungs").val(d.lungs);
  $("#abd").val(d.abd);
  $("#anaemia").val(d.anaemia);
  $("#jaundice").val(d.jaundice);
  $("#cyanosis").val(d.cyanosis);
  $("#oedema").val(d.oedema);
  $("#special-note-input").val(d.special_note);

  const se_keyList = Object.keys(d)
                       .map(dd=>[...dd.matchAll(/^(se_[\w_]*)_(\w*)$/g)])
                       .filter(ddd=> ddd && ddd.length)
  se_keyList.forEach((se_key)=>{
    se_key = se_key[0]
    const selector = `#${se_key[1]} .${se_key[2]}`;
    const value = d[se_key[0]]
    $(selector).val(value)
  })

  const updateTemplateData = async (
    sourceArray,
    sourceName,
    targetSelector,
    summernote = true
  ) => {
    let selectedList = JSON.parse(sourceArray);
    let text = "";
    if(selectedList){
      selectedList.forEach((c) => {
        const iData = templateDataAll[sourceName].filter(t=>t.id == c.id)[0]
        text += iData.details  + (summernote ? "<br/>" : "\n");
      });
      if (!summernote) {
        $(targetSelector).val(text);
      } else {
        $(targetSelector).summernote(
          "code",
          text 
        );
      }
    }
    else{
        if (!summernote) {
                $(targetSelector).val('');
              } else {
                $(targetSelector).summernote(
                  "code",
                  '' + "<br/>"
                );
              }
            }
  };
  //cc
  updateTemplateData(d.cc,'cc',  "#cc");
  updateTemplateData(d.investigation, 'investigation',"#ix");
  updateTemplateData(d.advice,'advice', "#advice-summernote", true);
  updateTemplateData(
    d.counselling,
    'counselling',
    "#counselling_summernote",
    true
  );
};


// drug add event
$(document).ready(() => {
  $("#set-drug").click(()=>{

    const medicine = {};
    medicine.trade_name = $("#drug_brand_name").val();
    medicine.generic_id = drugList.filter(
      (d) => d.trade_name == medicine.trade_name
    )[0]?.generic_name_id;

    addDrugInfo(medicine)

  })

  $("#add-drug-btn").click(() => {
    const medicine = {};
    medicine.trade_name = $("#drug_brand_name").val();
    medicine.generic_id = drugList.filter(
      (d) => d.trade_name == medicine.trade_name
    )[0]?.generic_name_id;
    medicine.duration = $("#dose_duration-").val();
    medicine.dose = $("#dose_type").val();
    medicine.dose_time = $("#dose_time_khabar").val();
    if (medicine.trade_name) {
      addMedicineToPrescription(medicine);
      $("#drug_brand_name").val("");
      $("#dose_duration-").val("");
      $("#dose-type").val("");
    }
  });
});


const addDrugInfo = (medicine)=>{
  try{
  const drugInfo = drugList.filter(d=>d.generic_name_id == medicine.generic_id)[0]

  // check weight
  // const dose_weight = JSON.parse(drugInfo?.dose_weight)

  // check age dose
  const age_dose = JSON.parse(drugInfo?.dose_range);
  const patient_age = patientInfo?.age ?? 0;
  if(patient_age>0){
    let given_dost = age_dose.filter(d=>{
      if(d.from_unit == 'Year' && patient_age >= d.from_val && patient_age <= d.to_val){
        return true
      }
    })
    if(given_dost.length){
      $("#dose_type").val(given_dost[0]?.value ?? "");
      $("#dose_duration-").val(given_dost[0]?.duration ?? "");
      $("#dose_time_khabar").val(given_dost[0]?.time ?? "");
    }  }

  // check pregnency condition
  // const dose_pregnency_category = JSON.parse(drugInfo?.dose_pregnency_category);


  // console.log({dose_weight,dose_pregnency_category, age_dose,medicine,drugInfo})

  }
  finally{

  }
  
}

const checkAddedDrug = (medicine)=>{
  const drugInfo = drugList.filter(d=>d.generic_name_id == medicine.generic_id)
  let html = ``;
  if(drugInfo.length){
    // get other drug names
    const simillerDrugs = drugInfo.map(d=>`<tr> <td>${d.company_name} </td> <td> ${d.trade_name} </td> </tr>`)

    html += `
    <i class="reload fas fa-sync-alt"></i>
    <div class="medicin-name">
                  <table class="table table-sm">
                  <tr>
                    <th>Company Name </th>
                    <th>Trade Name </th>
                  </tr>
                    ${simillerDrugs}
                  </table>
                </div>
    `

    const cc = $("#cc").val();
    let warning_result = false;
    const warnings_str = drugInfo[0]?.dose_warning_condition;
    const warnings = JSON.parse(warnings_str ?? '[]');
    if(warnings.length){
      warning_result = warnings.some(w=>{
        const reg = new RegExp(`${w.warning_condition}`,'g')
        const r = cc.match(reg) 
        return r?.length
      })
    }
    html += `<span>${drugInfo[0]?.generic_name}</span>`
    if(warning_result) html+= `
                <i class="fas fa-exclamation-triangle text-warning warn-btn"></i>
                <div class="warn-text" style="display: none">
                  <p>
                  </p>
                </div>
                `

  }
  return html;
}   



const addMedicineToPrescription = (medicine) => {
  allSummerNoteUpdate()
  const extra = checkAddedDrug(medicine)

  $("#medicine_prescription").summernote(
    "code",
    $("#medicine_prescription").summernote("code") +
      medicinePrescriptionHtmlFormat(medicine,extra)
  );

  $(".warn-btn").click(function () {
    $(this).next().fadeToggle(300);
  });

  $("i.reload").click(function () {
  $(this).next().fadeToggle(300);
});


};

const medicinePrescriptionHtmlFormat = (medicine,extra) => {
  return `
   <div class="tab-name">
                <strong>
                  ${medicine.trade_name}
                </strong>
                <span style=""> ${medicine.genericName ? `( ${medicine.genericName})`: ''}</span>
                <span >
                   ${medicine.duration ? `------- ${medicine.duration}` : ''}
                </span> 
                <extra>
                  ${extra}
                </extra>
               <br />
                ${medicine.dose}    ${medicine.dose_time}
              </div>
  
  `;


  
};
const prescription = {};

const getPreviewInfo = () => {
  allSummerNoteUpdate();
  prescription.cc = $("#cc").val();
  prescription.heart = $("#heart").val();
  prescription.lungs = $("#lungs").val();
  prescription.abd = $("#abd").val();
  prescription.advice = $("#advice-summernote").summernote("code");

  prescription.medicine = $("#medicine_prescription")
    .summernote("code")
    .replace(/tab-name/g, "")
    .replace(/style=""/g, 'style="display:none;"')
    .replace(/<extra([.<>\s\w="-\/,:;]+)extra>/g,'')

  // console.log(prescription.medicine)

  // console.log(prescription.medicine.match(/<extra([.<>\s\w="-\/,:;]+)extra>/g))
    
  prescription.patient = patientInfo;
  prescription.doctorInfo = doctorInfo;
  return prescription;
};

const preview_handle = () => {
  getPreviewInfo();
  $("#previewPrescriptionModal").html(prescriptionPreview());
};

let patient_disease_id = null;

const save_patient_disease = () => {
  const d = {};
  d.bp = $("#bp").val();
  d.pulse = $("#pluse").val();
  d.temp = $("#temp").val();
  d.heart = $("#heart").val();
  d.lungs = $("#lungs").val();
  d.abd = $("#abd").val();
  d.anaemia = $("#anaemia").val();
  d.jaundice = $("#jaundice").val();
  d.cyanosis = $("#cyanosis").val();
  d.oedema = $("#oedema").val();
  d.specialNote = $("#special-note-input").val();
  d.cc = $("#cc").val();
  d.investigation = $("#ix").val();
  d.advice = $("#advice-summernote").summernote("code");
  d.counselling = $("#counselling_summernote").summernote("code");
  d.medicine = $("#medicine_prescription").summernote("code");
  d.patient_id = patientInfo?.id;
  d.doctor_id = doctorInfo?.id;
  d.disease_name = $("#disease").val();
  d.se_nervousSystem = "";
  d.se_respiratorySystem = "";
  d.se_cvs = "";
  d.se_alimentarySystem = "";
  d.se_musculoskeletalSystem = "";
  $.post("save", d, (res) => {
    console.log(res);
    if (res.ok) {
      patient_disease_id = res.id;
    }
  });
};

const generatePDF = () => {
  getPreviewInfo();
  
  const pdfDiv = document.getElementById("prescription-pdf");
  pdfDiv.innerHTML = prescriptionPDF();
  html2canvas(pdfDiv).then(function (canvasObj) {
    const pdf = new jsPDF("p", "pt", "a4");
    pdfConf = {
      pagesplit: false,
      background: "#fff",
    };
    pdfDiv.innerHTML = "";
    document.body.appendChild(canvasObj);
    pdf.addHTML(canvasObj, 0, 0, pdfConf, () => {
      pdf.save(patientInfo.name + ".pdf");
      
      const pdfOutput = pdf.output('blob');
      const formData = new FormData();
      formData.append('pdf', pdfOutput);
      $.ajax('/pdf',
            {
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){console.log(data)},
                error: function(data){console.log(data)}
            });
    });
  });
};


const allSummerNoteUpdate = ()=>{

  template_source.forEach(e=>{
    if(e.summernote){
      // setInterval(()=>{
          $(e.target).summernote(
          "code",
          $(e.target).summernote("code") 
        );    
      // },30000)
    }

  })
  $("#medicine_prescription").summernote(
      "code",
      $("#medicine_prescription").summernote("code") 
    );

    $(".warn-btn").click(function () {
    $(this).next().fadeToggle(300);
  });

  $("i.reload").click(function () {
  $(this).next().fadeToggle(300);
});

}






