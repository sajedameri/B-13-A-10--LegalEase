'use client';

import { Card } from '@heroui/react';
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { toast, ToastContainer } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const loginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,

      callbackURL: '/login',
    });
    console.log({ data, error });

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success('Login successful!');
      window.location.href = '/';
    }
  };
  const handleGoogleSignin = async () => {
    const data = await authClient.signIn.social({
      provider: 'google',
    });
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-2xl font-bold text-center  mb-4">Login</h1>
      <Card className="border rounded-none">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>
          <div className="flex justify-center  gap-2">
            <Button type="submit" className={'w-full'}>
              Login
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <Link href={'/signup'}>
            <Button className={'w-full'}>Register Link</Button>
          </Link>
          Or Sign Up With Google
        </div>
        <div>
          <Button onClick={handleGoogleSignin} className={'w-full'}>
            <FcGoogle />
            Sign IN With Google
          </Button>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default loginPage;
