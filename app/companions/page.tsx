import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SearchParams } from "@/types";
import React from "react";

const CompanionPage = async ({ searchParams }: SearchParams) => {
	const params = await searchParams;

	const subject = params.subject ? params.subject : "";
	const topic = params.topic ? params.topic : "";

	const companions = await getAllCompanions({ subject, topic });

	return (
		<main>
			<section className="flex justify-between gap-4 max-sm:flex-col">
				<h1>Companion Library</h1>
				<div className="flex gap-4">
					<SearchInput />
					<SubjectFilter />
				</div>
			</section>
			<section className="companions-grid">
				{companions.map((companion) => {
					return (
						<CompanionCard
							key={companion.id}
							{...companion}
							color={getSubjectColor(companion.subject)}
						/>
					);
				})}
			</section>
		</main>
	);
};

export default CompanionPage;
