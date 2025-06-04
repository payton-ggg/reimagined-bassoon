import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import { Products } from "./services/ProductDetail";
import FilterSidebar from "./components/FilterSidebar";
import type { PaginationResponse } from "./types";

function App() {
	const [product, setProduct] = useState<PaginationResponse | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const availableTags = ["Formula", "Cat", "Chews", "Dog", "Shampoo"];
	const [filters, setFilters] = useState({
		tag: "",
		priceRange: [0, 1000] as [number, number],
		hasSubscription: false,
	});

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const data = await Products({
					page: currentPage,
					tag: filters.tag,
					subscription: filters.hasSubscription,
					priceRange: filters.priceRange,
				});
				setProduct(data);
			} catch (e) {
				setError("Failed to load product. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [currentPage, filters]);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!product) return <div>No product found</div>;

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col md:flex-row gap-6">
				<div className="md:w-1/4">
					<FilterSidebar
						availableTags={availableTags}
						onFilterChange={(newFilters) => {
							setFilters(newFilters);
							setCurrentPage(1);
						}}
					/>
				</div>
				<div className="md:w-3/4">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{product?.data?.map((item: any, index: number) => (
							<ProductCard key={item.id || index} {...item} />
						))}
					</div>

					<div className="flex justify-center items-center space-x-4 mt-6">
						<button
							onClick={() => setCurrentPage(product.prev || 1)}
							disabled={!product.prev}
							className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
						>
							Previous
						</button>
						<span className="text-gray-600">
							Page {currentPage} of {product.pages}
						</span>
						<button
							onClick={() =>
								setCurrentPage(product?.next ?? product?.last ?? currentPage)
							}
							disabled={!product.next}
							className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
