"use client";

import React from "react";
import {useSession} from "next-auth/react";

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

export default function Offers() {
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

	return (
		<>
			<h1>Offers</h1>
			<div>
				<label>
					Sort by:
					<select value={sort} onChange={handleSortChange}>
						<option value="">Select</option>
						<option value="created_at">Oldest</option>
						<option value="-created_at">Newest</option>
						<option value="price__value">Price lowest</option>
						<option value="-price__value">Price highest</option>
					</select>
				</label>
			</div>
			<div>
				<label>
					Fuel Type:
					<select name="fuel_type" onChange={handleFilterChange}>
						<option value="">Select</option>
						{fuelTypes.map((type) => (
							<option key={type.value} value={type.value}>
								{type.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Gearbox:
					<select name="gearbox" onChange={handleFilterChange}>
						<option value="">Select</option>
						{gearboxTypes.map((type) => (
							<option key={type.value} value={type.value}>
								{type.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Category:
					<select name="category" onChange={handleFilterChange}>
						<option value="">Select</option>
						{categories.map((category) => (
							<option key={category.value} value={category.value}>
								{category.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Color:
					<select name="color" onChange={handleFilterChange}>
						<option value="">Select</option>
						{colors.map((color) => (
							<option key={color.value} value={color.value}>
								{color.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Car Body:
					<select name="car_body" onChange={handleFilterChange}>
						<option value="">Select</option>
						{carBodies.map((body) => (
							<option key={body.value} value={body.value}>
								{body.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Drive:
					<select name="drive" onChange={handleFilterChange}>
						<option value="">Select</option>
						{drives.map((drive) => (
							<option key={drive.value} value={drive.value}>
								{drive.label}
							</option>
						))}
					</select>
				</label>
			</div>
			{offers.map((offer, idex) => (
				<div key={idex}>
					<h2>{offer.title}</h2>
					<p>{offer.description}</p>
				</div>
			))}
		</>
	);
}
