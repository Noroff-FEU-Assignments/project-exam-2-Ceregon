import Heading from "../layout/Heading";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Home() {
  return (
    <>
      <Heading title="Welcome" />

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Welcome</Card.Title>
          <Card.Text>
            Register if you're new, or log in if you already have a profile.
          </Card.Text>
          <div className="welcome-buttons">
            <Button variant="primary" href="/register">
              Register
            </Button>
            <Button variant="primary" href="/login">
              Log in
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
