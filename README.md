# Ledjam Desktop Application
![Ledjam Logo](https://github.com/luandro/ledjam-radio/blob/master/app/assets/imgs/favicon.png)

## Install

Install dependencies.

```bash
$ npm install
```

## Development

To start Electron and Hot Reload server

```bash
npm run dev
```

## Package

To generate app for OSX

```bash
npm run mac 
```

To generate app for all platforms

```bash
npm run package-all
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

## License
MIT © [Luandro](https://github.com/luandro)
