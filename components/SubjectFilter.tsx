"use client";

import { subjects } from "@/constants";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [subject, setsubject] = useState("");

	useEffect(() => {
		let newUrl = "";
		if (subject === "all") {
			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ["subject"],
			});
		} else {
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "subject",
				value: subject,
			});
		}
		router.push(newUrl, { scroll: false });
	}, [subject]);
	return (
		<Select value={subject} onValueChange={setsubject}>
			<SelectTrigger>
				<SelectValue placeholder="Select a subject" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All</SelectItem>
				{subjects.map((subject) => (
					<SelectItem key={subject} value={subject}>
						{subject}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SubjectFilter;
