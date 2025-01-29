import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { invoke } from "@tauri-apps/api/core";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{
		label: "File Manager",
		key: "files",
		children: [
			{
				label: "Open Folder",
				key: "open",
			},
		],
	},
];

const Menubar: React.FC<{
	setCurFolder: (folder: string) => void;
}> = ({ setCurFolder }) => {
	async function dialog() {
		setCurFolder(await invoke("file_dialog", {}));
	}

	const onClick: MenuProps["onClick"] = (e) => {
		if (e.key == "open") {
			dialog();
		}
	};

	return <Menu onClick={onClick} mode="horizontal" items={items} />;
};

export default Menubar;
