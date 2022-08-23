import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {getAllUsers} from '../../utils/APIRoutes.js'

//declare state
const initialState={
    loading:false,
    users:[],
    error:''
}
//get contact info from api
export const fetchUsers=createAsyncThunk('user/fetchUsers',()=>{
    try{
        const navigate=useNavigate()
        const currentUser=JSON.parse(localStorage.getItem("chat-app-user"))
        console.log("jj",currentUser)
        if(currentUser){
            if(currentUser.isSetAvatarImage){
               return axios
                 .get(`${getAllUsers}/${currentUser._id}`)
                 .then((response)=>response.data)
            }   
            else{
            navigate("/setAvatar")
                }
        }

    }
    catch(error){
        return error

    }
})

//declare reducer
const userSlice=createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload
            state.error=''
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false
            state.users='hello'
            state.error=action.error.message
        })
    }
})

export default userSlice.reducer