import { Footer, Navbar, Welcome } from "./components";
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Footer />
      </div>
    </div>
  );
};

export default App;
