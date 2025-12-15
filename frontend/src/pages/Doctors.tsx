import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/doctors");
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-12 text-center">Loading doctors...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Tim Dokter Kami</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tenaga medis profesional yang siap melayani kebutuhan kesehatan Anda dengan sepenuh hati.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="h-48 bg-secondary/50 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
               <User className="h-24 w-24 text-primary/40" />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
              <p className="text-primary font-medium mb-4">{doctor.specialty || "Dokter Umum"}</p>
              
              <Link to="/login">
                <Button className="w-full rounded-full shadow-lg shadow-primary/20">
                  <Calendar className="mr-2 h-4 w-4" /> Buat Janji
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
