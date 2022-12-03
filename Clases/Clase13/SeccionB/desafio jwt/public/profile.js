const LogoutBtn = document.getElementById("logout-btn");
LogoutBtn.addEventListener('click',(e)=>{
    localStorage.removeItem("token");
    localStorage.removeItem('username');
    location.href="/";
})
const showBtn = document.getElementById("show-btn");
const dataContainer = document.getElementById("data-container");
const errorLabel = document.getElementById("error-msg");
const usernameLabel = document.getElementById("user-name");
const username = localStorage.getItem('username');
usernameLabel.innerHTML = username;
showBtn.addEventListener('click',(e)=>{
    const getData = async()=>{
        const token = localStorage.getItem('token');
        const response = await fetch('/data',{
            method: 'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const result = await response.json();
        if(response.status !== 200){
            const errorMgs = result.message;
            errorLabel.innerHTML = errorMgs;
        } else{
            console.log(result);
            dataContainer.innerHTML = JSON.stringify(result);
        }
    }
    getData();
})