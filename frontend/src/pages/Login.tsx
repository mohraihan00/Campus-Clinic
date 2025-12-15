import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Activity, HelpCircle } from 'lucide-react';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({ title: 'Login berhasil', description: 'Selamat datang!' });
      navigate('/dashboard');
    } else {
      toast({ 
        title: 'Login gagal', 
        description: 'Email atau password salah',
        variant: 'destructive' 
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Klinik Kampus</CardTitle>
          <CardDescription>Sistem Antrian Online</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="pt-2 space-y-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
              <p className="font-medium">Demo accounts (Password: password):</p>
              <p>Admin: admin@campusclinic.com</p>
              <p>Doctor: jane@campusclinic.com</p>
              <p>Staff: staff@campusclinic.com</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => navigate('/register')}
            >
              Daftar Akun Baru
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={() => navigate('/faq')}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Lihat FAQ
            </Button>
          </CardFooter>
        </form>
      </Card>
      </div>
    </div>
  );
};

export default Login;
