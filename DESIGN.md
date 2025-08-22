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
- [x] Once “MonitoringLocationID” is selected, calculate the average of “ResultValue” for “CharacteristicName" === "Temperature, water”
- [x] Display  “MonitoringLocationID”, average of “ResultValue”
- [x] Make it look good


## Potential Improvements

- Save file temporarily on the server and have better interactivity so the user can select other monitoring location IDs to get the average without having to reselect the file
- Other option could be to do all this client side, but you will eventually run into memory issues with really large CSVs
- I ended up with a split setup because I was learning about SvelteKit and first was looking at server side forms, then decided to do the part to get the location IDs for the selector in the client side and do the averaging caclulcation on the server.
- It would probably be more robust and scalable to do it all on the server but I ran out of time to refactor to this solution.

- Adding Unit tests for the averaging function

- Ensuring the page follows accessibility guidelines

- I handle loading/processing the csv differently in client/vs server, duplicating some code, if I hanlded all on server this would be cleaner and more consistent
