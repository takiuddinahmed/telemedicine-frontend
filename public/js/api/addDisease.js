const server = "http://localhost:3000/prescription/admin/disease";

const templateValues = {}

const renderTemplateAddedText = (selector, arr)=>{
    let html = ``
    arr.forEach(a=>{
        html += `<li>${a.text}</li>`
    })
    selector.html(html)
}

const templateSubmit = (e)=>{
    // e.preventDefault();
    console.log(e.id)
}

$(document).ready(()=>{
    $(".template_form").on('submit',((e)=>{
        e.preventDefault();
        const templateName = e.target.id.split('_')[0]
        const source = $("#"+e.target.id + "_select option:selected")
        const view_selector = $("#"+e.target.id + "_view")
        const data = {val: source.val(), text:source.text()}
        if(templateValues[templateName]){
            if(templateValues[templateName].some(t=>t.val != data.val)){
                templateValues[templateName].push(data);
            }
        }
        else{
            templateValues[templateName] = [data]

        }
        renderTemplateAddedText(view_selector, templateValues[templateName])
    }))

    $(".template_delete").click((e)=>{
        const templateName = e.target.id.split('_')[0]
        templateValues[templateName] = []
        renderTemplateAddedText($("#"+templateName+"_form_view"), templateValues[templateName])
    })
    
    $("#final-submit-btn").click((e)=>{
        const formSelector = $("#main_form");
        const formArray = formSelector.serializeArray();
        const formData = arrayToObject(formArray)
        formData.name = $("#disease_name_input").val()
        Object.keys(templateValues).forEach((t)=>{
            formData[t] = JSON.stringify(templateValues[t])
        })
        console.log(formData)
        if($("#operation_mode").val() != 'edit'){
            $.post(server, formData, (data,status)=>{
            console.log({data,status})
            if(data.ok){
                console.log('Ok')
                window.location = server
            }
            else{
                if(data.err){
                    alert(data.err)
                }
                else{
                alert("Unexprected Error happened.")
                }
            }
        })
        }
         else{
            formData.id = $("#operation_edit_id").val();
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
                console.log(e)
                alert("Unexpected error. Please try again;")
            })

           
        }
    })

})


// util function
const arrayToObject = (arr)=>{
    const obj = {};
    arr.forEach((a)=>{
        obj[a.name] = a.value
    })
    return obj
}