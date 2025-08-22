import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/Cta";
import React from "react";
import { recentSessions } from "@/constants";

const Page = () => {
	return (
		<main>
			<h1>Popular Companions</h1>
			<section className="home-section">
				{recentSessions
					.slice(0, 3)
					.map(({ id, name, topic, subject, duration, color }) => (
						<CompanionCard
							key={id}
							id={id}
							name={name}
							topic={topic}
							subject={subject}
							duration={duration}
							color={color}
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
