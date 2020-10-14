const db = require('./db')
const dx = [
{
    dxName: "Pneumonia",
    cc:[1,2],
    advice:[1,2],
    investigation: [1,2],
    counselling: [1,2],
    bp: "120-80mmhg",
    pulse: "70BPM",
    temp: "98*F",
    heart: "S1+S2 audioable",
    lungs: "clear",
    abd: "soft & nontender",
    anaemia: "null",
    jaundice: "null",
    cyanosis: "null",
    oedema: "null",
    SE: {
    nervousSystem: ["Inspaction", "Palpation", "Percussion", "Auscaltation"],
        respiratorySystem: [
        "Inspaction",
        "Palpation",
        "Percussion",
        "Auscaltation",
    ],
        cvs: ["Inspaction", "Palpation", "Percussion", "Auscaltation"],
        alimentarySystem: [
        "Inspaction",
        "Palpation",
        "Percussion",
        "Auscaltation",
    ],
        musculoskeletalSystem: [
        "Inspaction",
        "Palpation",
        "Percussion",
        "Auscaltation",
    ],
},
    specialNote: "10 days পর আসবেনপর আসবেন",
},
    ]

dx.forEach((data)=>{
    const sql = `
        INSERT INTO disease_data (name, bp, pulse, temp, heart, lungs, abd, anaemia, cyanosis, oedema,
         se_nervousSystem,
         se_respiratorySystem, se_cvs, se_alimentarySystem, se_musculoskeletalSystem, 
         specialNote, cc,
         investigation, advice, counselling
         )
         
         VALUES (?)
    `
    db.query(sql,[
        [
            data.dxName, data.bp, data.pulse, data.temp, data.heart, data.lungs, data.abd,
            data.anaemia, data.cyanosis, data.oedema, JSON.stringify(data.SE.nervousSystem),
            JSON.stringify(data.SE.respiratorySystem),
            JSON.stringify(data.SE.cvs), JSON.stringify(data.SE.alimentarySystem),
            JSON.stringify(data.SE.musculoskeletalSystem),
            data.specialNote, JSON.stringify(data.cc), JSON.stringify(data.investigation),
            JSON.stringify(data.advice), JSON.stringify(data.counselling)
        ]
    ], (err, result)=>{
        if(err) throw  err;
        console.log(result)
    })

})
