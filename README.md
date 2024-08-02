# techbasejs
Fully packages supports all projects

### Usage CLI
Testing all packages
```sh
npm run test all
```

Testing a specific package
```sh
npm run test [packageName]

// examples
npm run test simm-fetch
npm run test simm-validation

```
Testing a specific package with option
- With coverage
```sh
npm run test [packageName] -- --coverage

// examples
npm run test simm-validation -- --coverage
```

- With [environment](https://vitest.dev/guide/environment)
```sh
npm run test [packageName] -- --environment=jsdom

// examples
npm run test simm-validation -- --environment=jsdom
```

### Techbase Packages

[Simm](/packages/simm) (beta)

[Simm Fetch](/packages/simm-fetch/) (develop)

[Simm Gen es tsconfig](/packages/simm-gen-es-tsconfig/) (develop)

[Simm mapped types](/packages/simm-mapped-types/) (develop)

[Simm Next Auth](/packages/simm-next-auth/) (beta)

[Simm Player](/packages/simm-player/) (develop)

[Simm Upload](/packages/simm-upload/) (develop)

[Simm Validation](/packages/simm-validation/) (develop)
