// mqttService.ts
import mqtt from 'mqtt';
import { sendDataToDatabase } from '../api';

const host = '667e33c453fe4f028d4486b0f821713b.s1.eu.hivemq.cloud';
const port = 8884;
const clientId = `mqttjs_${Math.random().toString(16).substr(2, 8)}`;
const connectUrl = `wss://${host}:${port}/mqtt`;
const topicSensor = "Data_Sensor";
const topicLight = "Light";

const options = {
  clientId,
  username: 'songcuon123',
  password: 'songcuon123',
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};

export interface SensorData {
  temperature: number | null;
  humidity: number | null;
  light: number | null;
}

export const initializeMqttClient = (onDataReceived: (data: SensorData) => void) => {
  const client = mqtt.connect(connectUrl, options);
  let data: SensorData = {
    temperature: null,
    humidity: null,
    light: null,
  };

  // Biến để kiểm soát tốc độ
  let timer: NodeJS.Timeout | null = null;
  const THROTTLE_TIME = 3000; // thời gian chờ 3 giây trước khi gửi dữ liệu đến cơ sở dữ liệu (ms)

  client.on('connect', function () {
    client.subscribe([topicSensor, topicLight]);
  });

  client.on('message', async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      
      // Cập nhật dữ liệu dựa trên chủ đề
      if (topic === topicSensor) {
        data.humidity = payload.humidity;
        data.temperature = payload.temperature;
      } else if (topic === topicLight) {
        data.light = payload.lux;
      }

      // Kiểm tra xem tất cả dữ liệu đã có sẵn hay chưa
      if (data.temperature !== null && data.humidity !== null && data.light !== null) {
        // Xóa bộ hẹn giờ hiện tại nếu có
        if (timer) {
          clearTimeout(timer);
        }

        // Đặt một bộ hẹn giờ mới để gửi dữ liệu đến cơ sở dữ liệu
        timer = setTimeout(async () => {
          // onDataReceived({ ...data });

          // try {
          //   await sendDataToDatabase({ ...data });
          //   console.log('Dữ liệu đã được gửi đến cơ sở dữ liệu thành công');
          // } catch (error) {
          //   console.error('Gửi dữ liệu đến cơ sở dữ liệu không thành công:', error);
          // }

          // Đặt lại dữ liệu sau khi gửi
          data = {
            temperature: null,
            humidity: null,
            light: null
          };
        }, THROTTLE_TIME);
      }
    } catch (error) {
      console.error('Lỗi khi phân tích tin nhắn:', error);
    }
  });

  return client;
};
