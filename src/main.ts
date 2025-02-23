import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {EnvironmentLoader} from './environments/environment-loader';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

EnvironmentLoader
  .then(()=> {
    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));
  })
  .catch((err)=> {
    console.log("Environment Loader Error:", err)
  })
