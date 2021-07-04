
function DrugModel (formSelector, tableSelector, data=[]){
    this.data = data;
    this.formSelector = formSelector;
    this.tableSelector = tableSelector;
    this.add = ()=>{
        const info = arrayToObject($(this.formSelector).serializeArray());
        console.log(info)
        if (info?.trade_name?.length && info?.company_name?.length && info?.price?.length ){
            this.data.push(info);
            this.updateView();
            $(this.formSelector)[0].reset();
        }
    }
    this.remove = (id) => {
        const arr = [...this.data];
        const new_arr = arr.filter((a, index) => index !== id);
        this.data = new_arr;
        this.updateView();
    }
    this.updateView = ()=>{
        const html = this.data.map((d, index) => {
            return (
                `
            <tr>
              <td >${d.trade_name}</td>
              <td>${d.company_name}</td>
              <td>${d.price}</td>
              <td onclick="remove(${index})"><i class="fas text-danger fa-trash" d-id=${d.id} class="dose-range-remove-btn" ></i></td>
            </tr>
            `
            )
        })
        $(this.tableSelector).html(html)
    };
    this.stringify = () => {
        return JSON.stringify(this.data);
    },
    this.set = (arr) => {
        this.data = arr;
        this.updateView();
    }

}

let tradeDrugList = JSON.parse(tradeDrugListString);

console.log(tradeDrugList)


const drugData = new DrugModel("#new-drug-form","#drugList",tradeDrugList);
drugData.updateView();
const remove = drugData.remove;

$(document).ready(function(){

    $("#new-drug-form").submit((e)=>{
        e.preventDefault();
        console.log("Hello")
        drugData.add();
    })

    $("#submit-drug").on("click", (e)=>{
        e.preventDefault();
        postDataToServer();
    })


    
})

const postDataToServer = () => {
    
    let generic_name_id = $("#generic-drug-select").val();
    if(generic_name_id?.length){
        const formData = {};
        let tradeDataArray = [];
        if($("#method").val().indexOf("POST") > -1){
            tradeDataArray= drugData.data.map(d => [d.trade_name,d.company_name,parseInt(d.price),parseInt(generic_name_id)]);
        }
        else{

            tradeDataArray = drugData.data.map(d => [d.id, d.trade_name, d.company_name, parseInt(d.price), parseInt(generic_name_id)]);
        }
        formData.tradeDrugArray = tradeDataArray
        console.log(formData);
        console.log(drugData.data);

        $.post('/admin/drug',formData,(data,status)=>{
            if(data.ok){
                window.location = '/admin/drug'
            }
            else{
                alert("Insert error. Please check inputs.")
            }
        })
    }
    else{
        alert("Please choose generic drug");
    }

}




// util function
const arrayToObject = (arr) => {
    const obj = {};
    arr.forEach((a) => {
        obj[a.name] = a.value
    })
    return obj;
}