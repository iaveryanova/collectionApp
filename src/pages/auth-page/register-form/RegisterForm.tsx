import React from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  let navigate = useNavigate();
    const onLogin = () => {
        navigate('/auth');
    }
  return (<>
      <div>RegisterForm</div>
      <button type="button" onClick={onLogin}>Login</button>
  </>

  )
}

export default RegisterForm;