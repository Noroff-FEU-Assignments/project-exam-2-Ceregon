import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const url = BASE_URL + PROFILE_PATH;

const token = JSON.parse(localStorage.getItem("auth")).accessToken;

export default function GetProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log(options);

    async function getData() {
      const response = await fetch(url, options);
      const json = await response.json();
      setProfiles(json);
      console.log(json);
    }
    getData();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {profiles.map((profile) => (
          <>
            <Col>
              <Card className="flex-row flex-wrap">
                <div className="avatar-container">
                  <Card.Img src={profile.avatar} className="avatar-image" />
                </div>

                <Card.Body>
                  <Card.Title>{profile.name}</Card.Title>

                  <Button variant="primary" href={`profiles/${profile.name}`}>
                    View profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </Container>
  );
}
