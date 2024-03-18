let elForm = document.querySelector(".form-wrap");

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    const data = {
        login: evt.target[0].value, 
        password: evt.target[1].value
    }
    window.localStorage.setItem("user", JSON.stringify(data))
    setTimeout(() => {
        window.location = "/index.html";
    }, 2000)
})