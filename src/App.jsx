import React, { useState, useCallback, useEffect } from 'react';
// Remplacement des icônes Lucide-React par des SVGs inline pour le mono-fichier
const Camera = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);
const MapPin = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5s-4.5-5.5-4.5-8.5a4.5 4.5 0 1 1 9 0c0 3-4.5 8.5-4.5 8.5z"/><circle cx="12" cy="11.5" r="1.5"/></svg>);
const AlertTriangle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L2.4 20.79c-.5.88-.04 1.94.86 2.4l15.82 4.13c.88.5 1.94.04 2.4-.86l-7.89-16.93c-.35-.75-1.4-.75-1.76 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const CheckCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.05-8.54"/><path d="M22 4L12 14.01l-3-3"/></svg>);
const Clock = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const User = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const ClipboardList = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M10 7H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"/><path d="M13 11h4"/><path d="M13 15h4"/><path d="M13 19h4"/></svg>);
const Trash2 = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>);
const Send = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const FileText = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>);


const categories = [
    { id: 'Accident', label: 'Accident', color: 'text-red-500', bgColor: 'bg-red-50', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'Incident Proche', label: 'Incident Proche', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'Observation', label: 'Observation Sécurité', color: 'text-blue-500', bgColor: 'bg-blue-50', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'Environnement', label: 'Problème Environnemental', color: 'text-green-600', bgColor: 'bg-green-50', icon: <Trash2 className="w-5 h-5" /> },
];

const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
};

