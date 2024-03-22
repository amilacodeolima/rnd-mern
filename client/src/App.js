import './App.css';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';

function App() {

  const appName = "Codeolima Web App";
  const version = process.env.REACT_APP_VERSION;

  return (
    <div>
      <Header appName={appName}/>
      <Content/>
      <Footer version={version}/>
    </div>
  );
}

export default App;
