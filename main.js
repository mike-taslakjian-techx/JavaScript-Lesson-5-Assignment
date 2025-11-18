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
    const request = new Request("https://reqres.in/api/users?delay=1", {
        headers: {
            "x-api-key": "reqres-free-v1"
        }
    });

    if (e.target.id === "with-header") {
        users = await fetchUsers(request);
        p.innerText = await processData(users);
        console.log("Done");
    } else {
        users = await fetchUsers("https://reqres.in/api/users?delay=1");
        p.innerText = "No users";
    }   
};

async function processData (users) {
    const names = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(users.map(({ first_name, last_name }) => `${first_name} ${last_name}`).join("\n")), 1000);
    });
    return names;
};

async function fetchUsers (requestObj) {
    try {
        const data = await fetch(requestObj);
        
        if (!data.ok) {
            return "No users";
        }
        const jsonData = await data.json();
        console.log(jsonData);
        const users = jsonData.data;
        return users;
    } catch (error) {
        return "No users";
    }
};