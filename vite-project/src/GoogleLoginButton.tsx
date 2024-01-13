import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const GoogleLoginButton: React.FC = () => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
    // You can handle the response here, such as sending it to your server for authentication.
  };

  return (
    <GoogleLogin
      clientId="166837721952-3qs3jse3grkcn5e9teggulm6fqavvba2.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      redirectUri="http://localhost:5173/" 
    />
  );
};

export default GoogleLoginButton;