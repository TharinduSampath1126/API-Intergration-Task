// DemoPage was previously used directly; routes now point to UsersTable and NewlyAddedUsersTable
import { Routes, Route, Link } from 'react-router-dom';
import NewlyAddedUsersTable from './pages/pageA/NewlyAddedUsersTable';
import UsersTable from './pages/pageA/UsersTable';
import { Button } from '@/components/ui/button';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';


function App() {
  return (
    <div className="mx-10">
      <h1 className="text-primary text-3xl">API Integration task</h1>
      <br />
      <nav className="my-4 flex gap-6">
        <Button asChild variant="ghost" size="icon-lg">
          <Link to="/" aria-label="Users">
            <ArrowBigLeftDash className="size-custom border-2 rounded-lg border-[#D3D3D3]" size={46} color="#000000" absoluteStrokeWidth />
          </Link>
        </Button>

        <Button asChild variant="ghost" size="icon-lg">
          <Link to="/newly-added" aria-label="Newly Added ">
            <ArrowBigRightDash className="size-custom border-2 rounded-lg border-[#D3D3D3]" size={46} color="#000000" absoluteStrokeWidth />
          </Link>
        </Button>
      </nav>

      <br />

      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/newly-added" element={<NewlyAddedUsersTable />} />
      </Routes>
    </div>
  );
}

export default App;
