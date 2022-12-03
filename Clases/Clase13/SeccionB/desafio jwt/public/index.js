const LogoutBtn = document.getElementById("logout-btn");
const LoggedContainer =document.getElementById("logged-container");
const NotLoggedContainer =document.getElementById("not-logged-container");
LogoutBtn.addEventListener('click',(e)=>{
    localStorage.removeItem("token");
    localStorage.removeItem('username');
    location.href="/";
})
window.onload = ()=>{
    const tokenLocal = localStorage.getItem('token');
    if(tokenLocal === null || !tokenLocal){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        LoggedContainer.style.display = "none";
        NotLoggedContainer.style.display = "block";
    } else{
        LoggedContainer.style.display = "block";
        NotLoggedContainer.style.display = "none";
    }
}