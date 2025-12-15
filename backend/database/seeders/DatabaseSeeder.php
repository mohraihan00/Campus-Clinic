<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Doctors
        User::create([
            'name' => 'Dr. Jane Smith',
            'email' => 'jane@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'specialty' => 'Umum',
            'phone' => '081234567891',
        ]);

        User::create([
            'name' => 'Dr. Ahmad Ramadhan',
            'email' => 'ahmad@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'specialty' => 'Gigi',
            'phone' => '081234567892',
        ]);

        User::create([
            'name' => 'Dr. Siti Aminah',
            'email' => 'siti@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'specialty' => 'Anak',
            'phone' => '081234567893',
        ]);

        User::create([
            'name' => 'Dr. Budi Santoso',
            'email' => 'budi@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'specialty' => 'Penyakit Dalam',
            'phone' => '081234567894',
        ]);

        User::create([
            'name' => 'Dr. Rina Wati',
            'email' => 'rina@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'specialty' => 'Kulit & Kelamin',
            'phone' => '081234567895',
        ]);

        // Staff
        User::create([
            'name' => 'Staff Member',
            'email' => 'staff@campusclinic.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);

        // Create Dummy Patients
        $patients = User::factory(20)->create([
            'role' => 'patient',
        ]);

        // Get all doctors
        $doctors = User::where('role', 'doctor')->get();

        // Create Dummy Reservations
        foreach ($patients as $patient) {
            // Each patient has 1-3 reservations
            \App\Models\Reservation::factory(rand(1, 3))->create([
                'user_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
            ]);
        }
    }
}
