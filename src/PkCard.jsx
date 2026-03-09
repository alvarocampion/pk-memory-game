import { useState } from "react";

function PkCard({ pk_id, pk_name, pk_type, pk_hp, pk_attack, pk_visible, pk_hidden, onToggle, onPairing }) {
  const [hidden, setHidden] = useState(true);
  const [pairedWith, setPairedWith] = useState(true);

  // toggle helper (optional)
  const toggleHidden = () => {
    setHidden((h) => !h);

    if (typeof onToggle === "function") onToggle(pk_id);
    if (typeof onPairing === "function") onPairing(pk_id);
  };

  // always show a white card container; render either full content or blank placeholder
  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
        maxWidth: "280px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {pk_visible ? (
        pk_hidden ? (
          <div
            style={{
              width: "120px",
              height: "240px",
              background: "dodgerblue",
              borderRadius: "8px",
              margin: "0 auto",
            }}
            onClick={toggleHidden}
          />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <span role="img" aria-label="hp">
                ❤️ {pk_hp}
              </span>
              {pk_attack != null && (
                <span role="img" aria-label="attack">
                  ⚔️ {pk_attack}
                </span>
              )}
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pk_id}.png`}
              alt={pk_name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
              onClick={toggleHidden}
            />
            <h2 style={{ marginTop: "0.1rem" , fontSize: "1.25rem"}}>{pk_name}</h2>
            <p style={{ marginTop: "0.25rem" , fontSize: "1rem"}}>Type: {pk_type}</p>
          </>
        )
      ) : (
        <div style={{ width: "120px", height: "240px", margin: "0 auto" }} />
      )}
    </div>
  );
};


export default PkCard;

