<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { form }: PageProps = $props();
	let monitoringLocationIds = $state<string[]>([]);

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			console.log('Selected file:', file.name);

			const reader = new FileReader();
			reader.onload = (e) => {
				let csvText = e.target?.result as string;

				// create array of lines and skip header line and end newline
				const textArray = csvText.split('\n').slice(1, -1);

				// get list of monitoring location ids to return for selector
				const ids = new Set<string>();
				textArray.forEach((line) => ids.add(line.split(',')[1]));
				monitoringLocationIds = [...ids];
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="flex justify-center gap-4 p-4">
	<div class=" flex max-w-3xl flex-col gap-4">
		<h2 class="text-xl">Upload and Analyze Your Data</h2>
		<p class=" ">
			Use the form below to upload a dataset file in CSV format. Then you can select a monitoring
			location and calculate the average water temperature for the selected location.
		</p>

		<form class="flex items-end gap-4" method="post" enctype="multipart/form-data" use:enhance>
			<div>
				<label class="mb-2 block" for="dataset">File</label>
				<input
					class="text-sm text-stone-500 file:mr-5 file:rounded file:border-[1px] file:bg-stone-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
					type="file"
					id="dataset"
					name="dataset"
					accept=".csv"
					onchange={handleFileChange}
				/>
			</div>
			{#if monitoringLocationIds?.length > 0}
				<div>
					<label for="location">Monitoring Location</label>
					<select class="rounded border border-stone-300 px-2 py-1" id="location" name="location">
						<option class="text-stone-500" value="">--Please Select--</option>
						{#each monitoringLocationIds as location}
							<option value={location}>{location}</option>
						{/each}
					</select>
				</div>
				<div>
					<button
						class="rounded border border-[#d0375b] bg-[#d0375b] px-4 py-1 text-white hover:bg-white hover:text-[#d0375b]"
						>Calculate</button
					>
				</div>
			{/if}
		</form>
		{#if form?.success}
			<p>Processed File: <span class="font-bold">{form.fileName}</span></p>
			<p>
				Average Water Temperature for location {form.monitoringLocationId}:
				<span class="font-bold">
					{form.averageWaterTemp}
					{form.averageWaterTempUnit}</span
				>
			</p>
		{/if}
	</div>
</div>
