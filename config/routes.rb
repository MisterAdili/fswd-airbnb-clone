Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/logout' => 'static_pages#logout'
  get '/create' => 'static_pages#create'
  get '/property/:id/edit' => 'static_pages#edit'
  get '/user' => 'static_pages#user'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update, :destroy]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]


    get '/users/:user_id/bookings' => 'bookings#get_user_bookings'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end