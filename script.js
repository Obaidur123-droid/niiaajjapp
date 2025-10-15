const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const studentName = document.getElementById("studentName");
const attendanceTable = document.getElementById("attendanceTable");

addBtn.addEventListener("click", () => {
  const name = studentName.value.trim();
  if (name === "") {
    alert("Please enter a student name!");
    return;
  }

  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  const statusCell = document.createElement("td");

  nameCell.textContent = name;

  const select = document.createElement("select");
  select.innerHTML = `
    <option value="Present">Present</option>
    <option value="Absent">Absent</option>
  `;
  statusCell.appendChild(select);

  row.appendChild(nameCell);
  row.appendChild(statusCell);
  attendanceTable.appendChild(row);

  studentName.value = "";
});

saveBtn.addEventListener("click", () => {
  const rows = attendanceTable.querySelectorAll("tr");
  let records = [];

  rows.forEach(row => {
    const name = row.children[0].textContent;
    const status = row.children[1].children[0].value;
    records.push({ name, status });
  });

  localStorage.setItem("attendanceRecords", JSON.stringify(records));
  alert("Attendance saved successfully!");
});

window.addEventListener("load", () => {
  const records = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  records.forEach(record => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const statusCell = document.createElement("td");

    nameCell.textContent = record.name;

    const select = document.createElement("select");
    select.innerHTML = `
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    `;
    select.value = record.status;

    statusCell.appendChild(select);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    attendanceTable.appendChild(row);
  });
});