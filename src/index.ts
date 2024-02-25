import { API } from 'homebridge';
import VistapoolAccessory from './VistapoolAccessory';

/**
 * This method registers the plugin with Homebridge.
 */
export = (api: API) => {
  api.registerAccessory('homebridge-vistapool', VistapoolAccessory);
};
