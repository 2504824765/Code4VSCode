
class Person {
    constructor(name, age, gender, tel) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.tel = tel;
    }
}

persons = [];
const person = new Person("John", 25, "Male", "1234567890");
persons.push(person);

function addRow() {
    // Get the table
    var table = document.getElementById("myTable");
    // Insert a new row at the last position
    // table.insertRow(-1).innerHTML = '<td>' + persons[0].name + '</td><td>' + persons[0].age + '</td><td>' + persons[0].gender + '</td><td>' + persons[0].tel + '</td><td>' + '<button onclick="editRow(this)">Edit</button><button onclick="deleteRow(this)">Delete</button>' + '</td>';
    var newRow = table.insertRow(-1);
    newRow.insertCell(0).innerHTML = persons[0].name;
    newRow.insertCell(1).innerHTML = persons[0].age;
    newRow.insertCell(2).innerHTML = persons[0].gender;
    newRow.insertCell(3).innerHTML = persons[0].tel;
    newRow.insertCell(4).innerHTML = '<button onclick="editRow(this)">Edit</button><button onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var name = cells[0].innerText;
    var age = cells[1].innerText;
    var gender = cells[2].innerText;
    var tel = cells[3].innerText;
    console.log(name + " " + age)
    var inputName = prompt("Name");
    if (inputName == "" && inputName == null && inputName == undefined) {
        return;
    }
    var inputAge = prompt("Age");
    var inputGender = prompt("Gender");
    var inputTel = prompt("Tel");
    cells[0].innerText = inputName;
    cells[1].innerText = inputAge;
    cells[2].innerText = inputGender;
    cells[3].innerText = inputTel;
    console.log(inputName);
}