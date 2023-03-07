import ISO6391 from "iso-639-1";
import { useEffect, useState } from "react";

let codesArray = [];
const allLanguageCodes = [...ISO6391.getAllCodes()];
const allLanguages = [...ISO6391.getAllNames()];
allLanguageCodes.forEach((code, codeIndex) => {
	allLanguages.forEach((lang, index) => {
		const language_code = {};
		if (codeIndex === index) {
			language_code["code"] = code;
			language_code["lang"] = lang;
			codesArray.push(language_code);
		}
	});
});

// custom hook
const useHandleSearch = (searchValue) => {
	const [languages, setSearchResultArray] = useState([]);
	useEffect(() => {
		if (searchValue) {
			const newValue = searchValue.toLowerCase();
			const filteredSearchArray = codesArray.filter((language) => {
				const { code, lang } = language;
				const newCode = code.toLowerCase();
				const newLang = lang.toLowerCase();
				return newValue === newCode || newValue === newLang;
			});
			filteredSearchArray.length !== 0 ? setSearchResultArray(filteredSearchArray) : setSearchResultArray(codesArray);
		} else {
			setSearchResultArray(codesArray);
		}
	}, [searchValue]);

	return languages;
};

export default useHandleSearch;
