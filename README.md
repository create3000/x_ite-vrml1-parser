# x_ite-vrml1-parser

[![npm Version](https://img.shields.io/npm/v/x_ite-vrml1-parser)](https://www.npmjs.com/package/x_ite-vrml1-parser)
[![Build Size](https://img.shields.io/bundlephobia/minzip/x_ite-vrml1-parser)](https://bundlephobia.com/package/x_ite-vrml1-parser)
[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/x_ite-vrml1-parser/badge?style=rounded)](https://create3000.github.io/jsdelivr-download-stats/?username=create3000&repository=x_ite-vrml1-parser)
[![npm Downloads](https://img.shields.io/npm/dm/x_ite-vrml1-parser)](https://npmtrends.com/x_ite-vrml1-parser)

VRML 1.0 File Format Parser for [X_ITE](https://create3000.github.io/x_ite/)

## Usage

Include the script before X_ITE:

```html
<script defer src="https://cdn.jsdelivr.net/npm/x_ite-vrml1-parser@1.0.4/dist/x_ite-vrml1-parser.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/x_ite@VERSION/dist/x_ite.min.js"></script>
<!-- or as ES module -->
<script type="module" src="https://cdn.jsdelivr.net/npm/x_ite-vrml1-parser@1.0.4/dist/x_ite-vrml1-parser.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/x_ite@VERSION/dist/x_ite.min.mjs"></script>
```

You can now load VRML 1.0 `.wrl` files directly using the `src` attribute, but you can also use `.wrl` files as source of an Inline node.

```html
<x3d-canvas src="room.wrl"></x3d-canvas>
```

## NPM

You can also install it from npm:

```sh
npm i x_ite-vrml1-parser
```

## License

x_ite-vrml1-parser is free software and licensed under the [MIT License](LICENSE.md).

## See Also

* [X_ITE VRML Viewer](https://create3000.github.io/x_ite/tutorials/vrml-viewer/)
