import Button from "react-bootstrap/Button";
import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Follow(props) {
  const { param } = useParams();

  const [follow, setFollow] = useState(false);
  // const [followButton, setFollowButton] = useState("+Follow");

  const followers = props.followers;
  const user = JSON.parse(localStorage.getItem("auth"))?.name;

  // let buttonStatus;

  function onClick() {
    let status;

    if (follow) {
      status = "/unfollow";
    } else {
      status = "/follow";
    }

    // if (followers.filter((e) => e.name === user).length > 0) {
    //   status = "/unfollow";
    //   // buttonStatus = "+Follow";
    // } else {
    //   status = "/follow";
    //   // buttonStatus = "-Unfollow";
    // }

    // setFollow(status);
    // setFollowButton(buttonStatus);

    // console.log(followButton);

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
        // eslint-disable-next-line no-unused-vars
        const json = await response.json();

        setFollow(!follow);
      } catch (error) {
        console.log("error", error);
      } finally {
      }
    }
    toggleFollow();
  }

  useEffect(() => {
    if (followers?.filter((e) => e.name === user).length > 0) {
      setFollow(true);
    }
  }, [followers, user]);

  return <Button onClick={onClick}>{follow ? "-Unfollow" : "+Follow"}</Button>;
}
