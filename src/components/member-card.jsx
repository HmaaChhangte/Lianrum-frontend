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
        backgroundImage: "url('/member-card-bg.png')",
      }}
      className="
        w-44 sm:w-48 
        h-60 sm:h-64 
        rounded-[35px] 
        overflow-hidden 
        shadow-lg 
        border-[3px] border-white 
        bg-cover bg-center 
        relative
      "
    >
      {/* TOP SECTION */}
      <div className="h-[55%] w-full flex justify-center items-center pt-3">
        <div
          className="
            w-24 h-24 
            rounded-full 
            bg-[#FBECD2] 
            border-[7px] border-[#5B412F]
            shadow-md 
            overflow-hidden
          "
        >
          <img
            src={photoUrl || "/silhouette.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="h-[45%] w-full bg-[#8EB590] bg-opacity-90 flex flex-col items-center justify-center">
        <p className="font-[Fredoka] text-xl text-[#4A3628] font-semibold tracking-wide text-center px-2">
          {name}
        </p>

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
