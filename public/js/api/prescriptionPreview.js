{/* <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="previewPrescriptionModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content" >
          <main class="container-md" id="prescriptionPreview">
            <div class="preview-paper border">
              <div class="row m-0">
                <div class="col-6 text-left">
                  <div class="preview-header">
                    <h4><%=doctorName %></h4>
                    <h4><%=doctorDegree %></h4>
                    <p><%=doctorSpecializaton %></p>
                    <p><%=doctorBrunch %></p>
                    <p><%=doctorCollege %></p>
                    <p>BMDC Reg. No- <%=doctorBMDC %></p>
                  </div>
                </div>
                <div class="col-6 text-right">
                  <div class="preview-header">
                    <h4>Chember</h4>
                    <p><%=doctorChember%></p>
                    <p><%=doctorChemberDetails%></p>
                    <p>Mobile: <%=doctorChemberPhone%></p>
                    <p>Visit Time <%=doctorVisitTime%></p>
                    <p class="font-weight-bold"><%=doctorOffDay%></p>
                  </div>
                </div>
              </div>
              <div class="patient-info">
                <p>Name : <span><%=patientName%></span></p>
                <p>Age : <span><%=patientAge%></span></p>
                <p>Sex : <span><%=patientSex%></span></p>
                <p>Date : <span><%=patientDate%></span></p>
                <p>Address : <span><%=patientAddress%></span></p>
                <p>Reg No : <span><%=patientResistration%></span></p>
                <p>Weight : <span>48.800 (KG)<%=patientWeight%></span></p>
                <p>Mobile : <span><%=patientMobile%></span></p>
              </div>
              <div class="row middle">
                <div class="col-5 border-right py-2">
                  <div class="barcode-section border-bottom">
                    <div class="barcode"></div>
                  </div>
                  <div class="cc border-bottom">
                    <span>C/C</span>
                    <p><%=patientCC%></p>
                  </div>
                  <div class="oe border-bottom">
                    <span>O/E</span>
                    <p>Heart :<span><%=patientHeart%></span></p>
                    <p>Lungs :<span><%=patientLungs%></span></p>
                    <p>Abd :<span><%=patientAbd%></span></p>
                  </div>
                  <div class="previewAdvice">
                    <h6>Advice</h6>
                    <%=patientAdvice%>
                  </div>
                </div>
                <div class="col-7 py-2">
                  <h3>Rx.</h3>
                  <% for (let data of medicine){ %>
                  <div class="tab-name" style="border: none;">
                    <strong
                      ><%=data.type%> .<span class="genericName"><%=data.brandName%></span>
                      <span
                        class="brandName"
                        style="display: none"
                        class="genericBrand"
                        > <%=data.brandName%></span
                      >
                      <%=data.dose%>
                    </strong>
                    <span> --- <%=data.day%> </span>
                    <br />
                    <%=data.formation%> <span> <%=data.takingPeriod%></span>
                  </div>
                  <% } %>
      
                </div>
              </div>
              <div class="preview-footer border-top">
                নিয়ম মাফিক ঔষধ খাবেন। ডাক্তারের পরামর্শ ব্যতীত ঔষধ পরিবর্তন নিষেধ।
              </div>
            </div>
          </main>
        </div>
      </div>
    </div> */}