import { Icon } from "@iconify-icon/react";
import { Fragment, useContext, useRef, useState } from "react";
import useHandleSearch from "./useHandleSearch";
import { ErrorSuccesContainerContext } from "./App";

const API_KEY_ONE = import.meta.env.VITE_API_KEY;
const voices = speechSynthesis.getVoices(); // get all voices

function Index() {
	const { view, changeView, setContainer, setError, setSuccess, loading, setLoading } = useContext(ErrorSuccesContainerContext);

	// hooks
	const [fromButtonState, setFromButtonState] = useState(); //dropdown button that toggles state when clicked
	const [toButtonState, setToButtonState] = useState(); //dropdown button that toggles state when clicked
	const [fromLangSearch, setFromLangSearch] = useState("");
	const [toLangSearch, setToLangSearch] = useState("");
	const [fromLangDropdown, setFromLangDropdown] = useState(false);
	const [toLangDropdown, setToLangDropdown] = useState(false);
	const fromTextareaRef = useRef(); //ref of the textarea
	const toTextareaRef = useRef(); //ref of the textarea
	let [fromLanguageHiddenInput, setFromLanguageHiddenInput] = useState("en"); //hidden input to
	let [toLanguageHiddenInput, setToLanguageHiddenInput] = useState("fr"); //hidden input from

	// custom hook
	const fromLanguagesArray = useHandleSearch(fromLangSearch); //for the fromDropdown input
	const toLanguagesArray = useHandleSearch(toLangSearch); // for the toDropdown input

	const toLanguageTextContainer = document.querySelector("#to_lang span");
	const fromLanguageTextContainer = document.querySelector("#from_lang span");

	// local functions
	async function translate() {
		try {
			const encodedParams = new URLSearchParams();
			encodedParams.append("from", `${fromLanguageHiddenInput}`);
			encodedParams.append("to", `${toLanguageHiddenInput}`);
			encodedParams.append("text", `${fromTextareaRef.current.value}`);

			const options = {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					"X-RapidAPI-Key": `${API_KEY_ONE}`,
					"X-RapidAPI-Host": "translo.p.rapidapi.com",
				},
				body: encodedParams,
			};

			const response = await fetch("https://translo.p.rapidapi.com/api/v3/translate", options);
			if (!response.ok) {
				setError(response.status), callCurrenState(), setSuccess(null);
			}
			const data = await response.json();
			setLoading(false);
			const { ok, translated_text } = data;

			ok === true
				? (toTextareaRef.current.value = translated_text)
				: (setError("Cannot translate sentence"), callCurrenState(), setSuccess(false));
		} catch (error) {
			setError("Error trying to translate what you entered");
		}
	}

	function runTranslation(e) {
		e.preventDefault();
		translate();
		setLoading(true);
	}

	function handleFromSearch(value) {
		setFromLangSearch(value);
	}
	function handleToSearch(value) {
		setToLangSearch(value);
	}
	function handleFromDropdown() {
		setFromLangDropdown((togglePrevious) => !togglePrevious);
	}
	function handleToDropdown() {
		setToLangDropdown((togglePrevious) => !togglePrevious);
	}
	function setFromLanguage(languageCode, language, index) {
		fromLanguageTextContainer.textContent = language;
		handleFromDropdown();
		setFromButtonState(index);
		setFromLanguageHiddenInput(languageCode);
	}
	function setToLanguage(languageCode, language, index) {
		toLanguageTextContainer.textContent = language;
		handleToDropdown();
		setToButtonState(index);
		setToLanguageHiddenInput(languageCode);
	}
	function callCurrenState() {
		// set container to true then hide it after 5 seconds
		setContainer(true);
		setTimeout(() => {
			setContainer(false);
		}, 5000);
	}
	//function that copies text
	function handleCopyText(side) {
		const clippy = navigator.clipboard;
		if (clippy && side.current.value) {
			const checkCopied = clippy.writeText(side.current.value);
			checkCopied ? setSuccess("Text copied!") : null;
			callCurrenState();
			setError(null);
		} else if (clippy && side.current.value === "") {
			callCurrenState();
			setError("Cannot copy empty text");
			setSuccess(null);
		} else {
			callCurrenState();
			setSuccess(null);
			setError("Error copying text");
		}
	}
	// function that writes the text to the screen
	function handlePasteText(side) {
		const clippy = navigator.clipboard;
		if (clippy) {
			clippy.readText().then((text) => {
				text === "" ? (setError("Cannot paste empty text"), callCurrenState()) : (side.current.value += text);
			});
		} else {
			setError("Cannot paste text!");
		}
	}
	// function that speaks
	function Speak(sentence, langCode) {
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
	// function that reads the text
	function handleReadText(side) {
		side.current.value === ""
			? Speak("Sorry I cannot speak out an empty sentence, try typing something")
			: side === fromTextareaRef
			? Speak(`${side.current.value}`, fromLanguageHiddenInput)
			: Speak(`${side.current.value}`, toLanguageHiddenInput);
	}
	// function that swaps the textarea to eachother's position
	function handleSwap() {
		// swap the values and textContent of each of them
		[fromTextareaRef.current.value, toTextareaRef.current.value] = [toTextareaRef.current.value, fromTextareaRef.current.value];
		[fromLanguageTextContainer.textContent, toLanguageTextContainer.textContent] = [
			toLanguageTextContainer.textContent,
			fromLanguageTextContainer.textContent,
		];
		const langCodeA = toLanguageHiddenInput;
		const langCodeB = fromLanguageHiddenInput;
		setFromLanguageHiddenInput(langCodeA);
		setToLanguageHiddenInput(langCodeB);
		setToButtonState(null);
		setFromButtonState(null);
	}

	return (
		<div className="translator-container container col-span-full md:col-start-1 md:col-end-13 lg:col-start-2 lg:col-end-12 bg-white rounded-md mx-auto mt-4 h-max">
			<div className="pre-form-container bg-white p-4 md:p-8 rounded-md">
				<form action="" onSubmit={runTranslation}>
					<div className="form-inner flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 flex-wrap">
						<div className="from_lang flex flex-col-reverse md:flex-col flex-grow w-full md:w-auto">
							<textarea
								ref={fromTextareaRef}
								id="text-input"
								rows="8"
								spellCheck="false"
								className="resize-none block w-full rounded-bl-md rounded-br-md md:rounded-bl-none md:rounded-br-none md:rounded-tl-md md:rounded-tr-md transition duration-300 ease-in-out md:border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
								placeholder="Enter text"
								required></textarea>
							<div className="border pt-3 rounded-tl-md rounded-tr-md md:rounded-tl-none md:rounded-tr-none pb-2 flex items-center justify-around md:rounded-bl-md md:rounded-br-md">
								<div className="flex items-center flex-col">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handleReadText(fromTextareaRef)}>
										<Icon icon="iconoir:sound-high" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Read</span>
								</div>
								<div className="flex flex-col items-center">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handleCopyText(fromTextareaRef)}>
										<Icon icon="fluent:clipboard-24-regular" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Copy</span>
								</div>
								<div className="flex flex-col items-center">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handlePasteText(fromTextareaRef)}>
										<Icon icon="fluent:clipboard-paste-24-regular" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Paste</span>
								</div>
								<div className="relative">
									<div className="flex flex-col items-start">
										<button
											id="from_lang"
											className="flex items-center gap-2 pt-2 pb-1"
											type="button"
											onClick={handleFromDropdown}>
											<span className="text-xs font-bold">English</span>
											<Icon icon="ph:caret-down-bold" />
										</button>
										<span className="text-[10px] font-semibold leading-none">Select lang</span>
									</div>
									<div
										className={`transition duration-300 transform ease-in-out absolute rounded-md bg-white w-64 md:w-72 p-2 md:right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] md:top-0 top-full -right-8 translate-y-2
													${fromLangDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
												`}>
										<div className="input-container">
											<div className="relative">
												<input
													type="text"
													className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
													aria-label="input text"
													onChange={(e) => handleFromSearch(e.target.value)}
													placeholder="Search by language/language code"
												/>
												<input type="hidden" name="from_language" value={fromLanguageHiddenInput} />
												<Icon
													icon="iconoir:search"
													className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												/>
											</div>
											<div className="mt-2 flex flex-col gap-y-2">
												<div className="bg-primary p-2 rounded-md">
													<span className="text-xs text-white font-semibold">Select language to translate from</span>
												</div>
												<div className="country-codes-names h-44 overflow-y-auto flex flex-col gap-y-1">
													{fromLanguagesArray &&
														fromLanguagesArray.map((language, index) => {
															const { code, lang } = language;
															return (
																<button
																	type="button"
																	className={` flex items-center justify-start gap-4 py-1 px-2  transition duration-300 ease-in-out rounded-md font-semibold w-full _aof23IF ${
																		fromButtonState === index
																			? "bg-primary text-white bg-opacity-70 hover:text-white hover:bg-opacity-90 hover:bg-primary"
																			: "bg-transparent text-gray-900 hover:bg-gray-200"
																	}`}
																	key={index}
																	onClick={() => setFromLanguage(code, lang, index)}>
																	<span className="text-xs p-1">{code?.toUpperCase()}</span>
																	<span className="text-xs">{lang}</span>
																</button>
															);
														})}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<button
							type="button"
							onClick={handleSwap}
							className="transition ease-in-out duration-300  hover:bg-primary hover:text-white md:hover:rotate-[180deg] shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] flex items-center h-max p-3 rotate-90 md:rotate-0 rounded-full text-2xl text-primary">
							<Icon icon="uil:exchange" />
						</button>

						<div className="to_lang flex flex-col-reverse md:flex-col flex-grow w-full md:w-auto">
							<textarea
								ref={toTextareaRef}
								id="text-output"
								rows="8"
								spellCheck="false"
								className="resize-none block w-full rounded-bl-md rounded-br-md md:rounded-bl-none md:rounded-br-none md:rounded-tl-md md:rounded-tr-md transition duration-300 ease-in-out md:border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0 px-3 py-2"
								placeholder="Translation"></textarea>
							<div className="border pt-3 rounded-tl-md rounded-tr-md md:rounded-tl-none md:rounded-tr-none pb-2 flex items-center justify-around md:rounded-bl-md md:rounded-br-md">
								<div className="flex flex-col items-center">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handleReadText(toTextareaRef)}>
										<Icon icon="iconoir:sound-high" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Speak</span>
								</div>
								<div className="flex flex-col items-center">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handleCopyText(toTextareaRef)}>
										<Icon icon="fluent:clipboard-24-regular" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Copy</span>
								</div>
								<div className="flex flex-col items-center">
									<button
										type="button"
										className="transition duration-300 ease-in-out rounded-full p-2 flex hover:bg-gray-200"
										onClick={() => handlePasteText(toTextareaRef)}>
										<Icon icon="fluent:clipboard-paste-24-regular" />
									</button>
									<span className="text-[10px] font-semibold leading-none">Paste</span>
								</div>
								<div className="relative">
									<div className="flex flex-col items-start">
										<button id="to_lang" className="flex items-center gap-2 pt-2 pb-1" type="button" onClick={handleToDropdown}>
											<span className="text-xs font-bold">French</span>
											<Icon icon="ph:caret-down-bold" />
										</button>
										<span className="text-[10px] font-semibold leading-none">Select lang</span>
									</div>
									<div
										className={`transition duration-300 transform ease-in-out absolute rounded-md bg-white w-64 md:w-72 p-2 md:right-full z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] md:top-0 top-full -right-8 translate-y-4
																${toLangDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
												`}>
										<div className="input-container">
											<div className="relative">
												<input
													type="text"
													className="border w-full focus:border-primary focus:outline-none p-2 pl-7 placeholder:text-xs rounded-md text-sm transition duration-[280ms] ease-in-out"
													aria-label="input text"
													onChange={(e) => handleToSearch(e.target.value)}
													placeholder="Search by language/language code"
												/>
												<input type="hidden" name="to_language" value={toLanguageHiddenInput} />
												<Icon
													icon="iconoir:search"
													className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
												/>
											</div>
											<div className="mt-2 flex flex-col gap-y-2">
												<div className="bg-primary p-2 rounded-md">
													<span className="text-xs text-white font-semibold">Select language to translate to </span>
												</div>
												<div className="country-codes-names h-44 overflow-y-auto">
													{toLanguagesArray &&
														toLanguagesArray.map((language, index) => {
															const { code, lang } = language;
															return (
																<button
																	type="button"
																	className={`flex items-center justify-start gap-4 py-1 px-2 hover:bg-gray-100 transition duration-300 ease-in-out rounded-md font-semibold w-full  ${
																		toButtonState === index
																			? "bg-primary text-white bg-opacity-70 hover:text-white hover:bg-opacity-90 hover:bg-primary"
																			: "bg-transparent text-gray-900 hover:bg-gray-200"
																	}`}
																	key={index}
																	onClick={() => setToLanguage(code, lang, index)}>
																	<span className="text-xs p-1">{code?.toUpperCase()}</span>
																	<span className="text-xs">{lang}</span>
																</button>
															);
														})}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="submit-button text-center mt-8">
						<button
							disabled={loading ? true : false}
							type="submit"
							className={`transition ease-in-out duration-300 py-3 justify-center bg-primary w-full rounded-lg flex items-center gap-4 min-h-[3rem] ${
								loading ? "cursor-not-allowed" : "cursor-pointer"
							} hover:bg-opacity-95`}>
							<span className=" text-white font-semibold text-sm">Translate Text</span>
							<div
								className={`h-6 w-6 border-2 border-l-transparent rounded-full animate-spin ${
									loading === false ? "hidden" : "inline"
								}`}></div>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Index;
