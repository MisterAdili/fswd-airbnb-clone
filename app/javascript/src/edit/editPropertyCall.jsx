import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

export function editCall(formData, propertyID){
  fetch('/api/properties/' + propertyID, safeCredentialsForm({
    method: 'PUT',
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
    }
  )
}

export function deleteCall(id){
  fetch(`/api/properties/${id}`, safeCredentialsForm({
    method: 'DELETE',
  }))
    .then(handleErrors)
    .then(data => {
      if (data.success) {
        console.log(data);
      }
    })
    .catch(error => {
      console.log(error)
    })
    .then(()=>{window.location.replace('/')})
}
