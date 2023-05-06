import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

      if (!token) {
        history("/");
      } else {
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
      }
    },
    [url, history]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  const date = new Date(item.created);

  return (
    <Card style={{ maxWidth: "540px" }}>
      <Card.Header>
        <div className="avatar-container-mini">
          <img className="avatar-image" src={item.author.avatar} alt="" />
        </div>
        <Link to={"../profiles/" + item.author.name} className="profile-name">
          {item.author.name}
        </Link>
      </Card.Header>
      <Card.Img variant="top" src={item.media} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.body}</Card.Text>

        {item.reactions.map((reaction) => (
          <div className="reactions">
            {reaction.symbol}
            {reaction.count}
          </div>
        ))}

        <Reactions post={item} setPost={setItem} />

        <div className="comment-container">
          <h4>Comments</h4>
          <Table className="comment-table">
            <tbody>
              {item.comments.map((comment) => (
                <tr>
                  <td className="comment-owner">
                    <Link
                      to={"../profiles/" + comment.owner}
                      className="profile-name"
                    >
                      {comment.owner}
                    </Link>
                  </td>
                  <td className="comment-text">{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <CommentPost post={item} setPost={setItem} />
        </div>
        {item.author.name === JSON.parse(localStorage.getItem("auth")).name ? (
          <UpdatePost post={item} setPost={setItem} />
        ) : null}
      </Card.Body>
      <Card.Footer className="text-muted">{date.toDateString()}</Card.Footer>
    </Card>
  );
}
