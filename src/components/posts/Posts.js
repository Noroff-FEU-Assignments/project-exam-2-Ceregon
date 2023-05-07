import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import GetPosts from "./GetPosts";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const url = BASE_URL + POSTS_PATH;

export default function Posts() {
  const auth = JSON.parse(localStorage.getItem("auth"))?.name;

  const redirect = useNavigate();

  useEffect(() => {
    if (!auth) {
      redirect("/");
    }
  }, [auth, redirect]);

  return (
    <>
      <Heading title=" Recent Posts" />
      <Button href="/create-post" variant="primary" className="create-button">
        +Create post
      </Button>
      <GetPosts url={url} />
    </>
  );
}
