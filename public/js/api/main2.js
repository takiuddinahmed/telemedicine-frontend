// drug history

const update_drug_history = ()=>{
    $.get('/drug-history',(data,status)=>{
        // console.log({data,status})
        if(data.ok){
            $("#drug-history").html(data?.res?.drug_history)
        }
    })


    let allDrugList = []
    allDrugList = drugList.map((d)=>{
        return {show:d.trade_name,generic:d.generic_name}
    })

    drugList.forEach(d=>{
        if(!allDrugList.some(dd=>dd.show == d.generic_name)){
            allDrugList.push({show:d.generic_name,generic:d.generic_name})
        }
    })

    console.log(allDrugList)

    let choosen_drug = {};

    $("#add-drug-history-input").easyAutocomplete({
        data: allDrugList,
        getValue:'show',
        list:{
            match:{
                enabled:true
            },
            onChooseEvent: ()=>{
                update_drug_history_text(choosen_drug.generic)
            },
            onSelectItemEvent:()=>{
                choosen_drug.generic = $("#add-drug-history-input").getSelectedItemData().generic
                choosen_drug.show = $("#add-drug-history-input").getSelectedItemData().show
            }
        }
    })

    
}
const update_drug_history_text = (d) => {
    let txt = $("#drug-history").html()
    let reg = new RegExp(d)
    if(!txt.match(reg)){
        txt += `<p> ${d} </p>`;
        $("#drug-history").html(txt)
        $("#add-drug-history-input").val("")
    }
}

const post_drug_history = ()=>{
    let dh = {};
    dh.drug_history = $("#drug-history").html();
    dh.patient_id = patientInfo.id

    $.post('/drug-history',dh,(data,status)=>{
        console.log({data,status})
    })
}




// bmi-bmr calculation section

// edd
$("#edd-lmp").change( ()=>{
    let lmp = new Date($("#edd-lmp").val())
    let edd = new Date($("#edd-lmp").val())
    edd = new Date(edd.setDate(edd.getDate()+280))
    $("#edd-lmp-out").val(lmp.toLocaleDateString("en-GB"));
    $("#edd-output").val(edd.toLocaleDateString("en-GB"));
})

//bmi
const calc_bmi = ()=>{
    let weight = $("#bmiWeight").val();
    let height = Math.pow(($("#bmiHeight").val() * 0.3048)/12, 2);
    let bmi = (weight / height).toFixed(2);
    $("#bmi").val(parseFloat(bmi));
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
}

$("#bmiHeight").keyup(calc_bmi)
$("#bmiWeight").keyup(calc_bmi)

const updateHealthData = (data)=>{
    $("#bmiHeight").val(data.height*12);
    $("#bmiWeight").val(data.weight);
    calc_bmi();
}