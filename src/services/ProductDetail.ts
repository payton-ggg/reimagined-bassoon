import type { FilterParams, PaginationResponse } from "../types";

const PAGE_SIZE = 9;

export const Products = async (
	params: FilterParams
): Promise<PaginationResponse> => {
	try {
		const allDataUrl = `http://localhost:3000/products`;
		const allDataResponse = await fetch(allDataUrl);
		if (!allDataResponse.ok) throw new Error("Failed to fetch products");

		const allData: any[] = await allDataResponse.json();

		let filtered = allData;

		if (params.tag && params.tag.trim() !== "") {
			filtered = filtered.filter(
				(p) => Array.isArray(p.tags) && p.tags.includes(params.tag)
			);
		}
		if (params.subscription) {
			filtered = filtered.filter((p) => p.subscription === true);
		}
		if (params.priceRange) {
			filtered = filtered.filter(
				(p) =>
					p.price >= (params.priceRange?.[0] ?? 0) &&
					p.price <= (params.priceRange?.[1] ?? Infinity)
			);
		}

		const totalCount = filtered.length;
		const pages = Math.ceil(totalCount / PAGE_SIZE);
		const currentPage = params.page || 1;

		const startIndex = (currentPage - 1) * PAGE_SIZE;
		const endIndex = startIndex + PAGE_SIZE;
		const paginatedData = filtered.slice(startIndex, endIndex);

		return {
			data: paginatedData,
			pages,
			prev: currentPage > 1 ? currentPage - 1 : null,
			next: currentPage < pages ? currentPage + 1 : null,
			last: pages,
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};
