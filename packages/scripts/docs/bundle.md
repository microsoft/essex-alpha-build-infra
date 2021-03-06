# > essex bundle

Performs common bundling tasks for a library package.

**Internal Build Steps**

- Bundle Webpack
- Bundle Rollup

# CLI Options

- `--verbose`<br/> enables verbose mode
- `--env <env> (default=development)`<br/> sets the env to use for babel and webpack (if used)
- `--mode <mode> (default=development)`<br/> sets the mode to use in webpack (if used)
- `--webpack`<br/> enables webpack bundling. default=true if `webpack.config.js` is present

# Details & Customization

- ## Rollup

  ### Purpose

  Some packages may want to define a Rollup configuration that bundles them into a single file for consumption. If `rollup.config.js` is present, then Rollup will be invoked using your custom configuration.

  ### Customization

  Define a `rollup.config.js`

- ## Webpack

  ### Purpose

  Web applications will want to run the bundle step to generate a build/ folder of deployable artifacts. If `webpack.config.js` is present, then webpack will be invoked using your custom configuration.

  ### Customization

  Define a `webpack.config.js`