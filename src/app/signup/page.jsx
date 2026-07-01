'use client';
import { Eye, EyeSlash } from '@gravity-ui/icons';
// import {Button, InputGroup, Label, TextField} from "@heroui/react";
import { useState } from 'react';

import { Card, InputGroup, ListBox } from '@heroui/react';
import React from 'react';
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
} from '@heroui/react';
import { toast, ToastContainer } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const signUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    const { data, error } = await authClient.signUp.email({
      ...user,
      plan: 'free',

      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,

      callbackURL: '/login',
    });
    console.log({ data, error });

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      toast.success('Signup successful!');
      window.location.href = '/login';
    }
  };
  const handleGoogleSignin = async () => {
    const data = await authClient.signIn.social({
      provider: 'google',
    });
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="text-2xl text-center font-bold  mb-4">Create Account</h1>
      <Card className="border rounded-none">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your Name" />
            <FieldError />
          </TextField>

          <TextField name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="Image url" />
            <FieldError />
          </TextField>

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

          <TextField className="w-full " name="password">
            <Label>Confirm Password</Label>

            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isVisible ? 'text' : 'password'}
                // value={isVisible ? "87$2h.3diua" : "••••••••"}
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          <Select isRequired name="role" className="w-full" placeholder="Select one">
            <Label>SignUp As Role</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="client" textValue="client">
                  Client
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="lawyer" textValue="lawyer">
                  Lawyer
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
          <div className="flex justify-center  gap-2">
            <Link href={'/login'}>
              <Button className={'w-full'} type="submit">
                Create Account
              </Button>
            </Link>
          </div>
        </Form>
        <div className="text-center">Or Sign Up Google</div>
        <div>
          <Button onClick={handleGoogleSignin} className={'w-full'}>
            <FcGoogle />
            Sign In With Google
          </Button>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default signUpPage;
