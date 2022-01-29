//get employee id
const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid');
let employees = [];

//fetch employee json file
fetch('/assets/employees.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //call below function to match employee id
        matchEid(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

//this functuin will match employee id and fetch the respective details
const matchEid = (data) => {
    data.employees.map(x => {
        if (x.Employee_No === eid) {
            let name = x.NAME;
            let phone = x.MOBILE;
            let email = x.EMAIL;
            let department = x.DEPARTMENT;
            let position = x.DESIGNATION;
            showDataOnHtml(name, phone, email, department, position);
            generateVcardLink(name, phone, email, department, position);
        }
    });
}

//this function will display the fetched data on html
const showDataOnHtml = (name, phone, email, department, position) => {
    document.getElementById("headtitle").innerHTML = name;
    document.getElementById("headposition").innerHTML = position;
    document.getElementById("headphone").href = `tel:${phone}`;
    document.getElementById("heademail").href = `mailto:${email}`;

    document.getElementById("bodyphone").href = `tel:${phone}`;
    document.getElementById("bodyemail").href = `mailto:${email}`;
    document.getElementById("bodyphone").innerHTML = phone;
    document.getElementById("bodyemail").innerHTML = email;
    document.getElementById("bodyposition").innerHTML = position;
}


//this function will generate the vcard link
const generateVcardLink = (name, phone, email, department, position) => {
    var empCard = vCard.create(vCard.Version.FOUR)
    empCard.add(vCard.Entry.NAME, name)
    empCard.add(vCard.Entry.FORMATTEDNAME, name)
    empCard.add(vCard.Entry.TITLE, position)
    empCard.add(vCard.Entry.PHONE, phone, vCard.Type.CELL)
    empCard.add(vCard.Entry.EMAIL, email, vCard.Type.WORK)
    empCard.add(vCard.Entry.EMAIL, email, vCard.Type.HOME)
    empCard.add(vCard.Entry.ORGANIZATION, "D&B Properties")
    empCard.add(vCard.Entry.URL, "https://dandbdubai.com")

    var link = vCard.export(empCard, "Download VCard", name, false) // use parameter true to force download

    document.getElementById("download").appendChild(link);
}