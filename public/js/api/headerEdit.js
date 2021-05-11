$("#form-submit").on('click',()=>{
    let uploadData={
    doctor_id:$("#doctor_id").html(),
    name:$("#name").html(),
    degree:$("#degree").html(),
    speciality:$("#speciality").html(),
    institute:$("#institute").html(),
    reg_details:$("#reg_details").html(),
    department:$("#department").html(),
    chember_place_name:$("#chember_place_name").html(),
    chember_place_address:$("#chember_place_address").html(),
    chember_contact:$("#chember_contact").html(),
    chember_visit_time:$("#chember_visit_time").html(),
    chember_special_note:$("#chember_special_note").html(),
    background_color:$("#background_color").val(),
    font_color:$("#font_color").val()
  }
  console.log(uploadData)

  $.post("/header_info",uploadData,(data,status)=>{
    location.reload()
  })
})