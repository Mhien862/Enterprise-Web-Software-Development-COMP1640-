import { configureStore } from '@reduxjs/toolkit';

import serviceReducer from './reducers/service';
// import managementReducer from './reducers/management';
// import ownerReducer from './reducers/owner';

export const store = configureStore({
  reducer: {
    
    // management: managementReducer,
    service: serviceReducer,
    // owner: ownerReducer,
  },
});
