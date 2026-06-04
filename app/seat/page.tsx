"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function SeatPage() {
  const [takenSeats, setTakenSeats] = useState<number[]>([]);

  useEffect(() => {
    loadSeats();
  }, []);

  async function loadSeats() {
    const { data } = await supabase
      .from("users")
      .select("seat");

    const seats =
      data
        ?.filter((u) => u.seat)
        .map((u) => u.seat) || [];

    setTakenSeats(seats);
  }

  async function chooseSeat(seat: number) {
    const userId =
      localStorage.getItem("userId");

    await supabase
      .from("users")
      .update({ seat })
      .eq("id", userId);

    window.location.href = "/users";
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">
        자리 선택
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => {
          const seat = i + 1;
          const taken =
            takenSeats.includes(seat);

          return (
            <button
              key={seat}
              disabled={taken}
              onClick={() =>
                chooseSeat(seat)
              }
              className={`p-8 rounded text-xl border
              ${
                taken
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-pink-100"
              }`}
            >
              {seat}
            </button>
          );
        })}
        <BottomNav />
      </div>
    </div>
  );
}