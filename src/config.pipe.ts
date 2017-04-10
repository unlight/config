import { Pipe } from '@angular/core';
import { ConfigService } from './config.service';

@Pipe({
	name: 'config',
})
export class ConfigPipe {

	constructor(private configService: ConfigService) {
	}

	transform(path: any): any {
		return this.configService.get(path);
	}
}
