document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:7000/getAll")
    .then((res) => res.json())
    .then((data) => loadHTMLTable(data["data"]));
  loadHTMLTable([]);
});

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

}

loadHTMLTable = (data) => {
  const table = document.querySelector("table tbody");

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
  }
};
