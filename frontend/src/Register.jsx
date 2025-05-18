import React, { useState } from 'react';
import { Container, Form, FormGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.css';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';

export default function Signup (){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault();
    const values = { name, email, password };
    try{
      const res = await axios.post('http://localhost:5000/api/v1/user/sign-up', values)
      if(res.data && res.data.success){
        toast.success('Đăng ký thành công')
        console.log('Đã gọi navigate');
        navigate('/login');
      }else {
        toast.error(res.data?.message || 'Đã xảy ra lỗi');
      }
    }catch(error){
      console.log(error)
      toast.error('Xảy ra lỗi ')
    }

  };

  return (
    <div className='signup-login'>
      <Container className='container-lg shadow border p-4 pb-0 rounded-2' style={{ width: '450px', marginTop: '20px', color: 'black' }}>
        <Form className='d-flex flex-column' onSubmit={handleSubmit}>
          <h1 className='align-self-center'>Đăng ký</h1>

          <FormGroup className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              type="name"
              placeholder='Name'
              required
            />
          </FormGroup>

          <FormGroup className='mb-2 position-relative'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
              required
            />
          </FormGroup>

          <FormGroup className='mb-3 position-relative'>
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
              {showPassword ? <EyeSlash /> : <Eye />}
            </span>
          </FormGroup>

          {errorMessage && <p className='text-danger'>{errorMessage}</p>}

          <Button className='signup-login-button align-self-center mb-2' type='submit' style={{ width: '120px', color: 'black' }}>
            Đăng ký
          </Button>
          <p className='align-self-center'>Bạn đã có tài khoản? <Link to='/login'>Login</Link></p>
        </Form>
      </Container>
    </div>
  );
}
