// Get patient ID and send it to the outdoor API to get value

$('#patientName').val("Glenn Quagmire");
$('#patientWeight').val("Weight : 56");
$('#patientSex').val("male");
$('#patientAge').val("Age : 34");
$('#patientPregnancyStatus').val("yes");

// Get doctor ID and send it to the outdoor API to get value

$('#doctorName').text("Doctor Parvin Sultana");
// $('#doctorBMDC');
// $('#doctorCollege');
// $('#doctorNumber');
// $('doctorChemberContactNumber');

$('#saveDoctorInfo').on('click',()=>{
    console.log($('#doctorName').html());
});

// $(()=>{
//     console.log("got here");
//     fetch('https://outdoorbd.com/rest-api/doctor/1/XDXTBDOPQQRX69FD')
//     .then(res=>res.json())
//     .then(resData=>console.log(resData))
//     .catch(err=>console.log(err));
// })

// async function start(){
//     const response=await fetch('https://outdoorbd.com/rest-api/doctor/1/XDXTBDOPQQRX69FD');
//     const data=await response.json();
//     console.log(data);
// }
// start();

$(function(){
    $.ajax({
        type:'GET',
        dataType:'jsonp',
        url:'https://outdoorbd.com/rest-api/doctor/1/XDXTBDOPQQRX69FD',
        contentType: "application/json; charset=utf-8",
        crossDomain:true,
        jsonpCallback:'processJSONresponse',
        error: ((err, text, errThwon)=>{
            console.log(err)
            console.log(text)
            console.log(errThwon)
    }),
        success:function(data){
            console.log(data)
        },
    })
    // $.get('https://outdoorbd.com/rest-api/doctor/1/XDXTBDOPQQRX69FD',(data)=>{
    //     console.log(data)
    // }, 'jsonp')

    const processJSONresponse = (data)=>{
        console.log(data)
    }
})

