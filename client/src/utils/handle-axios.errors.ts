import axios from "axios";

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.log(
      "Server error:",
      error.response ? error.response.data : error.message
    );
  } else {
    console.log("Unknown error:", error);
  }
}
