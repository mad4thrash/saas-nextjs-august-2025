"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { useRouter } from "next/navigation";

const CompanionForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const formSchema = z.object({
		name: z.string().min(1, { message: "Companion is required." }),
		subject: z.string().min(1, { message: "Subject is required." }),
		topic: z.string().min(1, { message: "Topic is required." }),
		voice: z.string().min(1, { message: "Voice is required." }),
		style: z.string().min(1, { message: "Style is required." }),
		duration: z.coerce
			.number<number>()
			.min(1, { message: "Duration is required." }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			subject: "",
			topic: "",
			voice: "",
			style: "",
			duration: 15,
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try {
			const companion = await createCompanion(data);
			if (companion) {
				toast.success("Companion created successfully!");
				router.push(`/companions/${companion.id}`);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Companion Name</FormLabel>
							<FormControl>
								<Input
									style={{ borderRadius: "25px" }}
									placeholder="Enter companion name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger className="input capitalize rounded-3xl">
										<SelectValue placeholder="Select the Subject" />
									</SelectTrigger>
									<SelectContent>
										{subjects.map((subject) => (
											<SelectItem
												key={subject}
												value={subject}
												className="capitalize"
											>
												{subject}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="topic"
					render={({ field }) => (
						<FormItem>
							<FormLabel>What should the companion help with?</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Ex. Derivatives & Integrals"
									style={{ borderRadius: "25px" }}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="voice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Voice</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger className="input rounded-3xl">
										<SelectValue placeholder="Select the Voice" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="style"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Style</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger className="input rounded-3xl">
										<SelectValue placeholder="Select the Style" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="formal">Formal</SelectItem>
										<SelectItem value="casual">Casual</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Estimated session duration in minutes</FormLabel>
							<FormControl>
								<Input
									style={{ borderRadius: "25px" }}
									type="number"
									placeholder="Enter duration"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full cursor-pointer"
					style={{ borderRadius: "25px" }}
					disabled={isLoading}
				>
					{isLoading ? "Building..." : "Build Your Companion"}
				</Button>
			</form>
		</Form>
	);
};

export default CompanionForm;
