<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    public function index(Request $request)
    {   
        $user = $request->user();
        
        if ($user->role === 'admin' || $user->role === 'staff') {
            $reservations = Reservation::with(['user', 'doctor'])
                ->orderBy('reservation_date', 'desc')
                ->orderBy('queue_number', 'asc')
                ->get();
        } elseif ($user->role === 'doctor') {
            $reservations = Reservation::with(['user'])
                ->where('doctor_id', $user->id)
                ->orderBy('reservation_date', 'desc')
                ->orderBy('queue_number', 'asc')
                ->get();
        } else {
            $reservations = Reservation::with(['doctor'])
                ->where('user_id', $user->id)
                ->orderBy('reservation_date', 'desc')
                ->get();
        }

        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:users,id',
            'service_type' => 'required|string',
            'reservation_date' => 'required|date|after_or_equal:today',
        ]);

        // Calculate queue number
        $lastQueue = Reservation::where('doctor_id', $validated['doctor_id'])
            ->where('reservation_date', $validated['reservation_date'])
            ->max('queue_number');
        
        $queueNumber = $lastQueue ? $lastQueue + 1 : 1;

        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'doctor_id' => $validated['doctor_id'],
            'service_type' => $validated['service_type'],
            'reservation_date' => $validated['reservation_date'],
            'queue_number' => $queueNumber,
            'status' => 'waiting',
        ]);

        return response()->json($reservation, 201);
    }

    public function update(Request $request, Reservation $reservation)
    {
        // Check authorization (only doctor or admin/staff should update status)
        // For simplicity, allowing doctor to update their own reservations
        if ($request->user()->id !== $reservation->doctor_id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:waiting,completed,cancelled',
        ]);

        $reservation->update($validated);

        return response()->json($reservation);
    }
}
