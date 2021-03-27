// data

const server = "https://prescription.outdoorbd.com/admin/generic-drug";
// const server = "http://localhost:3000/prescription/admin/generic-drug";


let dose_range = [];
let dose_weight = [];
let dose_special = [];
let dose_drug_interection = [];
let dose_indication = []
let dose_constrains = [];
let dose_precautions = [];
let dose_pregnency = [];




// models
function Model (data, selectors, updateView, required=[]){
    this.data = data;
    this.selectors = selectors;
    this.add = ()=>{
        const info = arrayToObject($(this.selectors.form).serializeArray());
        this.data.push(info);
        this.updateView()
    }
    this.remove = (id)=>{
        const arr = [...this.data];
        const new_arr = arr.filter((a,index)=>index !== id);
        this.data = new_arr;
        this.updateView()
    }
    this.updateView = updateView;
    this.stringify = ()=>{
        return JSON.stringify(this.data);
    },
    this.set = (arr)=>{
        this.data = arr;
        this.updateView();
    }

}


const doseRange = new Model(dose_range,{form:'#dose-range-form'}, ()=>{
    const html = doseRange.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.from_val} ${d.from_unit} to ${d.to_val} ${d.to_unit}</td>
              <td>${d.value}</td>
              <td onclick="doseRange.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-range-view").html(html)
})
 
const doseWeight = new Model(dose_weight,{form:'#dose-weight-form'}, ()=>{
    const html = doseWeight.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.from_val} ${d.from_unit} to ${d.to_val} ${d.to_unit}</td>
              <td>${d.value}</td>
              <td onclick="doseWeight.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-weight-view").html(html)
})
 
const doseSpecial = new Model(dose_special,{form:'#dose-spcial-form'}, ()=>{
    const html = doseSpecial.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.d_name}</td>
              <td>${d.dose}</td>
              <td onclick="doseSpecial.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-spcial-view").html(html)
})
const doseDrugInterection = new Model(dose_drug_interection,{form:'#dose-drug-interection-form'}, ()=>{
    const html = doseDrugInterection.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.drug}</td>
              <td onclick="doseDrugInterection.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-drug-interection-view").html(html)
})
 
const doseIndication = new Model(dose_indication,{form:'#dose-indication-form'}, ()=>{
    const html = doseIndication.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.indication}</td>
              <td onclick="doseIndication.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-indication-view").html(html)
})
 
const doseConstrains= new Model(dose_constrains,{form:'#dose-constrains-form'}, ()=>{
    const html = doseConstrains.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.constrains}</td>
              <td onclick="doseConstrains.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-constrains-view").html(html)
})
const dosePrecautions= new Model(dose_precautions,{form:'#dose-precautions-form'}, ()=>{
    const html = dosePrecautions.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.precautions}</td>
              <td onclick="dosePrecautions.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-precautions-view").html(html)
})
 
const dosePregnency= new Model(dose_pregnency,{form:'#dose-pregnency-form'}, ()=>{
    const html = dosePregnency.data.map((d,index)=>{
        return(
            `
            <tr>
              <td style="width: 50%">${d.category}</td>
              <td onclick="dosePregnency.remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
        )
    })
    $("#dose-pregnency-view").html(html)
})


// edit mode
if(editState){
    doseRange.set(drugData.dose_range ?? []);
    doseWeight.set(drugData.dose_weight ?? []);
    // doseSpecial.set(drugData.doseSpecial);
    doseDrugInterection.set(drugData.dose_drug_interection ?? []);
    doseIndication.set(drugData.dose_indication ?? []);
    doseConstrains.set(drugData.dose_constrains ?? []);
    dosePrecautions.set(drugData.dose_precautions_warnings ?? []);
    dosePregnency.set(drugData.dose_pregnency_category ?? []);
    $("#generic-name-input").val(drugData.generic_name ?? '');
}
 


// jquery 
$(document).ready(()=>{
    $("#dose-range-btn").click((e)=>{
        e.preventDefault()
    doseRange.add()
    })
    $("#dose-weight-btn").click((e)=>{
        e.preventDefault()
    doseWeight.add()
    })
    $("#dose-special-btn").click((e)=>{
        e.preventDefault()
    doseSpecial.add()
    })
    $("#dose-drug-interection-btn").click((e)=>{
        e.preventDefault()
        doseDrugInterection.add()
    })
    $("#dose-indication-btn").click((e)=>{
        e.preventDefault()
        doseIndication.add()
    })
    $("#dose-constrains-btn").click((e)=>{
        e.preventDefault()
        doseConstrains.add()
    })
    $("#dose-precautions-btn").click((e)=>{
        e.preventDefault()
        dosePrecautions.add()
    })
    $("#dose-pregnency-btn").click((e)=>{
        e.preventDefault()
        dosePregnency.add()
    })


    // handle final submit
    $("#submit-form-to-server").click((e)=>{
        e.preventDefault();
        postDataToServer()
    })

})



const postDataToServer = ()=>{
    const formData = {};
    formData.generic_name = $("#generic-name-input").val();
    if(formData.generic_name.length){
        formData.dose_range = doseRange.stringify();
        formData.dose_weight = doseWeight.stringify();
        formData.dose_drug_interection = doseDrugInterection.stringify();
        formData.dose_indication = doseIndication.stringify();
        formData.dose_constrains = doseConstrains.stringify();
        formData.dose_precautions_warnings = dosePrecautions.stringify();
        formData.dose_pregnency_category = dosePregnency.stringify()
 
        console.log(formData)
        if (!editState){
        $.post(server, formData, (data,status)=>{
            console.log({data,status})
            if(data.ok){
                console.log('Ok')
                window.location = server
            }
            else{
                alert("Unexprected Error happened.")
            }
        })
        }
        else{
            formData.id = drugData.id;
            $.ajax({
                type: 'PUT',
                url: server,
                contentType: 'application/json',
                data: JSON.stringify(formData), // access in body
            }).done(function (data) {
                if(data.ok){
                    window.location = server
                }
                else{
                    alert(data.msg)
                }
            }).fail(function (e) {
                alert(e)
            })

           
        }
    }
    else{
        alert("Please provide generic name.")
    }
}


// util function
const arrayToObject = (arr)=>{
    const obj = {};
    arr.forEach((a)=>{
        obj[a.name] = a.value
    })
    return obj
}