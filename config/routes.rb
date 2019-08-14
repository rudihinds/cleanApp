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
        get '/users/:id/cleanings', to: 'users#my_cleanings'
        

        # get '/${:id}/cleanings', to: 'cleanings#show'
    end
  end

end