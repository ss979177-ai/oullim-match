"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import BottomNav from "../../components/BottomNav";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const myId = localStorage.getItem("userId");

    const { data } = await supabase
      .from("users")
      .select("*")
      .neq("id", myId);

    setUsers(data || []);
  }

  async function sendLike(targetUser: any) {
    const myId = localStorage.getItem("userId");

    if (!myId) return;

    const { data, error } = await supabase
  .from("likes")
  .insert({
    from_user: myId,
    to_user: targetUser.id,
  });

console.log("likes insert", data);
console.log("likes error", error);

    await supabase
  .from("notifications")
  .insert({
    sender_id: myId,
    receiver_id: targetUser.id,
    type: "like",
  });
    const { data: reverseLike } = await supabase
      .from("likes")
      .select("*")
      .eq("from_user", targetUser.id)
      .eq("to_user", myId)
      .maybeSingle();
    console.log("내 ID:", myId);
    console.log("상대 ID:", targetUser.id);
    console.log("reverseLike:", reverseLike);

    if (reverseLike) {

  await supabase
    .from("matches")
    .insert({
      user1: myId,
      user2: targetUser.id,
    });

  alert(
    `🎉 매칭 성공!

${targetUser.seat}번 연락처
${targetUser.phone}`
  );

} else {
  alert("호감을 보냈습니다 ❤️");
}
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">
        참가자 보기
      </h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded mb-4"
        >
          <div>
            <strong>{user.seat}번 자리</strong>
          </div>

          <div>{user.age}세</div>
          <div>{user.mbti}</div>
          <div>{user.job}</div>
          <div>{user.hobby}</div>

          <button
            onClick={() => sendLike(user)}
            className="mt-3 bg-pink-500 text-white px-4 py-2 rounded"
          >
            ❤️ 호감 보내기
          </button>

          {/* <button
  onClick={() =>
    window.location.href="/matches"
  }
>
  내 매칭 보기
</button> */}

<button
  onClick={() =>
    window.location.href = "/matches"
  }
  className="mb-6 border px-4 py-2 rounded"
>
  내 매칭 보기
</button>
        </div>
      ))}
      <BottomNav />
    </div>
  );
}