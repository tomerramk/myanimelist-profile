import React, { useState, useEffect } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSelector: React.FC = () => {
	const [currentTheme, setCurrentTheme] = useState("light");

	const setThemeFromSystemPreference = () => {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		setCurrentTheme(prefersDark ? "dark" : "light");
	};

	const handleChange = (newTheme: string) => {
		const root = document.documentElement;
		root.setAttribute("data-theme", newTheme);
		setCurrentTheme(newTheme);
	};

	useEffect(() => {
		// Set theme based on system preference or saved setting
		const root = document.documentElement;
		const savedTheme = root.getAttribute("data-theme");
		if (savedTheme) {
			setCurrentTheme(savedTheme);
		} else {
			setThemeFromSystemPreference();
		}

		// Listener for system theme changes
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemThemeChange = () => {
			if (currentTheme === "system") {
				setThemeFromSystemPreference();
			}
		};
		mediaQuery.addEventListener("change", handleSystemThemeChange);

		return () => {
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
		};
	}, [currentTheme]);

	const getThemeIcon = () => {
		if (
			currentTheme === "dark" ||
			(currentTheme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			return <MoonIcon width="20" height="20" />;
		} else {
			return <SunIcon width="20" height="20" />;
		}
	};
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className="focus: hover:bg-content-50 flex cursor-pointer items-center justify-center rounded-md bg-bkg p-2.5 outline-none">
				{getThemeIcon()}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className="ml-2 mt-1 w-28 overflow-hidden rounded-lg bg-bkg p-1.5 shadow-lg outline-none">
				<DropdownMenu.Item
					className="hover:bg-content-50 cursor-pointer rounded-md p-2 outline-none"
					onSelect={() => handleChange("light")}
				>
					Light
				</DropdownMenu.Item>
				<DropdownMenu.Item
					className="hover:bg-content-50 cursor-pointer rounded-md p-2 outline-none"
					onSelect={() => handleChange("dark")}
				>
					Dark
				</DropdownMenu.Item>
				<DropdownMenu.Item
					className="hover:bg-content-50 cursor-pointer rounded-md p-2 outline-none"
					onSelect={() => handleChange("system")}
				>
					System
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default ThemeSelector;
