"use client";

import React from "react";
import {useSession} from "next-auth/react";
import {Card, Image, Divider, SelectItem, Select, Link} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";

const fuelTypes = [
	{value: "lpg", label: "LPG"},
	{value: "plugin-hybrid", label: "Plugin Hybrid"},
	{value: "petrol", label: "Petrol"},
	{value: "electric", label: "Electric"},
	{value: "cng", label: "CNG"},
	{value: "diesel", label: "Diesel"},
];

const gearboxTypes = [
	{value: "manual", label: "Manual"},
	{value: "automatic", label: "Automatic"},
];

const categories = [
	{value: "osobowe", label: "Osobowe"},
	{value: "motocykle-i-quady", label: "Motocykle i Quady"},
	{value: "dostawcze", label: "Dostawcze"},
	{value: "ciezarowe", label: "Ciezarowe"},
	{value: "maszyny-budowlane", label: "Maszyny Budowlane"},
	{value: "przyczepy", label: "Przyczepy"},
	{value: "maszyny-rolnicze", label: "Maszyny Rolnicze"},
];

const carBodies = [
	{value: "minibus", label: "Minibus"},
	{value: "pickup", label: "Pickup"},
	{value: "coupe", label: "Coupe"},
	{value: "estate-car", label: "Estate Car"},
	{value: "hatchback", label: "Hatchback"},
	{value: "mvp", label: "MVP"},
	{value: "suv", label: "SUV"},
	{value: "off-road-vehicle", label: "Off-Road Vehicle"},
	{value: "cabriolet", label: "Cabriolet"},
];

const colors = [
	{value: "srebrny", label: "Srebrny"},
	{value: "brazowy_bezowy", label: "Brazowy Bezowy"},
	{value: "inny", label: "Inny"},
	{value: "bialy", label: "Bialy"},
	{value: "niebieski", label: "Niebieski"},
	{value: "szary", label: "Szary"},
	{value: "czerwony", label: "Czerwony"},
	{value: "zolty_zloty", label: "Zolty Zloty"},
	{value: "zielony", label: "Zielony"},
];

const drives = [
	{value: "all-wheel-lock", label: "All Wheel Lock"},
	{value: "front-wheel", label: "Front Wheel"},
	{value: "all-wheel-auto", label: "All Wheel Auto"},
	{value: "rear-wheel", label: "Rear Wheel"},
	{value: "all-wheel-permanent", label: "All Wheel Permanent"},
];

