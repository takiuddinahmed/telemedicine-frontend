// const server = "http://localhost:3000/prescription/";
const server = "https://prescription.outdoorbd.com/";

const template_source = [
  { form: "#cc_form", source: "#ixTemplate", target: "#cc" },
  {
    form: "#investigation_form",
    source: "#investigation_input",
    target: "#ix",
  },
  {
    form: "#advice_form",
    source: "#advice_input",
    target: "#advice-summernote",
    summernote: true,
  },
  {
    form: "#counselling_form",
    source: "#counselling_input",
    target: "#counselling_summernote",
    summernote: true,
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
      if (res.ok) {
        ccList = res.message[0];
        doseList = res.message[1];
        durationList = res.message[2];
        investigationList = res.message[3];
        adviceList = res.message[4];
        counsellingList = res.message[5];
        diseaseList = res.message[6];
        drugList = res.message[7];
        update_template_auto_complete(res.message[0], "name", "#ixTemplate");
        update_template_auto_complete(res.message[1], "name", "#dose_type");
        update_template_auto_complete(
          res.message[2],
          "name",
          "#dose_duration-"
        );
        update_template_auto_complete(
          res.message[3],
          "name",
          "#investigation_input"
        );
        update_template_auto_complete(res.message[4], "name", "#advice_input");
        update_template_auto_complete(
          res.message[5],
          "name",
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
        if (!temp.summernote) {
          $(temp.target).val($(temp.target).val() + txt + "\n");
        } else {
          $(temp.target).summernote(
            "code",
            $(temp.target).summernote("code") + txt + "<br/>"
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
    targetSelector,
    summernote = false
  ) => {
    let selectedList = JSON.parse(sourceArray);
    let text = "";
    if(selectedList){
      selectedList.forEach((c) => {
        text += c.text  + (summernote ? "<br/>" : "\n");
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
  updateTemplateData(d.cc,  "#cc");
  updateTemplateData(d.investigation ,"#ix");
  updateTemplateData(d.advice, "#advice-summernote", true);
  updateTemplateData(
    d.counselling,
    "#counselling_summernote",
    true
  );
};

// drug add event
$(document).ready(() => {
  $("#add-drug-btn").click(() => {
    const medicine = {};
    medicine.trade_name = $("#drug_brand_name").val();
    medicine.genericName = drugList.filter(
      (d) => d.trade_name == medicine.trade_name
    )[0]?.generic_name;
    medicine.duration = $("#dose_duration-").val();
    medicine.dose = $("#dose_type").val();
    medicine.dose_time = $("#dose_time_khabar").val();
    if (medicine.trade_name) {
      addMedicineToPrescription(medicine);
      $("#drug_brand_name").val("");
      $("#dose_duration-").val("");
    }
  });
});

const addMedicineToPrescription = (medicine) => {
  $("#medicine_prescription").summernote(
    "code",
    $("#medicine_prescription").summernote("code") +
      medicinePrescriptionHtmlFormat(medicine)
  );
};

const medicinePrescriptionHtmlFormat = (medicine) => {
  return `
   <div class="tab-name">
                <strong>
                  ${medicine.trade_name}
                </strong>
                <span style=""> ${medicine.genericName ? `( ${medicine.genericName})`: ''}</span>
                <span >
                   ${medicine.duration ? `------- ${medicine.duration}` : ''}
                </span>
               <br />
                ${medicine.dose}    ${medicine.dose_time}
              </div>
  
  `;
};
const prescription = {};

const getPreviewInfo = () => {
  prescription.cc = $("#cc").val();
  prescription.heart = $("#heart").val();
  prescription.lungs = $("#lungs").val();
  prescription.abd = $("#abd").val();
  prescription.advice = $("#advice-summernote").summernote("code");

  prescription.medicine = $("#medicine_prescription")
    .summernote("code")
    .replace(/tab-name/g, "")
    .replace(/style=""/g, 'style="display:none;"');
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
      // document.body.removeChild(canvasObj);
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