const App = () => {
    const { date: initialDate, time: initialTime } = getFormattedDateTime();

    const [report, setReport] = useState({
        type: '',
        location: '',
        description: '',
        date: initialDate,
        time: initialTime,
        reporter: 'Utilisateur Mobile',
        imageFile: null,
    });
    const [uiState, setUiState] = useState('form'); // 'form' | 'submitting' | 'success'
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const { date: newDate, time: newTime } = getFormattedDateTime();
        setReport(prev => ({ ...prev, date: newDate, time: newTime }));
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setReport(prev => ({ ...prev, [name]: value }));
        setError('');
    }, []);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Le fichier est trop volumineux (max 5 Mo).');
                return;
            }
            setReport(prev => ({ ...prev, imageFile: file }));
            setImagePreview(URL.createObjectURL(file));
            setError('');
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError('');

        if (!report.type || !report.location || !report.description) {
            setError('Veuillez remplir le type, le lieu et la description.');
            return;
        }

        setUiState('submitting');
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

        console.log('Rapport soumis :', report);
        
        setUiState('success');

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
        }, 4000); // 4 seconds before resetting to form

    }, [report]);

    const InputField = ({ label, name, value, onChange, placeholder, icon: Icon, type = 'text', required = false }) => (
        <div className="relative z-0">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
                className="block w-full px-4 pt-4 pb-2 text-gray-800 bg-white border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition duration-200 shadow-sm"
            />
            <label
                htmlFor={name}
                className="absolute text-gray-500 duration-200 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-600 flex items-center"
            >
                {Icon && <span className="mr-2">{Icon}</span>}
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        </div>
    );

    const TextAreaField = ({ label, name, value, onChange, placeholder, icon: Icon, required = false }) => (
        <div className="relative z-0">
            <textarea
                name={name}
                id={name}
                rows="4"
                value={value}
                onChange={onChange}
                placeholder=" "
                required={required}
                className="block w-full px-4 pt-4 pb-2 text-gray-800 bg-white border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition duration-200 shadow-sm resize-none"
            ></textarea>
            <label
                htmlFor={name}
                className="absolute text-gray-500 duration-200 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-600 flex items-center"
            >
                {Icon && <span className="mr-2">{Icon}</span>}
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        </div>
    );

    const FormContent = (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nouveau Signalement HSE</h2>
            
            {/* Champ Catégorie */}
            <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-indigo-600" /> Type de Signalement <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="relative">
                            <input
                                type="radio"
                                id={cat.id}
                                name="type"
                                value={cat.id}
                                checked={report.type === cat.id}
                                onChange={handleChange}
                                className="sr-only peer"
                                required
                            />
                            <label
                                htmlFor={cat.id}
                                className={`flex flex-col items-center justify-center p-4 text-sm font-medium rounded-xl cursor-pointer transition-all duration-300 border-2 
                                    ${report.type === cat.id ? `${cat.color} ${cat.bgColor} border-indigo-500 ring-2 ring-indigo-500 shadow-md` : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}
                                `}
                            >
                                {cat.icon}
                                <span className="mt-2 text-center text-sm">{cat.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <InputField 
                label="Lieu de l'événement" 
                name="location" 
                value={report.location} 
                onChange={handleChange} 
                icon={<MapPin className="w-4 h-4" />} 
                required 
            />

            <div className="flex gap-4">
                <div className="flex-1">
                    <InputField 
                        label="Date" 
                        name="date" 
                        value={report.date} 
                        onChange={handleChange} 
                        type="date" 
                        icon={<Clock className="w-4 h-4" />} 
                    />
                </div>
                <div className="flex-1">
                    <InputField 
                        label="Heure" 
                        name="time" 
                        value={report.time} 
                        onChange={handleChange} 
                        type="time" 
                        icon={<Clock className="w-4 h-4" />} 
                    />
                </div>
            </div>

            <TextAreaField 
                label="Description Détaillée" 
                name="description" 
                value={report.description} 
                onChange={handleChange} 
                icon={<FileText className="w-4 h-4" />} 
                required 
            />

            {/* Champ Photo */}
            <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-indigo-600" /> Ajouter une Photo (Optionnel)
                </label>
                <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                
                <div className="flex items-center space-x-4">
                    <label htmlFor="imageFile" className="px-5 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition duration-300 cursor-pointer flex items-center text-sm">
                        <Camera className="w-5 h-5 mr-3" />
                        {imagePreview ? 'Changer la photo' : 'Prendre/Choisir une photo'}
                    </label>

                    {imagePreview && (
                        <button 
                            type="button" 
                            onClick={() => { setReport(prev => ({ ...prev, imageFile: null })); setImagePreview(null); }}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 bg-red-50 hover:bg-red-100"
                            aria-label="Supprimer la photo"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {imagePreview && (
                    <div className="mt-4 border-2 border-indigo-100 rounded-xl p-3 bg-white shadow-inner">
                        <img src={imagePreview} alt="Aperçu du signalement" className="w-full h-40 object-cover rounded-lg shadow-md" />
                        <p className="text-xs text-gray-500 mt-2 truncate font-medium">{report.imageFile?.name}</p>
                    </div>
                )}
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl flex items-center shadow-inner">
                <User className="w-5 h-5 mr-3 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-800">Signalé par : {report.reporter}</span>
            </div>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-sm" role="alert">
                    <p className="font-bold">Erreur de validation</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={uiState === 'submitting'}
                    className={`w-full py-4 text-white font-extrabold rounded-xl shadow-lg transition duration-300 flex items-center justify-center 
                        ${uiState === 'submitting' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/50 transform hover:scale-[1.01]'}
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
        <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-8 text-indigo-700">
            <svg className="animate-bounce w-20 h-20 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="mt-8 text-3xl font-bold">Traitement en cours...</h1>
            <p className="mt-3 text-lg text-center text-gray-600">Vos informations sont cryptées et envoyées en toute sécurité.</p>
        </div>
    );

    const SuccessContent = (
        <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-8rem)] p-8 text-green-700">
            <CheckCircle className="w-24 h-24 text-green-500 animate-pulse-slow" />
            <h1 className="mt-8 text-4xl font-extrabold">Succès !</h1>
            <p className="mt-3 text-lg text-center text-gray-700">Votre signalement a été envoyé et enregistré.</p>
            <p className="mt-2 text-sm text-gray-500">Un identifiant unique sera bientôt disponible dans votre portail.</p>
            <p className="mt-6 text-sm text-gray-500">Retour au formulaire...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4 font-['Inter']">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .7; }
                }
            `}</style>
            <div className="w-full max-w-xl bg-white shadow-2xl ring-1 ring-gray-100 overflow-hidden rounded-3xl">
                {/* Mobile Header Bar - Glassy Effect */}
                <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 shadow-xl flex items-center justify-center rounded-t-3xl text-white">
                    <h1 className="text-2xl font-extrabold flex items-center tracking-wide">
                        <AlertTriangle className="w-7 h-7 mr-3 text-white" />
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