# eslint-global-patch

From ESLint@6 the possibility got removed to use global configs and
plugins. This npm package will patch you ESLint installation to add
support back.

> THIS IS A HIGHLY DANGEROUS AND UGLY PACKAGE! ONLY USE AT YOUR OWN
> RISK IN CASE THERE IS NO OTHER WAY!

This package will basically do a string-replace on your eslint
installation. When it'll try to resolve a plugin/config relative to
your source file and if it fails, it will try to find them also relative
to the patched file: `eslint/lib/shared/relative-module-resolver.js`.

This package can stop working with any ESLint update, I'll try to update
it ASAP. For now the versioning strategy is to use the same ESLint version
number where the braking change introduced.

Usage:

```sh
npm i eslint-global-patch
```

The script will patch ESLint on `postinstall` automatically.

## Why not create an issue at ESLint?

https://github.com/eslint/eslint/issues/11914

