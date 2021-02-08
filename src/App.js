import Router from "Components/Router";
import { authService } from "myFirebase";
import { useEffect, useState } from "react";
// import Footer from "Components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(authService.currentUser.uid);
  useEffect(() => {
    setCurrentUser(authService.currentUser.uid);
  }, []);
  console.log(currentUser);
  return (
    <div className="App">
      <Router />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
