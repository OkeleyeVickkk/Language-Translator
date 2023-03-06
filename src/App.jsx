import ISO6391 from "iso-639-1";
import "./App.css";
import { Icon } from "@iconify-icon/react";

function App() {
	return (
		<div className="App">
			<div className="min-h-screen bg-primary flex items-center px-3 md:px-5">
				<div className=" translator-container container bg-white p-4 md:p-8 rounded-md">
					<div className="pre-form-container ">
						<form action="">
							<div className="form-inner grid md:grid-cols-2 gap-8 md:gap-0 ">
								<div className="from_lang flex flex-col">
									<textarea
										id="text-input"
										rows="8"
										className="resize-none block w-full md:rounded-none md:rounded-tl-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border"
										placeholder="Enter text"
										required></textarea>
									<div className="border"></div>
								</div>
								<div className="to_lang flex flex-col">
									<textarea
										id="text-output"
										rows="8"
										className="resize-none block w-full md:rounded-none md:rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border"
										placeholder="Translation"
										required></textarea>
									<div className=""></div>
								</div>
							</div>
							<div className="submit-button text-center mt-4">
								<button type="submit" className="py-4 bg-primary w-full rounded-lg text-white font-semibold">
									Translate Text
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
