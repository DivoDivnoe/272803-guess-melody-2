import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationScreen = (props) => {
  const {name, password, onChangeName, onChangePassword, onSubmit} = props;

  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
      <form className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" value={name} onChange={onChangeName} />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password" value={password} onChange={onChangePassword} />
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit" onSubmit={(evt) => {
          evt.preventDefault();
          onSubmit();
        }}>Войти</button>
      </form>
      <button className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
};

AuthorizationScreen.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AuthorizationScreen;
