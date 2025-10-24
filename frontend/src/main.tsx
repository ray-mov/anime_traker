import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./index.css"

//pages
import App from './App.tsx'
import LoginPage from './features/Auth/components/LoginPage.tsx';
import SignUp from './features/Auth/components/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path : 'auth',
    children: [
      {index: true, Component: LoginPage },
      {path : 'sign-up', Component: SignUp}

    ]
  }
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
