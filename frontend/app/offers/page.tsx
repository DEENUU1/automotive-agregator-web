// page.tsx
"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function Offers() {
  const { data: session } = useSession();

  const getOffers = async (filters = {}, sort = "") => {
    if (!session?.access_token) {
      console.error("No access token found in session.");
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
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
          <input name="fuel_type" onChange={handleFilterChange} />
        </label>
        <label>
          Gearbox:
          <input name="gearbox" onChange={handleFilterChange} />
        </label>
        <label>
          Category:
          <input name="category" onChange={handleFilterChange} />
        </label>
        <label>
          Color:
          <input name="color" onChange={handleFilterChange} />
        </label>
        <label>
          Car Body:
          <input name="car_body" onChange={handleFilterChange} />
        </label>
        <label>
          Drive:
          <input name="drive" onChange={handleFilterChange} />
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
