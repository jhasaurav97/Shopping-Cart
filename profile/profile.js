const profileForm = document.getElementById("profileForm");
const chngePasswordBtn = document.getElementById("chngePassword");
const logoutBtn = document.getElementById("logout");

let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first");
    window.location.href = "../auth/login.html";
}
const loggedEmail = loggedInUser.email;

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedFirstName = document.getElementById("fName").value.trim();
    const updatedLastName = document.getElementById("lName").value.trim();

    const index = users.findIndex((u) => u.email === loggedEmail);
    if (index === -1) return;
    
    users[index].firstName = updatedFirstName;
    users[index].lastName = updatedLastName;
    
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(users[index]));

    loggedInUser = users[index];
    console.log(loggedInUser);
    alert("Name updated successfully");
});

chngePasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!oldPassword || !newPassword || !confirmPassword) {
        alert("All fields are required");
        return;
    }

    const index = users.findIndex((u) => u.email === loggedEmail);
    if (index === -1) return;

    if (oldPassword !== loggedInUser.password) {
        alert("Old password is incorrect");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match");
        return;
    }

    users[index].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(users[index]));

    loggedInUser = users[index];
    console.log(loggedInUser);
    alert("Password updated successfully");
});

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    window.location.href = "../auth/login.html";
});