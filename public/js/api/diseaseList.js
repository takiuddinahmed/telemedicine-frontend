const tradeDrugList = JSON.parse(diseaseListString)
      let filteredDrug = tradeDrugList;
      const drugTableOptions = {max_item:5}
      let activePage = 1;

      // view drug
      const drugTableViewUpdate =()=>{
      const drugTableHtml = filteredDrug.map((d,index)=>{
        const start = (activePage -1)*drugTableOptions.max_item; 
        const end = (activePage)*drugTableOptions.max_item; 
        if(index>= start && index<=end){
        return `
                <tr>
                <td>${d.name}</td>
                
              
                  <td>
                    <a href="/admin/disease?edit=true&id=${d.id}" class="btn btn-sm btn-primary mb-2">Edit</a>
                    <a href="/admin/disease?delete=true&id=${d.id}" class="btn btn-sm btn-danger mb-2">Delete</a>
                  
                  </td>
                </tr>
        `
              }
              else{
                return ``
              }
      })
      $("#drug-table").html(drugTableHtml)
    }

    const searchInputChange = (e)=>{
      const searchVal = e.target.value;
      if(searchVal.length){
      filteredDrug = tradeDrugList.filter(d=> d.name.toLowerCase().indexOf(searchVal.toLowerCase()) >-1)
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