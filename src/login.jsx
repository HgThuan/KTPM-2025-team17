import React, { useState } from "react";
import { Container, Form, FormGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-login">
      <Container
        className="container-lg shadow border border-dark p-4 pb-0 rounded-2"
        style={{ width: "450px", marginTop: "30px", color: "black" }}
      >
        <Form className="d-flex flex-column" >
          <h1 className="align-self-center">Đăng nhập</h1>
          <FormGroup className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-3 position-relative">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"} // Hiển thị mật khẩu hoặc ẩn
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái hiển thị mật khẩu
              style={{
                position: "absolute",
                right: "10px",
                top: "52%",
                cursor: "pointer",
                color: "black",
              }}
            >
              {showPassword ? <Eye /> : <EyeSlash />}{" "}
              {/* Hiển thị Eye hoặc EyeSlash */}
            </span>
          </FormGroup>
          {errorMessage.length > 0 && (
            <p className="text-danger">{errorMessage}</p>
          )}
          <Button
            className="signup-login-button align-self-center mb-2"
            type="submit"
            style={{ width: "150px", color: "blue" }}
          >
            Đăng nhập
          </Button>
          <p className="align-self-center">
            Bạn chưa có tài khoản <Link to="/sign-up">Đăng ký </Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}
 