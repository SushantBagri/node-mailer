
const nodemailer=require('nodemailer');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const port=process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine","ejs");


app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/send_succesfully',(res,req)=>{
    res.render('success')
})

app.post('/',(req,res)=>{
    let data=req.body;
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:data.useremail,
            pass:data.userpass
        }
    });
    
    let message={
        from:data.useremail,
        to:data.reciever,
        cc:data.cc || "",
        bcc:data.bcc || "",
        subject:data.subject,
        text:data.textarea
    };
    
    transporter.sendMail(message)
        .then(()=>{
            console.log('email is sent')
            res.render('success',{data:"Successfully send!!!"})
        })
        .catch(err=>{
            console.log(err)
            res.render('success',{data:"You enter something wrong!!"})
        })
})

app.listen(port,()=>{
    console.log(`app is listening at ${port} port`)
})