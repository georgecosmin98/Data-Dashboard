export const BASE_BACKEND_URL = 'http://185.146.87.75:8080/airquality'
//export const BASE_BACKEND_URL = 'http://localhost:8080'

// SESSION STORAGE CONSTANTS

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'AUTHENTICATED_USER'
export const USER_TOKEN_SESSION_ATTRIBUTE_NAME = "USER_TOKEN"
export const GENERAL_INFO_LINK_URL = "/settings/generalInfo"
export const CHANGE_PASSWORD_LINK_URL = "/settings/changePassword"

export const PM10SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    healthEffectColor: "green",
    minValue: 0,
    maxValue: 20
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    healthEffectColor: "#eed202",
    minValue: 20,
    maxValue: 40
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    healthEffectColor: "orange",
    minValue: 40,
    maxValue: 50
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    healthEffectColor: "red",
    minValue: 50,
    maxValue: 100
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    healthEffectColor: "red",
    minValue: 100,
    maxValue: 150
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    healthEffectColor: "purple",
    minValue: 150,
    maxValue: 1500
}]
export const PM25SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    healthEffectColor: "green",
    minValue: 0,
    maxValue: 10
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    healthEffectColor: "#eed202",
    minValue: 10,
    maxValue: 20
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    healthEffectColor: "orange",
    minValue: 20,
    maxValue: 25
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    healthEffectColor: "red",
    minValue: 25,
    maxValue: 50
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    healthEffectColor: "red",
    color: "#960032",
    minValue: 50,
    maxValue: 75
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    healthEffectColor: "purple",
    minValue: 75,
    maxValue: 800
}]
export const O3SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    healthEffectColor: "green",
    minValue: 0,
    maxValue: 50
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    healthEffectColor: "#eed202",
    minValue: 50,
    maxValue: 100
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    healthEffectColor: "orange",
    minValue: 100,
    maxValue: 130
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    healthEffectColor: "red",
    minValue: 130,
    maxValue: 240
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    healthEffectColor: "red",
    minValue: 240,
    maxValue: 380
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    healthEffectColor: "purple",
    minValue: 380,
    maxValue: 800
}]
export const SO2SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    healthEffectColor: "green",
    minValue: 0,
    maxValue: 100
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    healthEffectColor: "eed202",
    minValue: 100,
    maxValue: 200
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    healthEffectColor: "orange",
    minValue: 200,
    maxValue: 350
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    healthEffectColor: "red",
    minValue: 350,
    maxValue: 500
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    healthEffectColor: "red",
    minValue: 500,
    maxValue: 750
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    healthEffectColor: "purple",
    minValue: 750,
    maxValue: 1250
}]
export const NO2SpecificIndex = [{
    specificIndex: 1,
    qualifying: "Bun",
    color: "#50f0e6",
    healthEffectColor: "green",
    minValue: 0,
    maxValue: 40
}, {
    specificIndex: 2,
    qualifying: "Acceptabil",
    color: "#50ccaa",
    healthEffectColor: "eed202",
    minValue: 40,
    maxValue: 90
}
    , {
    specificIndex: 3,
    qualifying: "Moderat",
    color: "#f0e641",
    healthEffectColor: "orange",
    minValue: 90,
    maxValue: 120
}
    , {
    specificIndex: 4,
    qualifying: "Rau",
    color: "#ff5050",
    healthEffectColor: "red",
    minValue: 120,
    maxValue: 230
}, {
    specificIndex: 5,
    qualifying: "Foarte rau",
    color: "#960032",
    healthEffectColor: "red",
    minValue: 230,
    maxValue: 340
}, {
    specificIndex: 6,
    qualifying: "Extrem de rau",
    color: "#7D2181",
    healthEffectColor: "purple",
    minValue: 340,
    maxValue: 1000
}]

export const recommandation = [{
    specificIndex: 1,
    windows: "Aerul este curat, puteți aerisi!",
    physicalActivity: "Bucurați-vă de activitățile în aer liber!",
    mask: "",
    airPurifier: "",
}, {
    specificIndex: 2,
    windows: "Vă recomandăm să închideți ferestrele, aerul este poluat!",
    physicalActivity: "Grupurile sensibile ar trebui să reducă activitățile în aer liber!",
    mask: "",
    airPurifier: "",
}
    , {
    specificIndex: 3,
    windows: "Vă recomandăm să închideți ferestrele, aerul este poluat!",
    physicalActivity: "Toate persoanele ar trebui sa reducă activitățile în aer liber!",
    mask: "Grupurile sensibile ar trebui să poarte mască în aer liber!",
    airPurifier: "Folosiți un purificator de aer dacă aveți posibilitatea!",
}
    , {
    specificIndex: 4,
    windows: "Vă recomandăm să închideți ferestrele, aerul este poluat!",
    physicalActivity: "Evitați activitățile în aer liber!",
    mask: "Toată lumea ar trebui să poarte mască în aer liber!",
    airPurifier: "Folosiți un purificator de aer dacă aveți posibilitatea!",
}, {
    specificIndex: 5,
    windows: "Vă recomandăm să închideți ferestrele, aerul este poluat!",
    physicalActivity: "Evitați activitățile în aer liber!",
    mask: "Toată lumea ar trebui să poarte mască în aer liber!",
    airPurifier: "Folosiți un purificator de aer dacă aveți posibilitatea!",
}, {
    specificIndex: 6,
    windows: "Vă recomandăm să închideți ferestrele, aerul este poluat!",
    physicalActivity: "Opriți orice activitate în aer liber!",
    mask: "Toată lumea ar trebui să poarte mască în aer liber!",
    airPurifier: "Folosiți un purificator de aer dacă aveți posibilitatea!",
}]

export const options = [
    { value: 'pm1', label: 'PM1' },
    { value: 'pm10', label: 'PM10' },
    { value: 'pm25', label: 'PM25' },
    { value: 'no2', label: 'NO2' },
    { value: 'o3', label: 'O3' },
    { value: 'cho2', label: 'CHO2' },
    { value: 'co2', label: 'CO2' },
    { value: 'so2', label: 'SO2' },
];

export const aggregationType = [
    { value: 'live', label: 'LIVE' },
    { value: 'max', label: 'MAX' },
    { value: 'avg', label: 'AVERAGE' },
    { value: 'min', label: 'MIN' }
]