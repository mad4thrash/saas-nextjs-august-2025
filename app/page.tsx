import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/Cta";
import React from "react";
import {
	getAllCompanions,
	getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
	const companions = await getAllCompanions({ limit: 3 });
	const recentSessions = await getRecentSessions();
	return (
		<main>
			<h1>Popular Companions</h1>
			<section className="home-section">
				{companions.map((companion) => (
					<CompanionCard
						key={companion.id}
						{...companion}
						color={getSubjectColor(companion.subject)}
					/>
				))}
			</section>
			<section className="home-section">
				<CompanionList
					title="Recent Activities"
					companions={recentSessions}
					classNames="w-2/3 max-lg:w-full"
				/>
				<Cta />
			</section>
		</main>
	);
};

export default Page;
