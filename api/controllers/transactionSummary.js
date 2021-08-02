const transactionModel = require("../../models/transaction");
module.exports =
{
    getSummary:(req,res)=>{
        transactionModel.aggregate([
            { "$match": { "sender_id": req.body.userId } },
                { "$lookup": {
                        "from": "users",
                        "localField": "user",
                        "foreignField":"_id",
                        "as": "reciever"
                    }
        
        },
        { "$project": {
            "_id": 1,
            "transaction_amount": 1,
             "reciever.userName": 1,
            "reciever.email": 1
          } }
        ]).exec((err, locations) => {
            if (err) throw err;
            return res.json({"data":locations});
        })

    }

}