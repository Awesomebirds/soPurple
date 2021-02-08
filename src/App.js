import Router from "Components/Router";
import { authService } from "myFirebase";
import { useEffect, useState } from "react";
// import Footer from "Components/Footer";

function App() {
  const [init, setInit] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
      setInit(true);
    });
  }, []);

  return (
    init && (
      <div className="App">
        <Router uid={uid} />
        {/* <Footer /> */}
      </div>
    )
  );
}

export default App;
