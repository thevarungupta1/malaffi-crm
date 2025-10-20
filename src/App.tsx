import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Groups } from './pages/Groups/Groups';
import { AddGroup } from './pages/Groups/AddGroup';
import { Facilities } from './pages/Facilities/Facilities';
import { FacilityDetails } from './pages/Facilities/FacilityDetails';
import { AddFacility } from './pages/Facilities/AddFacility';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/add" element={<AddGroup />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/add" element={<AddFacility />} />
        <Route path="/facilities/:id" element={<FacilityDetails />} />
      </Routes>
    </Router>
  );
}

export default App;