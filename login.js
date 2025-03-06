document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Send a POST request to the backend
    try {
        const response = await fetch("http://localhost:8000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        });

        if (!response.ok) {
            // Handle login error
            const errorData = await response.json();
            document.getElementById("error-message").innerText = errorData.detail || "Login failed";
            document.getElementById("error-message").style.display = "block";
            return;
        }

        // Login successful
        const data = await response.json();
        const token = data.access_token;

        // Save the token (e.g., in localStorage)
        localStorage.setItem("access_token", token);

        // Redirect to another page or update the UI
        window.location.href = "/dashboard.html"; // Replace with your desired redirect URL
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").innerText = "An error occurred. Please try again.";
        document.getElementById("error-message").style.display = "block";
    }
});