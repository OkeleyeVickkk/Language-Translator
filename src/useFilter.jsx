import ISO6391 from "iso-639-1";
import { useState } from "react";

export let codesArray = [];
const allLanguageCodes = [...ISO6391.getAllCodes()];
const allLanguages = [...ISO6391.getAllNames()];
allLanguageCodes.forEach((code, codeIndex) => {
	allLanguages.forEach((lang, index) => {
		const language_code = {};
		if (codeIndex === index) {
			language_code["code"] = code;
			language_code["language"] = lang;
			codesArray.push(language_code);
		}
	});
});

const useFilter = (textValue) => {
	const [filteredLanguages, setfilteredLanguages] = useState([]);

	codesArray.filter((lang) => {
		const { code, language } = lang;
		return textValue?.toLowerCase() === language.toLowerCase() || textValue?.toLowerCase() === code.toLowerCase();
	});
	setfilteredLanguages(filteredLanguages);
	return { filteredLanguages };
};

export default useFilter;
