"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function MatchesPage() {
  const [matches, setMatches] =
    useState<any[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    const myId =
      localStorage.getItem("userId");

    const { data } = await supabase
      .from("matches")
      .select("*");

    if (!data) return;

    const result = [];

    for (const match of data) {
      if (
        match.user1 !== myId &&
        match.user2 !== myId
      )
        continue;

      const targetId =
        match.user1 === myId
          ? match.user2
          : match.user1;

      const { data: user } =
        await supabase
          .from("users")
          .select("*")
          .eq("id", targetId)
          .single();

      if (user) result.push(user);
    }

    setMatches(result);
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl mb-6">
        💘 매칭 현황
      </h1>

      {matches.length === 0 && (
        <div>
          아직 매칭이 없습니다.
        </div>
      )}

      {matches.map((user) => (
        <div
          key={user.id}
          className="border rounded p-4 mb-3"
        >
          <div>
            {user.seat}번 자리
          </div>

          <div>
            {user.phone}
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  );
}