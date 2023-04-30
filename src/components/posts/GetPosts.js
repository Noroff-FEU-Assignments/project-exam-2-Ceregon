import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const url = BASE_URL + POSTS_PATH;

const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

export default function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    async function getData() {
      const response = await fetch(url, options);
      const json = await response.json();
      setPosts(json);
      console.log(json);
    }
    getData();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {posts.map((post) => (
          <>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={post.media}
                  className="posts-image"
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.body}</Card.Text>
                  <Button variant="primary" href={`posts/${post.id}`}>
                    View post
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
