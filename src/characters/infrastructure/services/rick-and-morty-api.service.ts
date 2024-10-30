import axios from 'axios';
import { CONFIG } from '../../../config/config';

interface CharacterFilters {
  page?: number;
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
}

export class RickAndMortyApiService {
  async getCharacterById(id: string) {
    try {
      const url = `${CONFIG.api.rickAndMortyBaseUrl}/character/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getAllCharacters(filters: CharacterFilters = {}) {
    try {
      const url = `${CONFIG.api.rickAndMortyBaseUrl}/character`;
      const response = await axios.get(url, { params: filters });
      const info = response.data.info;
      const characters = response.data.results;

      const pagination = {
        count: info.count,
        pages: info.pages,
        next: info.next ? this.extractPageNumber(info.next) : null,
      };

      return { characters, pagination };
    } catch (error) {
      console.error('Error fetching characters from Rick and Morty API:', error);
      throw error;
    }
  }

  private extractPageNumber(url: string): number | null {
    const match = url.match(/page=(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }
}
