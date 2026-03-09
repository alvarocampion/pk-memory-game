import { useState } from "react";
import PkCard from "./PkCard";
import './App.css';

const pokemons_all = [
  { pk_id: 1, pk_name: "Bulbasaur", pk_type: "Grass", pk_hp: 45, pk_attack: 49 },
  { pk_id: 4, pk_name: "Charmander", pk_type: "Fire", pk_hp: 39, pk_attack: 52 },
  { pk_id: 7, pk_name: "Squirtle", pk_type: "Water", pk_hp: 44, pk_attack: 48 },
  { pk_id: 25, pk_name: "Pikachu", pk_type: "Electric", pk_hp: 35, pk_attack: 55 },
  { pk_id: 6, pk_name: "Charizard", pk_type: "Fire", pk_hp: 78, pk_attack: 84 },
  { pk_id: 9, pk_name: "Blastoise", pk_type: "Water", pk_hp: 79, pk_attack: 83 },
  { pk_id: 3, pk_name: "Venusaur", pk_type: "Grass", pk_hp: 80, pk_attack: 82 },
  { pk_id: 150, pk_name: "Mewtwo", pk_type: "Psychic", pk_hp: 106, pk_attack: 110 },
  { pk_id: 39, pk_name: "Jigglypuff", pk_type: "Normal", pk_hp: 115, pk_attack: 45 },
  { pk_id: 143, pk_name: "Snorlax", pk_type: "Normal", pk_hp: 160, pk_attack: 110 },
  { pk_id: 94, pk_name: "Gengar", pk_type: "Ghost", pk_hp: 60, pk_attack: 65 },
  { pk_id: 131, pk_name: "Lapras", pk_type: "Water", pk_hp: 130, pk_attack: 85 },
  { pk_id: 133, pk_name: "Eevee", pk_type: "Normal", pk_hp: 55, pk_attack: 55 },
  { pk_id: 149, pk_name: "Dragonite", pk_type: "Dragon", pk_hp: 91, pk_attack: 134 },
  { pk_id: 59, pk_name: "Arcanine", pk_type: "Fire", pk_hp: 90, pk_attack: 110 },
  { pk_id: 65, pk_name: "Alakazam", pk_type: "Psychic", pk_hp: 55, pk_attack: 50 },
  { pk_id: 68, pk_name: "Machamp", pk_type: "Fighting", pk_hp: 90, pk_attack: 130 },
  { pk_id: 76, pk_name: "Golem", pk_type: "Rock", pk_hp: 80, pk_attack: 120 },
  { pk_id: 130, pk_name: "Gyarados", pk_type: "Water", pk_hp: 95, pk_attack: 125 },
  { pk_id: 148, pk_name: "Dragonair", pk_type: "Dragon", pk_hp: 61, pk_attack: 84 },
];

for (let i =pokemons_all.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[pokemons_all[i], pokemons_all[j]] = [pokemons_all[j], pokemons_all[i]]
}

const pokemons_to_show = pokemons_all.slice(0, 4);
const pokemons = pokemons_to_show.concat(pokemons_to_show);

for (let i =pokemons.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[pokemons[i], pokemons[j]] = [pokemons[j], pokemons[i]]
}



function App() {  
  const [toggleCount, setToggleCount] = useState(0);
  const [selectedPkId, setSelectedPkId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // helpers for resetting state
  const initialVisible = pokemons.map(() => true);
  const initialHidden = pokemons.map(() => true);

  const [pokemonsVisible, setPokemonsVisible] = useState(initialVisible);
  const [pokemonsHidden, setPokemonsHidden] = useState(initialHidden);
  const [pp, setPp] = useState("none");

  const resetGame = () => {
    setToggleCount(0);
    setSelectedPkId(null);
    setSelectedId(null);
    setPokemonsVisible(initialVisible);
    setPokemonsHidden(initialHidden);
    setPp("none");
  };


  return (
    <>

      <div style={{ position: "relative" }}>
        <h1 style={{ textAlign: "center", fontSize: "1.25rem", marginTop: "0.25rem" }}>
          Test your memory (selected cards: {toggleCount})
        </h1>
        <button
          onClick={resetGame}
          style={{
            position: "absolute",
            top: "0.25rem",
            right: "0.5rem",
            padding: "0.25rem 0.5rem",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
          gap: 24,
          justifyItems: "center",
        }}
      >
        {pokemons.slice(0, 8).map((card, idx) => (
          <PkCard
            key={idx}
            pk_id={card.pk_id}
            pk_name={card.pk_name}
            pk_type={card.pk_type}
            pk_hp={card.pk_hp}
            pk_attack={card.pk_attack}
            pk_visible={pokemonsVisible[idx]}
            pk_hidden={pokemonsHidden[idx]}
            onToggle={id => {
              setToggleCount(c => c + 1);
              setPokemonsHidden(pokemonsHidden.map((v, m_id) => m_id === idx ? false : v));

              if (selectedPkId === null) {
                setSelectedPkId(card.pk_id);
                setSelectedId(idx);
              } else {
                // delay the rest of the logic by one second
                setTimeout(() => {
                  setPp(idx);

                  if ((selectedPkId === card.pk_id) && (selectedId !== idx)) {
                    // hide both matched cards
                    setPokemonsVisible(
                      pokemonsVisible.map((v, m_id) =>
                        m_id === idx || m_id === selectedId ? false : v
                      )
                    );
                    setSelectedPkId(null);
                    setSelectedId(null);
                  } else {
                    // hide previous selection only
                    setPokemonsHidden(pokemonsHidden.map(() => true));
                    setSelectedPkId(null);
                    setSelectedId(null);
                  }
                }, 1000);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default App;


