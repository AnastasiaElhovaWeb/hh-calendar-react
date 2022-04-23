import React, {FC} from "react";
import {Controller, useForm} from 'react-hook-form';
import {Button, Form} from "react-bootstrap";

const LoginForm: FC = () => {
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
    console.log(data)
  }

  return (
    <main className="form-signin">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Вход</h1>
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
          <Form.Text className="text-danger">{errors?.email?.message}</Form.Text>
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
                        }
                      }}
          />
          <Form.Text className="text-danger">
            {errors?.password && (errors?.password?.message || 'Ошибка')}
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
        >
          Войти
        </Button>
      </Form>
    </main>
  );
};

export default LoginForm;