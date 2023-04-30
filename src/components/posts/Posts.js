import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import GetPosts from "./GetPosts";

export default function Posts() {
  return (
    <>
      <Heading title="Posts" />
      <Button variant="primary">Create post</Button>
      <GetPosts />
    </>
  );
}
