import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"; // these are methods from firebase
import { useState } from "react";

// with firebase the password has to be longer than 6 




export const Auth = () => { 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const signIn = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err); // console.error is used specifically to print error messages 
  }
};

const logout = async () => { 
  try { 
    await signOut(auth)
  } catch (err) { 
    console.error(err) 
  }
}
  
const signInWithGoogle = async () => { 
  try { // handle errors 
  await signInWithPopup(auth, googleProvider) // 
  } catch (err) { 
  console.error(err); 
  } 
}; 
  
  
  return ( 
    <div>
      <input placeholder='Email...' onChange = {e => setEmail(e.target.value)}/> 
      <input placeholder='Password...' onChange = {e => setPassword(e.target.value)}/>
      <button onClick={signIn}> Sign In </button> 
      <button onClick={logout}> Sign Out </button> 
      <button onClick={signInWithGoogle}> Sign In With Google </button> 
    </div>
  )
}
