import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import Index from "./Index";
import LanguageDetect from "./LanguageDetect";
import Modal from "./Modal";

function App() {
	const [view, changeView] = useState(true); //default view is translation
	const [result, setResult] = useState(false); //modal that shows state if the language detections are true
	const [container, setContainer] = useState(false);
	const [error, setError] = useState(null); //set error if failed
	const [success, setSuccess] = useState(null); //set success if successful
	const [loading, setLoading] = useState(false); //loading to get result of translation
	const [lang, setDetectedLanguage] = useState(""); //language that the modal displays

	return (
		<div className="App">
			{result ? <Modal props={[result, setResult]} language={[lang, setDetectedLanguage]} /> : null}
			<div className="p-4 mb-6">
				<button
					className="transition duration-300 ease-in-out bg-white rounded-md p-3 text-xs leading-tight font-bold shadow-md md:hover:bg-primary border md:hover:shadow-none md:hover:text-white md:hover:bg-opacity-50 md:hover:border md:hover:border-white"
					onClick={() => changeView((prev) => !prev)}>
					{view ? "Detect language" : "Translate language"}
				</button>
			</div>
			<div className="container-title text-center">
				<h1 className="text-white text-2xl md:text-4xl font-semibold">{view ? "Language Translator 🚀" : "Detect Language"}</h1>
				<small className="text-white">{view ? "Enjoy translating as much as 183 languages😁💅" : ""}</small>
			</div>
			<div className="relative">
				<div
					className={`flex flex-col top-2 right-2 z-10 fixed gap-1 transition duration-300 ease-in-out w-max${
						container === true ? "opacity-100 pointer-events-auto visible" : "invisible opacity-0 pointer-events-none"
					}`}>
					<div
						className={`transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-48 sm:w-64 h-max py-3 px-3 items-center gap-2 ${
							success ? "flex" : "hidden"
						}`}>
						<Icon icon="fa-solid:check-circle" className="text-green-600" />
						<small className="font-semibold text-xs">{success}</small>
					</div>
					<div
						className={`transition duration-200 ease-in-out shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] bg-white rounded-md w-64 sm:w-72 h-max py-3 px-3 flex items-center gap-2  ${
							error ? "flex" : "hidden"
						}`}>
						<Icon icon="material-symbols:cancel-rounded" className="text-red-500 scale-110" />
						<small className="font-semibold text-xs">{error}</small>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 px-3">
				{view ? (
					<Index allProps={{ container, setContainer, error, setError, success, setSuccess, loading, setLoading }} />
				) : (
					<LanguageDetect allProps={{ loading, setContainer, setError, setSuccess, setLoading, setResult, lang, setDetectedLanguage }} />
				)}
			</div>
		</div>
	);
}

export default App;
