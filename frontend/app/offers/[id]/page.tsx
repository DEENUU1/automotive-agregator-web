"use client";

import React from "react";
import {useSession} from "next-auth/react";
import Image from "next/image";


interface PageParams {
  id: string;
}


export default function Page({params}: { params: PageParams }) {
  const id = params.id;

  	const {data: session} = useSession();

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
			const data = await getOffer()
			setOffer(data || {});
		};

		fetchOffer();
	}, [session]);


  return (
    <div>
      <h1>{offer.title}</h1>
    </div>
  )
}