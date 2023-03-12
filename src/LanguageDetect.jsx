import { useContext } from "react";
import { ErrorSuccesContainerContext } from "./App";

const API_KEY_TWO = import.meta.env.VITE_LANG_DETECT_KEY;
const languageDetector = new DetectLanguage(`${API_KEY_TWO}`);

const text = "ọlọrun iyanu";

const LanguageDetect = () => {
	const { view, changeView, container, setContainer, error, setError, success, setSuccess } = useContext(ErrorSuccesContainerContext);

	return <></>;
};

export default LanguageDetect;
