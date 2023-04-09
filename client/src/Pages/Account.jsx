// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Account() {

    return(
        <>
            <Navbar></Navbar>
            <div className="d-flex flex-column justify-content-center align-content-center align-items-center m-4">
                <h2>Account Details</h2>
                
                
            </div>

            <div className="d-flex flex-column justify-content-center align-content-center align-items-left m-4">
                <h3>Hello, user </h3>
                <p>Account name:</p>
                <p>Email:</p>
            </div>


            <div className="d-flex flex-column justify-content-center align-content-center align-items-center m-4">
                <h3>Favorites</h3>
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