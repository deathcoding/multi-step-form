import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import onboardingFormReducer from '../components/OnboardingForm/formSlice'

const rootReducer = combineReducers({
  onboardingForm: onboardingFormReducer,
})

const persistConfig = {
  key: 'onboarding',
  storage,
  whitelist: ['onboardingForm'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
