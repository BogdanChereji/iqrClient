import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AngajatiScreen from './Screens/AngajatiScreen';
import DashboardScreen from './Screens/DashboardScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">IRQ.RO</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/angajati" element={<AngajatiScreen />} />
          </Routes>{' '}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
