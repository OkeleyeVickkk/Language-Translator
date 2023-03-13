import { Icon } from "@iconify-icon/react";

const Modal = ({ props, language }) => {
	const [result, setResult] = props;
	const [lang, setDetectedLanguage] = language;
	return (
		<div className={`transition duration-300 ease-in-out ${result ? "opacity-100 visible" : "opacity-0 invisible"}`}>
			<div
				className={`fixed w-full h-full flex items-center z-10 justify-center glassmorphism transition duration-300  ${
					result ? "translate-y-0 opacity-100 visible" : "opacity-0 invisible translate-y-4"
				}`}>
				<div className="w-full mx-2 md:grid md:grid-cols-5">
					<div className="bg-white rounded-lg col-start-1 md:col-start-2 col-span-full md:col-end-5">
						<div className="modal-header flex items-center justify-between p-3 border-b">
							<h2 className="font-semibold">Language detected</h2>
							<button
								className="p-2 rounded-full bg-transparent hover:bg-gray-200 transition duration-300 ease-in-out"
								onClick={() => setResult(false)}>
								<Icon icon="ph:x-bold" className="flex" />
							</button>
						</div>
						<div className="modal-body p-4">
							<span className="font-bold text-xl">Result:</span>
							<div className="block text-center py-8">
								<span className="text-bold text-4xl font-semibold">{lang ? lang : "Language undetected"}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
