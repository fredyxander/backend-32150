const submitLogin = document.getElementById("login-form");
const errorLabel = document.getElementById("error-message");
const loginContainer = document.getElementById("login-container");

submitLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    errorLabel.innerHTML = "";
    const formData = new FormData(e.target);
    let obj = {};
    formData.forEach((value, key)=>obj[key]=value);
    const getData = async()=>{
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-type':"application/json"
            }
        });
        const result = await response.json();
        if(response.status !== 200){
            const errorMsg = result.message;
            errorLabel.innerHTML = errorMsg;
        } else{
            const token = result.token;
            if(token.length>0){
                localStorage.setItem('token', token);
                localStorage.setItem('username', result.username);
                location.href="/profile"
            }
        }
    }
    getData();
})

window.onload = ()=>{
    const tokenLocal = localStorage.getItem('token');
    if(tokenLocal === null || !tokenLocal){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        loginContainer.style.display = "block";
    } else{
        location.href = "/profile"
    }
}