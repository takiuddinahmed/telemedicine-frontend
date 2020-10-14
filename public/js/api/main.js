// const server = "https://prescriptionapi.outdoorbd.com/"
const server = "http://localhost:3000/"
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N0b3JfaWQiOjEsImlhdCI6MTYwMTAxMzMxMX0.a0julIsHyIEnAZQD_mSZlmb-RhYZNzMfMI8z3JPwcwk";

const template_source = [
    {form: '#cc_form', source: '#ixTemplate', target: '#cc'},
    {form: '#investigation_form', source: '#investigation_input', target: '#ix'},
    // {form: '#advice_form', source: '#advice_input', target: '#ix'},
]


    let ccList = [];
    let doseList = [];
    let durationList = [];
    let investigationList = [];
    let adviceList = [];
    let counsellingList = [];
    let diseaseList = [];

    $(document).ready(()=>{
        fetch(server + "template/", {
            headers: {
                authorization: "Bearer " + token,
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    ccList = res.message[0];
                    doseList= res.message[1];
                    durationList = res.message[2];
                    investigationList = res.message[3];
                    adviceList = res.message[4];
                    counsellingList = res.message[5];
                    diseaseList = res.message[6];
                    update_template_auto_complete(res.message[0], 'name', '#ixTemplate')
                    update_template_auto_complete(res.message[1], "name", "#dose_type");
                    update_template_auto_complete(res.message[2], "name", "#dose_duration-");
                    update_template_auto_complete(res.message[3], "name", "#investigation_input");
                    update_template_auto_complete(res.message[4], "name", "#advice_input");
                    update_template_auto_complete(res.message[5], "name", "#counselling_input");
                    update_template_auto_complete(res.message[6], "name", "#disease");
                }
            })
            .catch((err) => {
                console.log(err);
            });

        const update_template_auto_complete = (data, entry, jquery_selector) =>{
            $(jquery_selector).easyAutocomplete({
                data: data,
                getValue: entry,
                list: {
                    match: {
                        enabled: true,
                    },
                },
            });
        }
    })
$(document).ready(()=> {
    template_source.forEach((temp) => {
        $(temp.form).submit(e => {
            e.preventDefault();
            console.log('llll');
            let txt = $(temp.source).val();
            $(temp.source).val('')
            txt.trim();
            if (txt.length) {
                let t = $(temp.target).val() + txt + '\n';
                $(temp.target).val(t)

            }
        })
    })
})
