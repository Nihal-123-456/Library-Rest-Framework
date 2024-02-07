const userreview=(event)=>{
    event.preventDefault();
    const reviewer_id = localStorage.getItem("user_id")
    const body = document.getElementById("review-body").value
    const rating = document.getElementById("review-star").value
    const param = new URLSearchParams(window.location.search).get("BookReviewId")
    const review_info = {
        "body": body,
        "rating": rating,
        "reviewer": reviewer_id,
        "book": param
    }
    console.log(review_info);
    fetch(`https://librar-apis.onrender.com/book/review/` , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review_info)
    })
    .then((req)=>req.json())
    .then((data)=> {
        console.log(data);
        window.location.reload();
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