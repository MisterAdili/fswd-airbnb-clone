class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = {property_id: params[:id] }.to_json
    render 'property'
  end

  def edit
    @data = {property_id: params[:id] }.to_json
    render 'edit'
  end

  def login
    render 'login'
  end

  def user
    render 'user'
  end

  def success
    render 'success'
  end

end
