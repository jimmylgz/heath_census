const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
        patients.push({name, gender: gender.value, age, condition});
        resetForm();
        generateReport();
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age");
    document.getElementById("condition").value = "";
}

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0, //没有连起来的词，用双引号括起来。要检查属性名是否需要加引号，可以问自己：这个属性名是否可以作为一个合法的JavaScript变量名？如果不行，就需要加引号。
    };
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };

    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

    report.innerHTML = `Number of patinets: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}

addPatientButton.addEventListener("click", addPatient);

