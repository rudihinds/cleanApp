Rails.application.routes.draw do
  

  namespace :api do
    namespace :v1 do
        resources :users
        resources :cleaners
        resources :customers
        resources :reviews
        resources :cleanings
        resources :offers

        post '/cleaners/available', to: 'cleaners#available'
        get '/cleaners/available', to: 'cleaners#available'
        post '/login', to: 'auth#create'
        get '/validate', to: 'auth#validate'
        get '/users/:id/cleanings', to: 'users#my_cleanings'
        get '/cleaners/:id/get_this_months_earnings', to: 'cleaners#get_this_months_earnings'
        get '/cleaners/:id/get_next_months_earnings', to: 'cleaners#get_next_months_earnings'
        get '/cleaners/:id/get_last_months_earnings', to: 'cleaners#get_last_months_earnings'
        get '/cleaners/:id/available_offers', to: 'cleaners#available_offers'
        get '/offers/:id/sorted_offers', to: 'offers#sorted_offers'


        post '/stripe-account', to: 'stripe_account#create'
        get "stripe/connect", to: "stripe#connect", as: :stripe_connect


        

        # get '/${:id}/cleanings', to: 'cleanings#show'
    end
  end

end