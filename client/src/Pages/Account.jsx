import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

export default function Account() {
  const [loading, setLoading] = useState(false);
  // Need function to fetch users_favorites data
  // And search API by episode ID to return details
  const [userData, setUserData] = useState([]);

  //Load user favorites when page loads
  useEffect(() => {
    getFavorites(); //Get user favorites
  }, []);

  //Uses search API by episode id in the index file to get podcast episode details
  const getDetails = async () => {
    let options = {
      body: {
        id: {},
      },
    };
    setLoading(true);
    try {
      let results = await fetch(`api/search/:id`, options);
      let data = await results.json();
    } catch (err) {
      console.log(err);
    }
  };

  const getFavorites = async () => {
    const episodeDetails = [];
    setLoading(true);
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let results = await fetch(`/users/account`, options);
      // console.log(results);
      let data = await results.json();
      console.log(data); //Returns array of favorites (user id & episode id)

      //Loop through episodes returned, get details for each one
      for (let episode in data) {
        let details = getDetails(episode);
        episodeDetails.push(details);
      }
      setUserData(episodeDetails);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="d-flex flex-column justify-content-center align-content-center m-4">
        <h2>Your Account</h2>
      </div>

      <div className="d-flex flex-column justify-content-center align-content-center align-items-left m-4">
        {/* these are things that we will eventually get from the database when the registration is working */}
        <h3 className="mx-3">Hello, user_firstName</h3>
        <div className="mx-5 mt-3">
          <p className="p-6">
            <b>username:</b> @sample
          </p>
          <p className="p-6">
            <b>email:</b> sample@gmail.com
          </p>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-content-center  m-4">
        <h3 style={{ color: "#AA4A44" }} className="align-items-center">
          Favorites
        </h3>
        <table className="table table-hover">
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
    </div>
  );
}
