import './App.css';
import Router from "./pages/Routes";
/*
import backgroundImg from './bgimage.jpg';

const appStyle = {
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
*/

const App = ()=> {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
