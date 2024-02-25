import { API, Logging, AccessoryConfig, AccessoryPlugin, Service, Characteristic } from 'homebridge';
import axios from 'axios';

interface VistapoolDeviceConfig extends AccessoryConfig {
    apiUrl: string;
    deviceId: string;
}

interface VistapoolDeviceData {
    temperature: number;
    filtration: {
        type: string;
        onoff: boolean;
    };
    light: {
        type: string;
        status: boolean;
    };
    modules: {
        ph: {
            currentValue: number;
            status: {
                hi_value: number;
                status: boolean;
                color: {
                    hex: string;
                };
            };
        };
        rx: {
            currentValue: number;
            status: {
                value: number;
                relayStatus: {
                    status: boolean;
                };
                color: {
                    hex: string;
                };
            };
        };
    };
}
