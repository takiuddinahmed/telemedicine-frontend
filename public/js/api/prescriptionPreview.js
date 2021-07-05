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
                 <div class="barcode"></div>
               </div>
               <div class="cc border-bottom">
                 <span>C/C</span>
                 <p>${prescription.cc}</p>
               </div>
               <div class="oe border-bottom">
                 <span>O/E</span>
                 ${getOe()}
               </div>
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
               </div>
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
       </main>
  
  `
}


const getDx = ()=>{
  if($("#dx-view-check").is(":checked")){
    return (
    `
      <div class="oe border-bottom">
        <span>D/H</span>
        <p>${$("#dx-text-input").val()}</p>
      </div>
    `
    )
  }
  return ""
}

const getOe  = ()=>{
  return (
    `
      ${prescription.bp != 'Absent' ? '<p>Bp : <span>'+prescription.bp+'</span></p>' : ''}
      ${prescription.pulse != 'Absent' ? '<p>Pulse : <span>'+prescription.pulse+'</span></p>' : ''}
      ${prescription.temp != 'Absent' ? '<p>Heart : <span>'+prescription.temp+'</span></p>' : ''}
      ${prescription.heart != 'Absent' ? '<p>Heart : <span>'+prescription.heart+'</span></p>' : ''}
      ${prescription.lungs != 'Absent' ? '<p>Lungs : <span>'+prescription.lungs+'</span></p>' : '' }
      ${prescription.lungs != 'Absent' ? '<p>Abd : <span>'+prescription.abd+'</span></p>' : '' }
      
    `
  )
}

const getDays = ()=>{
  return (
      `
        ${$("#pres-day-").val()} ${$("#pres-select-").val()} পরে আসবেন। 
      `
  )
}
