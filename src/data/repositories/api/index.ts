import { SensorData } from '../mqtt';

import { API_BASE_URL } from '../../const/path';

import { DeviceSchema, HistorySchema } from '../../../pages/Dashboard/Device';

export const sendDataToDatabase = async (data: SensorData) => {
  console.log("data", JSON.stringify(data))
  try {
    const response = await fetch(`${API_BASE_URL}/api/data/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending data to database:', error);
    throw error;
  }
};
export const saveHistoryToDatabase = async (history: HistorySchema) => {
  console.log("data", JSON.stringify(history))
  try {
    const response = await fetch(`${API_BASE_URL}/api/data/history-action`, {
      method: 'POST',
      body: JSON.stringify(history),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending data to database:', error);
    throw error;
  }
}
export const sendStateToDatabase = async (device: DeviceSchema) => {
  console.log("data", JSON.stringify(device))
  try {
    const response = await fetch(`${API_BASE_URL}/api/data/update-device/${device._id}`, {
      method: 'PUT',
      body: JSON.stringify(device),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending data to database:', error);
    throw error;
  }
}
