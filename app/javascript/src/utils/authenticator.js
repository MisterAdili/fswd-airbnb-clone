import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

export function authenticatorCall(callback){
  fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {callback(data)})
}

export function getProperties(callback){
  fetch('/api/properties?page=1')
  .then(handleErrors)
  .then(data => {callback(data)})
}

export function getProperty(propertyid, callback){
  fetch('/api/properties/'+propertyid)
  .then(handleErrors)
  .then(data => {callback(data)})
}

export function getUserBookings(user, callback){
  fetch('/api/users/'+user+'/bookings/')
  .then(handleErrors)
  .then(data => {callback(data)})
}
