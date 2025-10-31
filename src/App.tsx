// DemoPage was previously used directly; routes now point to UsersTable and NewlyAddedUsersTable
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewlyAddedUsersTable from './pages/pageA/NewlyAddedUsersTable';
import UsersTable from './pages/pageA/UsersTable';
import Navbar from './components/navbar/navItem';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <Navbar />
        <div className='mx-10 mt-10'>
          <h1 className="text-primary text-3xl">API Integration task</h1>
          <br />

          <Routes>
            <Route path="/" element={<UsersTable />} />
            <Route path="/newly-added" element={<NewlyAddedUsersTable />} />
          </Routes>

        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
