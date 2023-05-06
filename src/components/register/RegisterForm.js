import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, REGISTER_PATH } from "../../constants/api";
import { useNavigate } from "react-router-dom";

const url = BASE_URL + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your username")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "You can include underscores (_) in your name but no other special characters, symbols or spaces"
    ),
  email: yup
    .string()
    .required("Please enter your email")
    .matches(
      /@stud.noroff.no+$/,
      "You must have an email address ending in @stud.noroff.no"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters"),

  avatar: yup.string().url("You must use the URL of an image file"),

  banner: yup.string().url("You must use the URL of an image file"),
});

export default function RegisterForm() {
  const [, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onFormSubmit(data) {
    setSubmitting(true);
    setFormError(false);
    setErrorMessage("");

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      console.log(json);

      if (!json.name) {
        setFormError(true);
        setErrorMessage(json.errors[0].message);
      } else {
        redirect("/login");
      }
    } catch (error) {
      console.log("error", error);
      setFormError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        {formError && <FormError>{formError}</FormError>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Username"
            {...register("name")}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Profile picture (Optional)</Form.Label>
          <Form.Control
            name="avatar"
            type="text"
            placeholder="Copy and paste in the URL of an image"
            {...register("avatar")}
          />
          {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBanner">
          <Form.Label>Banner picture (Optional)</Form.Label>
          <Form.Control
            name="banner"
            type="text"
            placeholder="Copy and paste in the URL of an image"
            {...register("banner")}
          />
          {errors.banner && <FormError>{errors.banner.message}</FormError>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        {formError ? (
          <div className="form-error">Error: {errorMessage} </div>
        ) : null}
      </Form>
    </>
  );
}
