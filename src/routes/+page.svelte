<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
    console.log(form);
</script>

<h1>DataStream Data Analyzer</h1>
<h2>Upload and Analyze Your Data</h2>

<form method="post" enctype="multipart/form-data" action="?/upload">
  <div>
    <label for="dataset">Choose a dataset file to Analyze:</label>
    <input type="file" id="dataset" name="dataset" accept=".csv" />
  </div>
  <div>
    <button>Upload</button>
  </div>
</form>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
	       response to a form submission. it will vanish if the user reloads -->
	<p>Successfully uploaded file: {form.fileName}</p>
    <form method="post" action="?/calculate">
        <div>
            <label for="location">Select Monitoring Location:</label>
            <select id="location" name="location">
                {#each Array.from(form?.monitoringLocationIds ?? []) as location}
                    <option value={location}>{location}</option>
                {/each}
            </select>
        </div>
        <div>
            <button>Calculate</button>
        </div>
    </form>

{/if}
{#if form?.averageWaterTemp}
    <p>Average Water Temperature for location {form.monitoringLocationId}: {form.averageWaterTemp}°C</p>
{/if}