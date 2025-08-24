import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const NewCompanion = async () => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const canCreateCompanion = await newCompanionPermissions();

	return (
		<main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
			{canCreateCompanion ? (
				<article className="w-full gap-4 flex flex-col">
					<h1>Companion Builder</h1>
					<CompanionForm />
				</article>
			) : (
				<article className="companion-limit">
					<Image
						src="images/limit.svg"
						alt="Limit reached"
						width={350}
						height={230}
					/>
					<div className="cta-badge">
						<h2 className="text-2xl font-bold">Companion Limit Reached</h2>
						<p className="text-center">
							You have reached the limit of companions you can create with your
							current plan.
						</p>
						<p className="text-center">
							Please upgrade your plan to create more companions and enjoy
							additional features.
						</p>
						<Link
							href="/subscrption"
							className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition mt-4"
						>
							Upgrade Plan
						</Link>
					</div>
				</article>
			)}
		</main>
	);
};

export default NewCompanion;
