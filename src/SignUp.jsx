import React, { useEffect,useState } from 'react';
import { Container, Form, FormGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.css';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // Thêm import cho biểu tượng mắt

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Trạng thái hiển thị mật khẩu xác nhận
  const navigate = useNavigate();

  

  return (
    <div className='signup-login'>
      <Container className='container-lg shadow border p-4 pb-0 rounded-2' style={{ width: '450px', marginTop: '20px' ,color: 'black'}} >
        <Form className='d-flex flex-column' >
          <h1 className='align-self-center'>Đăng ký</h1>
          <FormGroup className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
              required
            />
          </FormGroup>
          <FormGroup className='mb-2 position-relative'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '52%',
                cursor: 'pointer',
                color: 'black'
              }}
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </span>
          </FormGroup>
          <FormGroup className='mb-3 position-relative'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder='Confirm Password'
              required
            />
            {/* <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '52%',
                cursor: 'pointer',
              }}
            >
              {showConfirmPassword ? <Eye /> : <EyeSlash />}
            </span> */}
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              style={{
                position: 'absolute',
                right: '10px',
                top: '52%',
                cursor: 'pointer',
                color: 'black'
              }}
            >
              {showPassword ? <Eye /> : <EyeSlash />} {/* Hiển thị Eye hoặc EyeSlash */}
            </span>
          </FormGroup>
          {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          <Button className='signup-login-button align-self-center mb-2' type='submit' style={{ width: '120px', color:'black'}}>Đăng ký</Button>
          <p className='align-self-center'>Bạn đã có tài khoản? <Link to='/login'>Login</Link></p>
        </Form>
      </Container>
    </div>
  );
}
