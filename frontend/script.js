

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
            const token = btoa(email + ":" + Date.now()); // or use any method above
            localStorage.setItem("userToken", token);
            document.querySelector(".overlay-signup").style.display = "none";
            alert("login successful... 🤩");
            location.href = "employer.html";
            
            const person_welcome=`<p>Welcome back , ${data.data}</p>`;
            document.querySelector(".welcome-profile").innerHTML=person_welcome;
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
            const token = btoa(email + ":" + Date.now()); // or use any method above
            localStorage.setItem("userToken", token);
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
    if(data){
        document.querySelector(".main-content").innerHTML="";
        data.forEach(element => {
            const item= `<div class='main-freeLancer'>
            <div class="freelancer-image"></div>
            <h2>${element.NAME}</h2>
            <p>${element.EMAIL}</p>
            <p>${element.SKILLS}</p>
            <p>${element.EXPERIENCE}</p>
            <p>${element.AVAILABILITY}</p>
            <P>${element.HOURLY_RATE}</p>
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
    if(data){
        document.querySelector(".main-content").innerHTML="";
        
        data.forEach(element => {
            const endDate = element.DATE;
            const formattedendDate = endDate.slice(0, 10);
            const postedDate = element.POSTED_DATE;
            const formattedpostedDate = postedDate.slice(0, 10); 
            const item= `<div class='main-posts'>
            <h2>${element.TITLE}</h2>
            <p>${formattedendDate}</p>
            <p>${element.DESCRIPTION}</p>
            <h3>${element.SKILLS}</h3>
            <p>${element.MONEY}$</p>
            <h3>${formattedpostedDate}</h3>
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
        method: "PUT",
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

function updateDetails(){
    document.querySelector(".freelancer-details").style.display="block";
    document.querySelector(".update-details").style.display="none";
}

async function submitFreelancerDetails() {
    const name = document.getElementById("freelancer-name").value;
    const email = document.getElementById("freelancer-email").value;
    const phoneNumber = document.getElementById("freelancer-phone").value;
    const location = document.getElementById("freelancer-location").value;
    const skills = document.getElementById("freelancer-skills").value;
    const experience = document.getElementById("freelancer-experience").value;
    const portfolio = document.getElementById("freelancer-portfolio").value;
    const glink = document.getElementById("freelancer-link").value;
    const availablity = document.getElementById("freelancer-availability").value;
    const rate = document.getElementById("freelancer-rate").value;

    const response = await fetch('/updateDetails', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email,phoneNumber,location,skills,experience,portfolio,glink,availablity,rate })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Details updated successfully!");
    }
    else {
        alert("Failed to update details. Please try again.");
    }
    document.querySelector(".update-details").style.display="block";
}

function logout() {
    localStorage.removeItem("userToken"); // clear token
    alert("You have been logged out.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}
