"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";
export default function LikesPage() {
  const [likes, setLikes] = useState<any[]>([]);

  useEffect(() => {
    loadLikes();
  }, []);

  async function loadLikes() {
    const myId =
      localStorage.getItem("userId");

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("receiver_id", myId);

    if (!data) return;

    const result = [];

    for (const item of data) {
      const { data: user } =
        await supabase
          .from("users")
          .select("*")
          .eq("id", item.sender_id)
          .single();

      if (user) result.push(user);
    }

    setLikes(result);
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl mb-6">
        💌 받은 호감
      </h1>

      {likes.length === 0 && (
        <div>
          아직 받은 호감이 없습니다.
        </div>
      )}

      {likes.map((user) => (
        <div
          key={user.id}
          className="border rounded p-4 mb-3"
        >
          <div>
            {user.seat}번 자리
          </div>

          <div>
            {user.age}세
          </div>

          <div>
            {user.mbti}
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  );
}