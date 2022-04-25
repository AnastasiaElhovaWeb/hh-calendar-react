import React, {FC} from "react";
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
      isValid
    },
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (data: object) => {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:8085/registration";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(this.responseText);
      }
    };
    let dataJson = JSON.stringify(data);
    xhr.send(dataJson);
  };

  return (
    <main className="form-signin">
      <Form className="w-100" onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>Регистрация</h1>
        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
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
          <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
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
          <Form.Control.Feedback type="invalid">{errors?.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicConfirmPassword">
          <Form.Label>Подтвердите пароль</Form.Label>
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
          <Form.Control.Feedback type="invalid">{errors?.confirmPassword?.message}</Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </Form>
    </main>
  );
};

export default RegisterForm;