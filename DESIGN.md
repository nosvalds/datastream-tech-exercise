# Design Process

## Brief

Create an app using SvelteKit (preferred) or another JS framework with the functionality listed below. Assume this code will be integrated into an existing application and will be maintained and updated by others in the future.
- Choose a .csv file from the file system (file is pre- downloaded from DataStream - https://doi.org/10.25976/vahx-dq27)
- From the CSV file, calculate the average of “ResultValue” for “CharacteristicName" === "Temperature, water” for any “MonitoringLocationID” input
- Display the result
Code can be submitted preferably as an online repository (GitHub, BitBucket, etc) or alternatively as a zip or tarball.

## MVP Plan

- [x] Scaffold Sveltekit project with Vite, using Tailwind CSS and TypeScript
- [x] Download CSV file and explore dataset to understand necessary calculation
- [x] Plan out basic design

## MVP Design

- [x] Page with button to upload csv file from the filesystem 
- [x] Once .csv is loaded, there should be an input to select “MonitoringLocationID”, the accepted values are from the .csv
- [ ] Once “MonitoringLocationID” is selected, calculate the average of “ResultValue” for “CharacteristicName" === "Temperature, water”
- [ ] Display  “MonitoringLocationID”, average of “ResultValue”
- [ ] Make it look good


