

function showSignup() {
    document.querySelector(".overlay-signup").style.display = 'block';
}
function showLogin() {
    document.querySelector(".overlay-login").style.display = 'block';
}

function closepop1() {
    document.querySelector(".overlay-signup").style.display = "none";
}
function closepop2() {
    document.querySelector(".overlay-login").style.display = "none";
}

function showLogout() {
    document.querySelector(".logoutDropdown").style.display = "block";
}

function closeform(){
    document.querySelector(".my-posts").style.display="none";
    document.querySelector(".add-post-button").style.display="block";
}

function validatePassword(password){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*");
    if (strongRegex.test(password)) {
        return true;
    }
    return false;   
}

async function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const option = document.getElementById("signup-option").value;

    if (password.length < 5) {
        alert("password length should be more than 5 characters..");
        return;
    }
    const validate = true;
    if (validate) {

        if (option === "employer") {
            const response = await fetch('/signup-employer', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                document.querySelector(".overlay-signup").style.display = "none";
                alert("signup successful as a employer");
            }
            else {
                console.log("signup unsuccessful ... Try again !");
            }
        }

        else {
            const response = await fetch('/signup-freelancer', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                document.querySelector(".overlay-signup").style.display = "none";
                alert("signup successful as freelancer");
            }
            else {
                console.log("signup unsuccessful ... Try again !");
            }
        }
    }
    else{
        alert("password should contain at least one uppercase, one lowercase, one digit and one special character");
    }

}

async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const option = document.getElementById("login-option").value;

    if (option === "employer") {
        const response = await fetch('/login-employer', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            document.querySelector(".overlay-signup").style.display = "none";
            alert("login successful... 🤩");
            location.href = "employer.html";
        }
        else {
            alert("Invalid Credentials....😴");
        }
        return;
    }
    else{
        const response = await fetch('/loginFreelancer',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        })
        const data = await response.json();
        if (response.ok) {
            document.querySelector(".overlay-signup").style.display = "none";
            alert("login successful...");
            location.href = "freelancer.html";
        }
        else {
            alert("Invalid Credentials....");
            }
    }
    
}


async function displayFreelancers() {
    const response =await fetch('/freelancers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    })
    const data = await response.json();
    console.log(data);
    if(data){
        document.querySelector(".main-content").innerHTML="";
        data.forEach(element => {
            const item= `<div class='main-freeLancer'>
            <h2>${element.name}</h2>
            <p>${element.email}</p>
            <p>${element.skills}</p>
            <span class="f-profile-check">Profile</span>
            </div>`;
            document.querySelector('.main-content').innerHTML += item;
        });
    }
}

async function displayPosts() {
    const response =await fetch('/posts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    })
    const data = await response.json();
    console.log(data);
    if(data){
        document.querySelector(".main-content").innerHTML="";
        data.forEach(element => {
            const item= `<div class='main-posts'>
            <h2>${element.title}</h2>
            <p>${element.description}</p>
            <h3>${element.skills}</h3>
            <p>${element.money}$</p>
            <h3>${element.date}</h3>
            </div>`;
            document.querySelector('.main-content').innerHTML += item;
        });
    }
}

function addpost(){
    document.querySelector(".my-posts").style.display="block";
    document.querySelector(".add-post-button").style.display="none";
}

async function submitpost() {
    const title = document.getElementById("post-title").value;
    const description = document.getElementById("post-details").value;
    const skills = document.getElementById("post-skills").value;
    const money = document.getElementById("post-money").value;
    const date = document.getElementById("post-date").value;

    const response = await fetch('/addpost', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, skills, money, date })
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementById("post-post").style.display = "none";
        alert("Post added successfully!");
    }
    else {
        alert("Failed to add post. Please try again.");
    }
    document.querySelector(".add-post-button").style.display="block";
    document.querySelector(".my-posts").style.display="none";
}

async function sendDetails() {
    const name = document.getElementById("detail-name").value;
    const email = document.getElementById("detail-email").value;
    const skills = document.getElementById("detail-skills").value;

    const response = await fetch('/updateDetails', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, skills })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Details updated successfully!");
    }
    else {
        alert("Failed to update details. Please try again.");
    }
}

function logout() {
    alert("Logged out successfully!");
    location.href = "index.html";
}