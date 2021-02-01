import { BrowserRouter as Router } from "react-router-dom";
import Header from "Routes/Header";

const myRouter = () => {
  return (
    <Router>
      <Header />
    </Router>
  );
};

export default myRouter;
