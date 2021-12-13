// fetch data from db
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:7000/getAll")
    .then((res) => res.json())
    .then((data) => loadHTMLTable(data["data"]));
  loadHTMLTable([]);
});


// edit, delete and search btn setup
document.querySelector('table tbody').addEventListener('click', function(e) {
    if (e.target.className === "delete-row-btn") {
        deleteRowById(e.target.dataset.id);
    }
    if (e.target.className === "edit-row-btn") {
        handleEditRow(e.target.dataset.id);
    }
});

const updateBtn = document.querySelector("#update-row-btn");
const updateSection = document.querySelector("#update-row");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = () => {
  const searchValue = document.querySelector("#search-input").value;

  fetch("http://localhost:7000/search/" + searchValue)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
};

deleteRowById = (id) => {
  fetch("http://localhost:7000/delete/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

handleEditRow = (id) => {
  updateSection.hidden = false;
  document.querySelector("#update-name-input").dataset.id = id;
}

// edit name
updateBtn.onclick = () => {
  const updateNameInput = document.querySelector("#update-name-input");

   fetch("http://localhost:7000/update", {
     method: "PATCH",
     headers: {
       "Content-type": "application/json",
     },
     body: JSON.stringify({
       id: updateNameInput.dataset.id,
       name: updateNameInput.value,
     }),
   })
     .then((response) => response.json())
     .then((data) => {
       if (data.success) {
         updateSection.hidden = true;
         location.reload();
       }
     });
}

// inserting data
const addBtn = document.querySelector("#add-name-btn");

addBtn.onclick = function () {
  const nameInput = document.querySelector("#name-input");
  const name = nameInput.value;
  nameInput.value = "";

  fetch("http://localhost:7000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name: name }),
  })
    .then((response) => response.json())
    .then((data) => insertRowIntoTable(data["data"]));
};

insertRowIntoTable = (data) => {
  const tbody = document.querySelector("table tbody");
  const isTableData = tbody.querySelector(".no-data");

  let tableHtml = "<tr>";

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'dateAdded') {
        data[key] = new Date(data[key]).toLocaleString()
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

  tableHtml += "</tr>";

  if (isTableData) {
    tbody.innerHTML = tableHtml;
  } else {
    const newRow = tbody.insertRow();
    newRow.innerHTML = tableHtml;
  } 
}


// create data table
loadHTMLTable = (data) => {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return
  }
  let tableHTML = ""
  
  data.forEach(function ({ id, name, date }) {
    tableHTML += "<tr>";
    tableHTML += `<td>${id}</td>`;
    tableHTML += `<td>${name}</td>`;
    tableHTML += `<td>${new Date(date).toLocaleString()}</td>`;
    tableHTML += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
    tableHTML += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
    tableHTML += "</tr>";
  });

  table.innerHTML = tableHTML;
};

