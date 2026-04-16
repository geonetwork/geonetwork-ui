import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { OnlineServiceResourceInputComponent } from './online-service-resource-input.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/OnlineServiceResourceInputComponent',
  component: OnlineServiceResourceInputComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 w-[800px] p-[16px]" style="margin: auto;">${story}</div>`
    ),
  ],
  argTypes: {
    serviceChange: { action: 'serviceChange' },
  },
} as Meta<OnlineServiceResourceInputComponent>

const emptyService = {
  type: 'service' as const,
  url: undefined,
  accessServiceProtocol: 'ogcFeatures' as const,
}

export const Default: StoryObj<OnlineServiceResourceInputComponent> = {
  args: {
    service: { ...emptyService },
  },
}

export const FeaturesOnly: StoryObj<OnlineServiceResourceInputComponent> = {
  args: {
    service: { ...emptyService },
    protocolOptions: ['ogcFeatures', 'wfs'],
  },
}

export const WithProtocolHint: StoryObj<OnlineServiceResourceInputComponent> = {
  args: {
    service: { ...emptyService },
    protocolHint:
      'Select the protocol that matches your service endpoint type.',
  },
}

export const WithPrefilledWmsService: StoryObj<OnlineServiceResourceInputComponent> =
  {
    args: {
      service: {
        type: 'service',
        url: new URL('https://my.ogc.server/wms'),
        accessServiceProtocol: 'wms',
        identifierInService: 'mylayer',
      },
    },
  }

export const WithPrefilledWfsService: StoryObj<OnlineServiceResourceInputComponent> =
  {
    args: {
      service: {
        type: 'service',
        url: new URL('https://my.ogc.server/wfs'),
        accessServiceProtocol: 'wfs',
        identifierInService: 'mylayer',
      },
    },
  }

export const ModifyMode: StoryObj<OnlineServiceResourceInputComponent> = {
  args: {
    service: {
      type: 'service',
      url: new URL('https://my.ogc.server/wms'),
      accessServiceProtocol: 'wms',
      identifierInService: 'mylayer',
    },
    modifyMode: true,
  },
}

export const Disabled: StoryObj<OnlineServiceResourceInputComponent> = {
  args: {
    service: {
      type: 'service',
      url: new URL('https://my.ogc.server/wms'),
      accessServiceProtocol: 'wms',
      identifierInService: 'mylayer',
    },
    disabled: true,
  },
}

export const FeaturesOnlyWithPrefilledWfs: StoryObj<OnlineServiceResourceInputComponent> =
  {
    args: {
      service: {
        type: 'service',
        url: new URL('https://my.ogc.server/wfs'),
        accessServiceProtocol: 'wfs',
        identifierInService: 'mylayer',
      },
      protocolOptions: ['ogcFeatures', 'wfs'],
    },
  }
