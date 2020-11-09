
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
})