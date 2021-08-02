const userModel = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
module.exports =
{
    create:async(req,res,next)=>{
        // return res.json({"message":"registration successfull....."});
        // process.env.SENDGRID_API_KEY
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        var name= "sikandar";
        const msg = {
        to: 'sikandar@appinessworld.com',
        from: 'royalsikandar26@gmail.com',
        subject: 'Email Confirmation mail',
        text: 'verify your mail to login successfully on the website',
        html: `<html>
                    <head>
                        <p style="margin-left:40%;"><b>Appiness Intractive </b></p>
                        <hr style="width:100%;margin-top:-5%; color:grey"></hr>
                    </head>
                    <body>
                        <h2 style="color:black; margin-left:20%"> <b>Hi, ${name}! </b></h2>
                        <p style="margin-left:10% !important;">To complete email verification, please press the button below </p>
                            <a style="height:100px !important; width:40% !important;background-color:blue; margin-left:20%;color:white;border-radius:5% !important;color:white !important;text-decoration:none;" 
                                href="https://templates.mailchimp.com/getting-started/html-email-basics/">
                                    Click Here To Verify
                            </a></br>
                            <p style="margin-left:10%;"> If you didn't create account using this address ,Please ignore this message </p>
                    </body>
                </html>`,
        };
       var result = sgMail.send(msg,function(error){
                if(error){
                    console.log("some error");
                }
                else{
                    console.log("successfully sent");
                }
       });
    },
    authenticate:async(req,res,next)=>{
        console.log("api is being hit from client ..... ");

        return res.json({"status":"200"})
        // const {userName,password} = req.body;
        userModel.findOne({$or: [
            {userName: req.body.userName},
            {email: req.body.userName}
        ]}).exec(function(err,  userInfo){
            if(err){
                // next(err);
                return res.json({"message":"User Not Existed",status:400,response:null});

            }
            else{
                var result = bcrypt.compareSync(req.body.password, userInfo.password);
                if (result) {
                    const token = jwt.sign(
                        { id: userInfo._id },
                        req.app.get("secretKey"),
                        { expiresIn: "22h" }
                        );
                        // console.log(userInfo.userName);
                        return res.status(200).json(
                            {   "messaage":"success",
                                "token":token,
                                "status":201,
                                "userName":userInfo.userName,
                                "available_balance":userInfo.available_balance,
                                "gender":userInfo.gender,
                                "isSuccess":true
                            }
                        );
                } else {
                    return res.status(200).json(
                        {   "messaage":"login failed",
                            "token":null,
                            "status":401,
                            "response":null,
                        });
                }
            }
        });
    }
}
