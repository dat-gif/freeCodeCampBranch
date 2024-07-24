import "./App.css";
import axios from "axios";
async function App() {
  const data = await axios.get("repos");
  return <div>"hi"</div>;
}

export default App;
