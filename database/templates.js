const db = require("./db");
const total_data = [
    {
        table: 'cc_templete',
        data: [
            ['dose_1'],
            ['dose_1'],
        ]
    },
    {
        table: 'dose_list',
        data:[
            ['dose_1'],
            ['dose_1'],
        ]
    },

    {
        table: 'duration_list',
        data:[
            ['dose_1'],
            ['dose_1'],
        ]
    },
    {
        table: 'investigation',
        data:[
            ['dose_1'],
            ['dose_1'],
        ]
    },
    {
        table: 'counselling',
        data:[
            ['dose_1'],
            ['dose_1'],
        ]
    }
]


function upload_data (){
    total_data.forEach((each_table)=>{
        let sql = `
        INSERT INTO ${each_table.table} (name) VALUES ?
        `
        db.query(sql, [each_table.data], (err, result)=>{
            if (err){
                console.log(err)
            }
            else {
                console.log(result.affectedRows + ' record inserted in ' + each_table.table + ' table')
            }
        })
    })
}

upload_data()