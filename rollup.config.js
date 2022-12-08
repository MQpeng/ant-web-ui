import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = (env = 'production') => {
  return [
    {
      input: 'src/service/message.service.ts',
      output: [
        {
          format: 'iife',
          file: 'lib/message.service.js',
          name: 'AUIMessageService',
        },
      ],
      plugins: [
        typescript(),
        resolve({
          customResolveOptions: {
            moduleDirectory: 'node_modules',
          },
        }),
      ],
    },
  ];
};
