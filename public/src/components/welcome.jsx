import styled from 'styled-components'
import robot from '../assets/robot.gif'
function Welcome({currentUser}){
    return(
        <>
        <Container>
            <img src={robot} alt="robot"/>
            <h1>
                Welcome <span>{currentUser?currentUser.username:"No Users"}!</span>
            </h1>
            <h3>PLease Select A Chat To Start Messages</h3>
        </Container>
        </>
    )
    //  margin-top:0px;
    //     gap:1rem;
    //     span{
    //         font-size:20px;
    //     }
    //     h3{
    //         display:flex;
    //         align-items:center;
    //         justify-content:center;
    //         margin-left:30px;
    //     }

}
const Container=styled.div`
@media screen and  (max-width:715px) {
       display:none;
     }
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:white;
img{
    height:20rem;
}
span{
    color:#4e00ff
}
`
export default Welcome