import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";
import ISO6391 from "iso-639-1";

const allLanguageCodes = ISO6391.getAllCodes();
const allLanguages = ISO6391.getAllNames();

const RAPID_KEY = import.meta.env.VITE_RAPID_API_KEY;
const voices = speechSynthesis.getVoices(); // get all voices

const LanguageDetect = ({ allProps }) => {
	const { setContainer, setError, setSuccess, loading, setLoading, setResult, lang, setDetectedLanguage } = allProps;

	const textAreaRef = useRef();
	const [langCode, setLangCode] = useState();

	function callCurrenState() {
		// set container to show error or succes state after 5 seconds
		setContainer(true);
		setTimeout(() => {
			setContainer(false);
		}, 5000);
	}

	function Speak(sentence, langCode) {
		// function that speaks
		let lCode;
		const language = voices.filter((voiceItem) => {
			return voiceItem.lang.split("-")[0] === langCode;
		});
		language.forEach((language) => {
			const { lang } = language;
			lCode = lang.split("-")[0];
		});
		const utterance = new SpeechSynthesisUtterance(`${sentence}`);
		utterance.lang = lCode;
		return speechSynthesis.speak(utterance);
	}
	function handleReadText(side) {
		// function that reads the text
		side.current.value === ""
			? Speak("Sorry I cannot speak out an empty sentence, try typing something")
			: side === textAreaRef
			? Speak(`${side.current.value}`, langCode)
			: null;
	}
	function handlePasteText() {
		// function that writes the text to the screen
		const clippy = navigator.clipboard;
		if (clippy) {
			clippy.readText().then((text) => {
				text === "" ? (setError("Cannot paste empty text"), callCurrenState()) : (textAreaRef.current.value += text);
			});
		} else {
			setError("Cannot paste text!");
		}
	}
	function handleCutText() {
		const clippy = navigator.clipboard;
		if (!textAreaRef.current.value) {
			setContainer(true);
			callCurrenState();
			setError("Cannot copy empty space");
			setSuccess(false);
		} else if (clippy && textAreaRef.current.value) {
			clippy.writeText(textAreaRef.current.value);
			textAreaRef.current.value = "";
		} else {
			setContainer(true);
			callCurrenState();
			setError("Error copying text");
		}
	}
	function handleCopyText() {
		//function that copies text
		const clippy = navigator.clipboard;
		if (clippy && textAreaRef.current.value) {
			const checkCopied = clippy.writeText(textAreaRef.current.value);
			checkCopied ? setSuccess("Text copied!") : null;
			callCurrenState();
			setError(null);
		} else if (clippy && textAreaRef.current.value === "") {
			callCurrenState();
			setError("Cannot copy empty text");
			setSuccess(null);
		} else {
			callCurrenState();
			setSuccess(null);
			setError("Error copying text");
		}
	}
	function getLanguage(gottenLangCode) {
		// function that gets the language full name
		const codeContainer = {};
		allLanguageCodes.filter((eachCode, index) => {
			return gottenLangCode === eachCode ? ((codeContainer["code"] = eachCode), (codeContainer["index"] = index)) : null;
		});
		const languageName = allLanguages.filter((lang, index) => {
			return index === codeContainer.index ? lang : null;
		});
		return languageName ? languageName : "Language cannot be detected";
	}
	async function runDetection(e) {
		e.preventDefault();
		if (textAreaRef.current.value) {
			setLoading(true);
			const languageText = textAreaRef.current.value;
			try {
				const options = {
					method: "GET",
					headers: {
						"X-RapidAPI-Key": `${RAPID_KEY}`,
						"X-RapidAPI-Host": "translo.p.rapidapi.com",
					},
				};
				const response = await fetch(`https://translo.p.rapidapi.com/api/v3/detect?text=${languageText}`, options);
				const language = await response.json();
				const { ok, lang } = language;
				const languageName = getLanguage(lang);
				ok === true
					? (setLoading(false), setResult(true), setDetectedLanguage(languageName), setLangCode(lang))
					: (setError("Sorry can't detect language"), setResult(false));
			} catch (error) {
				console.log(error);
			}
		} else {
			setError("Cannot detect empty sentence");
			callCurrenState();
		}
	}
	return (
		<div className="translator-container container col-span-full md:col-start-2 md:col-end-12 lg:col-end-12 bg-white p-4 md:p-8 rounded-md mx-auto mt-4 h-max">
			<form action="" onSubmit={runDetection}>
				<div>
					<textarea
						id="text-input"
						rows="8"
						ref={textAreaRef}
						spellCheck="false"
						className="resize-none block w-full rounded-md transition duration-300 ease-in-out text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
						placeholder="Enter language text"></textarea>
				</div>
				<div className="grid grid-cols-4 py-3">
					<div className="flex flex-col items-center">
						<button
							type="button"
							className={`p-2 rounded-full transition duration-300 ease-in-out bg-transparent w-max mx-auto ${
								lang ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed"
							}`}
							disabled={lang ? false : true}
							onClick={() => handleReadText(textAreaRef)}>
							<Icon
								className={`flex ${lang ? "text-black" : "text-gray-500"}`}
								icon={`${lang ? "ph:speaker-high-light" : "ph:speaker-slash-light"}`}
							/>
						</button>
						<span className={`leading-none text-xs font-semibold flex ${lang ? "text-black" : "text-gray-500"}`}>Read</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto"
							onClick={handleCutText}>
							<Icon className="flex" icon="clarity:scissors-line" />
						</button>
						<span className="leading-none text-xs font-semibold">Cut</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto"
							onClick={handlePasteText}>
							<Icon className="flex" icon="fluent:clipboard-paste-24-regular" />
						</button>
						<span className="leading-none text-xs font-semibold">Paste</span>
					</div>
					<div className="flex flex-col items-center">
						<button
							type="button"
							className="p-2 rounded-full transition duration-300 ease-in-out bg-transparent hover:bg-gray-100 w-max mx-auto"
							onClick={handleCopyText}>
							<Icon className="flex" icon="fluent:clipboard-24-regular" />
						</button>
						<span className="leading-none text-xs font-semibold">Copy</span>
					</div>
				</div>
				<div className="submit-button text-center">
					<button
						disabled={loading === true ? true : false}
						type="submit"
						className={`transition ease-in-out duration-300 py-3 justify-center bg-primary w-full rounded-lg flex items-center gap-4 min-h-[3rem] ${
							loading ? "cursor-not-allowed" : "cursor-pointer"
						} hover:bg-opacity-95`}>
						<span className=" text-white font-semibold text-sm">Detect Language</span>
						<div
							className={`h-6 w-6 border-2 border-l-transparent rounded-full animate-spin ${
								loading === false ? "hidden" : "inline"
							}`}></div>
					</button>
				</div>
			</form>
		</div>
	);
};

export default LanguageDetect;
