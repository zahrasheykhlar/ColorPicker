import './App.css';
import { ColorPicker } from './ColorPicker';

function App() {
  const colorPalette = ["#010221", "#0A7373", "#B7BF99", "#EDAA25", "#C43302"]

  return (
    <div className="App">
      <ColorPicker colorPalette={colorPalette} />
    </div>
  );
}

export default App;
