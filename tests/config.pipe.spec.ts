import { Component } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { testSettings, testModuleConfig } from './index.spec';
import { ConfigLoader, ConfigStaticLoader } from '../src/config.loader';
import { ConfigPipe } from '../src/config.pipe';
import { ConfigService } from '../src/config.service';
import { HttpModule } from '@angular/http';
import { ConfigModule } from '../index';

const FAKE_CONFIG = {
    property: 'value',
    some: {
        nested: {
            property: 'value',
        }
    }
};

@Component({
    selector: 'fake-component',
    template: `
  <span id="property">{{'property' | config}}</span>
  <span id="nested-property">{{'some.nested.property' | config}}</span>
  `
})
class FakeComponent {
}

function getElement(fixture: any): Element {
    return fixture.debugElement.nativeElement;
}

describe('ConfigPipe', () => {

    let fixture: ComponentFixture<FakeComponent>;

    beforeEach(async(() => {
        const configFactory = () => new ConfigStaticLoader(FAKE_CONFIG);
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                ConfigModule.forRoot({ provide: ConfigLoader, useFactory: (configFactory) })
            ],
            declarations: [FakeComponent],
            providers: [
                ConfigService,
            ]
        });
        TestBed.compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(FakeComponent);
            });
    }));

    it('outputs config values', async(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#property').innerHTML).toBe('value');
        expect(fixture.nativeElement.querySelector('#property').innerHTML).toBe('value');
    }));
});
