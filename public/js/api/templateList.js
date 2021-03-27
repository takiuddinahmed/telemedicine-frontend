$("#summernot_box").summernote({
        tabsize: 2,
        height: 150,
         toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "underline", "clear"]],
          ["fontname", ["fontname"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ["view", ["fullscreen", "help"]],
        ],
      });



const doSubmit = ()=>{
  document.querySelector("#input_text").value = $("#summernot_box").summernote('code');
  return true;
}

const getDetails =  async (t_id)=>{
  return $.get('/admin/api/template/'+templateTable + "?id="+t_id)
}

const setEditMode = async (id, e)=> {
    $("#form-mode").val('edit');
    $("#form-table-id").val(id);
    $("#input_title").val(e.dataset.title)
    $("#input_title").focus();
    $("#submit-btn").html("Update")
    const detailsDataResult = await getDetails(id);
    let detailsData = ""
    if(detailsDataResult.length) detailsData = detailsDataResult[0]?.details;

    $("#summernot_box").summernote('code',detailsData);
  
}




const viewData = async (e)=>{
    $("#modal_view").modal('show');
    const detailsDataResult = await getDetails(e.dataset.id);
    let detailsData = "Unable to view..."
    if(detailsDataResult.length) detailsData = detailsDataResult[0]?.details;
    const html = `
        <h3> ${e.dataset.title} </h3>
        ${detailsData}
    `
    $("#modal_view_data").html(html);
}


const tradeDrugList = JSON.parse(templateDataListString)
      let filteredDrug = tradeDrugList;
      const drugTableOptions = {max_item:8}
      let activePage = 1;



      // view drug
      const drugTableViewUpdate =()=>{
      const drugTableHtml = filteredDrug.map((d,index)=>{
        const start = (activePage -1)*drugTableOptions.max_item; 
        const end = (activePage)*drugTableOptions.max_item; 
        if(index>= start && index<=end){
        return `
                <tr>
                <td>${d.title}</td>
                  <td>
                  <a onclick="setEditMode(${d.id}, this)" data-title='${d.title}' class="btn btn-sm btn-primary mb-1">Edit</a>
                  <a onclick="viewData(this)" data-id='${d.id}' data-title='${d.title}' class="btn btn-sm btn-primary mb-1">View</a>
                  <a href='/admin/templates/${templateName}?delete=true&id=${d.id}&table=${templateTable}' class="btn btn-sm btn-danger mb-1">Delete</a>
                  
                  </td>
                </tr>
        `
              }
              else{
                return ``
              }
      })
      $("#template-table").html(drugTableHtml)
    }

    const searchInputChange = (e)=>{
      const searchVal = e.target.value;
      if(searchVal.length){
      filteredDrug = tradeDrugList.filter(d=> d.title.toLowerCase().indexOf(searchVal.toLowerCase()) >-1)
       }
       else{
          filteredDrug = tradeDrugList      ;
       } 
       drugTableViewUpdate()
      
      controlPaginationDisplay()
    }
    document.querySelector("#search-input").addEventListener('change',searchInputChange)

    // control pagination
    const controlPaginationDisplay = ()=>{
      if(filteredDrug.length <= drugTableOptions.max_item){
        $("#pagination-div").hide()
      }
      else{
        $("#pagination-div").show()
      }
      updatePaginationView()
    }

    const decrement = ()=>{
      if(activePage>1 ){
        activePage -=1
        updatePaginationView()
      }
      }
      const increment = ()=>{
        if(filteredDrug.length > activePage * drugTableOptions.max_item){
        activePage +=1
        updatePaginationView()
        }
      }

      

    const updatePaginationView = ()=>{
    drugTableViewUpdate();

      const paginationHtml = `
      <ul class="pagination">
        <li class=${activePage>1 ?`page-item` : 'page-item disabled'} id="page-prev">
          <a class="page-link"  tabindex="-1" onclick="decrement()">Previous</a>
        </li>
        ${activePage>1 ? `<li class="page-item"><a class="page-link" onclick="decrement()" >${activePage -1}</a></li>` : ``}
        <li class="page-item active">
          <a class="page-link">${activePage} <span class="sr-only">(current)</span></a>
        </li>
        ${filteredDrug.length > activePage * drugTableOptions.max_item?` <li class="page-item"><a class="page-link" onclick="increment()">${activePage+1}</a></li>`: ``}
        <li class=${filteredDrug.length > activePage * drugTableOptions.max_item?`page-item` : 'page-item disabled'}>
          <a class="page-link" onclick="increment()">Next</a>
        </li>
      </ul>
      
      `
      $("#pagination-div").html(paginationHtml)
    }


    $(document).ready(()=>{
      drugTableViewUpdate()
      controlPaginationDisplay()
      
    })