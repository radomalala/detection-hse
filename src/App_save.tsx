

import './index.css';
import { useState, useCallback, useEffect } from 'react';
// CORRECTION : Utilisation de 'type' pour les imports de types (FC, ChangeEvent, FormEvent)
import type { FC, ChangeEvent, FormEvent, SVGProps } from 'react';

// --- 1. INTERFACES ---
/**
 * Interface pour la structure du rapport HSE
 */
interface IReport {
    type: string;
    location: string;
    description: string;
    date: string;
    time: string;
    reporter: string;
    imageFile: File | null;
}

/**
 * Type pour les props d'icônes SVG (simplifié)
 */
type IconProps = SVGProps<SVGSVGElement>;

/**
 * Interface pour les props du composant InputField
 */
interface IInputFieldProps {
    label: string;
    name: keyof IReport;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon: FC<IconProps>;
    type?: 'text' | 'date' | 'time' | 'email';
    required?: boolean;
}

/**
 * Interface pour les props du composant TextAreaField
 */
interface ITextAreaFieldProps {
    label: string;
    name: keyof IReport;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    icon: FC<IconProps>;
    required?: boolean;
}

// --- 2. COMPOSANTS D'ICÔNES (lucide-react est préférable mais les SVG inline sont conservés) ---
// Note: Dans un environnement React standard avec Tailwind, on utiliserait des bibliothèques d'icônes comme lucide-react ou Heroicons.
// On conserve ici vos SVG inline pour l'exemple.
const Camera: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);
const MapPin: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5s-4.5-5.5-4.5-8.5a4.5 4.5 0 1 1 9 0c0 3-4.5 8.5-4.5 8.5z"/><circle cx="12" cy="11.5" r="1.5"/></svg>);
const CheckCircle: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.05-8.54"/><path d="M22 4L12 14.01l-3-3"/></svg>);
const Clock: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const User: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const Trash2: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>);
const Send: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const FileText: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>);

const ExclamationCircle: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const WarningCircle: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.86 18.05c-.35.61-.15 1.39.46 1.74l15.93 9.17c.61.35 1.39.15 1.74-.46L22.14 9.95c.35-.61.15-1.39-.46-1.74z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const Eye: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>);
const Leaf: FC<IconProps> = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 20 10.3 20 17a4 4 0 0 1-8 0 .7.7 0 0 0-1 0 7 7 0 0 0-4.7-6.7C4.2 9.4 6 4 9.8 2.5 13.5 1 17 3.4 17 3.4"/></svg>);


// --- 3. DONNÉES ET HELPERS ---

const categories = [
    { id: 'Accident', label: 'Accident', color: 'text-red-600', bgColor: 'bg-red-50', icon: ExclamationCircle as FC<IconProps> },
    { id: 'Incident Proche', label: 'Incident Proche', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: WarningCircle as FC<IconProps> },
    { id: 'Observation', label: 'Observation Sécurité', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Eye as FC<IconProps> },
    { id: 'Environnement', label: 'Problème Environnemental', color: 'text-green-600', bgColor: 'bg-green-50', icon: Leaf as FC<IconProps> },
];

const getFormattedDateTime = () => {
    const now = new Date();
    // Obtient la date YYYY-MM-DD
    const date = now.toISOString().split('T')[0];
    // Obtient l'heure HH:MM
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
};

// --- 4. COMPOSANTS TYPÉS AVEC TAILWIND ---

const InputField: FC<IInputFieldProps> = ({ label, name, value, onChange, icon: Icon, type = 'text', required = false }) => (
    <div className="relative z-0 group">
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
            placeholder=" "
            required={required}
            className="block w-full px-4 pt-4 pb-2 text-gray-800 bg-white border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition duration-200 shadow-sm disabled:bg-gray-100"
        />
        <label
            htmlFor={name}
            // Classes pour l'effet de "floating label"
            className="absolute text-gray-500 duration-200 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 
                       flex items-center pointer-events-none transition-all"
        >
            <span className="mr-2 text-blue-500"><Icon className="w-4 h-4 inline-block" /></span>
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    </div>
);

