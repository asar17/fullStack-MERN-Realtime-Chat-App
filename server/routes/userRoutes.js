const {register,login,setAvatar,getAllUsers}=require("../controllers/userController.js")


//register route
const router=require("express").Router()
router.post("/register",register)
router.post("/login",login)
router.post("/setavatar/:id",setAvatar)
router.get("/getallusers/:id",getAllUsers)
module.exports=router