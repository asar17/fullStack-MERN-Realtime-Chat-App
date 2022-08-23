const {addMessage,getAllMessage}=require("../controllers/messageController.js")

const router=require("express").Router();
router.post("/addmsg/",addMessage)
router.post("/getallmsg/",getAllMessage)
module.exports=router