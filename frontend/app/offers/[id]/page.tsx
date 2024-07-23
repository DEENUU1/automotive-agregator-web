"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface PageParams {
  id: string;
}

export default function Page({ params }: { params: PageParams }) {
  const id = params.id;
  const { data: session } = useSession();

  const getOffer = async () => {
    if (!session?.access_token) {
      return;
    }
    const res = await fetch(`http://localhost:8000/api/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    return res.json();
  };

  const [offer, setOffer] = React.useState({});

  React.useEffect(() => {
    const fetchOffer = async () => {
      const data = await getOffer();
      setOffer(data || {});
    };
    fetchOffer();
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {offer.image_url && (
              <Image
                src={offer.image_url}
                alt={offer.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            )}
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">{offer.title}</h1>
            <div className="text-2xl font-semibold text-blue-600 mb-4">
              {offer.price?.value} {offer.price?.currency}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold">Year:</p>
                <p>{offer.production_year}</p>
              </div>
              <div>
                <p className="font-semibold">Mileage:</p>
                <p>{offer.mileage} km</p>
              </div>
              <div>
                <p className="font-semibold">Fuel Type:</p>
                <p>{offer.fuel_type}</p>
              </div>
              <div>
                <p className="font-semibold">Transmission:</p>
                <p>{offer.gearbox}</p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{offer.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p>{offer.location?.city}, {offer.location?.region}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}