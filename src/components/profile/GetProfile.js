import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

    console.log(options);

    async function getData() {
      const response = await fetch(url, options);
      const json = await response.json();
      setProfile(json);
      console.log(json);
    }
    getData();
  }, [url]);

  return (
    <Card className="flex-row flex-wrap">
      <div className="avatar-container">
        <Card.Img src={profile.avatar} className="avatar-image" />
      </div>

      <Card.Body>
        <Card.Title>{profile.name}</Card.Title>

        <Button variant="primary">View profile</Button>
      </Card.Body>
    </Card>
  );
}
