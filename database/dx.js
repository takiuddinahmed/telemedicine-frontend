const dx = [{
    pneumonia:{
        bp:"120-80mmhg",
        pulse:"70BPM",
        temp:"98*F",
        heart:"S1+S2 audioable",
        lungs:"clear",
        abd:"soft & nontender",
        anamia:"null",
        jaundice:"null",
        cuamosis:"null",
        oedema:"null",
        SE:{
            nervousSystem:        ["Inspaction","Palpation","Percussion","Auscaltation"],
            respiratorySystem:    ["Inspaction","Palpation","Percussion","Auscaltation"],
            cvs:                  ["Inspaction","Palpation","Percussion","Auscaltation"],
            alimentarySystem:     ["Inspaction","Palpation","Percussion","Auscaltation"],
            musculoskeletalSystem:["Inspaction","Palpation","Percussion","Auscaltation"],
        },
        specialNote:"nullOrString"
    }
}];


const total_data = [
    {
        table: 'cc_templete',
        data: [
            ['Caugh for 4 days'],
            ['chest pain'],
            ['running nose'],
            ['mussel pain'],
            ['heart block'],
            ['buke beta'],
            ['dile taare chay']
        ]
    },
    {
        table: 'dose_list',
        data:[
            ['0+0+1'],
            ['0+1+0'],
            ['0+1+1'],
            ['1+0+0'],
            ['1+0+1'],
            ['1+1+1'],
            ['2+2+1'],
        ]
    },

    {
        table: 'duration_list',
        data:[
            ['3 days'],
            ['5 days'],
            ['7 days'],
            ['15 days'],
            ['24 days'],
            ['30 days'],
            ['2 Month'],
            ['4 Month'],
        ]
    },
    {
        table: 'investigation',
        data:[
            ['niyomitw gorgora kore kuli korba'],
            ['buke thanda lagaba naah'],
            ['saamne shiitkal ashtese'],
            ['shiit ashar aagei 3 taa frnd biya koira fello']
            ['etw hardwork diye ki hbe jodi meyei na paila'],
            ['thak single lyf e better'],
            ['meye theke dure thako'],
            ['gf ektaar beshi noy ,na thaklei valo hoy'],
        ]
    },
    {
        table: 'counselling',
        data:[
            ['ki lav etw counselling data diya ..'],
            ['din shese tw doctor er advice manba na ! '],
            ['an apple a day keeps the doctor away'],
        ]
    }
]



