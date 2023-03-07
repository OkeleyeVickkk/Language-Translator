import ISO6391 from "iso-639-1";
import { useEffect, useState } from "react";

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
	const [filteredLanguages, setfilteredLanguages] = useState(null);

	useEffect(() => {
		if (textValue) {
			const filtered_lang = codesArray.filter((lang) => {
				const { code, language } = lang;
				return textValue?.toLowerCase() === language.toLowerCase() || textValue?.toLowerCase() === code.toLowerCase();
			});
			setfilteredLanguages(filtered_lang);
		} else {
			setfilteredLanguages(codesArray);
		}
	}, [textValue]);

	return { filteredLanguages };
};

export default useFilter;
