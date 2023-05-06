import Button from "react-bootstrap/Button";
import UpdatePostForm from "./UpdatePostForm";
import { useState } from "react";
import deletePost from "./DeletePost";

export default function UpdatePost(props) {
  const [render, setRender] = useState(false);
  function onClick() {
    setRender((prevRender) => !prevRender);
  }

  function onDelete() {
    deletePost(props);
  }

  return (
    <>
      <Button onClick={onClick}>Edit</Button>
      <Button variant="danger" onClick={onDelete} className="delete-button">
        Delete
      </Button>
      {render ? (
        <UpdatePostForm post={props.post} setPost={props.setPost} />
      ) : null}
    </>
  );
}
