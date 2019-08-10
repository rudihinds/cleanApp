Rails.application.routes.draw do
  

  namespace :api do
    namespace :v1 do
        resources :users
        resources :cleaners
        resources :customers
        resources :reviews
        resources :cleanings
        post '/cleaners/available', to: 'cleaners#available'
        get '/cleaners/available', to: 'cleaners#available'
        post '/login', to: 'auth#create'
        get '/validate', to: 'auth#validate'
    end
  end

end