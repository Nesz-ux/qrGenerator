import QrCodeGenerator from "./components/QrCodeGenerator";
import "./styles/QrGeneratorStyle.css"

const App = () => {
  return(
    <div className="app-container">
      <QrCodeGenerator/>
    </div>
  );
};

export default App;