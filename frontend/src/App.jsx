import './App.css'
import NewForm from './components/NewForm'
import { SignedIn} from "@clerk/clerk-react";
import SignIn from './components/SignIn';

function App() {
  return (
    <header className='container-1'>
    <SignIn/>
    <main className='form'>
    <SignedIn>
      <NewForm />
    </SignedIn>
  </main>
  </header>
    
  )
}

export default App;
