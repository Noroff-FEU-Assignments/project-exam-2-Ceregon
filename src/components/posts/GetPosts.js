import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function GetPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    async function getData() {
      const url = props.url + "?_author=true";
      const response = await fetch(url, options);
      const json = await response.json();
      setPosts(json);
      console.log(json);
    }
    getData();
  }, [props.url]);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {posts.map((post) => (
          <>
            <Col>
              <Card>
                <Card.Header>
                  <div className="avatar-container-mini">
                    <img
                      className="avatar-image"
                      src={post.author.avatar}
                      alt=""
                    />
                  </div>
                  <Link
                    to={"../profiles/" + post.author.name}
                    className="profile-name"
                  >
                    {post.author.name}
                  </Link>
                </Card.Header>
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
