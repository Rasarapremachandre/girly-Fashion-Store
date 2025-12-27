import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleGoogleClick=async()=>{
        try{
            const provider=new GoogleAuthProvider();
            
                provider.setCustomParameters({
                prompt: "select_account consent",
                });
                const auth=getAuth(app)

            const result=await signInWithPopup(auth,provider)

            const res =await fetch('/backend/auth/google',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },

              body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
            })
            const data=await res.json()

            // Update Redux state
            dispatch(signInSuccess(data));

            // Navigate to the home page
            navigate('/');
            
        }catch(error){
          console.log('could not sign in with google',error);

        }
    }
  return (
    <button 
        onClick={handleGoogleClick}  
        type='button' 
        className='bg-red-600 w-full py-2  text-white rounded-md hover:bg-red-700 transition duration-200'>
      Continue With Google
    </button>
  )
}
