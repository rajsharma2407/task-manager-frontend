// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  cursor: 'pointer'
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function Profile() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    avatarLink: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          navigate('/login');
          return;
        }
        const response = await fetch(`http://localhost:8080/users/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarUpload').click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:8080/users/upload-avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setForm(prevForm => ({
          ...prevForm,
          avatarLink: data.avatarLink
        }));
      } else {
        setError('Failed to upload avatar');
      }
    } catch (error) {
      setError('Failed to upload avatar');
      console.error('Error uploading avatar:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/users/${form.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setForm(data);
      } else {
        setError('Failed to update profile');
      }
    } catch (error) {
      setError('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <AvatarStyled onClick={handleAvatarClick}>
          <img src={form.avatarLink} alt="avatar" style={{ width: '100%' }} />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Form noValidate onSubmit={handleSubmit}>
          <input
            type="file"
            id="avatarUpload"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Update Profile
          </SubmitButton>
        </Form>
      </Paper>
    </Container>
  );
}
