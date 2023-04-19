document.addEventListener('DOMContentLoaded',function(e){
    e.preventDefault;

    // console.log("Today is a monday")
    const submit_login = document.querySelector(".submit-login")
    submit_login.addEventListener("click",(e)=>{
        e.preventDefault;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          })
            .then((response) => response.json())
            .then((data) => {
                if(username == data.username && password == username.password_digest){
                    window.location.href = "movie.html"
                    console.log(data);
                }
            
            })
            .catch((error) => {
              // Handle login error
              console.error(error);
            });
        
  
        
 
       
    })
})