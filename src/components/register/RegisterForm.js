import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, REGISTER_PATH } from "../../constants/api";

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
});

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
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
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();

      console.log(json);
      // console.log("response", response.data);
      // setAuth(response.data);
      // history("/admin");
    } catch (error) {
      console.log("error", error);
      setFormError(error.toString());
    } finally {
      setSubmitting(false);
    }

    // console.log(data);
  }

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // function onTextInputChange(event) {
  //   const value = event.target.value;
  //   if (event.target.name === 'username') {
  //     setUsername(value);
  //   }
  //   if (event.target.name === 'email') {
  //     setEmail(value);
  //   }
  //   if (event.target.name === 'password') {
  //     setPassword(value);
  //   }
  // }

  // function onFormSubmit(event) {
  //   event.preventDefault();
  //   const body = {
  //     username,
  //     email,
  //     password,
  //   };

  //   console.log(body);
  // }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        {formError && <FormError>{formError}</FormError>}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Username"
            {...register("name")}
          />
          {errors.username && <FormError>{errors.username.message}</FormError>}
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
          <Form.Text className="text-muted">
            You must have a @stud.noroff.no email to register.
          </Form.Text>
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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a profile picture</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a banner picture</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
