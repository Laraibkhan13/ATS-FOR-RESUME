
import { SignedIn, UserButton } from "@clerk/clerk-react";
import "./UserPage.css"

function UserPage() {
  return (
    <div className="user-page">
      <header className="user-header">
      <SignedIn>
        <UserButton className="custom-user-button" />
      </SignedIn>
       
      </header>
    </div>
  );
}

export default UserPage;
