function validateLogin() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "admin" && pass === "12345") {
        window.location.href = "dashboard.html";
        return false;
    } else {
        alert("Invalid Username or Password!");
        return false;
    }
}
