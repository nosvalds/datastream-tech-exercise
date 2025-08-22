<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	console.log(form);
</script>

<div class="flex justify-center gap-4 p-4">
	<div class=" flex max-w-3xl flex-col gap-4">
		<h2 class="text-xl">Upload and Analyze Your Data</h2>
		<p class=" ">
			Use the form below to upload a dataset file in CSV format. Then you can select a monitoring
			location and calculate the average water temperature for the selected location.
		</p>

		<form
			class="flex items-end gap-4"
			method="post"
			enctype="multipart/form-data"
			action="?/upload"
		>
			<div>
				<label class="mb-2 block" for="dataset">File</label>
				<input
					class="text-sm text-stone-500 file:mr-5 file:rounded file:border-[1px] file:bg-stone-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
					type="file"
					id="dataset"
					name="dataset"
					accept=".csv"
				/>
			</div>
			<div>
				<button
					class="rounded border border-[#d0375b] bg-[#d0375b] px-4 py-2 text-white hover:bg-white hover:text-[#d0375b]"
					>Upload</button
				>
			</div>
		</form>

		{#if form?.success}
			<p>Successfully uploaded file: {form.fileName}</p>
			<form method="post" action="?/calculate">
				<div>
					<label for="location">Select Monitoring Location:</label>
					<select class="rounded border border-stone-300 px-2 py-1" id="location" name="location">
						<option class="text-stone-500" value="">--Please Select--</option>
						{#each Array.from(form?.monitoringLocationIds ?? []) as location}
							<option value={location}>{location}</option>
						{/each}
					</select>
				</div>
				<div>
					<button
						class="rounded border border-[#d0375b] bg-[#d0375b] px-4 py-2 text-white hover:bg-white hover:text-[#d0375b]"
						>Calculate</button
					>
				</div>
			</form>
		{/if}
		{#if form?.averageWaterTemp}
			<p>
				Average Water Temperature for location {form.monitoringLocationId}: {form.averageWaterTemp}°C
			</p>
		{/if}
	</div>
</div>
