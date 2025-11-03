import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen w-full flex flex-col bg-[#0b0b10] text-gray-200">
        <Navbar />
        <main className="flex-grow w-full">
          <Home />
        </main>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="min-h-screen w-full flex flex-col bg-[#0b0b10] text-gray-200">
        <Navbar />
        <main className="flex-grow w-full">
          <Paste />
        </main>
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="min-h-screen w-full flex flex-col bg-[#0b0b10] text-gray-200">
        <Navbar />
        <main className="flex-grow w-full">
          <ViewPaste />
        </main>
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
