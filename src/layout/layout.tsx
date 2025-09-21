import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/navigation-bar';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header / Navbar */}
      <header>
        <NavigationBar></NavigationBar>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
