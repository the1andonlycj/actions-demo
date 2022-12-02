import React, { useState, useEffect } from "react";
import "./signup.css";
import { Form, Input, Button, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../../common/constants";

const FormItem = Form.Item;

const validateName = (name) => {
  if (!name) {
    return {
      validateStatus: "warning",
      errorMsg: `Please input your name`,
    };
  }
  if (name.length < NAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters)`,
    };
  }

  if (name.length > NAME_MAX_LENGTH) {
    return {
      validationStatus: "error",
      errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters)`,
    };
  }

  return {
    validateStatus: "success",
    errorMsg: null,
  };
};

const validateEmail = (email) => {
  if (!email) {
    return {
      validationStatus: "warning",
      errorMsg: "Please input your email",
    };
  }
  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      validationStatus: "error",
      errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters)`,
    };
  }

  const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
  if (!EMAIL_REGEX.test(email)) {
    return {
      validateStatus: "error",
      errorMsg: "Email not valid",
    };
  }

  return {
    validateStatus: "success",
    errorMsg: null,
  };
};

const validateUsername = (username) => {
  if (!username) {
    return {
      validateStatus: "warning",
      errorMsg: "Please input a username",
    };
  }
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters)`,
    };
  }

  if (username.length > USERNAME_MAX_LENGTH) {
    return {
      validationStatus: "error",
      errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters)`,
    };
  }
  return {
    validateStatus: "success",
    errorMsg: null,
  };
};

const validatePassword = (password) => {
  if (!password) {
    return {
      validateStatus: "warning",
      errorMsg: `Please input a poassword`,
    };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
    };
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      validationStatus: "error",
      errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
};

const Signup = ({ currentUser, isAuthenticated }) => {
  let navigate = useNavigate();

  const [name, setName] = useState({ value: "" });
  const [username, setUsername] = useState({ value: "" });
  const [email, setEmail] = useState({ value: "" });
  const [password, setPassword] = useState({ value: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const onFinish = () => {
    const signupRequest = {
      name: name.value,
      email: email.value,
      username: username.value,
      password: password.value,
    };
    console.log(signupRequest);
    // Code to link with signup api
  };

  const handleInputChange = (event, validationFun) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    if (inputName === "name") {
      setName({
        value: inputValue,
        ...validationFun(inputValue),
      });
    } else if (inputName === "username") {
      setUsername({
        value: inputValue,
        ...validationFun(inputValue),
      });
    } else if (inputName === "email") {
      setEmail({
        value: inputValue,
        ...validationFun(inputValue),
      });
    } else if (inputName === "password") {
      setPassword({
        value: inputValue,
        ...validationFun(inputValue),
      });
    }
  };

  const isFormInvalid = () => {
    return !(
      name.validateStatus === "success" &&
      username.validateStatus === "success" &&
      email.validateStatus === "success" &&
      password.validateStatus === "success"
    );
  };

  return (
    <React.Fragment>
      <div className="signup-container">
        <Row type="flex" justify="center">
          <Col pan={24}>
            <div className="logo-container">
              <span>Feed App - Signup</span>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col pan={24}>
            <Form onFinish={onFinish} className="signup-form">
              <FormItem
                validateStatus={name.validateStatus}
                help={name.errorMsg}
                hasFeedback
                name="name"
              >
                <Input
                  size="large"
                  name="name"
                  placeholder="Name"
                  value={name.value}
                  onChange={(event) => handleInputChange(event, validateName)}
                />
              </FormItem>
              <FormItem
                validateStatus={email.validateStatus}
                help={email.errorMsg}
                hasFeedback
                name="email"
              >
                <Input
                  size="large"
                  name="email"
                  placeholder="Email"
                  value={email.value}
                  onChange={(event) => handleInputChange(event, validateEmail)}
                />
              </FormItem>
              <FormItem
                validateStatus={username.validateStatus}
                help={username.errorMsg}
                hasFeedback
                name="username"
              >
                <Input
                  size="large"
                  name="username"
                  placeholder="Username"
                  value={username.value}
                  onChange={(event) =>
                    handleInputChange(event, validateUsername)
                  }
                />
              </FormItem>
              <FormItem
                validateStatus={password.validateStatus}
                help={password.errorMsg}
                hasFeedback
                name="password"
              >
                <Input
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password.value}
                  onChange={(event) =>
                    handleInputChange(event, validatePassword)
                  }
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="signup-form-button"
                  disabled={isFormInvalid()}
                >
                  Signup
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="login-link-container">
        Have an account? <Link to="/login">Login</Link>
      </div>
    </React.Fragment>
  );
};

export default Signup;
