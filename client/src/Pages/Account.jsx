// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Account() {

    return(
        <>
            <Navbar></Navbar>
            <div className="d-flex flex-column justify-content-center align-content-center m-4">
                <h2 style={{color: "#AA4A44"}}>Account Details</h2>
                
                
            </div>

            <div className="d-flex flex-column justify-content-center align-content-center align-items-left m-4">
                {/* these are things that we will eventually get from the database when the registration is working */}
                <h3 className="mx-3">Hello, <span style={{color: "#AA4A44"}}>user_firstName</span></h3>
                <div className="mx-5 mt-3">
                    <p className="p-6"><b>username:</b> @sample</p>
                    <p className="p-6"><b>email:</b> sample@gmail.com</p>
                </div>
                
            </div>


            <div className="d-flex flex-column justify-content-center align-content-center  m-4">
                <h3 style={{color: "#AA4A44"}} className="align-items-center">Favorites</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Episode</th>
                        <th scope="col">Podcast</th>
                        <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Title of Episode</td>
                        <td>Name of Podcast</td>
                        <td>More info link</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Title of Episode</td>
                        <td>Name of Podcast</td>
                        <td>More info link</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Title of Episode</td>
                        <td>Name of Podcast</td>
                        <td>More info link</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </>
    )
}