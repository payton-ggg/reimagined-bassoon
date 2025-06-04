import type { IProduct } from "../types";

const ProductCard = ({
	title,
	image_src,
	vendor,
	tags,
	url,
	price,
	subscription_discount,
	subscription,
}: IProduct) => {
	return (
		<div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
			<div className="relative">
				<img
					className="w-full h-56 object-cover rounded-t-xl"
					src={image_src}
					alt={title}
				/>
				{subscription && (
					<div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
						🔄 Subscription Available
					</div>
				)}
			</div>

			<div className="px-6 py-5">
				<div className="font-bold text-2xl mb-2.5 text-gray-900">{title}</div>
				<p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-600 text-sm mb-3">
					{vendor}
				</p>

				<div className="flex items-center justify-between mb-5">
					<div className="flex items-baseline">
						<span className="text-sm text-gray-500 mr-1 font-medium">USD</span>
						<span className="text-2xl font-bold text-gray-900">
							{price.toFixed(2)}
						</span>
					</div>
					{subscription_discount > 0 && (
						<div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
							{subscription_discount}% OFF
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-2 mb-5">
					{tags.map((tag) => (
						<span
							key={tag}
							className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-3 py-1.5 rounded-full hover:scale-105 transition-transform duration-200 cursor-default"
						>
							#{tag}
						</span>
					))}
				</div>

				<a
					href={url}
					className="flex items-center justify-center gap-2 w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg	"
				>
					View Details
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
};

export default ProductCard;