export default function OfferList() {
	const {data: session} = useSession();

	const getOffers = async (filters = {}, sort = "") => {
		if (!session?.access_token) {
			return;
		}

		const params = new URLSearchParams();

		// Add filter parameters to query string
		for (const key in filters) {
			if (filters[key]) {
				params.append(key, filters[key]);
			}
		}

		// Add sort parameter to query string
		if (sort) {
			params.append("ordering", sort);
		}

		const res = await fetch(`http://localhost:8000/api/offers?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${session.access_token}`,
			},
		});
		return res.json();
	};

	const [offers, setOffers] = React.useState([]);
	const [filters, setFilters] = React.useState({});
	const [sort, setSort] = React.useState("");

	React.useEffect(() => {
		const fetchOffers = async () => {
			const data = await getOffers(filters, sort);
			setOffers(data.results || []);
		};

		fetchOffers();
	}, [session, filters, sort]);

	const handleFilterChange = (e) => {
		const {name, value} = e.target;
		setFilters((prev) => ({...prev, [name]: value}));
	};

	const handleSortChange = (e) => {
		setSort(e.target.value);
	};

	console.log(offers);

	return (
		<>
			<h1 className="text-2xl font-bold mb-6 mt-5 text-center">
				Offers
			</h1>

			<div
				className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-2 mb-8 justify-center mx-auto max-w-5xl">

				<Select
					label="Sort by"
					placeholder="Select an option"
					className="w-48"
					onChange={handleSortChange}
				>
					<SelectItem key="created_at" value="created_at">Oldest</SelectItem>
					<SelectItem key="-created_at" value="-created_at">Newest</SelectItem>
					<SelectItem key="price__value" value="price__value">Price lowest</SelectItem>
					<SelectItem key="-price__value" value="-price__value">Price highest</SelectItem>
				</Select>

				<Select
					label="Fuel Type"
					placeholder="Select fuel type"
					className="w-48"
					onChange={(e) => handleFilterChange({target: {name: 'fuel_type', value: e.target.value}})}
				>
					{fuelTypes.map((type) => (
						<SelectItem key={type.value} value={type.value}>
							{type.label}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Gearbox"
					placeholder="Select gearbox type"
					className="w-48"
					onChange={(e) => handleFilterChange({target: {name: 'gearbox', value: e.target.value}})}
				>
					{gearboxTypes.map((type) => (
						<SelectItem key={type.value} value={type.value}>
							{type.label}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Category"
					placeholder="Select category"
					className="max-w-xs"
					onChange={(e) => handleFilterChange({target: {name: 'category', value: e.target.value}})}
				>
					{categories.map((category) => (
						<SelectItem key={category.value} value={category.value}>
							{category.label}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Color"
					placeholder="Select color"
					className="w-48"
					onChange={(e) => handleFilterChange({target: {name: 'color', value: e.target.value}})}
				>
					{colors.map((color) => (
						<SelectItem key={color.value} value={color.value}>
							{color.label}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Car Body"
					placeholder="Select car body"
					className="w-48"
					onChange={(e) => handleFilterChange({target: {name: 'car_body', value: e.target.value}})}
				>
					{carBodies.map((body) => (
						<SelectItem key={body.value} value={body.value}>
							{body.label}
						</SelectItem>
					))}
				</Select>

				<Select
					label="Drive"
					placeholder="Select drive type"
					className="w-48"
					onChange={(e) => handleFilterChange({target: {name: 'drive', value: e.target.value}})}
				>
					{drives.map((drive) => (
						<SelectItem key={drive.value} value={drive.value}>
							{drive.label}
						</SelectItem>
					))}
				</Select>
			</div>

			<div className="flex flex-col space-y-6 max-w-5xl mx-auto mt-5 mb-5">
				{offers.map((offer) => (
					<Card key={offer.id} isBlurred={true}
								className="border-none bg-background/60 dark:bg-default-100/50 w-full"
								shadow="sm"
					>
						<CardBody className="p-4 sm:p-6">
							<div className="grid grid-cols-1 2xl:grid-cols-12 gap-4 sm:gap-6 items-start">
								<div className="relative col-span-1 2xl:col-span-3 aspect-video 2xl:aspect-square">
									{offer.image_url && (
										<Image
											src={offer.image_url}
											alt={offer.title}
											shadow="md"
											className="object-cover w-full h-full"
										/>
									)}
								</div>
								<div className="col-span-1 2xl:col-span-9">
									<div className="flex justify-between items-center mb-2 sm:mb-4 flex-wrap gap-2 sm:gap-4">
										<Link href={`/offers/${offer.id}`}><h3 className="text-md sm:text-xl font-bold truncate max-w-[100%]">
											{offer.title}
										</h3></Link>
										<span
											className="text-md sm:text-xl font-semibold whitespace-nowrap">{offer.price.value} {offer.price.currency}</span>
									</div>
									<p className="text-gray-600 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">{offer.description}</p>
									<Divider className="my-2 sm:my-4"/>
									<div className="flex flex-wrap text-sm sm:text-base gap-2 sm:gap-4">
										<span className="font-semibold">{offer.mileage} km</span>
										<span className="font-semibold">{offer.fuel_type}</span>
										<span className="font-semibold">{offer.gearbox}</span>
										<span className="font-semibold">{offer.production_year}</span>
										<span className="font-semibold">{offer.location.city}, {offer.location.region}</span>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</>
	);
}
