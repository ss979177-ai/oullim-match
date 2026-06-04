"use client";

export default function BottomNav() {
  return (
    <div
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      flex
      justify-around
      p-4
      "
    >
      <button
        onClick={() =>
          location.href = "/users"
        }
      >
        👥 참가자
      </button>

      <button
        onClick={() =>
          location.href = "/likes"
        }
      >
        💌 받은호감
      </button>

      <button
        onClick={() =>
          location.href = "/matches"
        }
      >
        💘 매칭
      </button>
    </div>
  );
}