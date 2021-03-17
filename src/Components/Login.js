import { authService, googleProvider } from "myFirebase";

const Login = ({ uid }) => {
  const signInGoogle = async () => {
    await authService.signInWithRedirect(googleProvider);
  };
  const signOut = async () => {
    await authService.signOut();
  };

  console.log(uid);

  return (
    <div>
      {uid ? (
        <button onClick={signOut}>Signout</button>
      ) : (
        <button onClick={signInGoogle}>Sign in with google</button>
      )}
    </div>
  );
};

export default Login;
