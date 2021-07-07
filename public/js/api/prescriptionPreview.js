function prescriptionPreview() {
  let dx = getDx();
  return ` <div class="modal-dialog modal-lg">
     <div class="modal-content" >
       <main class="container-md" id="prescriptionPreview">
         <div class="preview-paper border">
         <style>
            .back-color{
              background-color:${prescriptionHeaderData.background_color} !important;
              color:${prescriptionHeaderData.font_color} !important;
            }
            .cc {
              max-height: 250px !important;
              overflow: hidden;
            }
            .previewAdvice{
              margin-top: 80px;

            }
            </style>
           <div class="row m-0 back-color"> 
            <div class="col-6 text-left">
               <div class="preview-header" >
                 <h4>${prescriptionHeaderData.name}</h4>
                 <h4>${prescriptionHeaderData.degree}</h4>
                 <p>${prescriptionHeaderData.speciality}</p>
                 <p>${prescriptionHeaderData.institute}</p>
                 <p>${prescriptionHeaderData.reg_details}</p>
               </div>
             </div>
             <div class="col-6 text-right">
               <div class="preview-header">
                 <h4>Chember</h4>
                 <p>${prescriptionHeaderData?.chember_place_name}</p>
                 <p>${prescriptionHeaderData?.chember_place_address}</p>
                 <p>${prescriptionHeaderData.chember_contact}</p>
                 <p>${prescriptionHeaderData.chember_visit_time}</p>
                 <p class="font-weight-bold">${prescriptionHeaderData.chember_special_note}</p>
               </div>
             </div>
           </div>
           <div class="patient-info">
             <p>Name : <span>${patientInfo.name}</span></p>
             <p>Age : <span>${patientInfo.age}</span></p>
             <p>Sex : <span>${patientInfo.gender}</span></p>
             <p>Date : <span>${(new Date).toLocaleString("en-GB").split(',')[0]} </span></p>
             <p>Address : <span>${patientInfo.address}</span></p>
             <p>Reg No : <span>${patientInfo?.reg_no ?? "Unknown"}</span></p>
             <p>Weight : <span>${patientInfo.weight}</span></p>
             <p>Mobile : <span>${patientInfo.phone}</span></p>
           </div>
           <div class="row middle">
             <div class="col-5 border-right py-2">
               <div class="barcode-section border-bottom">
                 <div class="barcode" id="barcode"></div>
               </div>
               <div class="cc border-bottom">
                 <span>C/C</span>
                 <p>${prescription.cc}</p>
               </div>
               <div class="oe border-bottom">
                 <span>O/E</span>
                 ${getOe()}
                 ${getOESe()}
               </div>
              ${getDrugHistory()}
               ${dx}
             </div>
             <div class="col-7 py-2">
               <h3 style="margin-bottom:20px !important">Rx.</h3>
               <div>
                ${prescription.medicine}
              </div>

               <div class="previewAdvice">
                 <h6><b>উপদেশ</b></h6>
                 ${prescription.advice}
               </div>
   
             </div>
           </div>
           <div class="preview-footer border-top bg-light">
             ${getDays()}
           </div>
           <div class="preview-footer border-top">
             নিয়ম মাফিক ঔষধ খাবেন। ডাক্তারের পরামর্শ ব্যতীত ঔষধ পরিবর্তন নিষেধ।
           </div>
         </div>
       </main>
       <script>
       var value = ${getBarcodeValue()} + ""
       
        $(".barcode").barcode(
        value, // Value barcode (dependent on the type of barcode)

        "ean13" // type (string)
      );
       </script>
     </div>`;
}

