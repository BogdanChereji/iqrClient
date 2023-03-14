import './App.css';
import AngajatiScreen from './Screens/Angajati/AngajatiScreen';
import ClientiScreen from './Screens/Clienti/ClientiScreen';
import DashboardScreen from './Screens/DashboardScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import ViewAngajat from './Screens/Angajati/ViewAngajat';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import CreateAngajati from './Screens/Angajati/CreateAngajati';
import CreateClient from './Screens/Clienti/CreateClient';
import EditAngajati from './Screens/Angajati/EditAngajati';
import EditClient from './Screens/Clienti/EditClient';
import ViewClient from './Screens/Clienti/ViewClient';
import ViewServici from './Screens/Servicii/ViewServici';
import EditServicii from './Screens/Servicii/EditServicii';
import CreateServicii from './Screens/Servicii/CreateServicii';
import ServiciiiScreen from './Screens/Servicii/ServiciiScreen';
import EchipamenteScreen from './Screens/Echipamente/EchipamenteScreen';
import CreateEchipament from './Screens/Echipamente/CreateEchipament';
import EditEchipament from './Screens/Echipamente/EditEchipament';
import ViewEchiament from './Screens/Echipamente/ViewEchiament';
import PontajeScreen from './Screens/Pontaje/PontajeScreen';
import InterfataAngajatScreen from './Screens/InterfataAngajati/InterfataAngajatiScreen';
import CreatePontaj from './Screens/Pontaje/CreatePontaj';
import EditPontaj from './Screens/Pontaje/EditPontaj';
import CreatePontajSingle from './Screens/InterfataAngajati/CreatePontajSingle';
import EditPontajSingle from './Screens/InterfataAngajati/EditPontajSingle';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            {/* //ProtectedRoute */}
            {/* Angajati */}
            <Route
              path="/admin/angajat/:id"
              element={
                <ProtectedRoute>
                  <EditAngajati />
                </ProtectedRoute>
              }
            />
            <Route
              path="/angajat/:nume"
              element={
                <ProtectedRoute>
                  <ViewAngajat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AngajatNou"
              element={
                <ProtectedRoute>
                  <CreateAngajati />
                </ProtectedRoute>
              }
            />
            <Route
              path="/angajati"
              element={
                <ProtectedRoute>
                  <AngajatiScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clienti"
              element={
                <ProtectedRoute>
                  <ClientiScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ClientNou"
              element={
                <ProtectedRoute>
                  <CreateClient />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/client/:id"
              element={
                <ProtectedRoute>
                  <EditClient />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client/:numeClient"
              element={
                <ProtectedRoute>
                  <ViewClient />
                </ProtectedRoute>
              }
            />
            <Route
              path="/servicii"
              element={
                <ProtectedRoute>
                  <ServiciiiScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ServiciuNou"
              element={
                <ProtectedRoute>
                  <CreateServicii />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/servici/:id"
              element={
                <ProtectedRoute>
                  <EditServicii />
                </ProtectedRoute>
              }
            />
            <Route
              path="/servici/:numeServici"
              element={
                <ProtectedRoute>
                  <ViewServici />
                </ProtectedRoute>
              }
            />
            <Route
              path="/echipamente"
              element={
                <ProtectedRoute>
                  <EchipamenteScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/EchipamentNou"
              element={
                <ProtectedRoute>
                  <CreateEchipament />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/echipament/:id"
              element={
                <ProtectedRoute>
                  <EditEchipament />
                </ProtectedRoute>
              }
            />
            <Route
              path="/echipament/:numeEchipament"
              element={
                <ProtectedRoute>
                  <ViewEchiament />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pontaje"
              element={
                <ProtectedRoute>
                  <PontajeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pontajnou"
              element={
                <ProtectedRoute>
                  <CreatePontaj />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pontaj/:id"
              element={
                <ProtectedRoute>
                  <EditPontaj />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interfata"
              element={
                <ProtectedRoute>
                  <InterfataAngajatScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interfata/pontajnou"
              element={
                <ProtectedRoute>
                  <CreatePontajSingle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interfata/:id"
              element={
                <ProtectedRoute>
                  <EditPontajSingle />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/echipament/:numeEchipament"
              element={
                <ProtectedRoute>
                  <ViewEchiament />
                </ProtectedRoute>
              }
            />  */}
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
