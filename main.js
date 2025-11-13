function fetchData (header = {}) {
    return new Promise((resolve, reject) => {
        resolve(fetch("https://reqres.in/api/users?delay=1", {
            method: "GET",
            headers: header
        }));
        reject("No users");
    }).then(response => response.json());
};

console.log(fetchData());
console.log(fetchData({ "x-api-key": "reqres-free-v1" }));