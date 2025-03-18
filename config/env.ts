// Environment configuration
import Constants from 'expo-constants';

// Get the API URL from the environment variables
// Fallback to the ngrok URL if not set
const API_URL: string =
  Constants.expoConfig?.extra?.apiUrl as string ||
  'https://91f4-196-96-130-29.ngrok-free.app';

// Export the configuration
export default {
  API_URL,
};