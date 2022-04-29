import React, {FC, useRef, useState} from "react";
import {useForm, Controller} from 'react-hook-form';
import {Button, Form} from "react-bootstrap";

const RegisterForm: FC = () => {

  const {
    handleSubmit,
    reset,
    getValues,
    control,
    formState: {
      errors,
      isValid,
    },
  } = useForm({
    mode: 'onBlur'
  });

  const [errorSubmit, setErrorSubmit] = useState('');
  const url = `http://localhost:8085/security/registration`;
  const onSubmit = (data: object) => {
  	let options = {
	    method: 'POST',
	    body: JSON.stringify(data),
	    headers: {
		'Content-Type': 'application/json'
	    }
	};
	fetch(url, options)
	    .then(res => res.text())
	    .then(res => {
	    	setErrorSubmit(res);
	    	console.log(res);
		});
  };

  return (
    <main className="form-signin">
      <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>Регистрация</h1>
        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicEmail">
          <Controller name='email' control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <Form.Control onChange={onChange}
                                      onBlur={onBlur}
                                      value={value} ref={ref}
                                      type="email"
                                      isInvalid={errors.email}
                                      placeholder="Введите email" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения'
                        },
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Неправильный email'
                        }
                      }}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicPassword">
          <Controller name='password' control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <Form.Control onChange={onChange}
                                      onBlur={onBlur}
                                      value={value} ref={ref}
                                      type="password"
                                      isInvalid={errors.password}
                                      placeholder="Введите пароль" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения'
                        },
                        minLength: {
                          value: 8,
                          message: "Минимальная длина пароля 8 символов"
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                          message: 'Пароль должен содержать буквы и цифры'
                        }
                      }}
          />
          <Form.Label>Пароль</Form.Label>
          <Form.Control.Feedback type="invalid">{errors?.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicConfirmPassword">
          <Controller name='confirmPassword' control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                        <Form.Control onChange={onChange}
                                      onBlur={onBlur}
                                      value={value} ref={ref}
                                      type="password"
                                      isInvalid={errors.confirmPassword}
                                      placeholder="Подтвердите пароль" />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения'
                        },
                        validate: value => value === getValues('password') || "Пароли не совпадают"
                      }}
          />
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control.Feedback type="invalid">{errors?.confirmPassword?.message}</Form.Control.Feedback>
        </Form.Group>
        <Button
          variant="primary w-100 btn-lg"
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
        <Form.Group className="mt-3 text-danger">{errorSubmit}</Form.Group>
      </Form>
    </main>
  );
};

export default RegisterForm;