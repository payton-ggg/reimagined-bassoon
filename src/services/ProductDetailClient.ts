import type { FilterParams, PaginationResponse } from "../types";

const PAGE_SIZE = 12;

export const Products = async (
	params: FilterParams
): Promise<PaginationResponse> => {
	try {
		// Строим URL с параметрами фильтрации
		const url = new URL(`http://localhost:3000/products`);
		url.searchParams.append("_page", params.page?.toString() || "1");
		url.searchParams.append("_limit", PAGE_SIZE.toString());

		// Добавляем фильтры в URL (если ваш API их поддерживает)
		if (params.tag && params.tag.trim() !== "") {
			url.searchParams.append("tags_like", params.tag);
		}
		if (params.subscription) {
			url.searchParams.append("subscription", "true");
		}
		if (params.priceRange) {
			url.searchParams.append("price_gte", params.priceRange[0].toString());
			url.searchParams.append("price_lte", params.priceRange[1].toString());
		}

		const response = await fetch(url.toString());
		if (!response.ok) throw new Error("Failed to fetch products");

		const data: any[] = await response.json();
		const totalCount = Number(response.headers.get("X-Total-Count") || 0);
		const pages = Math.ceil(totalCount / PAGE_SIZE);
		const currentPage = params.page || 1;

		return {
			data,
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
