// @ts-check
const eslint = require('@eslint/js');
const { defineConfig, globalIgnores } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  globalIgnores([
    'dist/**',
    '.angular/**',
    'coverage/**',
    'public/**',
    'docs/**',
    // Static SEO shell, not an Angular template.
    'src/index.html',
  ]),
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      // Must stay last: turns off every rule Prettier already owns.
      prettier,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        // Type-aware linting: resolves each file through tsconfig.app.json / tsconfig.spec.json.
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // --- Angular 22 conventions from CLAUDE.md ---
      // Standalone is the implicit default: never write `standalone: true`.
      '@angular-eslint/prefer-standalone': 'error',
      // OnPush on every component, even though the app is zoneless.
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      // Signal-based input()/output()/viewChild() over the decorators.
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-signal-model': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      // host: {...} metadata over @HostBinding/@HostListener.
      '@angular-eslint/prefer-host-metadata-property': 'error',
      // inject() over constructor-parameter injection, declared at the top of the class.
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/inject-at-top': 'error',
      // Services are `@Injectable({ providedIn: 'root' })`.
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/computed-must-return': 'error',
      '@angular-eslint/consistent-component-styles': 'error',
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'off',

      // --- TypeScript ---
      // No `any`: escape hatches need an eslint-disable comment explaining why.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public', overrides: { parameterProperties: 'off' } },
      ],

      // Private members use native `#field`, never the TypeScript `private` keyword.
      'no-restricted-syntax': [
        'error',
        {
          selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
          message:
            'Use a native private field (`#foo`) instead of the TypeScript `private` keyword.',
        },
        {
          selector: 'TSParameterProperty',
          message: 'Use inject() and a class field instead of a parameter property.',
        },
      ],

      // State is signals only — no RxJS anywhere in this codebase.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'rxjs',
              message: 'This codebase is signals-only. See CLAUDE.md ("State = signals only").',
            },
            {
              name: 'rxjs/operators',
              message: 'This codebase is signals-only. See CLAUDE.md ("State = signals only").',
            },
          ],
        },
      ],

      eqeqeq: ['error', 'smart'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'object-shorthand': 'error',
      'no-var': 'error',
    },
  },
  {
    // Node/SSR entrypoints legitimately log and touch the platform.
    files: ['src/server.ts', 'src/main.server.ts', '*.js', '*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      // Must stay last: Prettier owns template formatting.
      prettier,
    ],
    rules: {
      // @if/@for/@switch only — never *ngIf/*ngFor.
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-at-else': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-static-string-properties': 'error',
      '@angular-eslint/template/prefer-template-literal': 'error',
      // Off: NgOptimizedImage needs width/height/priority on every <img>; migrating the
      // icon set to it is its own task, not something to half-do behind a lint rule.
      '@angular-eslint/template/prefer-ngsrc': 'off',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/no-inline-styles': [
        'error',
        { allowNgStyle: true, allowBindToStyle: true },
      ],
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/eqeqeq': ['error', { allowNullOrUndefined: true }],
      '@angular-eslint/template/attributes-order': 'error',
      // Off: AppId also covers window-only ids with no dock artwork ('about'), so the
      // icon @switch is deliberately non-exhaustive and renders nothing for them.
      '@angular-eslint/template/require-switch-default': 'off',
    },
  },
]);
