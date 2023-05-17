const ffi = require('ffi-napi');

// Define the signature of the EnumProcesses function
const enumProcesses = ffi.Library('kernel32.dll', {
    'EnumProcesses': ['int', ['pointer', 'uint32', 'pointer']]
  });
  
  // Create an array to store the process IDs
  const processIds = new Uint32Array(1024); // Adjust the size as needed
  
  // Call the EnumProcesses function to retrieve the process IDs
  const bytesReturned = new Uint32Array(1);
  const result = enumProcesses.EnumProcesses(processIds.buffer, processIds.length * 4, bytesReturned.buffer);
  
  if (result !== 0) {
    // Calculate the number of process IDs returned
    const numProcesses = bytesReturned[0] / 4;
  
    // Print the process IDs
    console.log(`Number of processes: ${numProcesses}`);
    for (let i = 0; i < numProcesses; i++) {
      console.log(`Process ID: ${processIds[i]}`);
    }
  } else {
    console.error('Failed to retrieve process IDs');
  }