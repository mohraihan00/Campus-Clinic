<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Will be overridden in seeder
            'doctor_id' => User::factory(), // Will be overridden in seeder
            'service_type' => fake()->randomElement(['Konsultasi Umum', 'Pemeriksaan Gigi', 'Imunisasi Anak', 'Cek Kesehatan Rutin', 'Konsultasi Kulit']),
            'reservation_date' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'queue_number' => fake()->numberBetween(1, 20),
            'status' => fake()->randomElement(['waiting', 'completed', 'cancelled']),
        ];
    }
}
