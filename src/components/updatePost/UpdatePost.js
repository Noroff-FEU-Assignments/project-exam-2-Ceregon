import Button from "react-bootstrap/Button";
import UpdatePostForm from "./UpdatePostForm";
import { useState } from "react";
import DeletePost from "./DeletePost";

export default function UpdatePost(props) {
  const [render, setRender] = useState(false);
  function onClick() {
    setRender((prevRender) => !prevRender);
  }

  return (
    <>
      <Button onClick={onClick}>Edit</Button>
      <DeletePost post={props.post} />

      {render ? (
        <UpdatePostForm post={props.post} setPost={props.setPost} />
      ) : null}
    </>
  );
}
