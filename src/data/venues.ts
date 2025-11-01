export interface Venue {
	id: number;
	name: string;
	distance: string;
	grade: string;
	wifi: string;
	wifiScore: number;
	power: string;
	powerScore: number;
	noise: string;
	noiseScore: number;
	seating: string;
	seatingScore: number;
	address: string;
	hours: string;
	vibe: string;
	color: 'emerald' | 'amber' | 'violet' | 'orange';
}

export const venues: Venue[] = [
	{
		id: 1,
		name: "Brew & Bytes Cafe",
		distance: "0.3 km",
		grade: "A",
		wifi: "Great for video calls",
		wifiScore: 5,
		power: "Plentiful",
		powerScore: 5,
		noise: "Quiet",
		noiseScore: 5,
		seating: "Spacious",
		seatingScore: 5,
		address: "123 Tech Street, Downtown",
		hours: "7:00 AM - 10:00 PM",
		vibe: "Modern & Tech-Friendly",
		color: "emerald",
	},
	{
		id: 2,
		name: "The Daily Grind",
		distance: "0.5 km",
		grade: "B",
		wifi: "Good for browsing",
		wifiScore: 4,
		power: "Some outlets",
		powerScore: 3,
		noise: "Buzzy",
		noiseScore: 3,
		seating: "Cozy",
		seatingScore: 4,
		address: "456 Main Avenue, Central",
		hours: "6:00 AM - 8:00 PM",
		vibe: "Classic Coffee Shop",
		color: "amber",
	},
	{
		id: 3,
		name: "Code & Coffee Co.",
		distance: "0.8 km",
		grade: "A",
		wifi: "Great for video calls",
		wifiScore: 5,
		power: "Plentiful",
		powerScore: 5,
		noise: "Quiet",
		noiseScore: 5,
		seating: "Spacious",
		seatingScore: 5,
		address: "789 Innovation Blvd, Tech District",
		hours: "8:00 AM - 9:00 PM",
		vibe: "Startup Haven",
		color: "violet",
	},
	{
		id: 4,
		name: "Cafe Momentum",
		distance: "1.2 km",
		grade: "C",
		wifi: "Unreliable",
		wifiScore: 2,
		power: "Rare",
		powerScore: 2,
		noise: "Loud",
		noiseScore: 2,
		seating: "Cramped",
		seatingScore: 2,
		address: "321 Busy Street, Market Area",
		hours: "7:00 AM - 6:00 PM",
		vibe: "Bustling & Social",
		color: "orange",
	},
];
