import * as config from './config'

const server = config.server;
const token = config.token;
const main_server = config.main_server;
const main_server_key = config.main_server_key;

let drugDatabase = [];

// drug Database
$("#drugDatabaseSearchSelect").on("change",e=>{
  $("#drugSearch").val("");
  update_template_auto_complete(drugDatabase, e.target.value, "#drugSearch");
})

$("#drugSearch").on("change", e=>{
  let entry = $("#drugDatabaseSearchSelect").val();
  let val = $("#drugSearch").val();
  let arr = drugDatabase.filter(d=> d[entry] == val);
  console.log(arr)
})

const update_drug_database_view = (arr)=>{
  
}


// cc update
$("#cc_form").submit((e) => {
  e.preventDefault();
  update_cc($("#ixTemplate").val());
});
function update_cc(txt) {
  txt.trim();
  if (txt.length) {
    let cc = $("#cc").val() + txt + "\n";
    $("#cc").val(cc);
  }
}

fetch(server + "template/", {
  headers: {
    authorization: "Bearer " + token,
  },
})
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    if (res.ok) {
      drugDatabase = res.message[1];
      update_template_auto_complete(res.message[0], "name", "#ixTemplate");
      update_template_auto_complete(res.message[1], "rx", "#drugBrandTemplate");
    }
  })
  .catch((err) => {
    console.log(err);
  });

const update_template_auto_complete = (data, entry, jquery_selector) => {
  $(jquery_selector).easyAutocomplete({
    data: data,
    getValue: entry,
    list: {
      match: {
        enabled: true,
      },
    },
  });
};
