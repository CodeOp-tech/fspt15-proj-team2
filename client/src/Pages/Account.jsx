import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Account() {
    const navigate = useNavigate();

    function account() {
        navigate("/navigate")
    }
    
    return(
        <>
            <Navbar></Navbar>
            <h1>this is the account page</h1>
        </>
    )
}