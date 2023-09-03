import { program } from "commander";
import type { Run } from "./types";

import { green } from "kleur/colors";
import { readFile, writeFile } from "node:fs/promises";

program
	.name("sarif-strip-suppressed")
	.version("0.1.0", "-v, --version")
	.description("Strips suppressed results from SARIF files");

program.argument("file");
program.parse();

const file = program.args[0];

const fileContents = await readFile(file, { encoding: "utf-8" });
const fileData = JSON.parse(fileContents) as { runs: Run[] };

for (const run of fileData.runs) {
	if (run.results) {
		run.results = run.results.filter((res) => !res.suppressions || res.suppressions.length === 0);
	}
}

await writeFile(file, JSON.stringify(fileData, undefined, 2));
console.log(green(`Processed ${file}!`));
