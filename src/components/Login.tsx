import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          placeholder="Digite seu e-mail"
          value={ email }
          onChange={ handleEmailChange }
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          value={ password }
          onChange={ handlePasswordChange }
        />

        <button type="submit" data-testid="login-submit-btn" disabled={ !formIsValid }>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