const TextAreaField: FC<ITextAreaFieldProps> = ({ label, name, value, onChange, icon: Icon, required = false }) => (
    <div className="relative z-0 group">
        <textarea
            name={name}
            id={name}
            rows={4}
            value={value}
            onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
            placeholder=" "
            required={required}
            className="block w-full px-4 pt-4 pb-2 text-gray-800 bg-white border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer transition duration-200 shadow-sm resize-none disabled:bg-gray-100"
        ></textarea>
        <label
            htmlFor={name}
            // Classes pour l'effet de "floating label"
            className="absolute text-gray-500 duration-200 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-600 
                       flex items-center pointer-events-none transition-all"
        >
            <span className="mr-2 text-blue-500"><Icon className="w-4 h-4 inline-block" /></span>
            {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    </div>
);

// --- 5. COMPOSANT PRINCIPAL (App) ---

const App: FC = () => {
    // Initialisation des dates
    const { date: initialDate, time: initialTime } = getFormattedDateTime();

    const [report, setReport] = useState<IReport>({
        type: '', // Laisser vide pour forcer la sélection
        location: '',
        description: '',
        date: initialDate,
        time: initialTime,
        reporter: 'Utilisateur Mobile',
        imageFile: null,
    });
    const [uiState, setUiState] = useState<'form' | 'submitting' | 'success'>('form');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    // Mise à jour de la date/heure au chargement initial
    useEffect(() => {
        const { date: newDate, time: newTime } = getFormattedDateTime();
        setReport(prev => ({ ...prev, date: newDate, time: newTime }));
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReport(prev => ({ ...prev, [name as keyof IReport]: value }));
        setError('');
    }, []);

    const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Le fichier est trop volumineux (max 5 Mo).');
                // Réinitialiser le champ de fichier après l'erreur
                e.target.value = ''; 
                return;
            }
            setReport(prev => ({ ...prev, imageFile: file }));
            setImagePreview(URL.createObjectURL(file));
            setError('');
        } else {
            setReport(prev => ({ ...prev, imageFile: null }));
            setImagePreview(null);
        }
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!report.type || !report.location || !report.description) {
            setError('Veuillez remplir le type de signalement, le lieu et la description.');
            return;
        }

        setUiState('submitting');
        
        // Simuler l'envoi de données asynchrone (2 secondes)
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        console.log('Rapport soumis (Données simulées) :', report);
        
        setUiState('success');

        // Retour au formulaire après 4 secondes
        setTimeout(() => {
            const { date: newDate, time: newTime } = getFormattedDateTime();
            setReport({
                type: '',
                location: '',
                description: '',
                date: newDate,
                time: newTime,
                reporter: 'Utilisateur Mobile',
                imageFile: null,
            });
            setImagePreview(null);
            setUiState('form');
        }, 4000); 

    }, [report]);

    const FormContent = (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-3">Nouveau Signalement HSE</h2>
            
            {/* Champ Catégorie (Radio buttons group) */}
            <div>
                <label className="flex items-center text-sm font-extrabold text-gray-700 mb-4">
                    <ExclamationCircle className="w-5 h-5 mr-2 text-blue-600" /> Type de Signalement <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="relative">
                            <input
                                type="radio"
                                id={cat.id}
                                name="type"
                                value={cat.id}
                                checked={report.type === cat.id}
                                onChange={handleChange as (e: ChangeEvent<HTMLInputElement>) => void}
                                className="sr-only peer"
                                required
                            />
                            <label
                                htmlFor={cat.id}
                                className={`
                                    flex flex-col items-center justify-center p-3 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 border-2 shadow-sm
                                    ${report.type === cat.id 
                                        ? `${cat.color} ${cat.bgColor} border-blue-500 ring-4 ring-blue-200 transform scale-[1.02]` 
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:shadow-md'
                                    }
                                `}
                            >
                                <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
                                <span className="text-center">{cat.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <InputField 
                label="Lieu de l'événement" 
                name="location" 
                value={report.location} 
                onChange={handleChange as (e: ChangeEvent<HTMLInputElement>) => void} 
                icon={MapPin} 
                required 
            />

            {/* Date and Time Fields */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <InputField 
                        label="Date" 
                        name="date" 
                        value={report.date} 
                        onChange={handleChange as (e: ChangeEvent<HTMLInputElement>) => void} 
                        type="date" 
                        icon={Clock} 
                    />
                </div>
                <div className="flex-1">
                    <InputField 
                        label="Heure" 
                        name="time" 
                        value={report.time} 
                        onChange={handleChange as (e: ChangeEvent<HTMLInputElement>) => void} 
                        type="time" 
                        icon={Clock} 
                    />
                </div>
            </div>

            <TextAreaField 
                label="Description Détaillée" 
                name="description" 
                value={report.description} 
                onChange={handleChange as (e: ChangeEvent<HTMLTextAreaElement>) => void} 
                icon={FileText} 
                required 
            />

            {/* Champ Photo */}
            <div>
                <label className="text-sm font-extrabold text-gray-700 mb-3 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-blue-600" /> Ajouter une Photo (Optionnel)
                </label>
                
                <div className="flex items-center space-x-3">
                    <label 
                        htmlFor="imageFile" 
                        className="flex-grow px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer flex items-center justify-center text-sm transform hover:-translate-y-0.5"
                    >
                        <Camera className="w-5 h-5 mr-3" />
                        {imagePreview ? 'Changer la photo' : 'Prendre/Choisir une photo'}
                    </label>

                    {imagePreview && (
                        <button 
                            type="button" 
                            onClick={() => { 
                                setReport(prev => ({ ...prev, imageFile: null })); 
                                setImagePreview(null); 
                                const fileInput = document.getElementById('imageFile') as HTMLInputElement;
                                if(fileInput) fileInput.value = ''; // Réinitialiser le champ
                            }}
                            className="text-red-600 hover:text-red-800 p-3 rounded-xl transition duration-150 bg-red-100 hover:bg-red-200 shadow-md"
                            aria-label="Supprimer la photo"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
                
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                {imagePreview && (
                    <div className="mt-4 border-2 border-blue-100 rounded-xl p-3 bg-white shadow-inner">
                        <img 
                            src={imagePreview} 
                            alt="Aperçu du signalement" 
                            className="w-full h-40 object-cover rounded-lg shadow-md" 
                            // Nettoyage de l'URL pour éviter les fuites de mémoire
                            onLoad={() => URL.revokeObjectURL(imagePreview)}
                        />
                        <p className="text-xs text-gray-500 mt-2 truncate font-medium">Fichier: {report.imageFile?.name}</p>
                    </div>
                )}
            </div>

            {/* Reporter Info */}
            <div className="bg-blue-50 p-4 rounded-xl flex items-center shadow-inner mt-6">
                <User className="w-5 h-5 mr-3 text-blue-700" />
                <span className="text-sm font-medium text-blue-800">Signalé par : {report.reporter}</span>
            </div>
            
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-sm" role="alert">
                    <p className="font-bold">Erreur de validation</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {/* Submission Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={uiState === 'submitting'}
                    className={`w-full py-4 text-white font-extrabold rounded-xl shadow-lg transition duration-300 flex items-center justify-center 
                        ${uiState === 'submitting' 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50 transform hover:scale-[1.01] active:scale-100'
                        }
                    `}
                >
                    {uiState === 'submitting' ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-3" />
                            Signaler l'Événement HSE
                        </>
                    )}
                </button>
            </div>
        </form>
    );

    const SubmittingContent = (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-blue-700">
            <svg className="animate-bounce w-20 h-20 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="mt-8 text-3xl font-bold">Traitement en cours...</h1>
            <p className="mt-3 text-lg text-center text-gray-600">Vos informations sont en cours d'enregistrement sécurisé.</p>
        </div>
    );

    const SuccessContent = (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-green-700">
            <CheckCircle className="w-24 h-24 text-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
            <h1 className="mt-8 text-4xl font-extrabold">Succès !</h1>
            <p className="mt-3 text-lg text-center text-gray-700">Votre signalement a été envoyé et enregistré.</p>
            <p className="mt-2 text-sm text-gray-500">Retour automatique au formulaire dans quelques instants...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-start lg:items-center justify-center p-4 sm:p-8 font-sans">
            {/* Le script Tailwind est supposé être chargé dans l'environnement. 
               J'ai retiré le bloc <style> pour la police Inter, car elle est souvent disponible
               par défaut ou gérée par l'environnement Canvas. */}
            <div className="w-full max-w-xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-hidden rounded-3xl transform transition-all duration-300">
                {/* Mobile Header Bar - Blue Solid */}
                <header className="bg-blue-600 p-5 shadow-xl flex items-center justify-center rounded-t-3xl text-white">
                    <h1 className="text-2xl font-extrabold flex items-center tracking-wide">
                        <ExclamationCircle className="w-7 h-7 mr-3 text-white" />
                        Rapport HSE Mobile
                    </h1>
                </header>

                <main className="py-8">
                    {uiState === 'form' && FormContent}
                    {uiState === 'submitting' && SubmittingContent}
                    {uiState === 'success' && SuccessContent}
                </main>
            </div>
        </div>

    );
};

export default App;