import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Posts from "./components/posts/Posts";
import Profiles from "./components/profiles/Profiles";
import Post from "./components/post/Post";
import Profile from "./components/profile/Profile";
import CreatePost from "./components/createPost/CreatePost";
import Navigation from "./components/layout/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/posts/:param" element={<Post />} />
            <Route path="/profiles/:param" element={<Profile />} />
            <Route path="/profiles/posts/:param" element={<Post />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
