import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import VistapoolAccessory from './platformAccessory';

/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, initializing the platform with a reference to the API and configuration.
 */
class VistapoolPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  // This is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    // When this event is fired it means Homebridge has restored all cached accessories from disk.
    // Dynamic Platform plugins should only register new accessories after this event was fired,
    // in order to ensure they weren't added to homebridge already. This event can also be used
    // to start discovery of new accessories.
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      // Run your accessory discovery function here
      this.discoverDevices();
    });
  }

  /**
   * This function is invoked when Homebridge looks to create a new accessory based on the
   * platform's devices. It should be used to initialize the accessory, registering services
   * and characteristics as needed.
   */
  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    // Add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }

  /**
   * This is an example method to demonstrate how you might discover and register accessories dynamically.
   * This method is called when Homebridge finishes launching.
   */
  discoverDevices() {
    // Example: Discover your devices. This could be done through local network search, API calls, etc.
    // For each discovered device, you would typically do the following:

    // Generate a unique id for the accessory this should be unique across all accessories from your platform
    const uuid = this.api.hap.uuid.generate('some unique id');

    // Check if an accessory with the same uuid has already been registered and restored from the cache
    // If it exists, remove it from the cache
    const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
    if (existingAccessory) {
      // the accessory already exists
      this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);

      // if you need to update the accessory.context then you should run `api.updatePlatformAccessories`. eg.:
      // existingAccessory.context.device = device;
      // this.api.updatePlatformAccessories([existingAccessory]);

      // create the accessory handler for the restored accessory
      // this is imported from `platformAccessory.ts`
      new VistapoolAccessory(this.log, this, existingAccessory, this.config);

      // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
      // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
      // this.log.info('Removing existing accessory from cache:', existingAccessory.displayName);
    } else {
      // the accessory does not yet exist, so we need to create it
      this.log.info('Adding new accessory:', 'Device Name');

      // create a new accessory
      const accessory = new this.api.platformAccessory('Device Name', uuid);

      // create the accessory handler for the newly created accessory
      // this is imported from `platformAccessory.ts`
      new VistapoolAccessory(this.log, this, accessory, this.config);

      // link the accessory to your platform
      this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
    }
  }
}

/**
 * This must match the name of your plugin as defined the package.json
 */
export = (api: API) => {
  api.registerPlatform(PLATFORM_NAME, VistapoolPlatform);
};
