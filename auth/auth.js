const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
let users = JSON.parse(localStorage.getItem("users")) || [];

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fName = document.getElementById("fName").value.trim();
        const lName = document.getElementById("lName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!fName || !lName || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
            alert("User is already registered. Please login");
            window.location.href = "login.html";
            return;
        }
        console.log(existingUser);

        if (password !== confirmPassword) {
            alert("Password does not match");
            return;
        }

        let newId = 1;
        if (users.length > 0) {
            newId = users[users.length - 1].id + 1;
        }
        const userData = {
            id: newId,
            firstName: fName,
            lastName: lName,
            email,
            password
        };



        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User register successfully");

        window.location.href = "login.html";
    });
}

function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now();
}

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("All flieds required");
            return;
        }
        let user = users.find((u) => u.email === email);
        if (!user) {
            alert("User does not exist. Please signup.")
            return;
        }
        if (user.password !== password) {
            alert("Invalid credentials");
            return;
        }

        let token = generateToken();
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successfully");
        window.location.href = "../shop/shop.html"
    });
}