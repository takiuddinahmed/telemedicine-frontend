/*

  --All Right Reserved by HurtleBee LTD

*/

/*------------------OE to Box converting Strat------------------*/
$("#boxToOeNav").click(function () {
  let bp = $("#bp").val();
  let pluse = $("#pluse").val();
  let temp = $("#temp").val();
  let heart = $("#heart").val();
  let lungs = $("#lungs").val();
  let abd = $("#abd").val();
  let anaemia = $("#anaemia").val();
  let jaundice = $("#jaundice").val();
  let cyanosis = $("#cyanosis").val();
  let oedema = $("#oedema").val();
  $(".bpBox").text(bp);
  $(".pluseBox").text(pluse);
  $(".tempBox").text(temp);
  $(".heartBox").text(heart);
  $(".lungsBox").text(lungs);
  $(".abdBox").text(abd);
  $(".anaemiaBox").text(anaemia);
  $(".jaundiceBox").text(jaundice);
  $(".cyanosisBox").text(cyanosis);
  $(".oedemaBox").text(oedema);
});
/*------------------OE to Box converting End------------------*/
/*------------------Health Calculation Start------------------*/
//BMI calculation
$("#bmiWeight").keyup(function () {
  let weight = $(this).val();
  let height = Math.pow($("#bmiHeight").val() * 0.3048, 2);
  let bmi = (weight / height).toFixed(2);
  $("#bmi").val(bmi);
  if (bmi >= 18 && bmi <= 24) {
    $("#bmiClass").text("Normal");
    $("#bmiClass").addClass("text-success");
  } else if (bmi < 18) {
    $("#bmiClass").text("Under Weight");
    $("#bmiClass").addClass("text-danger");
  } else {
    $("#bmiClass").text("Over Weight");
    $("#bmiClass").addClass("text-danger");
  }
});
$("#bmiHeight").keyup(function () {
  let weight = $("#bmiWeight").val();
  let height = Math.pow($(this).val() * 0.3048, 2);
  let bmi = (weight / height).toFixed(2);
  $("#bmi").val(bmi);
  if (bmi >= 18 && bmi <= 24) {
    $("#bmiClass").text("Normal");
    $("#bmiClass").addClass("text-success");
  } else if (bmi < 18) {
    $("#bmiClass").text("Under Weight");
    $("#bmiClass").addClass("text-danger");
  } else {
    $("#bmiClass").text("Over Weight");
    $("#bmiClass").addClass("text-danger");
  }
});
/*------------------Health Calculation End------------------*/

/*------------------Aside Start------------------*/
$(".left-bar").click(function () {
  $(".left-sidebar").toggleClass("left-sidebar-show");
  var $el = $(this).toggleClass("left-sidebar-show");
  if ($el.hasClass("left-sidebar-show")) {
    $(this).css("left", 340);
    $(this).addClass("fa-times");
  } else {
    $(this).css("left", 0);
    $(this).removeClass("fa-times");
  }
});
$(".right-bar").click(function () {
  $(".right-sidebar").toggleClass("right-sidebar-show");
  var $el = $(this).toggleClass("right-sidebar-show");
  if ($el.hasClass("right-sidebar-show")) {
    $(this).css("right", 340);
    $(this).addClass("fa-times");
  } else {
    $(this).css("right", 0);
    $(this).removeClass("fa-times");
  }
});
/*------------------Aside End------------------*/
//Initialize Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

/*--------------------------------------------*/
$(".type-selection").change(function () {
  const typeName = $(this).val();
  $(".typeSearch").click(function () {
    if (typeName === "brand" || typeName === "generic") {
      $(".brandGeneric").slideDown(200);
      $(".indication-section").hide();
    } else {
      $(".indication-section").slideDown(200);
      $(".brandGeneric").hide();
    }
  });
});
$(".indication-down").click(function () {
  $(this).parents("li").next().slideToggle(200);
});
$(".indication-list-down").click(function () {
  $(this).parents("li").next().slideToggle(200);
});
$("#boxToOe ul li").click(function () {
  $(this).next().slideToggle(200);
});

/*----------Custom Backgroud---------------------*/
$(".bg-color").on("input", function () {
  const colorCode = $(this).val();
  $("#bg-colorCode").text(colorCode);
  $(".custom-color-code").css("background", colorCode);
});
$(".font-color").on("input", function () {
  const colorCode = $(this).val();
  $("#font-colorCode").text(colorCode);
  $(".custom-color-code").css("color", colorCode);
});
$(".reset").click(function () {
  $("#bg-colorCode").text("#f8f9fa");
  $(".bg-color").val("#f8f9fa");
  $("#font-colorCode").text("#333333");
  $(".font-color").val("#333333");
  $(".custom-color-code").attr(
    "style",
    "background : #f8f9fa !important; color: #333333"
  );
  $(".custom-color-code").css({
    color: "#333333",
    background: "#f8f9fa",
  });
});
//-----------------------
$("i.reload").click(function () {
  $(this).next().fadeToggle(300);
});

/*---------------Add Patient From ------------------------*/
$(".add-patient").click(function () {
  $(".patient-form").slideDown(400);
  $(this).text("Save");
});

/*---------------Suggest box------------------------*/
// let options = {
//   data: ["blue", "green", "pink", "red", "yellow"],

//   list: {
//     showAnimation: {
//       type: "slide", //normal|slide|fade
//       time: 200,
//       callback: function () {},
//     },

//     hideAnimation: {
//       type: "slide", //normal|slide|fade
//       time: 300,
//       callback: function () {},
//     },
//   },
// };
// $(".suggest-box").easyAutocomplete(options);

//Profile
$(".profile-btn").click(function () {
  $(".user-info").slideToggle(400);
});

//Image preview
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".preview-img").show();
      $(".btn-upload").show();
      $(".preview-img").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$(".img-upload").change(function () {
  readURL(this);
});

//Image Modal
$(".single-img").click(function () {
  $(".img-gallery").attr("src", $(this).attr("src"));
});

//Warning text
$(".warn-btn").click(function () {
  $(this).next().fadeToggle(300);
});


//Payment popup
$(".payment").click(function () {
  $(".payment-sec").fadeToggle(300);
});



$('i.change').click(function () {
  $(this).next().fadeToggle(300)
  $('.overlay').toggleClass('active')
})

//Warning text
$('.warn-btn').click(function (e) {
  $(this).next().fadeToggle(300)
  $('.overlay').toggleClass('active')
})
$('.overlay').click(function () {
  $('.warn-btn').next().fadeOut(300)
  $('i.change').next().fadeOut(300)
  $('.payment-sec').fadeOut(300)
  $('.overlay').removeClass('active')
})


// drag and drop function
let selected = null

function dragOver(e) {
  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target)
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling)
  }
}

function dragEnd() {
  selected = null
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', null)
  selected = e.target
}

function isBefore(el1, el2) {
  let cur
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true
    }
  }
  return false
}

//remove tab-item
$('.close-btn').click(function () {
  // console.log($(this).parent())
  $(this).parent().parent().remove()
  // if ($('.tab-list').children().length === 1) {
  //   document.querySelectorAll('.tab-item')[0].classList.remove('d-none')
  // } else {
  //   // console.log(
  //   //   document.querySelectorAll('.tab-item')[0].classList.add('d-none')
  //   // )
  //   document.querySelectorAll('.tab-item')[0].classList.add('d-none')
  // }
})