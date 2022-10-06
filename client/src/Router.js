import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import ChatRoom from "./pages/ChatRoom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/room/:chat/:name" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
