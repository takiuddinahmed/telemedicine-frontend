
//Dashborad
$(".nav-title").click(function () {
    $(this).next().slideToggle(200)
    console.log("fd");
})

//Suggest box
let options = {
    data: ["blue", "green", "pink", "red", "yellow"],

    list: {
        showAnimation: {
            type: "slide", //normal|slide|fade
            time: 200,
            callback: function () { },
        },

        hideAnimation: {
            type: "slide", //normal|slide|fade
            time: 300,
            callback: function () { },
        },
    },
};
$(".suggest-box").easyAutocomplete(options);