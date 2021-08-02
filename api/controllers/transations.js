const userModel = require("../../models/users");
const transactionModel = require("../../models/transaction");
const { sendMail } = require("../../mail/transactionMail");
module.exports = {
  transfer:async(req,res,next)=>{
    const { amount,  sender_id, reciever_id,transation_time } = req.body;
    await userModel.find({_id:req.body.userId},
        async function (err, users) {
                if (err) return next(err);
                    let  available_balance = users[0].available_balance;
                    let  transation_counter = users[0].transation_counter+1;
                    let  deducted_balance = (available_balance-amount);
                    var transaction = { sender_id: req.body.userId, reciever_id: reciever_id,transaction_id:transation_counter, transaction_amount:amount}; 
                   if(available_balance<=amount){
                        return res.json(
                                {   "message":"you don't have sufficient balance",
                                    "balance":"your current balance is:- "+available_balance+"rs"
                                }
                            );
                   }
                   else{
                        await  userModel.update({_id: req.body.userId}, { 
                            available_balance: deducted_balance
                        }, async function(err, affected, resp) {
                            if(!err){
                                userModel.update({_id: reciever_id}, 
                                    {$inc : {'available_balance' : amount}},
                                   async function(err,affected,resp){
                                       if(!err){
                                            const transaction = new transactionModel({
                                                sender_id:req.body.userId,
                                                transaction_amount:amount,
                                                user:reciever_id
                                            })
                                            if (!(await transaction.save())) {
                                                return res.json({"message":"transaction unsuccessfull"});
                                              }
                                              return res.json({"message":"transaction is successfull"});
                                       }
                                    })
                            }
                        })
                   }
        });
                 
    }
}
