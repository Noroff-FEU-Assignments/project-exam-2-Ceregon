import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import Card from "react-bootstrap/Card";
import UpdatePost from "../updatePost/UpdatePost";
import Table from "react-bootstrap/Table";
import CommentPost from "./CommentPost";
import Reactions from "./Reactions";

export default function GetPost() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();

  const { param } = useParams();

  if (!param) {
    history("/");
  }

  const url =
    BASE_URL +
    POSTS_PATH +
    "/" +
    param +
    "?_author=true&_comments=true&_reactions=true";

  useEffect(
    function () {
      const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

      const options = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      async function fetchData() {
        try {
          const response = await fetch(url, options);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setItem(json);
          } else {
            setError("An error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  const date = new Date(item.created);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{item.author.name}</Card.Header>
      <Card.Img variant="top" src={item.media} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.body}</Card.Text>

        {item.reactions.map((reaction) => (
          <div>
            {reaction.symbol}
            {reaction.count}
          </div>
        ))}

        <Reactions />

        <div>Comments</div>
        <Table striped bordered hover>
          <tbody>
            {item.comments.map((comment) => (
              <tr>
                <td>{comment.owner}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CommentPost />

        {item.author.name === JSON.parse(localStorage.getItem("auth")).name ? (
          <UpdatePost post={item} setPost={setItem} />
        ) : null}
      </Card.Body>
      <Card.Footer className="text-muted">{date.toDateString()}</Card.Footer>
    </Card>
  );
}
