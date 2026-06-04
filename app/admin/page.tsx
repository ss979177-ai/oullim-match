"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [likesCount, setLikesCount] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: usersData } = await supabase
      .from("users")
      .select("*")
      .order("seat");

    setUsers(usersData || []);

    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true });

    setLikesCount(count || 0);

    const { data: matchesData } = await supabase
      .from("matches")
      .select("*");

    setMatches(matchesData || []);
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        관리자 대시보드
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="border p-4 rounded">
          <div className="text-gray-500">
            현재 인원
          </div>
          <div className="text-3xl font-bold">
            {users.length}
          </div>
        </div>

        <div className="border p-4 rounded">
          <div className="text-gray-500">
            총 호감 수
          </div>
          <div className="text-3xl font-bold">
            {likesCount}
          </div>
        </div>

        <div className="border p-4 rounded">
          <div className="text-gray-500">
            매칭 수
          </div>
          <div className="text-3xl font-bold">
            {matches.length}
          </div>
        </div>

      </div>

      <h2 className="text-2xl font-bold mb-4">
        현재 참가자
      </h2>

      <div className="space-y-3 mb-10">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded"
          >
            <strong>
              {user.seat}번 자리
            </strong>

            <div>
              {user.name}
            </div>

            <div>
              {user.age}세
            </div>

            <div>
              {user.mbti}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">
        매칭 현황
      </h2>

      {matches.map((match) => (
        <div
          key={match.id}
          className="border p-4 rounded mb-3"
        >
          {match.user1}
          {" ↔ "}
          {match.user2}
        </div>
      ))}

    </div>
  );
}