"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    job: "",
    city: "",
    mbti: "",
    hobby: "",
    phone: "",
    gender: "",
  });

  async function submit() {
    const { data, error } = await supabase
      .from("users")
      .insert({
        name: form.name,
        age: Number(form.age),
        job: form.job,
        city: form.city,
        mbti: form.mbti,
        hobby: form.hobby,
        phone: form.phone,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("userId", data.id);

    alert("입장 완료!");

    window.location.href = "/seat";
  }

  return (
    <div className="max-w-md mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        어울림 입장하기
      </h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="이름"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

<select
  className="border p-2 w-full mb-2"
  onChange={(e) =>
    setForm({ ...form, gender: e.target.value })
  }
>
  <option value="">성별 선택</option>
  <option value="남">남성</option>
  <option value="여">여성</option>
</select>

      <input
        className="border p-2 w-full mb-2"
        placeholder="나이"
        onChange={(e) =>
          setForm({ ...form, age: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="직업"
        onChange={(e) =>
          setForm({ ...form, job: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="거주지"
        onChange={(e) =>
          setForm({ ...form, city: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="MBTI"
        onChange={(e) =>
          setForm({ ...form, mbti: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="취미"
        onChange={(e) =>
          setForm({ ...form, hobby: e.target.value })
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="연락처"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <button
        onClick={submit}
        className="bg-pink-500 text-white px-5 py-3 rounded w-full"
      >
        입장하기
      </button>
    </div>
  );
}
