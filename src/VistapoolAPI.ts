import axios, { AxiosInstance } from 'axios';

// Interfaces definition
interface VistapoolDeviceData {
  temperature: TemperatureData;
  filtration: FiltrationData;
  light: LightData;
  ph: PHData;
  rx: RXData;
}

interface TemperatureData {
  current: number;
  target: number;
}

interface FiltrationData {
  type: string; // e.g., "sand", "cartridge"
  onoff: boolean;
}

interface LightData {
  status: boolean;
}

interface PHData {
  currentValue: number;
  targetValue: number;
  status: boolean; // True if within target range
  color: string; // Hex code representing PH level
}

interface RXData {
  currentValue: number;
  targetValue: number;
  status: boolean; // True if within target range
  color: string; // Hex code representing RX level
}

class VistapoolAPI {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor(private baseUrl: string, private username: string, private password: string) {
    this.axiosInstance = axios.create({ baseURL: baseUrl });
  }

  async login(): Promise<void> {
    const response = await this.axiosInstance.post('/auth', {
      username: this.username,
      password: this.password,
      company_id: 1, // Adjust as necessary
    });
    this.token = response.data.token; // Assuming the token is directly in response.data
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  }

async getTemperature(): Promise<TemperatureData> {
  try {
    const response = await this.axiosInstance.get('/temperature', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (response.data) {
      // Assuming response.data is the TemperatureData object you expect
      return response.data;
    } else {
      throw new Error('Temperature data not found');
    }
  } catch (error) {
    console.error('Failed to fetch temperature:', error);
    throw new Error('Error fetching temperature data');
  }
}

  async setTemperature(data: TemperatureData): Promise<void> {
    // Implementation...
  }

async getFiltrationStatus(): Promise<FiltrationData> {
  try {
    const response = await this.axiosInstance.get('/filtrationStatus', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (response.data) {
      // Assuming response.data is structured as expected for FiltrationData
      return response.data;
    } else {
      throw new Error('Filtration data not found');
    }
  } catch (error) {
    console.error('Failed to fetch filtration status:', error);
    throw new Error('Error fetching filtration status');
  }
}

  async setFiltrationStatus(status: boolean): Promise<void> {
    // Implementation...
  }

async getLightStatus(): Promise<LightData> {
  try {
    const response = await this.axiosInstance.get('/lightStatus', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (response.data) {
      // Assuming response.data correctly maps to your LightData interface
      return response.data;
    } else {
      throw new Error('Light data not found');
    }
  } catch (error) {
    console.error('Failed to fetch light status:', error);
    throw new Error('Error fetching light status');
  }
}

  async setLightStatus(status: boolean): Promise<void> {
    // Implementation...
  }

async getPHStatus(): Promise<PHData> {
  try {
    const response = await this.axiosInstance.get('/phStatus', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (response.data) {
      // Assuming response.data is structured as expected for PHData
      return response.data;
    } else {
      // If data is missing or not in the expected format
      throw new Error('PH data not found');
    }
  } catch (error) {
    // Log the error and throw an exception to indicate failure
    console.error('Failed to fetch PH status:', error);
    throw new Error('Error fetching PH status');
  }
}

  async setPHStatus(data: PHData): Promise<void> {
    // Implementation...
  }

async getRXStatus(): Promise<RXData> {
  try {
    const response = await this.axiosInstance.get('/rxStatus', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (response.data) {
      // Assuming response.data is structured as expected for RXData
      return response.data;
    } else {
      // If data is missing or not in the expected format
      throw new Error('RX data not found');
    }
  } catch (error) {
    // Log the error and throw an exception to indicate failure
    console.error('Failed to fetch RX status:', error);
    throw new Error('Error fetching RX status');
  }
}

  async setRXStatus(data: RXData): Promise<void> {
    // Implementation...
  }

  // Additional methods as necessary...
}

export { VistapoolAPI, VistapoolDeviceData, TemperatureData, FiltrationData, LightData, PHData, RXData };
