import DemoPage from './pages/pageA';
import { Routes, Route, Link } from 'react-router-dom';
import NewlyAddedUsersTable from './pages/pageA/NewlyAddedUsersTable';
import UsersTable from './pages/pageA/UsersTable';


function App() {
  return (
    <div className='mx-10'>
      <h1 className="text-primary text-3xl">API Intergration task</h1>
      <DemoPage />

      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/nautable" element={<NewlyAddedUsersTable />} />
      </Routes>
    </div>
  );
}

export default App;
