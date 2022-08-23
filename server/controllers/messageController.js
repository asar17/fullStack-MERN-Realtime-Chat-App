const Messages=require("../models/messageModel.js")

//add msg
module.exports.addMessage=async(req,res,next)=>{
    try{
        const {from,to,message}=req.body;
        console.log(typeof req.body)
         const data =  await Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        // console.log("athar",{data})

       if (data) return res.json({ msg: "Message added successfully." });
         else return res.json({ msg: "Failed to add message to the database" });
      
      } 
    catch(ex){
        next(ex)
    }
}
//get msg
module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
      const realMessage = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      
      res.json(realMessage);
    } catch (ex) {
      next(ex);
    }
  };