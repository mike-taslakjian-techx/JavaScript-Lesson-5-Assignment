// Variables

const withHeaderBtn = document.getElementById("with-header");
const withoutHeaderBtn = document.getElementById("without-header");
const body = document.querySelector("body");

// Event handlers

withHeaderBtn.addEventListener("click", (e) => btnClick(e));
withoutHeaderBtn.addEventListener("click", (e) => btnClick(e));

async function btnClick (e) {
    if (document.querySelector("p")) {
        document.querySelector("p").remove();
    }

    const p = document.createElement("p");
    body.append(p);
    p.innerText = "Loading...";
    console.log("Fetching users...");
    let users = null;

    if (e.target.id === "with-header") {
        users = await fetchUsers({ "x-api-key": "reqres-free-v1" });
    } else {
        users = await fetchUsers();
    }   

    if (isValid(users)) {
        p.innerText = await processData(users);
        console.log("Done");
    } else {
        p.innerText = "No Users";
    }
};

function isValid (users) {
    return users ? true : false;
}

async function processData (users) {
    const names = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(users.map(({ first_name, last_name }) => `${first_name} ${last_name}`).join("\n")), 1000);
    });
    return names;
};

async function fetchUsers (header = {}) {
    const data = await fetch("https://reqres.in/api/users?delay=1", {
            method: "GET",
            headers: header
        });
    const jsonData = await data.json();
    const users = jsonData.data;
    return users;
};