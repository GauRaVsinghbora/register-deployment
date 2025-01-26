const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const close = document.querySelector(".close");
const logouts = document.querySelectorAll(".register");

// show menu.
menu.addEventListener("click",()=>{
    sidebar.style.transform = "translateX(0%)";
    sidebar.style.transition= "all 0.3s ease";
})
close.addEventListener("click",()=>{
    sidebar.style.transform = "translateX(100%)";
    sidebar.style.transition= "all 0.3s ease";
})

logouts.forEach((logout) => {
    logout.addEventListener("click", async () => {
        try {
            const response = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                // If response isn't ok, log the error and show a message
                const errorData = await response.json();
                console.error("Logout failed:", errorData);
                alert("Logout failed. Please try again.");
                return;
            }

            // Redirect only on successful logout
            setTimeout(() => {
                window.location.href = "loginPage.html";
            }, 500);
        } catch (error) {
            // Network or unexpected errors
            console.error("Error during logout:", error);
            alert("An error occurred. Please check your connection.");
        }
    });
});



let t1 = gsap.timeline();
t1.from(".header",{
    y:"-100%",
    opacity:0,
    duration:1,
})
t1.from(".main_info h1",{
    scale:0,
    opacity:0,
    duration:1,
})
