import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import GetPosts from "./GetPosts";
import { BASE_URL, POSTS_PATH } from "../../constants/api";

const url = BASE_URL + POSTS_PATH;

export default function Posts() {
  return (
    <>
      <Heading title=" Recent Posts" />
      <Button variant="primary" className="create-button">
        +Create post
      </Button>
      <GetPosts url={url} />
    </>
  );
}
