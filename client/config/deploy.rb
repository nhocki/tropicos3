# -*- coding: utf-8 -*-
set :user, "comovamos"


set :scm, :git
#set :scm_verbose, true
set :repository,  "git@github.com:nhocki/Tropicos-Pr1.git"
set :branch, "master"
set :deploy_via, :checkout
set :rails_env, "production"

set :deploy_to, "/home/#{user}/capistrano/tropicos"

role :app, "nhocki.com"
role :web, "nhocki.com"
role :db,  "nhocki.com", :primary => true
set :use_sudo,  false

set :keep_releases, 3

set :global_shared_files, %w()