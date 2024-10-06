import * as core from "@actions/core";
import { exec } from "@actions/exec";

import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const install = async () => {
	core.startGroup("Install attic");

	core.info("Installing attic");

	try {
		await exec("nix", ["profile", "install", "github:zhaofengli/attic"]);
	} catch (e) {
		core.setFailed(`Action failed with error: ${e}`);
	}

	core.endGroup();
};

export const isInstalled = async () => {
	let return_code = await exec("attic", ["-V"]);
	return return_code === 0;
};
