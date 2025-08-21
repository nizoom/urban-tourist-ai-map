import axios from "axios";
import { useTouristStore } from "./store";

export const fetchData = async (lat, lng, preferences) => {
  const { setData, setError, toggleLoadingState, clearData, loadingState } =
    useTouristStore.getState();
  // Prevent multiple requests if already loading
  if (loadingState) {
    console.log("Request already in progress, ignoring new request");
    return;
  }

  try {
    toggleLoadingState(true);
    clearData(); // reset old data/error

    const payload = {
      latitude: lat,
      longitude: lng,
      preference: preferences,
      base64: true,
    };
    console.log("querying");

    // ❌ Simulate error instead of leaving it blank
    // throw new Error("Simulated error for testing");

    // ✅ Real case:
    const response = await axios.post(
      "https://131ce3df375d.ngrok-free.app/generate",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    setData(response.data);
  } catch (err) {
    console.error("Error fetching data:", err);
    setError("Could not fetch data. Please try again.");
  } finally {
    toggleLoadingState(false);
  }
};
