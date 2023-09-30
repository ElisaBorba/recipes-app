import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import styles from './Login.module.css';
import foodImg from '../images/pngwing.com.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm(email, e.target.value);
  };

  const validateForm = (emailValue: string, passwordValue: string) => {
    const isEmailValid = /\S+@\S+\.\S+/.test(emailValue);
    const isPasswordValid = passwordValue.length > 6;
    setFormIsValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/meals');
    }
  };

  return (

    <div>
      <div className={ styles.images }>
        <Icon />
        <img
          className={ styles.imageFood }
          src={ foodImg }
          alt="food"
        />
      </div>
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <h2 className={ styles.title }>LOGIN</h2>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !formIsValid }
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
}

export default Login;
