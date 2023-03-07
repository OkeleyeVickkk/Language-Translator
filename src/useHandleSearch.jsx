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

const useHandleSearch = (searchValue) => {
	const [resultArray, setSearchResultArray] = useState([]);

	useEffect(() => {
		if (searchValue) {
			const newValue = searchValue.toLowerCase();
			const filteredSearchArray = codesArray.filter((language) => {
				const { code, lang } = language;
				const newCode = code.toLowerCase();
				const newLang = lang.toLowerCase();
				return newValue === newCode || newValue === newLang;
			});
			if (filteredSearchArray.length !== 0) {
				setSearchResultArray(filteredSearchArray);
			} else {
				setSearchResultArray(codesArray);
			}
		}
	}, [searchValue]);

	return { resultArray };
};

export default useHandleSearch;
