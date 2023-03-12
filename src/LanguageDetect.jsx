import { useContext } from "react";
import { ErrorSuccesContainerContext } from "./App";

const LanguageDetect = () => {
	const { view, changeView, container, setContainer, error, setError, success, setSuccess } = useContext(ErrorSuccesContainerContext);

	return <div>LanguageDetect</div>;
};

export default LanguageDetect;
