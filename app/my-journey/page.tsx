import CompanionList from "@/components/CompanionList";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	getUserCompanions,
	getUserSessions,
} from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const companions = await getUserCompanions(user.id);

	const sessionHistory = await getUserSessions(user.id);
	return (
		<main className="min-lg:w-3/4">
			<section className="flex justify-between items-center gap-4 max-sm:flex-col">
				<div className="flex gap-4 items-center">
					<Image
						src={user.imageUrl}
						alt={user.firstName!}
						width={100}
						height={100}
						className="rounded-full"
					/>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">
							{user.firstName} {user.lastName}
						</h1>
						<p className="text-sm text-muted-foreground">
							{user.emailAddresses[0].emailAddress}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-1 text-right">
					<p className="text-xl font-semibold">
						{companions.length} Companions Created
					</p>
					<p className="text-xl font-semibold">
						{sessionHistory.length} Lessons Completed
					</p>
				</div>
			</section>
			<Accordion type="multiple">
				<AccordionItem value="recent">
					<AccordionTrigger className="text-2xl font-bold">
						Recent Sessions
					</AccordionTrigger>
					<AccordionContent>
						<CompanionList
							companions={sessionHistory}
							title="Recent Sessions"
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="companions">
					<AccordionTrigger className="text-2xl font-bold">
						My Companions {`(${companions.length})`}
					</AccordionTrigger>
					<AccordionContent>
						<CompanionList companions={companions} title="My Companions" />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</main>
	);
};

export default Profile;
