import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import UserContext from "../UserContext";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [episodeIDs, setEpisodeIDs] = useState([]); //To save episode ids
  const [userData, setUserData] = useState([]); //To save full episode details

  const auth = useContext(UserContext);

  //Load user favorites when page loads
  useEffect(() => {
    getFavorites();
    console.log(userData);
    console.log(auth.currentUser);
  }, []);

  useEffect(() => {
    if (episodeIDs.length) getEpisodeDetails();
  }, [episodeIDs]);

  //Need function to loop through episodeIDs & get details

  const getEpisodeDetails = async () => {
    for (let i = 0; i < episodeIDs.length; i++) {
      console.log(episodeIDs[i].favorites_id); //working
      let details = await getDetails(episodeIDs[i].favorites_id);
      setUserData((episode) => [...episode, details]);
    }
    return userData;
  };

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
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="d-flex flex-column justify-content-center align-content-center m-4">
        <h2 style={{ color: "#AA4A44" }}>Your Details</h2>
      </div>

      <div className="d-flex flex-column justify-content-center align-content-center align-items-left m-4">
        <h3 className="mx-3">
          Hello,{" "}
          <span style={{ color: "#AA4A44" }}>{auth.currentUser.firstName}</span>
        </h3>
        <div className="mx-5 mt-3">
          <p className="p-6">
            <b>username: </b>@{auth.currentUser.username}
          </p>
          <p className="p-6">
            <b>email:</b> {auth.currentUser.email}
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
      </div>
    </div>
  );
}
