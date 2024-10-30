import { SignedOut, SignInButton } from "@clerk/clerk-react";
import './SignIn.css'
import UserPage from "./UserPage.jsx";


function SignIn() {
  return (
    <div className="container-1">
    <header className="head">
      <SignedOut>
      <div className="signin-page">
        <SignInButton className="custom-signin-button" />
        </div>
      </SignedOut>
      <UserPage/>
    </header>
  </div>
  )
}

export default SignIn