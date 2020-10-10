/*------------------OE to Box converting Strat------------------*/
import  './import-popper'
import './import-jquery'
import 'bootstrap'
import '../plugins/autocomplete/jquery.autocomplete.min'
import  '../plugins/barcode/jquery-barcode.min'
import  '../plugins/summernote/summernote-bs4.min'


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
let options = {
  data: ["blue", "green", "pink", "red", "yellow"],

  list: {
    showAnimation: {
      type: "slide", //normal|slide|fade
      time: 200,
      callback: function () {},
    },

    hideAnimation: {
      type: "slide", //normal|slide|fade
      time: 300,
      callback: function () {},
    },
  },
};
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

/*---------------Suggest box------------------------*/
// let options = {
//   data: ["blue", "green", "pink", "red", "yellow"],
// };
// $(".suggest-box").easyAutocomplete(options);

$(".customTextbox").summernote({
  tabsize: 2,
  height: 150,
  toolbar: [
    ["style", ["style"]],
    ["font", ["bold", "underline", "clear"]],
    ["fontname", ["fontname"]],
    ["fontStyle", ["fontsize"]],
    ["height", ["height"]],
    ["color", ["color"]],
    ["para", ["ul", "ol", "paragraph"]],
    ["view", ["fullscreen", "help"]],
  ],
});
$(".editor").summernote({
  tabsize: 2,
  height: 350,
  toolbar: [
    ["style", ["style"]],
    ["font", ["bold", "underline", "clear"]],
    ["fontname", ["fontname"]],
    ["fontStyle", ["fontsize"]],
    ["height", ["height"]],
    ["color", ["color"]],
    ["para", ["ul", "ol", "paragraph"]],
    ["view", ["fullscreen", "help"]],
  ],
});