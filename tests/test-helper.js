import Application from 'ember-lower-js/app';
import config from 'ember-lower-js/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
