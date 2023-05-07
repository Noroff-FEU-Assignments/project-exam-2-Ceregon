import { useNavigate } from "react-router-dom";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import Button from "react-bootstrap/Button";

export default function DeletePost(props) {
  const redirect = useNavigate();

  function onClick() {
    async function deletePost() {
      const doDelete = window.confirm("Are you sure you want to delete this?");

      console.log(props);

      if (doDelete) {
        const url = BASE_URL + POSTS_PATH + "/" + props.post.id;

        const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        try {
          const response = await fetch(url, options);
          const json = await response.json();

          console.log(json);

          const path = "/profiles/" + props.post.author.name;

          redirect(path);
        } catch (error) {
          console.log(error);
        }
      }
    }
    deletePost();
  }

  return (
    <Button variant="danger" onClick={onClick} className="delete-button">
      Delete
    </Button>
  );
}
