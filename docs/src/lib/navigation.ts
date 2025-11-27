import { defineNavigation } from "@svecodocs/kit";
import ChalkboardTeacher from "phosphor-svelte/lib/ChalkboardTeacher";
import RocketLaunch from "phosphor-svelte/lib/RocketLaunch";
import Tag from "phosphor-svelte/lib/Tag";
import { getAllDocs } from "./utils.js";
import type { Neighbor, SidebarNavSection, NavigationNeighbors, Navigation } from "@svecodocs/kit";

const allDocs = getAllDocs();

const components = allDocs
	.filter((doc) => doc.section === "Components")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
		description: doc.description,
	}));

const configuration = allDocs
	.filter((doc) => doc.section === "Configuration")
	.map((doc) => ({
		title: doc.title,
		href: `/docs/${doc.slug}`,
		description: doc.description,
	}));

export const navigation = defineNavigation({
	anchors: [
		{
			title: "Introduction",
			description: "What exactly is Svecodocs?",
			href: "/docs",
			icon: ChalkboardTeacher,
		},
		{
			title: "Getting Started",
			description: "A quick guide to get started using Svecodocs",
			href: "/docs/getting-started",
			icon: RocketLaunch,
		},
		{
			title: "Releases",
			description: "See the latest changes and updates",
			href: "https://github.com/svecosystem/svecodocs/releases",
			icon: Tag,
		},
	],
	sections: [
		{
			title: "Configuration",
			items: configuration,
		},
		{
			title: "Components",
			items: components,
		},
	],
}) satisfies Navigation;

export function flatNavigationItems(): Neighbor[] {
	const flatNav: Neighbor[] = [];

	const anchors = navigation?.anchors || [];

	flatNav.push(...anchors.filter(anchor => !anchor.disabled));

	for (const section of navigation?.sections as SidebarNavSection[]) {
		if (section && section.items.length > 0) {
			const internalItems = section.items.filter(item => !item.external);
			flatNav.push(...internalItems);
		}
	}

	return flatNav;
}

const flatNavs = flatNavigationItems();

export function getNavigationNeighbors(currentHref: string): NavigationNeighbors {
	const currentIndex = flatNavs.findIndex(item => item.href === currentHref);

	if (currentIndex === -1) {
		return { previous: null, next: null };
	}

	const previous = currentIndex > 0 ? flatNavs[currentIndex - 1] : null;
	const next = currentIndex < flatNavs.length - 1 ? flatNavs[currentIndex + 1] : null;

	return { previous, next };
}
