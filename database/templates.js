const db = require("./db");
const total_data = [
    // {
    //     table: 'cc_template',
    //     data: [
    //         ['Caugh for 4 days'],
    //         ['chest pain'],
    //         ['running nose'],
    //         ['mussel pain'],
    //         ['heart block'],
    //         ['buke beta'],
    //         ['dile taare chay']
    //     ]
    // },
    // {
    //     table: 'dose_list',
    //     data:[
    //         ['0+0+1'],
    //         ['0+1+0'],
    //         ['0+1+1'],
    //         ['1+0+0'],
    //         ['1+0+1'],
    //         ['1+1+1'],
    //         ['2+2+1'],
    //     ]
    // },

    // {
    //     table: 'duration_list',
    //     data:[
    //         ['3 days'],
    //         ['5 days'],
    //         ['7 days'],
    //         ['15 days'],
    //         ['24 days'],
    //         ['30 days'],
    //         ['2 Month'],
    //         ['4 Month'],
    //     ]
    // },
    // {
    //     table: 'investigation',
    //     data:[
    //         ['niyomitw gorgora kore kuli korba'],
    //         ['buke thanda lagaba naah'],
    //         ['saamne shiitkal ashtese'],
    //         ['shiit ashar aagei 3 taa frnd biya koira fello'],
    //             ['etw hardwork diye ki hbe jodi meyei na paila'],
    //         ['thak single lyf e better'],
    //         ['meye theke dure thako'],
    //         ['gf ektaar beshi noy na thaklei valo hoy'],
    //     ]
    // },
    {
        table: 'advice',
        data:[
            ['niyomitw gorgora kore kuli korba'],
            ['buke thanda lagaba naah'],
            ['saamne shiitkal ashtese'],
            ['shiit ashar aagei 3 taa frnd biya koira fello'],
                ['etw hardwork diye ki hbe jodi meyei na paila'],
            ['thak single lyf e better'],
            ['meye theke dure thako'],
            ['gf ektaar beshi noy na thaklei valo hoy'],
        ]
    },
    // {
    //     table: 'counselling',
    //     data:[
    //         ['ki lav etw counselling data diya ..'],
    //         ['din shese tw doctor er advice manba na ! '],
    //         ['an apple a day keeps the doctor away'],
    //     ]
    // }
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