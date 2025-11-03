// DemoPage was previously used directly; routes now point to UsersTable and NewlyAddedUsersTable
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewlyAddedUsersTable from './pages/pageA/users';
import UsersTable from './pages/pageB/products';
import AdminDashboard from './pages/admin/Dashboard';
import Layout from './components/layout/layout';

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
      <Layout>
        <div className='mx-5 '>
          <br />

          <Routes>
            <Route path="/" element={<UsersTable />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/newly-added" element={<NewlyAddedUsersTable />} />
          </Routes>

        </div>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
