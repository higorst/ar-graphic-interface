import api from "../index";

export async function openMonitor() {
  try {
    const response = await api.get("/monitor/open?mode=2");

    return response.data;
  } catch (error) {
    if (error?.response?.status === 404) return false;

    throw error;
  }
}
