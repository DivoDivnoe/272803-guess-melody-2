import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const {name, password, onSubmit} = this.props;

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
            <input className="login__input" type="text" name="name" id="name" value={name} onChange={this.handleChange} />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="text" name="password" id="password" value={password} onChange={this.handleChange} />
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
  }

  handleChange(evt) {
    const {target} = evt;
    const {name, value} = target;

    this.props.onChange(name, value);
  }
}

AuthorizationScreen.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

AuthorizationScreen.defaultProps = {
  onSubmit: () => {}
};

export default AuthorizationScreen;
