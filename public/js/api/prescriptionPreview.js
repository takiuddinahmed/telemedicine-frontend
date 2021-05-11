function prescriptionPreview() {
  return ` <div class="modal-dialog modal-lg">
     <div class="modal-content" >
       <main class="container-md" id="prescriptionPreview">
         <div class="preview-paper border">
           <div class="row m-0" 
           style="background-color:${prescriptionHeaderData.background_color};color:${prescriptionHeaderData.font_color}">
             <div class="col-6 text-left">
               <div class="preview-header" >
                 <h4>${prescriptionHeaderData.name}</h4>
                 <h4>${prescriptionHeaderData.degree}</h4>
                 <p>${prescriptionHeaderData.speciality}</p>
                 <p>Chittagong Medical College</p>
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
             <p>Date : <span>Date ? </span></p>
             <p>Address : <span>${patientInfo.address}</span></p>
             <p>Reg No : <span>Unknown</span></p>
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
                 <p>Heart :<span>${prescription.heart}</span></p>
                 <p>Lungs :<span>${prescription.lungs}</span></p>
                 <p>Abd :<span>${prescription.abd}</span></p>
               </div>
             </div>
             <div class="col-7 py-2">
               <h3>Rx.</h3>
               ${prescription.medicine}

               <div class="previewAdvice">
                 <h6>Advice</h6>
                 ${prescription.advice}
               </div>
   
             </div>
           </div>
           <div class="preview-footer border-top">
             নিয়ম মাফিক ঔষধ খাবেন। ডাক্তারের পরামর্শ ব্যতীত ঔষধ পরিবর্তন নিষেধ।
           </div>
         </div>
       </main>
     </div>`;
}

const prescriptionPDF = () => {
  return `
    <main class="container-md" id="prescriptionPreview">
         <div class="preview-paper border">
           <div class="row m-0">
             <div class="col-6 text-left">
               <div class="preview-header">
                 <h4>${prescriptionHeaderData.name}</h4>
                 <h4>MBBS</h4>
                 <p>${prescriptionHeaderData.speciality}</p>
                 <p>Chittagong Medical College</p>
                 <p>BMDC Reg. No- ${prescriptionHeaderData.bmdc}</p>
               </div>
             </div>
             <div class="col-6 text-right">
               <div class="preview-header">
                 <h4>Chember</h4>
                 <p>${prescriptionHeaderData?.address}</p>
                 <p>Chember location details</p>
                 <p>Mobile: ${prescriptionHeaderData.phone}</p>
                 <p>4:00-8:00</p>
                 <p class="font-weight-bold">Friday</p>
               </div>
             </div>
           </div>
           <div class="patient-info">
             <p>Name : <span>${patientInfo.name}</span></p>
             <p>Age : <span>${patientInfo.age}</span></p>
             <p>Sex : <span>${patientInfo.gender}</span></p>
             <p>Date : <span>Date ? </span></p>
             <p>Address : <span>${patientInfo.address}</span></p>
             <p>Reg No : <span>Unknown</span></p>
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
                 <p>Heart :<span>${prescription.heart}</span></p>
                 <p>Lungs :<span>${prescription.lungs}</span></p>
                 <p>Abd :<span>${prescription.abd}</span></p>
               </div>
               <div class="previewAdvice">
                 <h6>Advice</h6>
                 ${prescription.advice}
               </div>
             </div>
             <div class="col-7 py-2">
               <h3>Rx.</h3>
               ${prescription.medicine}
   
             </div>
           </div>
           <div class="preview-footer border-top">
             নিয়ম মাফিক ঔষধ খাবেন। ডাক্তারের পরামর্শ ব্যতীত ঔষধ পরিবর্তন নিষেধ।
           </div>
         </div>
       </main>
    `;
};
