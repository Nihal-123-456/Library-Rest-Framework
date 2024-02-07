const categoryview=()=>{
    fetch("https://librar-apis.onrender.com/book/genre/")
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((d)=>{
            const parent = document.getElementById("cat-cards")
            const div = document.createElement("div")
            div.innerHTML = `
            <div class="category-card card text-center" style="border: none;">
            <div class="card-img-top pt-2">
                <li onclick="bookview('${d.id}')"><img class="cat-img" src=${d.image} alt=""></li>
            </div>
            <div class="card-body">
                <li onclick="bookview('${d.id}')" class="text-dark text-decoration-none"><h5 class="fw-bold" style="margin-bottom: -10px; margin-top: -10px;">${d.name}</h5></li>
            </div>
            </div>
            `
            parent.appendChild(div);
        });
    });
}
categoryview()

const bookview=(search)=>{
    document.getElementById("book-cards").innerHTML=``
    fetch(`https://librar-apis.onrender.com/book/list/?genre_id=${
        search ? search : ""}`)
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((d)=>{
            const parent = document.getElementById("book-cards")
            const div = document.createElement("div")
            const token = localStorage.getItem("token");
            const user_id = localStorage.getItem("user_id");
            if(token && user_id){
                div.innerHTML = `
                <li class="slide-visible">
                        <div class="card shadow" style="height: 485px;">
                            <div class="ratio ratio-4x3">
                                <img src=${d.image} class="card-img-top" loading="lazy" alt="...">
                            </div>
                            <div class="card-body">
                                <h4 class="card-title fw-bold">${d.title}</h4>
                                <h6 class="card-title fw-bold">${d.author}</h6>
                                <p class="card-text fw-bold" style="color: #E46E2B">${d.quantity} copies available</p>
                                
                                <div class="d-flex flex-wrap gap-2 justify-content-center">
                                <a href="bookdetails.html?BookId=${d.id}" class="btn fw-bold text-light" style="border-radius: 10rem;background-color: #174A7C">Details</a>
                                <a onclick="addfavouritesview('${d.id}')" class="btn fw-bold text-light" style="border-radius: 10rem;background-color: #E46E2B">Add to favourites</a>
                                <a onclick="borrowbookview('${d.id}')" class="btn fw-bold text-light mt-2" style="border-radius: 10rem;background-color: #174A7C">Borrow</a>
                                </div>
                            </div>
                        </div>
                    </li>
            `
            parent.appendChild(div);
            }
            else{
                div.innerHTML = `
                <li class="slide-visible">
                        <div class="card shadow" style="height: 430px;">
                            <div class="ratio ratio-4x3">
                                <img src=${d.image} class="card-img-top" loading="lazy" alt="...">
                            </div>
                            <div class="card-body">
                                <h4 class="card-title fw-bold">${d.title}</h4>
                                <h6 class="card-title fw-bold">${d.author}</h6>
                                <p class="card-text fw-bold" style="color: #E46E2B">${d.quantity} copies available</p>
                                
                                <div class="d-flex flex-wrap gap-2 justify-content-center">
                                <a href="bookdetails.html?BookId=${d.id}" class="btn fw-bold text-light" style="border-radius: 10rem;background-color: #174A7C">Details</a>
                            
                                </div>
                            </div>
                        </div>
                    </li>
                `
                parent.appendChild(div);
            }
           
        });
    });
}
bookview()

const addfavouritesview = (bookid) => {
    const userid = localStorage.getItem("user_id");
    var is_present = 0
    fetch(`https://librar-apis.onrender.com/user/wishlist/?user_id=${userid}`)
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((d)=>{
            if(d.book==bookid)
            {
                is_present = 1
            }
        })
        if (is_present==0)
        {
            const info = {
                "user": userid,
                "book": bookid
            }
            
            fetch("https://librar-apis.onrender.com/user/wishlist/", {
                method: "POST",
                headers: {"content-type":"application/JSON"},
                body: JSON.stringify(info),
            })
            .then((res)=>res.json())
            .then((data) => {
                window.location.href = "favourites.html"
              });
        }
        else{
            window.location.href = "favourites.html"
        }
    })
    
}

