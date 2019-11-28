import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StatusCode} from '../../constants';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    const {name, password, serverStatus} = this.props;
    const style = {
      position: `absolute`,
      top: `100%`,
      left: `50%`,
      color: `red`,
      transform: `translateX(-50%)`
    };

    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
        <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
        <form style={{position: `relative`}} className="login__form" action="#" onSubmit={this.handleSubmit}>
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input className="login__input" type="text" name="name" id="name" value={name} onChange={this.handleChange} />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="text" name="password" id="password" value={password} onChange={this.handleChange} />
            <span className="login__error">Неверный пароль</span>
          </p>
          {serverStatus === StatusCode.BAD_REQUEST && <div style={style}>Заполнены не все поля!</div>}
          <button
            className="login__button button"
            type="submit"
            disabled={!(name.length && password.length)}
          >Войти</button>
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

  handleSubmit(evt) {
    const {name, password, history, onSetUserData, onChangeServerStatus} = this.props;

    evt.preventDefault();
    onSetUserData({email: name, password}, onChangeServerStatus);
    history.goBack();
  }
}

AuthorizationScreen.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  serverStatus: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSetUserData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onChangeServerStatus: PropTypes.func.isRequired
};

export default AuthorizationScreen;
