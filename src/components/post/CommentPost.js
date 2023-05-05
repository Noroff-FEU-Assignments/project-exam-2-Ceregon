import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { useParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

const schema = yup.object().shape({
  body: yup.string().required("You must write something to make a comment"),
});

export default function CommentPost(props) {
  const [, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const { param } = useParams();

  const url = BASE_URL + POSTS_PATH + "/" + param + "/comment";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onFormSubmit(data) {
    setSubmitting(true);
    setFormError(null);

    try {
      console.log(data);

      const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      props.setPost({
        ...props.post,
        comments: props.post.comments.concat(json),
      });

      console.log(json);
    } catch (error) {
      console.log("error", error);
      setFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        {formError && <FormError>{formError}</FormError>}
        <Form.Group className="mb-3" controlId="formBasicComment">
          <Form.Label>Comment</Form.Label>
          <InputGroup>
            <Form.Control
              name="body"
              type="text"
              placeholder="Make a comment..."
              {...register("body")}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </InputGroup>
          {errors.body && <FormError>{errors.body.message}</FormError>}
        </Form.Group>
      </Form>
    </>
  );
}
