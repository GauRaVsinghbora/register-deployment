const form = document.querySelector("#register");
const message = document.querySelector("#message");
const loginform = document.querySelector("#loginform");


// console.log("hello world");  // for testing

if(loginform){
    loginform.addEventListener("submit", async (event)=>{
    // console.log("Login form submitted");
    event.preventDefault();
    message.textContent = "Submitting...";
    message.style.visibility = "visible";

    const formData = new FormData(loginform);
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    console.log(data);

    try {
        const response = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const resData = await response.json();
        message.textContent = resData.message + "!!";
        message.style.visibility = "visible";

        // Redirect immediately without waiting for additional processing
        setTimeout(() => window.location.href = "homePage.html", 500);

    } catch (error) {
        console.error(error.message);
        message.textContent = error.message + "!!";
        message.style.visibility = "visible";
    }
});
}

if(form){
    form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Immediately show the message to indicate that the form is being submitted
    message.textContent = "Submitting...";
    message.style.visibility = "visible";

    const formData = new FormData(form);
    const data = {
        fullName: formData.get("fullName"),
        userName: formData.get("userName"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const response = await fetch('http://localhost:8000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const resData = await response.json();
        message.textContent = resData.message + "!!";
        message.style.visibility = "visible";

        // Redirect immediately without waiting for additional processing
        setTimeout(() => window.location.href = "loginPage.html", 500);

    } catch (error) {
        console.error(error.message);
        message.textContent = error.message + "!!";
        message.style.visibility = "visible";
    }
});
}