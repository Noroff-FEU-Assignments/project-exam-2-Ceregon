import Heading from "../layout/Heading";
import CreatePostForm from "./CreatePostForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreatePost() {
  const auth = JSON.parse(localStorage.getItem("auth"))?.name;

  const redirect = useNavigate();

  useEffect(() => {
    if (!auth) {
      redirect("/");
    }
  }, [auth, redirect]);

  return (
    <>
      <Heading title="Create post" />
      <CreatePostForm />
    </>
  );
}
