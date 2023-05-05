import Button from "react-bootstrap/Button";
import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Follow(props) {
  const { param } = useParams();

  const [, setFollow] = useState("/follow");
  const [followButton, setFollowButton] = useState("+Follow");

  const followers = props.followers;
  const user = JSON.parse(localStorage.getItem("auth"))?.name;

  console.log(props.followers);

  let buttonStatus;

  function onClick() {
    let status;

    if (followers.filter((e) => e.name === user).length > 0) {
      status = "/unfollow";
      buttonStatus = "+Follow";
    } else {
      status = "/follow";
      buttonStatus = "-Unfollow";
    }

    setFollow(status);
    setFollowButton(buttonStatus);

    console.log(followButton);

    async function toggleFollow() {
      const url = BASE_URL + PROFILE_PATH + "/" + param + status;
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
      } catch (error) {
        console.log("error", error);
      } finally {
      }
    }
    toggleFollow();
  }

  return (
    <>
      <Button onClick={onClick}>{followButton}</Button>
    </>
  );
}
