"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("topic") || "";

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const addDebounce = setTimeout(() => {
			if (searchQuery) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "topic",
					value: searchQuery,
				});
				router.push(newUrl, { scroll: false });
			} else {
				if (pathname === "/companions") {
					const newUrl = removeKeysFromUrlQuery({
						params: searchParams.toString(),
						keysToRemove: ["topic"],
					});
					router.push(newUrl, { scroll: false });
				}
			}
		}, 500);
	}, [searchQuery, router, searchParams, pathname]);

	return (
		<div className="relative border-input border rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
			<Image src="/icons/search.svg" alt="search" width={16} height={16} />
			<input
				type="text"
				placeholder="Search companions..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="outline-none"
			/>
		</div>
	);
};

export default SearchInput;
