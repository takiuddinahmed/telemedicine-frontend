
const server = "https://prescription.outdoorbd.com/";

const template_source = [
  { 
    form: "#cc_form", 
    source: "#ixTemplate", 
    target: "#cc" ,
    summernote: true, 
    name: "cc",
    index:0
  },
  {
    form: "#investigation_form",
    source: "#investigation_input",
    target: "#ix",
    summernote: true,
    name: "investigation",
    index:0
  },
  {
    form: "#advice_form",
    source: "#advice_input",
    target: "#advice-summernote",
    summernote: true,
    name: "advice",
    index:0
  },
  {
    form: "#counselling_form",
    source: "#counselling_input",
    target: "#counselling_summernote",
    summernote: true,
    name: "counselling",
    index:0
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

let prescription_index = new Date().getTime();
let fixed_datas = "";
let arrow = '<i class="fas fa-arrow-right"></i> ';
let dx_text = '';
let dx_view_status = false;

String.prototype.matchGroup = function (re) {
  let match
  const matches = []


  while (match = re.exec(this)) {

    matches.push([...match.slice(1)])
  }

  return matches
}


const updateTemplateData = async (
  sourceArray,
  sourceName,
  targetSelector,
  source,
  summernote = true,
) => {
  let selectedList = JSON.parse(sourceArray);
  let text = $(targetSelector).summernote("code");
  if (selectedList) {
    selectedList.forEach((c) => {
      source.index += 1;
      const iData = templateDataAll[sourceName].filter(t => t.id == c.id)[0]
      let details = iData.details;
      let m = details.substr(3,details.length - 7)
      const reg = new RegExp(`i> ${m}<`, 'g')
      if (!text.match(reg)){
        let position = details.indexOf('<p>')
        position = position > -1 ? position += 3 : 1;
        txt = details.substring(0, position) + arrow+ details.substring(position)
        if (!iData[0]?.details?.length) txt += '\n'
        text += txt + (summernote ? "" : "\n");
      }
    });
    text = text.replace("<p><br></p>", "")
    if (!summernote) {
      $(targetSelector).val(text);
    } else {
      // console.log(text)
      $(targetSelector).summernote(
        "code",
        text
      );
      // console.log($(targetSelector).summernote('code'))
    }
  }
  else {
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

// dx view
const update_dx_text = (txt, previous_text = false)=>{
  if(previous_text){
    dx_text += " with " + txt;
  }
  else {
    dx_text += txt
  }
  
  update_dx_dom();
}

const update_dx_dom = ()=>{
  $("#dx-text-input").val(dx_text)
}





// disease selection
$(document).ready(() => {
  $("#new-prescription-btn").click(() => {
    let diseaseInput = $("#disease").val();
    diseaseInput.trim();
    if (diseaseInput.length) {
      update_dx_text(diseaseInput, dx_text.length > 0);
      let d = diseaseList.filter((d) => d.name == diseaseInput)[0];
      updateDiseaseComponentSection(d);
      
    } else {
      alert("Add a disease");
    }
  });
  $("#clear-prescription-btn").click(() => {
    template_source.forEach(ts=>{
      $(ts.target).summernote("code", "")
      // $("#medicine_prescription").summernote("code","")
    })
    $("#medicine-list").html("")
  });
});
$(document).ready(() => {
  $(async function () {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/template",
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      jsonpCallback: "processJSONresponse",
      error: (err, text, errThwon) => {
        alert(err?.responseJSON?.err ?? "Doctor data fetch error.")
      },
      success: function (res) {
        
      
      // console.log(res)
      if (res.ok) {
        ccList = res.message[0];
        doseList = res.message[1];
        durationList = res.message[2];
        investigationList = res.message[3];
        adviceList = res.message[4];
        counsellingList = res.message[5];
        diseaseList = includeAltDisease(res.message[6]);
        // console.log(diseaseList)
        drugList = res.message[7];
        update_drug_history();
        templateDataAll = {cc:ccList,investigation:investigationList,advice:adviceList,counselling:counsellingList}
        update_template_auto_complete(
          res.message[0], "title", "#ixTemplate",
          ()=>{
            $("#cc_form").submit();
          }
          );
        update_template_auto_complete(
          res.message[1], "name", "#dose_type",
          ()=>{}
          );
        update_template_auto_complete(
          res.message[2],
          "name",
          "#dose_duration-",

        );
        update_template_auto_complete(
          res.message[3],
          "title",
          "#investigation_input", 
          () => { $("#investigation_form").submit();}
        );
        update_template_auto_complete(
          res.message[4], "title", "#advice_input",
          () => { $("#advice_form").submit(); });
        update_template_auto_complete(
          res.message[5],
          "title",
          "#counselling_input",
          () => { $("#counselling_form").submit(); }
        );
        update_template_auto_complete(diseaseList, "name", "#disease",()=>{
          let diseaseInput = $("#disease").val();
          diseaseInput.trim();
          if (diseaseInput.length) {
            update_dx_text(diseaseInput, dx_text.length > 0);
            let d = diseaseList.filter((d) => d.name == diseaseInput)[0];
            updateDiseaseComponentSection(d);

          }
        });
        update_template_auto_complete(
          res.message[7],
          "trade_name",
          "#drug_brand_name",
          ()=>{
            const medicine = {};
            medicine.trade_name = $("#drug_brand_name").val();
            medicine.generic_id = drugList.filter(
              (d) => d.trade_name == medicine.trade_name
            )[0]?.generic_name_id;

            addDrugInfo(medicine);
          }
        );
      }
      },
    });
  });

  const update_template_auto_complete = (data, entry, jquery_selector, event = ()=>{}) => {
    $(jquery_selector).easyAutocomplete({
      data: data,
      getValue: entry,
      list: {
        match: {
          enabled: true,
        },
        onChooseEvent: event,
      },
    });
  };
});



$(document).ready(() => {
  template_source.forEach((temp) => {
    $(temp.form).submit((e) => {
      e.preventDefault();
      let len = $(temp.target).summernote("code")?.match(/<p>\d/g)?.length;
      temp.index =  len ? len + 1 :  1;
      let txt = $(temp.source).val();
      $(temp.source).val("");
      txt.trim();
      let text = "";
      if (txt.length) {
        // check if available in data list
        const d = templateDataAll[temp.name]?.filter(each=>each.title == txt)
        if(d.length) {
          // console.log(d);
          let details = d[0]?.details;
          txt = d[0]?.details;
          txt = txt.substr(3, txt.length - 7)
          let position = details.indexOf('<p>')
          position = position > -1 ? position += 3 : 1;
          text = details.substring(0, position) + arrow+ details.substring(position)
          
          if(!d[0]?.details?.length) text += '\n'
        }
        else{
          text = '<p>' + arrow + txt + '</p>'
          
        }
        if (!temp.summernote) {
          $(temp.target).val(arrow + ' ' +$(temp.target).val() + text + "\n");
        } else {
          const reg = new RegExp(`i> ${txt}<`, 'g')
          
          if (!$(temp.target).summernote("code").match(reg)) {
            let finalText = $(temp.target).summernote("code")+ text;
            finalText = finalText.replace("<p><br></p>","")
            // console.log(finalText)
            $(temp.target).summernote(
              "code",
              finalText
            );
          }
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
  fixed_datas = d.fixed_data
  let fixed_data = JSON.parse(d.fixed_data) ?? [];
  fixed_data = fixed_data.map(each=>{
    let position = each.indexOf("_state");
    let c = each.substring(0, position);
    $("#"+c).css('color','red')
    $("#" + c).attr('disabled', true)
    return c;
  })

  const se_keyList = Object.keys(d)
                       .map(dd=>[...dd.matchAll(/^(se_[\w_]*)_(\w*)$/g)])
                       .filter(ddd=> ddd && ddd.length)
  
  se_keyList.forEach((se_key)=>{
    se_key = se_key[0]
    const selector = `#${se_key[1]} .${se_key[2]}`;
    if(fixed_data.includes(se_key[0])){
       $(selector).css('color','red');
       $(selector).attr('disabled',true);
    }
    
    const value = d[se_key[0]]
    $(selector).val(value)
  })

  if(d?.doctor_id == -1){
    
    //cc
    updateTemplateData(d.cc, 'cc', "#cc", template_source[0] , true);
    updateTemplateData(d.investigation, 'investigation',"#ix", template_source[1], true);
    updateTemplateData(d.advice,'advice', "#advice-summernote",template_source[2] ,true);
    updateTemplateData(
      d.counselling,
      'counselling',
      "#counselling_summernote",
      template_source[3],
      true
    );


    // update medicine
    let medicineList = d.medicine ? JSON.parse(d.medicine) : [];
    medicineList.forEach(generic=>{
      let medicine={};
      medicine = drugList.filter(d=>d.generic_name_id == generic.id)[0] ?? {};
      medicine.generic_id = generic.id;
      const age_dose = JSON.parse(medicine?.dose_range);
      const patient_age = patientInfo?.age ?? 0;
      if (patient_age > 0) {
        let given_dost = age_dose.filter(d => {
          if (d.from_unit == 'Year' && patient_age >= d.from_val && patient_age <= d.to_val) {
            return true
          }
        })
        if(given_dost.length){
          medicine.dose = given_dost[0]?.value ?? "";
          medicine.dose_time = given_dost[0]?.time ?? "";
          medicine.duration = given_dost[0]?.duration ?? ""
        }
      }
      addMedicineToPrescription(medicine);
    })
  }
  else{
    // dieases data what doctors added
    // console.log("doctor selected")
    d?.cc?.replace("<p><br></p>", "")
    d?.investigation?.replace("<p><br></p>", "")
    d?.advice?.replace("<p><br></p>", "")
    d?.counselling?.replace("<p><br></p>", "")

    // $("#cc").summernote("code",$("#cc").summernote("code")+d?.cc ?? "")
    // $("#ix").summernote("code", $("#ix").summernote("code") +d?.investigation ?? "")
    // $("#advice-summernote").summernote("code", $("#advice-summernote").summernote("code") + d?.advice ?? "")
    // $("#counselling_summernote").summernote("code", $("#counselling_summernote").summernote("code") +d?.counselling ?? "")
    // // $("#medicine_prescription").summernote("code", $("#medicine_prescription").summernote("code") +d?.medicine ?? "")
    // $("#medicine-list").html($("#medicine-list").html() + d?.medicine ?? "")


    $("#cc").summernote("code",d?.cc ?? "")
    $("#ix").summernote("code",d?.investigation ?? "")
    $("#advice-summernote").summernote("code",d?.advice ?? "")
    $("#counselling_summernote").summernote("code",d?.counselling ?? "")
    $("#medicine-list").html(d?.medicine ?? "")


    $("#cc").summernote("code",$("#cc").summernote("code").replace("<p><br></p>", ""))
    $("#ix").summernote("code",$("#ix").summernote("code").replace("<p><br></p>", ""))
    $("#advice-summernote").summernote("code",$("#advice-summernote").summernote("code").replace("<p><br></p>", ""))
    $("#counselling_summernote").summernote("code",(("#counselling_summernote").summernote("code")).replace("<p><br></p>", ""))
    // handle indexing
    template_source[0].index =  d?.cc?.match(/<p>\d/g)?.length ?? 0;
    template_source[1].index =  d?.investigation?.match(/<p>\d/g)?.length ?? 0;
    template_source[2].index =  d?.advice?.match(/<p>\d/g)?.length ?? 0;
    template_source[3].index =  d?.counselling?.match(/<p>\d/g)?.length ?? 0;


    // prescription_index = d?.medicine?.match(/<strong>[\s]*\d\./g)?.length ?? 0;
    // console.log(d.medicine)
    // console.log(d?.medicine?.match(/<strong>[\s]*\d\./g))
  }
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
    
    if(medicine.trade_name[0] == '?'){
      medicine.duration = $("#dose_duration-").val();
      medicine.dose = $("#dose_type").val();
      medicine.dose_time = $("#dose_time_khabar").val();
      if (medicine.trade_name.length > 1) {
        medicine.trade_name = medicine.trade_name.substring(1)
        addMedicineToPrescription(medicine,true);
        $("#drug_brand_name").val("");
        $("#dose_duration-").val("");
        $("#dose_type").val("");
        $("#dose_time_khabar").val("");
      }
      $.post("/doctor-drug-entry", medicine, (data, status) => {
        console.log({ data, status })
      })
    }

    
  

    else{

      let m = drugList.filter(
        (d) => d.trade_name == medicine.trade_name
      )[0];
      
      medicine.generic_id = m.generic_name_id;
      medicine.advice = m.advice ?? "";

      addDrugInfo(medicine,true)
      .then(()=>{

      medicine.duration = $("#dose_duration-").val();
      medicine.dose = $("#dose_type").val();
      medicine.dose_time = $("#dose_time_khabar").val();
      if (medicine.trade_name) {
        addMedicineToPrescription(medicine);
        $("#drug_brand_name").val("");
        $("#dose_duration-").val("");
        $("#dose_type").val("");
        $("#dose_time_khabar").val("");
        if (medicine?.advice?.length > 3 && medicine?.advice != '<p><br></p>'){
          template_source[2].index += 1;
          let details = medicine.advice;
          let position = details.indexOf('<p>')
          position = position > -1 ? position += 3 : 1;
          let txt = details.substring(0, position) + arrow + details.substring(position)
          let text = $("#advice-summernote").summernote("code") + txt;
          text = text.replace("<p><br></p>", "")
          
          $("#advice-summernote").summernote(
              "code",
              text
            );
        }
        
      }
      })
    }
  });
});


const addDrugInfo = async (medicine, check=false)=>{
  let given_dost = [];
  try{
    const drugInfo = drugList.filter(d=>d.generic_name_id == medicine.generic_id)[0]
    const patient_age = patientInfo?.age ?? 0;
    const patient_weight = patientInfo?.weight ?? 0;
    
    if(patient_age>=18){
      const age_dose = JSON.parse(drugInfo?.dose_range)
      given_dost = age_dose.filter(d=>{
        if (d.from_unit != 'Year') { d.from_val /= 12; d.from_unit = 'Year' } else d.from_val /= 1;
        if (d.to_unit != 'Year') { d.from_val /= 12; d.from_unit = 'Year' } else d.to_val /= 1;
        if( patient_age >= d.from_val && patient_age <= d.to_val){
          return true
        }
      })
    }
    else{
      const dose_weight = JSON.parse(drugInfo?.dose_weight)
      
      given_dost = dose_weight.filter(d => {
        if (d.from_unit != 'KG') {d.from_val /= 1000; d.from_unit = 'KG'} else d.from_val /= 1;
        if (d.to_unit != 'KG') { d.to_val /= 1000; d.to_unit = 'KG' } else d.to_val /= 1;
        if (patient_weight >= d.from_val && patient_weight <= d.to_val) {
          return true
        }
      })
      // console.log({ dose_weight, patient_weight, given_dost });
    }
  }
  finally{
    if (given_dost.length) {
      if (check) {
        if (!$("#dose_type").val()?.length) $("#dose_type").val(given_dost[0]?.value ?? "")
        if (!$("#dose_duration-").val()?.length) $("#dose_duration-").val(given_dost[0]?.duration ?? "")
        if (!$("#dose_time_khabar").val()?.length) $("#dose_time_khabar").val(given_dost[0]?.time ?? "")
      }
      else {
        $("#dose_type").val(given_dost[0]?.value ?? "");
        $("#dose_duration-").val(given_dost[0]?.duration ?? "");
        $("#dose_time_khabar").val(given_dost[0]?.time ?? "");
      }
    }
  }
  return ""
}

const checkAddedDrug = (medicine)=>{
  const drugInfo = drugList.filter(d=>d.generic_name_id == medicine.generic_id)
  
  let html = ``;
  if(drugInfo.length){
    // get other drug names
    const simillerDrugs = drugInfo.map(d=>`<tr class="pres-tradename-list" data-index=${prescription_index} data-tradename='${d.trade_name}'> <td>${d.company_name} </td> <td> ${d.trade_name} </td> </tr>`)

    html += `
    <i class="reload fas fa-sync-alt"></i>
    <div class="medicin-name">
                  <table class="table table-sm ">
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
    let warning_case = "";
    if(warnings.length){

      warning_result = warnings.some(w=>{
        const reg = new RegExp(`${w.warning_condition}`,'g')
        const r = cc.match(reg) 
        if(r?.length) warning_case = w.warning_message;
        return r?.length
      })
    }
    html += `<span -id="genericname${prescription_index}">${drugInfo[0]?.generic_name}</span>`
    html += `<span class="ddIneraction" style='display:none' id="dangerball-${prescription_index}" ></span>`

    if (drugInfo[0]?.dose_drug_interection){
      let interectionList = JSON.parse(drugInfo[0]?.dose_drug_interection)
      let interection = interectionList.map(d=>{
        return `<li class="interection-${prescription_index}">${d.drug}</li>`
      })
      html += `
          <ul style="display:none">
            ${interection}
          </ul>
      `
    }
    
    if(warning_result) html+= `
              
                <i class="fas fa-exclamation-triangle text-warning warn-btn"></i>
                <div class="warn-text" style="display: none">
                  <p>
                      ${warning_case ?? "CC conflict"} 
                  </p>
                </div>
                `
    // check pregancy
    if ($("#patientPregnancyStatus").val() == 'yes'){
      let pregancyStatus = drugInfo[0]?.dose_pregnency_category ? JSON.parse(drugInfo[0]?.dose_pregnency_category) : [];
      if(pregancyStatus.length){
        html += `<span> ------- ${pregancyStatus[0].category} </span>`
      }
    }

  }



  return html;

}   


var checkDrugDrugInterection = ()=>{
  console.log("check drug interection")
  $(".ddIneraction").hide();
  // let prescription_texts = $("#medicine_prescription").summernote("code");
  let prescription_texts = $("#medicine-list").html();
  let interectionList = prescription_texts.matchGroup(/class="interection-(\d*)">(.+)<\/li>/gi)
  
  
  interectionList.forEach(interection=>{
    let reg = new RegExp('id="genericname([0-9]*)">'+interection[1]+'<\/span><span',"gi");
    let matchGeneric = prescription_texts.matchGroup(reg);
    if(matchGeneric.length){
      $("#dangerball-"+interection[0]).show();
      $("#dangerball-"+matchGeneric[0][0]).show();
    }
    
  })

  
  

}




const addMedicineToPrescription = (medicine,custom=false
) => {
  allSummerNoteUpdate()
  // prescription_index = $("#medicine_prescription").summernote("code").match(/<strong>[\s]*\d\./g)?.length ?? 0;

  let reg = new RegExp(medicine.trade_name,'g')
  const medicine_html = $("#medicine-list").html();
  if(!medicine_html.match(reg)){

    prescription_index = new Date().getTime();
    let extra = '';
    if(!custom)
      extra = checkAddedDrug(medicine)
    

    // $("#medicine_prescription").summernote(
    //   "code",
    //   $("#medicine_prescription").summernote("code") +
    //     medicinePrescriptionHtmlFormat(medicine,extra)
    // );
    $("#medicine-list").html( medicine_html + medicinePrescriptionHtmlFormat(medicine, extra) )
    checkDrugDrugInterection()
    if(!custom){
      // console.log("operations")
      $(".warn-btn").click(function () {
        $(this).next().fadeToggle(300);
        $('.overlay').toggleClass('active')
      });

      $("i.reload").click(function () {
        $(this).next().fadeToggle(300);
        $('.overlay').toggleClass('active')
      });
      $('.overlay').click(function () {
        $('.warn-btn').next().fadeOut(300)
        $('i.reload').next().fadeOut(300)
        $('.payment-sec').fadeOut(300)
        $('.overlay').removeClass('active')
      })

      $(".pres-tradename-list").click(function(){
        //console.log(this.dataset.index)
        let data_index = this.dataset.index;
        let trade_name = this.dataset.tradename;
        let selector = `#tradename-${data_index}`;
        $(selector).html(trade_name)
        // $(this).parent().parent().fadeToggle(300);
        // $("i.reload").click();
      })

      //remove tab-item
      $('.close-btn').click(function () {
        $(this).parent().parent().remove()
        checkDrugDrugInterection()
        // if ($('.tab-list').children().length === 1) {
        //   document.querySelectorAll('.tab-item')[0].classList.remove('d-none')
        // } else {
        //   // console.log(
        //   //   document.querySelectorAll('.tab-item')[0].classList.add('d-none')
        //   // )
        //   document.querySelectorAll('.tab-item')[0].classList.add('d-none')
        // }
      })
    }
  }
  else{
    console.log("Medicine Exist")
  }

};

const medicinePrescriptionHtmlFormat = (medicine,extra) => {
  // console.log({medicine,extra})
  return `
   <li contenteditable="true" draggable="true" ondragend="dragEnd()" ondragover="dragOver(event)"
                ondragstart="dragStart(event)" class="tab-item">
                <extra><div class="close-btn"><i class="fas fa-times"></i></div></extra><span style="display:none"> ~</span>
                <span class="tab-inner">
                  <strong>
                  <tradename id='tradename-${prescription_index}'>
                    ${medicine.trade_name}
                  </tradename>
                </strong>
                <span style=""> ${medicine.genericName ? `( ${medicine.genericName})`: ''}</span>
                <span >
                   ${medicine.duration ? `------- ${medicine.duration}` : ''}
                </span> 
                <extra>
                  ${extra}
                </extra> <span style="display:none"> ~</span>
               <br />
                ${medicine.dose ? medicine.dose : ""}    ${medicine.dose_time ? medicine.dose_time : ""}
              </li>
  
  `;


  
};
const prescription = {};

const getPreviewInfo = () => {
  allSummerNoteUpdate();
  prescription.bp = $("#bp").val()
  prescription.pulse = $("#pluse").val()
  prescription.temp = $("#temp").val()
  prescription.cc = $("#cc").val();
  prescription.heart = $("#heart").val();
  prescription.lungs = $("#lungs").val();
  prescription.abd = $("#abd").val();
  prescription.advice = $("#advice-summernote").summernote("code");

  prescription.anaemia = $("#anaemia").val();
  prescription.jaundice = $("#jaundice").val();
  prescription.cyanosis = $("#cyanosis").val();
  prescription.oedema = $("#oedema").val();
  prescription.specialNote = $("#special-note-input").val();


  
  // console.log($("#medicine-list").html())

  // prescription.medicine = $("#medicine_prescription")
  prescription.medicine = $("#medicine-list")
    .html()
    .replace(/tab-name/g, "")
    .replace(/style=""/g, 'style="display:none;"')
    .replace(/<extra([.<>\s\w="-\/,:;]+)extra>/g,'')
    .replace(/-------/g,'--------------')

  prescription.patient = patientInfo;
  prescription.doctorInfo = doctorInfo;
  return prescription;
};

const preview_handle = () => {
  getPreviewInfo();
  $("#previewPrescriptionModal").html(prescriptionPreview());
};

let patient_disease_id = null;

const get_disease_data = () => {
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
  // se list 
  let se_list = ["se_nervous_system_palpation", "se_nervous_system_inspection", "se_nervous_system_percussion", "se_nervous_system_auscultation",
    "se_cvs_palpation", "se_cvs_inspection", "se_cvs_percussion", "se_cvs_auscultation",
    "se_alimentary_system_palpation", "se_alimentary_system_inspection", "se_alimentary_system_percussion", "se_alimentary_system_auscultation",
    "se_musculoskeletal_system_palpation", "se_musculoskeletal_system_inspection", "se_musculoskeletal_system_percussion", "se_musculoskeletal_system_auscultation",
    "se_respiratory_system_palpation", "se_respiratory_system_inspection", "se_respiratory_system_percussion", "se_respiratory_system_auscultation"]
  const se_keyList = se_list
    .map(dd => [...dd.matchAll(/^(se_[\w_]*)_(\w*)$/g)])
    .filter(ddd => ddd && ddd.length)

  se_keyList.forEach((se_key) => {
    se_key = se_key[0]
    const selector = `#${se_key[1]} .${se_key[2]}`;
    d[se_key[0]] = $(selector).val()
  })

  d.fixed_data = fixed_datas;

  d.cc = $("#cc").val();
  d.investigation = $("#ix").val();
  d.advice = $("#advice-summernote").summernote("code");
  d.counselling = $("#counselling_summernote").summernote("code");
  // d.medicine = $("#medicine_prescription").summernote("code");
  d.medicine = $("#medicine-list").html();
  d.doctor_id = doctorInfo?.id;
  d.doctor_name = doctorInfo?.name;
  return d
  
};

const save_doctor_disease = ()=>{
  const d = get_disease_data();
  d.name = $("#new-diesease-name").val();
  $.post("save?to=doctor", d, (res, state) => {
    if (res.ok) {
      patient_disease_id = res.id;
    }
    else {
      alert(res?.err)
    }
  });
}

const save_patient_disease = ()=>{
  const d = get_disease_data();
  d.name = $("#disease").val();
  d.patient_id = patientInfo.id;
  let today = new Date();
  d.date = today.toLocaleDateString("en-GB").split(',')[0],
  $.post("save?to=patient", d, (res, state) => {
    if (res.ok) {
      patient_disease_id = res.id;
      alert("Operation complete.")
    }
    else {
      console.log(res)
      alert(res?.err)
    }
  });
  post_drug_history();
}

const save_promt_modal = ()=>{
  $("#save-promt-modal").modal('show');
}

const generatePDF = () => {
  getPreviewInfo();

  const prescriptionHTML = prescriptionPDF2();
  $.post("/pdf", { prescriptionHtmlData: prescriptionHTML },
      (data,status)=>{
        console.log({data,status})
      })
    

    // let prescription_details = prescriptionHTML.replace(/<footer([.<>\s\w="-\/,:;\\\u0000-\uffff]+)footer>/g, '')
    // let today = new Date();
    // $.post("/save-prescription",{
    //   prescription_details: prescription_details,
    //   date: today.toLocaleDateString("en-GB").split(',')[0],
    //   doctor_name : doctorInfo?.name
    // },
    // (data,status)=>{
    //   console.log({data,status})
    // })
    save_patient_disease();
};


// const generatePDF = () => {
//   getPreviewInfo();
  
//   const pdfDiv = document.getElementById("prescription-pdf");
//   const prescriptionHTML = prescriptionPDF();
//   pdfDiv.innerHTML = prescriptionHTML;
//   html2canvas(pdfDiv).then(function (canvasObj) {
//     const pdf = new jsPDF("p", "pt", "a4");
//     pdfConf = {
//       pagesplit: false,
//       background: "#fff",
//     };
//     pdfDiv.innerHTML = "";
//     document.body.appendChild(canvasObj);
//     pdf.addHTML(canvasObj, 0, 0, pdfConf, () => {
//       // pdf.save(patientInfo.name + ".pdf");
      
//       const pdfOutput = pdf.output('blob');
//       const formData = new FormData();
//       formData.append('pdf', pdfOutput);
//       $.ajax('/pdf',
//             {
//                 method: 'POST',
//                 data: formData,
//                 processData: false,
//                 contentType: false,
//                 success: function(data){console.log(data)},
//                 error: function(data){console.log(data)}
//             });

//       let prescription_details = prescriptionHTML.replace(/<footer([.<>\s\w="-\/,:;\\\u0000-\uffff]+)footer>/g, '')
//       let today = new Date();
//       $.post("/save-prescription",{
//         prescription_details: prescription_details,
//         date : today.toLocaleDateString("en-US"),
//         doctor_name : doctorInfo?.name
//       },
//       (data,status)=>{
//         console.log({data,status})
//       }
//       )

//     });
//   });
// };




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
  // $("#medicine_prescription").summernote(
  //     "code",
  //     $("#medicine_prescription").summernote("code") 
  //   );

    $(".warn-btn").click(function () {
    $(this).next().fadeToggle(300);
  });

  $("i.reload").click(function () {
  $(this).next().fadeToggle(300);
});

}

const includeAltDisease = (disease) =>{
  const alt_disease_data = [];
  disease.forEach(d=>{
    if (d.alternative_name){
      const alt_names = d.alternative_name;
      let alt_name_list = alt_names.split(";");
      alt_name_list.forEach(al=>{
        let n_al = {...d}
        n_al.name = al
        alt_disease_data.push(n_al);
      })
  }
  })
  return [...disease,...alt_disease_data]
}






