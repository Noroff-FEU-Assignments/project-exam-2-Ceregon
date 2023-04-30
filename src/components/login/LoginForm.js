import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, LOGIN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + LOGIN_PATH;

const schema = yup.object().shape({
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

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { setAuth } = useContext(AuthContext);

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

      setAuth(json);

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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
