import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, POSTS_PATH } from "../../constants/api";

const url = BASE_URL + POSTS_PATH;

const schema = yup.object().shape({
  title: yup.string().required("Your post must have a title"),
  body: yup.string(),
  media: yup.string().url("must be a URL"),
});

const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;

export default function CreatePostForm() {
  const [, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && <FormError>{errors.title.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            type="text"
            placeholder="Write something..."
            {...register("body")}
          />
          {errors.body && <FormError>{errors.body.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
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
          Submit
        </Button>
      </Form>
    </>
  );
}
