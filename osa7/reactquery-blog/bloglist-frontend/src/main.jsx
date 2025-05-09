import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { NotificationContextProvider } from './NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './userContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
