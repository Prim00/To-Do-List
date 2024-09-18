
const express = require("express")
const app = express()
const cors = require("cors")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// ============importation of eamil sender =========================

const nodemailer = require("nodemailer")

require('dotenv').config({ path: '.env.local' });

let nanoid;
import('nanoid').then((module) => {
  nanoid = module.nanoid;
});

// ============************************** =========================


app.use(cors())
app.use(express.json()) // a eliminer car en va lire et recuperer les données avec bodyParser

// ========= Connection with Data-Base ===============

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://Primo:Primo123@primocluster.vrxsvmn.mongodb.net/?retryWrites=true&w=majority&appName=PrimoCluster")
        .then(()=>{
            console.log("Connected Successfully ")
        })
        .catch((e)=>{
            console.log("error : Not able to Connect ! ")

        })

// ==============Creation de Database grace au Intermediare "" Task ""=====================

    const Task = require("./models/Task")

    const User = require("./models/User")

// ====================================================

app.post("/addTask",async(req,res)=>{
    try{ 
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(404).json({message : "Token Missing "})
        }
        const decodedInfo = jwt.verify(token, "secret123");
        const newTask = new Task({
            name : req.body.name ,
            time : req.body.time ,
            userEmail : decodedInfo.email
        })
        await newTask.save()

        res.json({
            status :"ok", 
            message :"the new Task has been Stored"
            });

    }catch(e){
        res.json({
            message :"erreur lors de l'ajout de tache !!! ",
            status : 'false'
    })
    }
   
})

app.get("/getAllTask",async(req,res)=>{

    try {
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(404).json({message : "Token Missing "})
        }
        const decodedInfo = jwt.verify(token, "secret123");

        const listTask = await Task.find({ userEmail: decodedInfo.email });

        if (listTask) {
            res.json({ 
                status: "ok", 
                tasks : listTask
             });
        }
    } catch (error) {
        console.log('Error verifying token:', error);
        res.status(401).json({ status: "error", message: "Invalid token" });
    }
});

app.delete("/deleteTask",async(req,res)=>{
    try{
        const token = req.headers['x-access-token']
        if(!token){
            return res.status(404).json({
                message: "token missing ! "
            })
        }

        const {id} = req.body
        const delTask = await Task.findByIdAndDelete(id)

        if(delTask!==null){
            res.json({
                message :"Task Deleted Successfully ",
                status: "ok"
            })
            return 
        }
        res.json({status: "false",
            message: "Task Not Found "
                })

    }catch(e){
        console.log("erreur lors de suppresion de tache ! ",e)
    }
})

app.post("/api/updateTask",async(req,res)=>{
    try{
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(404).json({message : "Token Missing "})
    }

    res.json({
        status : "ok"
    })

    }catch(e){
        res.json({
            status: "false",
            message : "erreur lors de verification du Token ! "
        })
    }
})

app.put("/updateTask",async(req,res)=>{
        try{
            const id = req.headers["x-task-id"]
            
            const updatedTask = await Task.findById(id)
            if(updatedTask!==null){

                updatedTask.name = req.body.newName
                updatedTask.time = req.body.newTime

                await updatedTask.save()

                res.json({
                    message: "Task Updated successfully ",
                    status: "ok"
            })
                return
            }

        }catch(e){
            console.log("erreur lors de la modification",e)
        }
        
    })

// ===================================== **************** ======================================

app.post("/api/SignUp",async(req,res)=>{
    try{
        const {firstname,lastname,phone,email,password} = req.body

        const hashedPass = await bcrypt.hash(password,10)

        const newUser = new User({
            firstname,
            lastname,
            phone,
            email,
            password : hashedPass

        })

        await newUser.save();
        res.status(200).json({status : "ok" , message: "User added successfully ! "})
        console.log("user added successfully ! ")
    }catch(e){
        console.log("erreur lors de l'ajout du user !!!!! ", e)
        res.status(404).json({status : "error" , message : "Error ! we can't add the new User ! "})
    }
})

app.post("/api/Login",async(req,res)=>{

    try{
        const {email,password} = req.body

        const user = await User.findOne({email:email})

        if (user){

            const isPassValid = await bcrypt.compare(password , user.password)
            if(isPassValid){
                const token = jwt.sign({
                    name: user.firstname,
                    email: user.email
                }, "secret123")
            
                 res.json({status: "ok",message:"user found",user:token})
            }
            else{
                res.status(404).json({status:false,message:"Errorr ! User Not Found !",})}
        }else{
            res.status(404).json({status: false , message : "User Not Found ! "})

        }
        }catch(e){
                console.log("erreur lors de recherche de user ! ",e)
    }
})

//************************* MiddleWare Verification ***************************
app.get("/api/UserPage", async (req, res) => {

    const token = req.headers['x-access-token'];

    try {
        if(!token){
            return res.status(404).json({message : "Token Missing "})
        }
        const decodedInfo = jwt.verify(token, "secret123");

        const user = await User.findOne({ email: decodedInfo.email });

        if (user) {
            res.json({ 
                status: "ok", 
                userInfo:{
                    firstname:user.firstname,
                    lastname : user.lastname,
                    email : user.email
            } });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        console.log('Error verifying token:', error); // Vérification
        res.status(401).json({ status: "error", message: "Invalid token" });
    }
});

app.post("/reset-password",async(req,res)=>{

try{

    const {email} = req.body

    const user = await User.findOne({email:email})

    if(user){
        console.log("Congrat ! user Exist ")

        const token = nanoid(16)

        user.verifyToken = token
        await user.save()


        const transporter = nodemailer.createTransport({
            
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USER_MAIL,
              pass: process.env.USER_PASS
            }
          });

          await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email, 
            subject: "Réinitialisation de mot de passe ", 
            text: "Hello there , we are sending this email to make u able to reset ur password", // plain text body
            html: `<div>click here to <a href="http://localhost:5173/ResetPage/${token}">Reset ur password</a></div>`, 
          });

          res.json({
            status : "ok",
            message : "Un email de réinitialisation a été envoyé."
          })

    }else{
        res.json({
            status : "false",
            message :"User does not Exist !"
        })
    }
}catch(e){
    console.log("error lors de recuperatiion d'email ! ",e)
}

});


app.post("/api/ResetPage",async(req,res)=>{

try{
    const tok = req.body.token
    const newpass = req.body.newPassword

    const newHashedPass =  await bcrypt.hash(newpass,10)

    await User.findOneAndUpdate({verifyToken: tok},{password : newHashedPass})

    res.json({
        status : "ok",
        message: "Password updated successufully "
    })

}catch(e){
    console.log("erreur lors de changement de mot de passe ! ",e)
}

})

app.listen(3030,()=>{
    console.log("i am listening on port 3030")
})

