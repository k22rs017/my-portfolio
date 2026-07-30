import CustomCursor from "./components/CustomCursor";
import CustomScrollbar from './components/CustomScrollbar';
import Hero from './components/Hero';
import './App.css';

function App() {
    return (
    <div className="App">
      <CustomCursor />
      <CustomScrollbar />
      <Hero />
    </div>
  );
}

export default App;