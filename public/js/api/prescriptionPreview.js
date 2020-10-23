function prescriptionPreview() {
  console.log(doctorInfo);
  return ` <div class="modal-dialog modal-lg">
     <div class="modal-content" >
       <main class="container-md" id="prescriptionPreview">
         <div class="preview-paper border">
           <div class="row m-0">
             <div class="col-6 text-left">
               <div class="preview-header">
                 <h4>${doctorInfo.name}</h4>
                 <h4>MBBS</h4>
                 <p>${doctorInfo.speciality}</p>
                 <p>Chittagong Medical College</p>
                 <p>BMDC Reg. No- ${doctorInfo.bmdc}</p>
               </div>
             </div>
             <div class="col-6 text-right">
               <div class="preview-header">
                 <h4>Chember</h4>
                 <p>${doctorInfo?.address}</p>
                 <p>Chember location details</p>
                 <p>Mobile: ${doctorInfo.phone}</p>
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
                 <h4>${doctorInfo.name}</h4>
                 <h4>MBBS</h4>
                 <p>${doctorInfo.speciality}</p>
                 <p>Chittagong Medical College</p>
                 <p>BMDC Reg. No- ${doctorInfo.bmdc}</p>
               </div>
             </div>
             <div class="col-6 text-right">
               <div class="preview-header">
                 <h4>Chember</h4>
                 <p>${doctorInfo?.address}</p>
                 <p>Chember location details</p>
                 <p>Mobile: ${doctorInfo.phone}</p>
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
