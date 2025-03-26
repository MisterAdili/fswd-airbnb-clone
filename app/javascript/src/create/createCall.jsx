import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

export function createCall(formData){
  fetch('/api/properties', safeCredentialsForm({
    method: 'POST',
    body: formData
  }))
    .then(handleErrors)
    .then(data => {
      if (data.success) {
        console.log(data);
        window.location.replace('/');
      }
    })
    .catch(error => {
      console.log(error)
    })
}
  




