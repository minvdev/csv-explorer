/// <reference lib="webworker" />

import Papa from "papaparse";

import type { CsvRow } from "./types";

const workerScope = self as unknown as DedicatedWorkerGlobalScope;

workerScope.onmessage = (event: MessageEvent<string>) => {
	const result = Papa.parse<CsvRow>(event.data, {
		header: true,
		skipEmptyLines: "greedy",
	});
	workerScope.postMessage(result);
};
