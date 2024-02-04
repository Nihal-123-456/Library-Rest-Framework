const bookdetailview=()=>{
    const param = new URLSearchParams(window.location.search).get("BookId")
    fetch(`https://librar-apis.onrender.com/book/list/${param}/`)
    .then((req)=>req.json())
    .then((data)=>{
            console.log(data);
            const parent = document.getElementById("book-detail-container")
            const div = document.createElement("div")
            div.innerHTML = `
            <div class="card"style="border: none;">
            <div class="d-lg-flex justify-content-center gap-5 mt-5 me-5 mb-5">
                <div class="detail-img">
                    <img style="border-radius: 10px;" src="${data.image}" alt="">
                </div>
                <div class="detail-txt">
                    <div class="detail-txt-card card ps-3 pe-3 pt-2">
                        <h4>${data.title}</h4>
                    </div>
                    <p class="mt-3 text-primary">by ${data.author}</p>
                    <div id="genre-name" class="fw-bold d-flex gap-2">Category :${
                        data.genre.map((ele)=>{
                            fetch(`https://librar-apis.onrender.com/book/genre/${ele}/`)
                            .then((req)=>req.json())
                            .then((genreData)=>{
                                console.log(genreData);
                                const par = document.getElementById("genre-name")
                                const txt = document.createElement("p")
                                txt.innerText = genreData.name
                                par.appendChild(txt)
                            })
                        })
                    }</div>
                    <p>ISBN no: <small>${data.isbn}</small></p>
                    <p>Publication date: ${data.publication_date}</p>
                    <p class="text-success">${data.quantity} copies available</p>
                </div>
            </div>
        </div>
            `
        parent.appendChild(div)
        })
}
bookdetailview()

const bookreview=()=>{
    const param = new URLSearchParams(window.location.search).get("BookId")
    fetch(`https://librar-apis.onrender.com/book/review/?book_id=${param}`)
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((item)=>{
            fetch(`https://librar-apis.onrender.com/user/list/${item.reviewer}/`)
            .then((req)=>req.json())
            .then((userData)=>{
                const parent = document.getElementById("book-reviews")
                const div = document.createElement("div")
                div.innerHTML=`
                <div class="card-body border m-2">
                <p><b>${userData.username}</b><small class="ms-3">${item.created_on}<small></p>
                    <div>
                        <p class="mb-2">${item.rating}</p>
                    </div>
                    <p style="font-size: 15px;">${item.body}</p>
                </div>
                `
                parent.appendChild(div)
            })
            
        })
    })
}
bookreview()

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