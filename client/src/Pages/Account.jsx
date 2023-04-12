import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [episodeIDs, setEpisodeIDs] = useState([]); //To save episode ids
  const [userData, setUserData] = useState([]); //To save full episode details

  //Load user favorites when page loads
  useEffect(() => {
    getFavorites();
    console.log(userData);
  }, []);

  useEffect(() => {
    if (episodeIDs.length) getEpisodeDetails();
  }, [episodeIDs]);

  //Need function to loop through episodeIDs & get details

  const getEpisodeDetails = async () => {
    // const episodeDetails = [];
    for (let i = 0; i < episodeIDs.length; i++) {
      console.log(episodeIDs[i].favorites_id); //working
      let details = await getDetails(episodeIDs[i].favorites_id); // working
      // console.log(details);
      // episodeDetails.push(details);
      // console.log(episodeDetails); // Array of undefined items...not sure why
      setUserData((episode) => [...episode, details]);
    }
    // setUserData(episodeDetails);
    return userData;
  };

  //Where does this id come from? idk.
  const getDetails = async (id) => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    setLoading(true);
    try {
      let results = await fetch(`api/search/${id}`, options);
      // console.log(results);
      let data = await results.json();
      console.log(data); //Working
      setLoading(false);
      console.log(userData);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //Gets user favorites from users_favorites table in database, returns array episode ids
  const getFavorites = async () => {
    setLoading(true);
    let options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      let results = await fetch(`/users/account`, options);
      let data = await results.json();
      console.log(data); //Returns array of favorites (user id & episode id)
      setEpisodeIDs(data); //This seems to be working -- returns array of favorites (user id & episode id)
      // console.log(episodeIDs);

      setLoading(false);
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

        {userData ? (
          <div id="favorites" className="row mt-2 justify-content-center">
            {userData.map((episode) => (
              <div
                className="card w-25 mb-5 me-5"
                id="podcast"
                key={episode?.id}
              >
                {/* <Link to={`/episode/${episode.id}`}> */}
                <img
                  src={episode?.image}
                  className="card-img-top"
                  alt="podcast image"
                />
                <div className="card-body">
                  <h5 className="card-title">{episode?.title}</h5>
                  <p className="card-text">{episode?.podcast?.title}</p>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="col">
            <h3>You don't have any episodes in your favorites.</h3>
          </div>
        )}
        {/* 
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
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
