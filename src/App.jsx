import Poster from './component/Poster';

const App = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="display-4 text-center text-primary mb-4">
        Welcome to My App
      </div>
            <Poster />
    </div>
  );
};

export default App;
