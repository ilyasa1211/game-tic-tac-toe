function errorHandler(
	event: string | Event,
	source: string | undefined,
	lineNumber: number | undefined,
	columnNumber: number | undefined,
	error: Error | undefined,
) {
	if (error instanceof ResultMessage) {
		gameMode.textContent = error.message;
		return;
	}

	// if (error instanceof InformationalMessage) {
	alertContainer.classList.remove("hidden");
	alertMessage.textContent = error?.message ?? "Error Occured!";
	// }
}
