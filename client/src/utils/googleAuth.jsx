import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useGoogleLoginMutation } from '../Redux/api/userApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from './firebaseAuth';

const useAuthenticate = () => {
  const [googleLogin] = useGoogleLoginMutation();
  const navigate = useNavigate();

  const authenticate = async (userType) => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const res = await googleLogin({
      Email: user.email,
      Name: user.displayName,
      uid: user.uid,
      isOwner: userType === 'owner' ? true : false,
    });

    if (res.data) {
      toast.success('Logged in successfully');
      navigate('/dashboard');
    }
    if (res.error) {
      toast.error('SomeThing went wrong', 'error');
    }
  };

  return authenticate;
};

export default useAuthenticate;
