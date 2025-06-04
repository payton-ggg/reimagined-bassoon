export type IProduct = {
	id: number;
	slug: string;
	title: string;
	image_src: string;
	vendor: string;
	tags: string[];
	published: boolean;
	url: string;
	price: number;
	subscription_discount: number;
	subscription: boolean;
};

export type FilterState = {
	priceRange: [number, number];
	tag: string;
	hasSubscription: boolean;
};

export type FilterSidebarProps = {
	onFilterChange: (filters: FilterState) => void;
	availableTags: string[];
};

export type PaginationResponse = {
	first?: number;
	prev?: number | null;
	next?: number | null;
	last?: number;
	pages?: number;
	items?: number;
	data?: any[];
};

export type FilterParams = {
	page?: number;
	tag?: string;
	subscription?: boolean;
	priceRange?: [number, number];
};