const prescriptionPDF2= ()=>{
  return `
    <style>
    .back-color{
      background-color:${prescriptionHeaderData.background_color} !important;
      color:${prescriptionHeaderData.font_color} !important;
    }
    .cc {
              max-height: 250px !important;
              overflow: hidden;
            }
            .previewAdvice{
              margin-top: 80px;

            }
    </style>

    <main class="container" id="prescriptionPreview">
         <div class="preview-paper border">
           <div class="row m-0 back-color">
             <div class="col-5 text-left">
               <div class="preview-header" >
                 <h4>${prescriptionHeaderData.name}</h4>
                 <h4>${prescriptionHeaderData.degree}</h4>
                 <p>${prescriptionHeaderData.speciality}</p>
                 <p>${prescriptionHeaderData.institute}</p>
                 <p>${prescriptionHeaderData.reg_details}</p>
               </div>
             </div>
             <div class="col-6 text-right">
               <div class="preview-header">
                 <h4>Chember</h4>
                 <p>${prescriptionHeaderData?.chember_place_name}</p>
                 <p>${prescriptionHeaderData?.chember_place_address}</p>
                 <p>${prescriptionHeaderData.chember_contact}</p>
                 <p>${prescriptionHeaderData.chember_visit_time}</p>
                 <p class="font-weight-bold">${prescriptionHeaderData.chember_special_note}</p>
               </div>
             </div>
           </div>
           <div class="patient-info">
             <p>Name : <span>${patientInfo.name}</span></p>
             <p>Age : <span>${patientInfo.age}</span></p>
             <p>Sex : <span>${patientInfo.gender}</span></p>
             <p>Date : <span>${(new Date).toLocaleString("en-GB").split(',')[0]}</span></p>
             <p>Address : <span>${patientInfo.address}</span></p>
             <p>Reg No : <span>${patientInfo?.reg_no ?? "Unknown"}</span></p>
             <p>Weight : <span>${patientInfo.weight}</span></p>
             <p>Mobile : <span>${patientInfo.phone}</span></p>
           </div>
           <div class="row middle">
             <div class="col-4 border-right py-2">
               <div class="barcode-section border-bottom">
                 <div class="barcode"></div>
               </div>
               <div class="cc border-bottom">
                 <span>C/C</span>
                 <p>${prescription.cc}</p>
               </div>
               <div class="oe border-bottom">
                 <span>O/E</span>
                  ${getOe()}
                  ${getOESe()}
               </div>
               ${getDrugHistory()}
               ${getDx()}
             </div>
             <div class="col-7 py-2">
               <h3 style="margin-bottom:20px !important">Rx.</h3>
               ${prescription.medicine}

               <div class="previewAdvice">
                 <h6><b>উপদেশ</b></h6>
                 ${prescription.advice}
               </div>

             </div>
           </div>
            <div class="preview-footer border-top bg-light">
             ${getDays()} পরে আসবেন
           </div>
           <div class="preview-footer border-top">
             নিয়ম মাফিক ঔষধ খাবেন। ডাক্তারের পরামর্শ ব্যতীত ঔষধ পরিবর্তন নিষেধ।
           </div>
         </div>
         <script>
       var value = ${getBarcodeValue()} + ""
       console.log(valueee)
        $(".barcode").barcode(
        value, // Value barcode (dependent on the type of barcode)

        "ean13" // type (string)
      );
       </script>
       </main>
  
  `
}


const getDx = ()=>{
  if($("#dx-view-check").is(":checked")){
    return (
    `
      <div class="oe text-center">
        
        <p><b> 	&#9660 ${$("#dx-text-input").val()}</b></p>
      </div>
    `
    )
  }
  return ""
}

let default_d = 'Absent';
const getOe  = ()=>{
  
  console.log(prescription)
  return (
    `
      ${prescription.bp != default_d ? '<p>Bp : <span>'+prescription.bp+'</span></p>' : ''}
      ${prescription.pulse != default_d ? '<p>Pulse : <span>'+prescription.pulse+'</span></p>' : ''}
      ${prescription.temp != default_d ? '<p>Heart : <span>'+prescription.temp+'</span></p>' : ''}
      ${prescription.heart != default_d ? '<p>Heart : <span>'+prescription.heart+'</span></p>' : ''}
      ${prescription.lungs != default_d ? '<p>Lungs : <span>'+prescription.lungs+'</span></p>' : '' }
      ${prescription.abd != default_d ? '<p>Abd : <span>'+prescription.abd+'</span></p>' : '' }
      ${prescription.anaemia != default_d ? '<p>Anaemia : <span>'+prescription.anaemia+'</span></p>' : '' }
      ${prescription.jaundice != default_d ? '<p>Jaundice : <span>'+prescription.jaundice+'</span></p>' : '' }
      ${prescription.oedema != default_d ? '<p>Oedema : <span>'+prescription.oedema+'</span></p>' : '' }
      
    `
  )
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const getOESe = ()=>{
  let d = "";
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
    // d[se_key[0]] = $(selector).val()
    let val = $(selector).val();
    let name_arr = se_key[0].split('_')
    if (val && val != default_d)
      d += `<p> ${name_arr[1].capitalize()} ${name_arr[2].capitalize()} (${name_arr[3].capitalize()}) : ${val} </p>`
  })

  let special_note = $("#special-note-input").val();
  if (special_note && special_note.length > 0 && special_note != default_d){
    d+= `<p> Special note : ${special_note} </p>`
  }

  return d;
}

const getDays = ()=>{
  return (
      `
        ${$("#pres-day-").val()} ${$("#pres-select-").val()} পরে আসবেন। 
      `
  )
}

const getBarcodeValue = ()=>{
  console.log("bar code call")
  return "1122334455667"
}

const getDrugHistory = ()=>{
  let dh = $("#drug-history").html();
  if (dh.length) {
    return (
      `
      <div class="oe border-bottom">
        <span>D/H</span>
        <p>${dh}</p>
      </div>
    `
    )
  }
  return ""
}