import { program } from "commander";
import type { Run } from "./types";

import { green } from "kleur/colors";
import { readFile, writeFile } from "node:fs/promises";

program
	.name("sarif-strip-suppressed")
	.version("0.2.0", "-v, --version")
	.description("Strips suppressed results from SARIF files");

program.argument("file");
program.parse();

const file = program.args[0];

const fileContents = await readFile(file, { encoding: "utf-8" });
const fileData = JSON.parse(fileContents) as { runs: Run[] };

for (let runIdx = 0; runIdx < fileData.runs.length; runIdx++) {
	const run = fileData.runs[runIdx];

	if (run.results) {
		const before = run.results.length;
		run.results = run.results.filter((res) => !res.suppressions || res.suppressions.length === 0);
		const after = run.results.length;

		console.log(`Run #${runIdx}: ${before} -> ${after}`);
	}
}

await writeFile(file, JSON.stringify(fileData, undefined, 2));
console.log(green(`Processed ${file}!`));
