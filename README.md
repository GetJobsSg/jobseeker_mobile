# Prerequisites

1. [Node](https://nodejs.org/en/) >= 14.x
2. Android Studio >= 4.x, Android SDK >= [29](https://developer.android.com/studio/releases/platforms#10), Android NDK >= [20.1.5948944](https://developer.android.com/ndk/downloads)
3. Xcode >= 13.0
4. If you are using VSCode, please install these extensions to help you see the linting error whenever your code not match to a coding rules
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

# Quick Start

```
git clone repo

npm install
cd ios
pod install
cd ..

npm run ios
# or
npm run android
```

# Running application on device

## IOS

1. Run command `xcrun instruments -s devices` to list down simulator/device id connected to ur macbook
2. Go to `package.json` and replace the device name `react-native run-ios --device \"benson’s iPhone\"` to your own ios device name/id
3. Configure [code signing](https://reactnative.dev/docs/running-on-device)
4. `npm run ios:device`

## Android

1. Run command `adb devices` to list down connected android device
2. Go to `package.json` and replace the deviceId `react-native run-android --deviceId='ce031713232e683203'` to your own android deviceId
3. `npm run android:device`


# FAQ

1. Android - Getting 'The minCompileSdk (31) specified in a dependency's AAR metadata is greater than this module's compileSdkVersion (android-30)'
  - Under android/build.gradle, add the following,
    `def REACT_NATIVE_VERSION = new File(['node', '--print',"JSON.parse(require('fs').readFileSync(require.resolve('react-native/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())`
  - and under 'allprojects',
  `
   configurations.all {
          resolutionStrategy {
              // Remove this override in 0.65+, as a proper fix is included in react-native itself.
              force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
          }
      }
  `
  - Reference: https://stackoverflow.com/questions/74343318/react-native-the-mincompilesdk-31-specified-in-a-dependencys-aar-metadata-is
