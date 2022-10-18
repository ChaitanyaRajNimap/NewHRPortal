import React from 'react';

import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function replace(name, params) {
  if (navigationRef.isReady) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

function reset(name) {
  if (navigationRef.isReady) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routeNames:name
      }),
    );
  }
}

const NavigationServices = {
  navigate,
  replace,
  reset
};

export {navigationRef};

export default NavigationServices;
