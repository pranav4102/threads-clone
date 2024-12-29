import "./App.css";
import { Box, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userpage from "./pages/Userpage";
import Home from "./Home";
import Postpage from "./pages/Postpage";
import Authorization from "./pages/Authorization";
import Editprofile from "./pages/Editprofile";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <Router>
      <>
        <Box position={"relative"} w="full">
          <Container maxW="620px">
            <Routes>
              <Route path="/authorize" element={<Authorization />} />
              <Route path="/" element={<ProtectedRoute Component={Home}/>} />
              <Route path="/user/:id" element={<ProtectedRoute Component={Userpage}/>} />
              <Route path="/:username/post/:postid" element={<ProtectedRoute Component={Postpage}/>} />
              <Route path="/user/edit/:userid" element={<ProtectedRoute Component={Editprofile}/>} />
              <Route path="/search" element={<ProtectedRoute Component={SearchPage}/>} />
            </Routes>
          </Container>
        </Box>
      </>
    </Router>
  );
}

export default App;
