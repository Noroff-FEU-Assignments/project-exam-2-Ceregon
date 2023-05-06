import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, POSTS_PATH } from "../../constants/api";
import { useParams, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Your post must have a title"),
  body: yup.string(),
  media: yup.string().url("must be a URL"),
});

export default function UpdatePostForm(props) {
  const [, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const { param } = useParams();

  let history = useNavigate();

  if (!param) {
    history("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: props.post.title,
      body: props.post.body,
      media: props.post.media,
    },
  });

  async function onFormSubmit(data) {
    setSubmitting(true);
    setFormError(null);

    const url = BASE_URL + POSTS_PATH + "/" + param;

    try {
      console.log(data);

      const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

      const options = {
        method: "PUT",
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
        title: json.title,
        body: json.body,
        media: json.media,
      });

      console.log(props.post);
    } catch (error) {
      console.log("error", error);
      setFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="edit-container">
      <h2>Edit post</h2>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        {formError && <FormError>{formError}</FormError>}
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && <FormError>{errors.title.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            type="text"
            placeholder="Write something..."
            {...register("body")}
          />
          {errors.body && <FormError>{errors.body.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMedia">
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="media"
            type="text"
            placeholder="URL link to image"
            {...register("media")}
          />
          {errors.media && <FormError>{errors.media.message}</FormError>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
