import "./App.css";
import UserRegistration from "./components/UserRegistration";
import banner from './assets/banner4 - hi-res@2x.png'

function App() {
  return (
    <div className="container">
      <img src={banner} />
      <UserRegistration />
    </div>
  );
}

export default App;
