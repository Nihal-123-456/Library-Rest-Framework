const signuphandler=(event)=>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const info = {
        username,first_name,last_name,email,password,confirm_password
    }
    if(password===confirm_password){
        document.getElementById("pass-error").innerText=""
        if(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
            console.log(info);
            fetch("https://librar-apis.onrender.com/user/register/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(info),
            })
            .then((req)=>req.json())
            .then((data)=>{
                const parent = document.getElementById("mail-confirm")
                const div = document.createElement("div")
                div.innerHTML = `
                <p class="text-center mt-4 bg-success w-25 m-auto p-2 text-light" style="border-radius: 10rem;font-weight: 500;">! Check Your mail for confirmation</p>
                `
                parent.appendChild(div)
            })
        }
        else{
            alert("Password not strong enough")
            document.getElementById("pass-error").innerText="Password must contain minimum 8 letters with at least a symbol, upper and lower case letters and a number"
        }
    }
    else{
        alert("Passwords do not match")
        document.getElementById("pass-error").innerText="Passwords do not match"
    }
}

const loginhandler=(event)=>{
    event.preventDefault();
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value
    if((username,password)){
        fetch("https://librar-apis.onrender.com/user/login/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({username,password}),
            })
            .then((req)=>req.json())
            .then((data)=>{
                if(data.token && data.user_id){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user_id",data.user_id);
                    window.location.href="index.html";
                }
            })
    }
}

const navbarview=()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    if(token && user_id){
        const parent = document.getElementById("navigationbar")
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="d-lg-flex justify-content-around align-items-center gap-5">
        <div class="nav-items-l d-lg-flex justify-content-center align-items-center gap-5">
            <img class="logo-img" src="Images/book_logo.png" alt="">
            <li style="font-weight: 500;list-style: none;"><a href="index.html" class="text-dark text-decoration-none">Home</a></li>
            <li style="font-weight: 500;list-style: none;"><a href="#about" class="text-dark text-decoration-none">About</a></li>
            <li style="font-weight: 500;list-style: none;"><a href="#contact" class="text-dark text-decoration-none">Contact</a></li>
            <li style="font-weight: 500;list-style: none;"><a href="borrowhistory.html" class="text-dark text-decoration-none">Borrow History</a></li>
        </div>
        <div class="nav-items-r d-lg-flex justify-content-center align-items-center gap-4">
            <i class="fa fa-shopping-cart" style="font-size:24px"></i>
            <a href="favourites.html" class="" style="font-weight: 500;"><i class="fa fa-heart" style="font-size:24px;color:black"></i></a>
            <li class="btn btn-outline-secondary" style="font-weight: 500;" onclick="LogoutHandler('')">Log out</li>
        </div>
        </div>
        `
        parent.appendChild(div)
    }
    else{
        const parent = document.getElementById("navigationbar")
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="d-lg-flex justify-content-around align-items-center gap-5">
        <div class="nav-items-l d-lg-flex justify-content-center align-items-center gap-5">
            <img class="logo-img" src="Images/book_logo.png" alt="">
            <li style="font-weight: 500;list-style: none;"><a href="index.html" class="text-dark text-decoration-none">Home</a></li>
            <li style="font-weight: 500;list-style: none;"><a href="#about" class="text-dark text-decoration-none">About</a></li>
            <li style="font-weight: 500;list-style: none;"><a href="#contact" class="text-dark text-decoration-none">Contact</a></li>
        </div>
        <div class="nav-items-r d-lg-flex justify-content-center align-items-center gap-5">
            <a href="login.html" class="btn btn-outline-secondary" style="font-weight: 500;">Log in</a>
            <a href="signup.html" class="btn btn-outline-secondary" style="font-weight: 500;">Sign up</a>
        </div>
        </div>
        `
        parent.appendChild(div)
    }
}
navbarview();

const LogoutHandler=()=>{
    const token = localStorage.getItem("token");
    fetch("https://librar-apis.onrender.com/user/logout/",{
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json"
        },  
    })
    .then((req)=>req.json())
    .then((data)=>{
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href="index.html";
    })
}



