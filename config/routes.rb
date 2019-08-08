Rails.application.routes.draw do
  # resources :user_sources
  # resources :user_articles
  # resources :articles
  # resources :sources
  # resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
        resources :users
        resources :cleaners
        resources :customers
        resources :reviews
        resources :cleanings
        post '/login', to: 'auth#create'
        get '/validate', to: 'auth#validate'
    end
  end

end