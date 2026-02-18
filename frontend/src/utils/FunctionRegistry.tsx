// Define the type for the function registry
type FunctionRegistryType = { [key: string]: () => void };

// Create the registry object
const FunctionRegistry: FunctionRegistryType = {};

// Function to register a new function in the registry
export const registerFunction = (key: string, func: () => void): void => {
  FunctionRegistry[key] = func;
};

// Function to retrieve a registered function by its key
export const getFunction = (key: string): (() => void) | undefined => {
  return FunctionRegistry[key];
};