// angular
import { Injectable } from '@angular/core';

// module
import { ConfigLoader } from './config.loader';

@Injectable()
export class ConfigService {
  private settings: any;

  constructor(public loader: ConfigLoader) {
  }

  init(): any {
    return this.loader.loadSettings()
      .then((res: any) => this.settings = res);
  }

  getSettings(group?: string, key?: string): any {
    if (!group)
      return this.settings;

    if (!this.settings[group])
      throw new Error(`No setting found with the specified group [${group}]!`);

    if (!key)
      return this.settings[group];

    if (!this.settings[group][key])
      throw new Error(`No setting found with the specified group/key [${group}/${key}]!`);

    return this.settings[group][key];
  }

  get(path: string, defaultValue?: any): any;
  get(path: string[], defaultValue?: any): any;

  get(path: any, defaultValue: any = null): any {
    if (!Array.isArray(path)) {
      path = String(path).split('.');
    }
    let result = path.reduce((prev: any, curr: string) => {
      return prev && prev[curr];
    }, this.settings);
    return (result !== undefined) ? result : defaultValue;
  }
}
