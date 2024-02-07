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

const emailverify=()=>{
    const token = window.location.pathname.split('/').pop();
    const uid = window.location.pathname.split('/').slice(-2)[0];
        fetch(`https://librar-apis.onrender.com/user/active/${uid}/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Your account has been activated successfully. You can now log in.');
                window.location.href = 'login.html';
            } else {
                alert('Account activation failed. Please try again or contact support.');
                window.location.href = 'index.html';
            }
        })
        
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
            <div>
                <img class="logo-img" src="Images/new_logo.png" alt="">
                <p class="ms-3 fw-bold" style="color: #E46E2B;">Book Oasis</p>
            </div>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="index.html" class="text-dark text-decoration-none">Home</a></li>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="#about" class="text-dark text-decoration-none">About</a></li>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="#contact" class="text-dark text-decoration-none">Contact</a></li>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="borrowhistory.html" class="text-dark text-decoration-none">Borrow History</a></li>
        </div>
        <div class="nav-items-r d-lg-flex justify-content-center align-items-center gap-4">
            <i class="fa fa-shopping-cart" style="font-size:24px;color: #E46E2B"></i>
            <a href="favourites.html" class="" style="font-weight: 500;"><i class="fa fa-heart" style="font-size:24px;color:#E46E2B"></i></a>
            <li class="btn px-4" style="font-weight: 600;background-color: #174A7C;color: white;border-radius: 10rem;font-size: 18px" onclick="LogoutHandler('')">Log out</li>
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
            <div>
                <img class="logo-img" src="Images/new_logo.png" alt="">
                <p class="ms-3 fw-bold" style="color: #E46E2B;">Book Oasis</p>
            </div>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="index.html" class="text-dark text-decoration-none">Home</a></li>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="#about" class="text-dark text-decoration-none">About</a></li>
            <li style="font-weight: 600;list-style: none;font-size: 18px"><a href="#contact" class="text-dark text-decoration-none">Contact</a></li>
        </div>
        <div class="nav-items-r d-lg-flex justify-content-center align-items-center gap-5">
            <a href="login.html" class="btn px-4" style="font-weight: 600;background-color:#174A7C;color: white;border-radius: 10rem;font-size: 18px">Log in</a>
            <a href="signup.html" class="btn px-4" style="font-weight: 600;background-color: #174A7C;color: white;border-radius: 10rem;font-size: 18px">Sign up</a>
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



