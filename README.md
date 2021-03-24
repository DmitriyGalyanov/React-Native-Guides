# React-Native-Guides

## All '_// @ts-ignore_' statements _should be removed_ (_for use_; they _should stay present here_ to suppress warnings since the Repo only has 'user-code', but not npm-modules)


### Code presented here (both in files and Wiki) requires specific packages installed. They are _partly_ presented inside appropriate files. The best approach to use it is to firstly _create a React Native Project via react-native-cli or a similar tool_

### _Non-exhaustive_ list of required packages:
* ```json
    "dependencies": {
    "@react-native-async-storage/async-storage": "^1.14.1",
    "@react-native-firebase/analytics": "^11.1.2",
    "@react-native-firebase/app": "^11.1.2",
    "@react-native-firebase/messaging": "^11.1.2",
    "@react-native-firebase/remote-config": "^11.1.2",
    "@reduxjs/toolkit": "^1.5.0",
    "@types/react-redux": "^7.1.16",
    "react": "17.0.1",
    "react-native": "0.64.0",
    "react-native-appsflyer": "^6.2.40",
    "react-native-logs": "^3.0.3",
    "react-native-webview": "^11.3.1",
    "react-redux": "^7.2.2",
    "redux-persist": "^6.0.0"
    },
    "devDependencies": {
    "@babel/core": "^7.12.9",
    "@babel/runtime": "^7.12.5",
    "@react-native-community/eslint-config": "^2.0.0",
    "@types/jest": "^26.0.20",
    "@types/react-native": "^0.64.0",
    "@types/react-test-renderer": "^16.9.2",
    "babel-jest": "^26.6.3",
    "eslint": "^7.14.0",
    "jest": "^26.6.3",
    "metro-react-native-babel-preset": "^0.64.0",
    "react-test-renderer": "17.0.1",
    "typescript": "^3.8.3"
    },
    "resolutions": {
    "@types/react": "^17"
    },
```
