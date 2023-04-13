import SearchResultsPage from "./Pages/SearchResultsPage";
// import PodcastDetailsPage from "./Pages/PodcastDetailsPage"; //We don't need this in this iteration of the project.
import EpisodeDetailsPage from "./Pages/EpisodeDetailsPage";
import SearchContextProvider from "./SearchContext";
import Player from "./Components/Player";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Account from "./Pages/Account";
import UserContext from "./UserContext";
import useProvideAuth from "./hooks/useProvideAuth";

function App() {
  const [url, setUrl] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const auth = useProvideAuth();

  return (
    <UserContext.Provider value={auth}>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results" element={<SearchResultsPage />} />
          {/* <Route path="/podcast/:id" element={<PodcastDetailsPage />} /> */}
          <Route
            path="/episode/:id"
            element={
              <EpisodeDetailsPage
                setUrl={setUrl}
                setShowPlayer={setShowPlayer}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        {showPlayer && <Player url={url} />}
      </SearchContextProvider>
    </UserContext.Provider>
  );
}

export default App;
