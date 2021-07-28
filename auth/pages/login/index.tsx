import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="box">
      <h1 className="b__title">Login</h1> 
      <div className="txtb">
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>

      <div className="txtb">
        <input type="password" name="senha" id="senha" placeholder="Password" />
      </div>

      <button onClick={() => console.log('clicou')} className="btn__customized">Entrar</button>
    </div>
  );
}

export default Login;