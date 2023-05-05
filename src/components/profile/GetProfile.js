import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import UpdateForm from "./UpdateProfile";
import GetPosts from "../posts/GetPosts";
import Follow from "./FollowUnfollow";

export default function GetProfile() {
  const [profile, setProfile] = useState([]);

  let history = useNavigate();

  const { param } = useParams();

  if (!param) {
    history("/");
  }

  const url = BASE_URL + PROFILE_PATH + "/" + param;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    async function getData() {
      const response = await fetch(
        url + "?_following=true&_followers=true",
        options
      );
      const json = await response.json();
      setProfile(json);
      console.log(json);
    }
    getData();
  }, [url]);

  return (
    <>
      <Card className="flex-row flex-wrap">
        <div className="banner-container">
          <Card.Img src={profile.banner} className="banner-image" />
        </div>

        <div className="avatar-container">
          <Card.Img src={profile.avatar} className="avatar-image" />
        </div>

        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Follow followers={profile.followers} />
        </Card.Body>
      </Card>

      <GetPosts url={url + "/posts"} />

      {param === JSON.parse(localStorage.getItem("auth")).name ? (
        <UpdateForm />
      ) : null}
    </>
  );
}
