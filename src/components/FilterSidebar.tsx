import { useState } from "react";
import type { FilterSidebarProps, FilterState } from "../types";

const FilterSidebar = ({
	onFilterChange,
	availableTags,
}: FilterSidebarProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [filters, setFilters] = useState<FilterState>({
		priceRange: [0, 1000],
		tag: "",
		hasSubscription: false,
	});

	const handleFilterChange = (newFilters: Partial<FilterState>) => {
		const updatedFilters = {
			...filters,
			...newFilters,
		};
		setFilters(updatedFilters as FilterState);
		onFilterChange(updatedFilters as FilterState);
	};

	return (
		<div className="relative">
			<button
				className="md:hidden fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
				onClick={() => setIsOpen(!isOpen)}
			>
				<svg
					className="w-7 h-7"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
					/>
				</svg>
			</button>

			<div
				className={`bg-white p-6 rounded-xl shadow-xl transition-all duration-300 ease-in-out ${
					isOpen
						? "fixed inset-0 z-40 md:relative md:translate-x-0"
						: "hidden md:block"
				}`}
			>
				{isOpen && (
					<button
						className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
						onClick={() => setIsOpen(false)}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				)}
				<div className="space-y-8">
					<div>
						<h3 className="text-xl font-bold mb-3 text-gray-800">
							Filter by Tag
						</h3>
						<select
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
							value={filters.tag}
							onChange={(e) => handleFilterChange({ tag: e.target.value })}
						>
							<option value="">All Tags</option>
							{availableTags.map((tag) => (
								<option key={tag} value={tag}>
									{tag}
								</option>
							))}
						</select>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-3 text-gray-800">
							Price Range
						</h3>
						<div className="flex flex-col sm:flex-row gap-4 items-center">
							<input
								type="number"
								className="w-full sm:w-28 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
								value={filters.priceRange[0]}
								onChange={(e) =>
									handleFilterChange({
										priceRange: [Number(e.target.value), filters.priceRange[1]],
									})
								}
							/>
							<span className="text-gray-600 font-medium">to</span>
							<input
								type="number"
								className="w-full sm:w-28 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
								value={filters.priceRange[1]}
								onChange={(e) =>
									handleFilterChange({
										priceRange: [filters.priceRange[0], Number(e.target.value)],
									})
								}
							/>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-bold mb-3 text-gray-800">
							Subscription
						</h3>
						<label className="flex items-center space-x-3 cursor-pointer">
							<input
								type="checkbox"
								checked={filters.hasSubscription}
								onChange={(e) =>
									handleFilterChange({ hasSubscription: e.target.checked })
								}
								className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-blue-500 transition duration-150 ease-in-out"
							/>
							<span className="text-gray-700 text-base">
								Show subscription products only
							</span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
