const userModel = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports =
{
    Users:async(req,res,next)=>{
        return res.json({"status":"200","message":"success","data":[
            {"name":"raj","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"amit","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"ranjeet","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"sanjeev","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"ram","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"aman","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
            {"name":"suman","surname":"kumar","profile":"https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80","technology":"react js","likes":100,"rating":1.3},
        ]});
    },
    Verify:async(req,res,next) => {
        var name = req.query.name;
        var pass= req.query.pass;
        res.render("success.ejs", { name: name},{pass:pass});
    }
}

