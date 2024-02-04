const wishlistview=()=>{
    const user_id = localStorage.getItem("user_id");
    fetch(`https://librar-apis.onrender.com/user/wishlist/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((d)=>{
        fetch(`https://librar-apis.onrender.com/book/list/${d.book}`)
        .then((req)=>req.json())
        .then((data)=>{
            const parent = document.getElementById("favourites-list")
            const div = document.createElement("div")
            div.innerHTML = `
            <div class="mb-5">
            <div class="">
              <div class="mb-4">
                <div class="d-lg-flex justify-content-between p-3" style="box-shadow: 4px 4px 8px gray; border-radius: 10px;">
                  <div class="d-lg-flex">
                    <img src="${data.image}" class="" alt="" style="width: 100px; height: 80px; border-radius: 10px;">
                    <div><h5 class="card-title mt-4 fw-bold fs-6 ms-4">${data.title}</h5></div>
                  </div>
                  <div class="d-lg-flex justify-content-between">
                      <p class="fw-bold mt-4 pe-3 text-orange-500 ms-5">By ${data.author}</p>
                      <p class="fw-bold mt-4 pe-3 text-orange-500 ms-5">Published in ${data.publication_date}</p>
                      
                  </div>
                </div>
              </div>
            </div>
            </div>
            `
            parent.appendChild(div)
        })
      })
    })
}
wishlistview()

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