// In-memory "database" for registered users
const usersDB = {};

// Function to display the main options
function showMainOptions() {
    document.getElementById("mainOptions").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
    clearOutput();
}

// Function to show the registration form
function showRegisterForm() {
    document.getElementById("mainOptions").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// Function to show the login form
function showLoginForm() {
    document.getElementById("mainOptions").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Function to register a new user
function registerUser() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!name || !email || !password || !role) {
        displayMessage("All fields are required for registration!", "error");
        return;
    }

    if (usersDB[email]) {
        displayMessage("User already exists with this email!", "error");
        return;
    }

    usersDB[email] = { name, password, role };
    displayMessage(`User '${name}' registered successfully as ${role}!`, "success");
    showMainOptions();
}

// Function to log in a user
function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        displayMessage("Both email and password are required to log in!", "error");
        return;
    }

    const user = usersDB[email];
    if (user && user.password === password) {
        displayMessage(`Welcome ${user.name}!`, "success");
        showDashboard(user);
    } else {
        displayMessage("Incorrect email or password!", "error");
    }
}

// Function to show the dashboard based on user role
function showDashboard(user) {
    document.getElementById("mainOptions").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    const dashboardContent = document.getElementById("dashboardContent");
    dashboardContent.innerHTML = `<h3>Hello, ${user.name} (${user.role})!</h3>`;

    if (user.role === "trainee") {
        dashboardContent.innerHTML += `
            <p>Available courses and job listings are here for you.</p>
        `;
    } else if (user.role === "trainer") {
        dashboardContent.innerHTML += `
            <p>Create and manage your training courses here.</p>
        `;
    } else if (user.role === "employer") {
        dashboardContent.innerHTML += `
            <p>Post job listings for women trainees here.</p>
        `;
    }
}

// Function to display messages
function displayMessage(message, type) {
    const output = document.getElementById("output");
    output.textContent = message;
    output.style.color = type === "error" ? "red" : "green";
}

// Function to clear messages
function clearOutput() {
    document.getElementById("output").textContent = "";
}

// Function to log out a user
function logout() {
    showMainOptions();
}
