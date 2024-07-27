import "./bulma.css";
import "./App.css";
import ReposComponent from "./components/ReposComponent";
function App() {
  return (
    <main className="container">
      <h1
        className="px-6 pt-6 has-text-weight-light is-family-code is-size-1 has-text-left"
        style={{ letterSpacing: "0.1.5rem" }}
      >
        freeCodeCamp Branch...
      </h1>
      <ReposComponent />
    </main>
  );
}

export default App;
