import { useNavigate } from "react-router-dom"
import Close from "../assets/close.png"
export default function Closes(){
    const navigate=useNavigate()
    return(
        <div className="closebar">
        <img src={Close} alt="Close" onClick={()=>navigate('/Profile')} />
      </div>
    )
}