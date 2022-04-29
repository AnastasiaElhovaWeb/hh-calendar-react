import React, {FC, useState} from "react";
import {Controller, useForm} from 'react-hook-form';
import {Button, Form} from "react-bootstrap";

const CreateMeetingForm: FC = () => {
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

  const [errorSubmit, setErrorSubmit] = useState('');
  const url = `http://localhost:8085/security/create`;
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Новая встреча</h1>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicGuestName">
          <Controller name='guestName' control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                          <Form.Control onChange={onChange}
                                        onBlur={onBlur}
                                        value={value} ref={ref}
                                        type="text"
                                        isInvalid={errors.guestName}
                                        placeholder="Введите имя гостя"/>
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: 'Поле обязательно для заполнения'
                        }
                      }}
          />
          <Form.Label>Имя гостя</Form.Label>
          <Form.Text className="text-danger">
            {errors?.guestName?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicEmail">
          <Controller name='email' control={control}
                      render={({field: {onChange, onBlur, value, ref}}) => (
                          <Form.Control onChange={onChange}
                                        onBlur={onBlur}
                                        value={value} ref={ref}
                                        type="email"
                                        isInvalid={errors.email}
                                        placeholder="Введите email"/>
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
          <Form.Text className="text-danger">{errors?.email?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicSelectTime">
          <Form.Select name="selectTime">
            <option value="15">15 минут</option>
            <option value="30">30 минут</option>
            <option value="45">45 минут</option>
            <option value="60">60 минут</option>
          </Form.Select>
          <Form.Label>Длительность</Form.Label>
          <Form.Text className="text-danger"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-start form-floating" controlId="formBasicSelectTimezone">
          <Form.Select name="selectTimezone">
            <option value="moskva">Москва, GMT+3</option>
            <option value="samara">Самара, GMT+4</option>
            <option value="chukotka">Чукотка, GMT+12</option>
          </Form.Select>
          <Form.Label>Часовой пояс</Form.Label>
          <Form.Text className="text-danger"></Form.Text>
        </Form.Group>

        <Button
            variant="primary w-100 btn-lg mb-3"
            type="submit"
            disabled={!isValid}
        >
          Создать
        </Button>

        <Button
            variant="secondary w-100 btn-lg"
            type="reset"
        >
          Отменить
        </Button>
        <Form.Group className="mt-3 text-danger">{errorSubmit}</Form.Group>
      </Form>
    </main>
  );
};

export default CreateMeetingForm;