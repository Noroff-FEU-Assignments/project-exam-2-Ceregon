import { BASE_URL, POSTS_PATH } from "../../constants/api";

export default async function deletePost(props) {
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
    } catch (error) {
      console.log(error);
    }
  }
}
