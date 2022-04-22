import React, { Component } from 'react';

class RegistrationForm extends Component {

  render() {
    return (
        <main className="form-signin">
          <form>
              <h1 className="h3 mb-3 fw-normal">Регистрация</h1>
              <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" required/>
                  <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" required/>
                  <label htmlFor="floatingPassword">Пароль</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Зарегистрироваться</button>
          </form>
        </main>
    );
  }
}

export default RegistrationForm;
