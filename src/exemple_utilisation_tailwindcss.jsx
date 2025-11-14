import React, { useState } from 'react';
import { Smile, Zap, Loader } from 'lucide-react'; // Utilisation d'icônes pour l'esthétique

// L'ensemble du code, y compris les composants et la logique, est dans ce seul fichier.
const FeatureCard = ({ title, description, icon: Icon, color }) => (
  <div className={`p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl border-t-4 border-${color}-500 transform hover:scale-[1.02]`}>
    <div className={`text-${color}-500 mb-3`}>
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = () => {
    setLoading(true);
    // Simule une action asynchrone pour montrer l'état de chargement
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    // Conteneur principal: Utilisez le mode sombre par défaut pour un meilleur contraste
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans flex flex-col items-center">
      
      {/* En-tête Adaptatif */}
      <header className="w-full max-w-4xl text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-2">
          Démo Tailwind Fonctionnelle
        </h1>
        <p className="text-gray-600 text-lg">
          Les classes sont appliquées directement dans le JSX (`className`).
        </p>
      </header>

      {/* Section des Fonctionnalités (Responsive Grid) */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <FeatureCard 
          title="Responsive par Défaut"
          description="Les classes comme 'md:grid-cols-3' ajustent la mise en page pour les différentes tailles d'écran."
          icon={Zap}
          color="yellow"
        />
        <FeatureCard 
          title="Styles Unifiés"
          description="Nous utilisons des classes utilitaires pour le padding (p-6), les ombres (shadow-lg) et les coins arrondis (rounded-xl)."
          icon={Smile}
          color="green"
        />
        <FeatureCard 
          title="Interactivité Facile"
          description="Les états de survol ('hover:shadow-xl') et les transitions sont intégrés facilement pour un design dynamique."
          icon={Loader}
          color="indigo"
        />
      </section>

      {/* Bouton avec État de Chargement */}
      <div className="w-full max-w-xs p-6 bg-white rounded-xl shadow-md flex justify-center">
        <button
          onClick={handleAction}
          disabled={loading}
          className={`
            px-6 py-3 rounded-full font-bold text-white transition-all duration-300 flex items-center justify-center
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg'
            }
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargement...
            </>
          ) : (
            'Démarrer l\'Action'
          )}
        </button>
      </div>

    </div>
  );
};

export default App;