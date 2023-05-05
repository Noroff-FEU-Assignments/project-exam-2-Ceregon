import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { useParams, useNavigate } from "react-router-dom";

export default function Reactions(props) {
  const { param } = useParams();

  let history = useNavigate();

  if (!param) {
    history("/");
  }

  const addEmoji = (event) => {
    console.log(param);

    const symbol = event.target.dataset.emoji;

    async function reactToPost() {
      const url = BASE_URL + POSTS_PATH + "/" + param + "/react/" + symbol;

      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

        const options = {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        props.setPost({
          ...props.post,
          reactions: props.post.reactions.concat(json),
        });

        console.log(props.post);
      } catch (error) {
        console.log("error", error);
      }
    }
    reactToPost();
  };

  return (
    <DropdownButton id="dropdown-basic-button" title="React">
      <Dropdown.Item data-emoji="👍" onClick={addEmoji}>
        👍
      </Dropdown.Item>
      <Dropdown.Item data-emoji="❤" onClick={addEmoji}>
        ❤
      </Dropdown.Item>
      <Dropdown.Item data-emoji="😂" onClick={addEmoji}>
        😂
      </Dropdown.Item>
    </DropdownButton>
  );
}
