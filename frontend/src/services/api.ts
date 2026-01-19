import type {
  RecommendationResponse,
  PreviousRecommendationResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async getHistory(): Promise<PreviousRecommendationResponse[]> {
    return this.request<PreviousRecommendationResponse[]>(
      "/api/recommendations",
    );
  }

  async getRecommendations(
    preference: string,
  ): Promise<RecommendationResponse> {
    return this.request<RecommendationResponse>("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ preference }),
    });
  }

  async deleteHistoryItem(id: number): Promise<void> {
    return this.request<void>(`/api/recommendations/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiService();
