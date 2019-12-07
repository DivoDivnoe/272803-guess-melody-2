import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StatusCode} from '../../constants';
import {parseTime, getTimeEnding, getMistakesEnding} from '../../utils';
class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    const {
      name,
      password,
      serverStatus,
      points,
      fastPoints,
      gameTime,
      mistakes,
      renderButton
    } = this.props;

    const {minutes, seconds} = parseTime(gameTime);

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
        <p className="login__total">{`За ${minutes} минут${getTimeEnding(minutes)} и ${seconds} секунд${getTimeEnding(seconds)} вы набрали ${points} баллов (${fastPoints} быстрых), совершив ${mistakes} ошиб${getMistakesEnding(mistakes)}`}</p>
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
        {renderButton()}
      </section>
    );
  }

  handleChange(evt) {
    const {target} = evt;
    const {name, value} = target;

    this.props.onChange(name, value);
  }

  handleSubmit(evt) {
    const {name, password, onSetUserData, onChangeServerStatus, onSuccess} = this.props;

    evt.preventDefault();
    onSetUserData({email: name, password}, onSuccess, onChangeServerStatus);
  }
}

AuthorizationScreen.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  serverStatus: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSetUserData: PropTypes.func.isRequired,
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  fastPoints: PropTypes.number.isRequired,
  onChangeServerStatus: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired
};

export default AuthorizationScreen;
