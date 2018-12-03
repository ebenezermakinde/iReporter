[![Build Status](https://travis-ci.com/ebenezermakinde/iReporter.svg?branch=develop)](https://travis-ci.com/ebenezermakinde/iReporter) [![Coverage Status](https://coveralls.io/repos/github/ebenezermakinde/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/ebenezermakinde/iReporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e5d348a4a892734bc1b/maintainability)](https://codeclimate.com/github/ebenezermakinde/iReporter/maintainability)

# iReporter
### This is an iReporter application.
Corruption is a huge bane to Africa’s development. African countries must develop novel and
localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables
any/every citizen to bring any form of corruption to the notice of appropriate authorities and the
general public. Users can also report on things that needs government intervention.

### Live UI
https://ebenezermakinde.github.io/iReporter/UI

### Project Management
##### Pivotal Tracker
https://www.pivotaltracker.com/n/projects/2226557

### Required Features
1. Users can create an account and log in.
2. Users can create a red-flag record (An incident linked to corruption).
3. Users can create intervention record (a call for a government agency to intervene e.g repair bad road sections, collapsed bridges, flooding.
4. Users can edit their red-flag or intervention records.
5. Users can delete their red-flag or intervention records.
6. Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention records .
7. Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or intervention records .
8. Admin can change the status of a record to either under investigation, rejected (in the event of a false claim) or resolved (in the event that the claim has been investigated and resolved).

### Optional Features
1. Users can add images to their red-flag or intervention records, to support their claims.
2. Users can add videos to their red-flag or intervention records, to support their claims.
3. The application should display a Google Map with Marker showing the red-flag or intervention location.
4. The user gets real-time email notification when Admin changes the status of their record.
5. The user gets real-time sms notification when Admin changes the status of their record.

### Technologies Used.
* NodeJS
* Express
* Babel, Eslint, Mocha, Chai.
* Postman

### API Endpoints.
##### Base URL 
[Heroku] (https://ireporter-myapp.herokuapp.com/api/v1)

Verb   | Endpoint              | Action                       |
-------|-----------------------|------------------------------|
GET    | /red-flags            |Get all red-flags             |
GET    |/red-flags/id          |Get only one red-flag         |
DELETE |/red-flags/id          |Remove only one red-flag      |
POST   |/red-flags             |Create a red-flag             |
PATCH  |/red-flags/id/comment  |Edit only a red-flag comment  |
PATCH  |/red-flags/id/location |Edit only a red-flag location |

### Test
Run npm test

### Author
Ebenezer Makinde

### Acknowledgements
* Andela