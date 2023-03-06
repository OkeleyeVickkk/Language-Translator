import ISO6391 from "iso-639-1";
import "./App.css";
import { Icon } from "@iconify-icon/react";

function App() {
	function handleSwap(e) {
		console.log(e);
	}

	return (
		<div className="App">
			<div className="min-h-screen py-8 bg-primary grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 items-center px-3 md:px-5">
				<div className=" translator-container container col-span-full md:col-start-1 md:col-end-12 lg:col-start-2 lg:col-end-10 bg-white p-4 md:p-8 rounded-md mx-auto">
					<div className="pre-form-container ">
						<form action="">
							<div className="form-inner flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 flex-wrap">
								<div className="from_lang flex flex-col flex-grow w-full md:w-auto">
									<textarea
										id="text-input"
										rows="8"
										className="resize-none block w-full rounded-tl-md rounded-tr-md transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border focus:border-primary focus:shadow-none focus:outline-0"
										placeholder="Enter text"
										required></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<div className="relative">
											<button id="_from_lang" className="flex items-center gap-2" type="button">
												<span className="text-sm font-semibold">English</span>
												<Icon icon="ph:caret-down-bold" />
											</button>
											<div className="absolute rounded-md bg-white max-w-72 p-2 right-0 z-[5] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
												<div className="input-container">
													<input type="text" aria-label="input text" />
												</div>
											</div>
										</div>
									</div>
								</div>

								<button
									type="button"
									onClick={handleSwap}
									className="shadow-sm flex items-center h-max p-3 rotate-90 md:rotate-0 rounded-full text-2xl text-primary">
									<Icon icon="uil:exchange" />
								</button>
								<div className="to_lang flex flex-col flex-grow w-full md:w-auto">
									<textarea
										id="text-output"
										rows="8"
										className="resize-none block w-full rounded-tl-md rounded-tr-md  transition duration-300 ease-in-out border-b-0 text-sm text-gray-800 bg-white border"
										placeholder="Translation"
										required></textarea>
									<div className="border py-3 flex items-center justify-around rounded-bl-md rounded-br-md">
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="iconoir:sound-high" />
										</button>
										<button type="button" className="transition duration-300 ease-in-out flex rounded-full p-3 hover:bg-gray-300">
											<Icon icon="fluent:clipboard-24-regular" />
										</button>
										<button
											id="dropdown_to_lang"
											data-dropdown-toggle="dropdownSearch"
											data-dropdown-placement="bottom"
											className="flex items-center gap-2"
											type="button">
											<span className="text-sm font-semibold">English</span>
											<Icon icon="ph:caret-down-bold" />
										</button>
									</div>
								</div>
							</div>
							<div className="submit-button text-center mt-4">
								<button type="submit" className="py-4 bg-primary w-full rounded-lg text-white font-semibold text-sm">
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
