import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Stethoscope, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Pages that should have the simple header (Logo only or minimal)
  const isSimpleHeaderPage = ["/login", "/register", "/dashboard"].some(path => location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Navbar */}
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
           {/* New Logo */}
           <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
             <Stethoscope className="h-6 w-6" />
           </div>
           <Link to="/">
             <span className="text-2xl font-bold text-primary tracking-tight">Klinik Kampus</span>
           </Link>
        </div>
        
        {!isSimpleHeaderPage && (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link to="/" className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary font-semibold' : ''}`}>Home</Link>
            <Link to="/services" className={`hover:text-primary transition-colors ${location.pathname === '/services' ? 'text-primary font-semibold' : ''}`}>Services</Link>
            <Link to="/doctors" className={`hover:text-primary transition-colors ${location.pathname === '/doctors' ? 'text-primary font-semibold' : ''}`}>Doctors</Link>
            <Link to="/faq" className={`hover:text-primary transition-colors ${location.pathname === '/faq' ? 'text-primary font-semibold' : ''}`}>FAQ</Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isSimpleHeaderPage && !user && (
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
              <Phone className="h-5 w-5" />
            </Button>
          )}
          
          {/* Show Login/Register buttons only on non-auth pages and if not logged in */}
          {!isSimpleHeaderPage && !user && (
            <>
              <Link to="/login">
                <Button variant="outline" className="rounded-full px-6 mr-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">Register</Button>
              </Link>
            </>
          )}

          {/* Show User Info and Logout if logged in */}
          {user && (
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
               </div>
               <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="h-5 w-5 text-destructive" />
               </Button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - Blue Colored */}
      <footer className="bg-primary text-primary-foreground py-4 mt-auto rounded-t-[2rem]">
         <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
               <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                 <Stethoscope className="h-5 w-5" />
               </div>
               <span className="text-xl font-bold tracking-tight">Klinik Kampus</span>
            </div>
            <p className="opacity-90 mb-2">&copy; 2024 Klinik Kampus. All rights reserved.</p>
            <p className="text-sm opacity-80">Jl. Prof. Dr. Ir. Sumantri Brojonegoro No.1, Gedong Meneng, Kec. Rajabasa, Kota Bandar Lampung</p>
         </div>
      </footer>
    </div>
  );
};

export default Layout;
