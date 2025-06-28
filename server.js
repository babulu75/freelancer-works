const express = require("express");
const path = require("path");
const PORT = 3000;
const mysql = require('mysql2');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,"./frontend")))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Vinni@02#feb",
    database:"freelancer"
})

db.connect(err=>{
    if(!err){
        console.log("MySQL database is connected....😊😊");
    }
    else{
        console.log("MySQL database not connected");
    }
})

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,"./frontend/index.html"));
})

app.post('/signup-employer',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"Missing required fields"});
    }
    db.query("insert into signup_employer(name,email,password) values(?,?,?)",[name,email,password],(err)=>{
        if(err){
            res.status(500).json({error:"Database error"});
        }
        else{
            res.status(201).json({message:"Successful"});
        }
    })

})

app.post('/signup-freelancer',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"Missing required fields"});
    }
    db.query("select email from signup_freelancer where email=?",[email],(err,results)=>{
        if(results.length>=1){
            return res.status(400).json({error:"Email already exists"});
        }
    })
    db.query("insert into signup_freelancer(name,email,password) values(?,?,?)",[name,email,password],(err)=>{
        if(err){
            res.status(500).json({error:"Database error"});
        }
        else{
            res.status(201).json({message:"Successful"});
        }
    })

})


app.post('/loginFreelancer',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"Missing email or password"});
    }
   
    db.query('select * from signup_freelancer where email=?',[email],(err,results)=>{
        
        if (err){
            return res.status(500).json({error:"Database error"});
        }
        const data=results[0];
        console.log(data.PASSWORD,password);
        if (!data){
             return res.status(404).json({message:'Sign up first...'});
        }
        if (data.PASSWORD===password){
             return res.status(200).json({message:'Login successful',data:data});
        } else {
            return res.status(401).json({message:'Invalid password'});
        }
    })
})

app.post('/login-employer',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"Missing email or password"});
    }
    db.query("select * from signup_employer where email=?",[email],(err,results)=>{
        if(err){
             return res.status(500).json({error:"Database error"});
        }
        if(results.length===0){
            return res.status(404).json({error:"User not found"});
        }
        const user=results[0];
        if(user.password===password){
            res.status(200).json({message:"Successful"});
        }
        else{
            res.status(401).json({error:"Invalid password"});
        }
    })

})

app.post('/freelancers',(req,res)=>{
    db.query('select * from freelancer',(err,results)=>{
        if (err){
            return res.status(500).json({error:"Database error"});
        }
        else{
            res.status(200).json(results);
        }
    })
})
app.post('/posts',(req,res)=>{
    db.query('select * from posts',(err,results)=>{
        if (err){
            return res.status(500).json({error:"Database error"});
        }
        else{
            res.status(200).json(results);
        }
    })
})

app.post('/updateDetails',(req,res)=>{
    const {name,email,skills}=req.body;
    if(!name || !email || !skills){
        return res.status(400).json({error:"Missing required fields"});
    }
    db.query("insert into freelancer(NAME,EMAIL,SKILLS) values(?,?,?)",[name,email,skills],(err)=>{
        if(err){
            res.status(500).json({error:"Database error"});
        }
        else
        {
            res.status(201).json({message:"Successful"});
        }
    })
})

app.post('/addpost',(req,res)=>{
    const {title,description,skills,money,date}=req.body;
    if(!title || !description){
        return res.status(400).json({error:"Missing required fields"});
    }
    db.query("insert into posts(TITLE,DESCRIPTION,SKILLS,MONEY,DATE) values(?,?,?,?,?)",[title,description,skills,money,date],(err)=>{
        if(err){
            res.status(500).json({error:"Database error"});
        }
        else
        {
            res.status(201).json({message:"Successful"});
        }
    })
})

app.listen(PORT,()=>{
    console.log("Server running successfully 🔥")
})
