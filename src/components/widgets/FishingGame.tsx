import "./WidgetStyles.css";

const FishingGame = () => {
  return (
    <div className="fishing-game-container">
      <div className="background">
        <img
          src="/FishingGamePack/background.png"
          className="background-image pixelart"
          alt="Fondo del juego de pesca"
        />
      </div>
      <div className="Character">
        <img
          src="/FishingGamePack/idle.png"
          className="Character_spritesheet pixelart"
          alt="Personaje en estado idle"
        />
      </div>
      <div className="game-panel">
        <button className="game-button">PESCAR</button>
      </div>
    </div>
  );
};

export default FishingGame;
