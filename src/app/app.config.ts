import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'manage-shop-59e15',
        appId: '1:1001107300983:web:7c9077fc753fa9b6cd9c72',
        storageBucket: 'manage-shop-59e15.firebasestorage.app',
        apiKey: 'AIzaSyD7kEgViB8TcFTDs0awdaX-JnZkQiEfHVo',
        authDomain: 'manage-shop-59e15.firebaseapp.com',
        messagingSenderId: '1001107300983',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideHttpClient()

  ],
};
