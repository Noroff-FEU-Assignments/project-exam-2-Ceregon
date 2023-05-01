import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { BASE_URL, PROFILE_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const name = JSON.parse(localStorage.getItem("auth")).name;

const url = BASE_URL + PROFILE_PATH + "/" + name + "/media";

const schema = yup.object().shape({
  avatar: yup.string().url("You must use the URL of an image file"),

  banner: yup.string().url("You must use the URL of an image file"),
});

export default function UpdateForm() {
  const [, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: JSON.parse(localStorage.getItem("auth")).avatar,
      banner: JSON.parse(localStorage.getItem("auth")).banner,
    },
  });

  const { setAuth } = useContext(AuthContext);

  async function onFormSubmit(data) {
    setSubmitting(true);
    setFormError(null);

    try {
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

      json.accessToken = token;

      setAuth(json);
    } catch (error) {
      console.log("error", error);
      setFormError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h2>Update your profile</h2>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        {formError && <FormError>{formError}</FormError>}
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
          Update
        </Button>
      </Form>
    </>
  );
}
