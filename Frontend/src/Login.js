import React, {useState} from "react";

export const Login = (props) =>{
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <label for="email">email</label>
      <input value={email} onChage={(e) => setEmail(e.target.value)} type="email" placeholder="youemail@gmail.com" id="email" name="email" />
      <label for="password">password</label>
      <input value={pass} onChage={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
      <button type="submit">Log in</button>
    </form>
    <button onClick(props.onFormSwitch)>Don't have an account? Register here</button>
    </>
  )
}
