"use client";

export default function MemberCard({
  name,
  photoUrl,
  isCouple = false,
  onAddSpouse,
  onAddChild,
  styleOverride = { x: 0, y: 0 },
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: styleOverride.x,
        top: styleOverride.y,
        transform: "translate(-50%, -50%)",
      }}
      className="relative w-[250px] h-[330px] rounded-[30px] overflow-hidden shadow-xl border-[4px] border-white"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/member-card-bg.png')",
        }}
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* TOP SECTION */}
      <div className="relative z-10 h-[55%] w-full flex justify-center items-center pt-4">
        <div
          className="
            w-24 h-24 
            rounded-full 
            bg-[#FBECD2] 
            border-[6px] border-[#5B412F]
            shadow-md 
            overflow-hidden
            flex items-center justify-center
          "
        >
          <img
            src={photoUrl || "/silhouette.png"}
            alt="avatar"
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="relative z-10 h-[45%] w-full bg-[#8EB590]/90 flex flex-col items-center justify-center px-2">
        <p className="font-[Fredoka] text-xl text-[#4A3628] font-semibold tracking-wide text-center px-4">
          {name}
        </p>

        {/* Green Add Button */}
        <button
          onClick={() => {
            if (isCouple) onAddChild();
            else onAddSpouse();
          }}
          className="
            mt-3 
            w-10 h-10 
            rounded-full 
            bg-[#4CD137] 
            shadow-md
            flex items-center justify-center
            text-white text-3xl
            font-bold
            btn-bounce
          "
        >
          +
        </button>
      </div>
    </div>
  );
}