const borrowbookview = (bookid) => {
    const userid = localStorage.getItem("user_id");
    
    fetch(`https://librar-apis.onrender.com/user/borrowhistory/?user_id=${userid}`)
    .then((res) => res.json())
    .then((borrowHistory) => {
        const isBorrowed = borrowHistory.some((record) => record.book == bookid);
        if (!isBorrowed) {
            fetch(`https://librar-apis.onrender.com/book/list/${bookid}/`)
            .then((res) => res.json())
            .then((bookData) => {
                if (bookData.quantity > 0) {
                    const updatedQuantity = bookData.quantity - 1;
                    const updatedBookInfo = {
                        "id": bookData.id,
                        
                        "title": bookData.title,
                        "author": bookData.author,
                        "isbn": bookData.isbn,
                        "publication_date": bookData.publication_date,
                        "quantity": updatedQuantity,
                        "availability_status": updatedQuantity > 0 ? true : false,
                        "genre": bookData.genre
                    };
                    console.log(updatedBookInfo);
                    fetch(`https://librar-apis.onrender.com/book/list/${bookid}/`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedBookInfo)
                    })
                    .then((res) => res.json())
                    .then((updatedBook) => {
                        const borrowingInfo = {
                            user: userid,
                            book: bookid
                        };
                        console.log(borrowingInfo);
                        fetch("https://librar-apis.onrender.com/user/borrowhistory/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(borrowingInfo)
                        })
                        .then((res) => res.json())
                        .then((borrowingResponse) => {
                            console.log(borrowingResponse);
                            const parent = document.getElementById("borrow-done")
                            const div = document.createElement("div")
                            div.innerHTML=`
                            <p class="text-center mt-4 bg-success w-25 m-auto p-2 text-light" style="border-radius: 10rem;font-weight: 500;">! Book successfully borrowed</p>
                            `
                            parent.appendChild(div)
                        })
                        .catch((error) => console.error("Error borrowing book:", error));
                        window.location.href = "borrowhistory.html"
                    })
                    .catch((error) => console.error("Error updating book quantity:", error));
                } else {
                    console.log("Book out of stock");
                    const parent = document.getElementById("borrow-done")
                        const div = document.createElement("div")
                        div.innerHTML=`
                        <p class="text-center mt-4 bg-warning w-25 m-auto p-2 text-light" style="border-radius: 10rem;font-weight: 500;">! Book out of stock</p>
                        `
                        parent.appendChild(div)
                }
            })
            .catch((error) => console.error("Error fetching book data:", error));
        } else {
            console.log("Book already borrowed");
            const parent = document.getElementById("borrow-done")
            const div = document.createElement("div")
            div.innerHTML=`
            <p class="text-center mt-4 bg-warning w-25 m-auto p-2 text-light" style="border-radius: 10rem;font-weight: 500;">! Book Already borrowed</p>
            `
            parent.appendChild(div)
        }
    })
    .catch((error) => console.error("Error fetching borrowing history:", error));
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

const bannerbtn=()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const parent = document.getElementById("banner-button")
    const btn = document.createElement("div")
    if(token && user_id){
        btn.innerHTML = `
        <a href="#book-cards" class="btn mt-3 px-4" style="font-weight: 600;background-color: #E46E2B;color: white;border-radius: 10rem;font-size: 18px">See our books</a>
        `
    }
    else{
        btn.innerHTML = `
        <a href="signup.html" class="btn mt-3 px-4" style="font-weight: 600;background-color: #E46E2B;color: white;border-radius: 10rem;font-size: 18px;">Get Started</a>
        `
    } 
    parent.appendChild(btn)
}

bannerbtn()

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

