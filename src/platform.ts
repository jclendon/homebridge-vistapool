import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import VistapoolAccessory from './platformAccessory';

export default class VistapoolPlatform implements DynamicPlatformPlugin {
  private accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', config.name);

    this.api.on('didFinishLaunching', () => this.discoverDevices());
  }

  discoverDevices(): void {
    // Example: Discover and instantiate your devices as accessories.
    const devices = this.config.devices || [];
    for (const device of devices) {
      const uuid = this.api.hap.uuid.generate(device.deviceId);
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
        new VistapoolAccessory(this, existingAccessory, device);
      } else {
        this.log.info('Adding new accessory:', device.name);
        const accessory = new this.api.platformAccessory(device.name, uuid);
        new VistapoolAccessory(this, accessory, device);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }

  configureAccessory(accessory: PlatformAccessory): void {
    this.accessories.push(accessory);
  }
}
