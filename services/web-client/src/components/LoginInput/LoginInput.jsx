import cn from 'classnames';

import './LoginInput.css';

const LoginInput = ({valueProp, onChangeProp, authFailed }) => {

  const inputClass = cn('input', 'text', 'p-text', {
    'error': authFailed,
  });

  return (
    <>
      <label htmlFor="username">
        <input
            type="text"
            id="username"
            name="username"
            placeholder="Name"
            value={valueProp}
            onChange={onChangeProp}
            className={inputClass}
      />
      </label>
    </>
  );
}

export default LoginInput;
