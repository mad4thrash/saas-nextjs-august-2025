import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import { Companion } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CompanionListProps {
	title: string;
	companions?: Companion[];
	classNames?: string;
}

const CompanionList = ({
	title,
	companions,
	classNames,
}: CompanionListProps) => {
	return (
		<article className={cn("companion-list", classNames)}>
			<h2 className="text-3xl font-bold">{title}</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-lg w-2/3">Lessons</TableHead>
						<TableHead className="text-lg">Subject</TableHead>
						<TableHead className="text-lg text-right">Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{companions?.map(({ id, name, topic, subject, duration }) => (
						<TableRow key={id}>
							<TableCell className="font-medium">
								<Link href={`/companions/${id}`}>
									<div className="flex items-center gap-2">
										<div
											className="flex-items-center justify-center rounded-lg w-fit p-2 max-md:hidden"
											style={{ backgroundColor: getSubjectColor(subject) }}
										>
											<Image
												src={`/icons/${subject}.svg`}
												alt={subject}
												width={36}
												height={36}
											/>
										</div>
										<div className="flex flex-col gap-4">
											<span>{name}</span>
											<span className="text-sm text-muted-foreground">
												{topic}
											</span>
										</div>
									</div>
								</Link>
							</TableCell>
							<TableCell>
								<div className="subject-badge w-fit max-md:hidden">
									{subject}
								</div>
								<div
									className="flex-items-center justify-center rounded-lg w-fit p-2 md:hidden"
									style={{ backgroundColor: getSubjectColor(subject) }}
								>
									<Image
										src={`/icons/${subject}.svg`}
										alt={subject}
										width={18}
										height={18}
									/>
								</div>
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2 w-full justify-end">
									<p className="text-2xl">{duration}</p>
									<span className="max-md:hidden">mins</span>
									<Image
										src="/icons/clock.svg"
										alt="duration"
										width={13.5}
										height={13.5}
										className="md:hidden"
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</article>
	);
};

export default CompanionList;
