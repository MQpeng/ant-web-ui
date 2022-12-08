import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { svelteOutputTarget } from '@stencil/svelte-output-target';

const componentCorePackage = '@MQpeng/aui';
const parent = '../aui-proxy';
const entry = 'aui.ts';
const directivesProxyFile = (name: string, filepath = entry) => `${parent}/${name}/src/${filepath}`;

export const config: Config = {
  namespace: 'aui',
  enableCache: true,
  hashFileNames: false,
  autoprefixCss: false,
  minifyCss: true,
  preamble: 'Built by AUI',
  hashedFileNameLength: 8,
  extras: {
    // We need the following for IE11 and old Edge:
    cssVarsShim: true,
    dynamicImportShim: true,
    // We don’t use shadow DOM so this is not needed:
    shadowDomShim: false,
    // Setting the below option to “true” will actually break Safari 10 support:
    safari10: false,
    // This is to tackle an Angular specific performance issue:
    initializeNextTick: true,
    // Don’t need any of these so setting them to “false”:
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
    experimentalImportInjection: true,
  },
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/theme/variables.scss',
        'src/theme/mixins.scss'
      ]
    })
  ],
  outputTargets: [
    angularOutputTarget({
      componentCorePackage,
      directivesProxyFile: directivesProxyFile('angular', `proxies/${entry}`),
      valueAccessorConfigs: [],
    }),
    reactOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('react'),
    }),
    vueOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('vue'),
      includeDefineCustomElements: true,
      componentModels: [],
    }),
    svelteOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('svelte'),
      includeDefineCustomElements: true,
      legacy: false,
      includePolyfills: false,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'custom-element',
      autoDefineCustomElements: true,
      empty: true,
    },

    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
