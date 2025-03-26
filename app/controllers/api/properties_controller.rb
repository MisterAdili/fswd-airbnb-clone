module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property = Property.create!({
        user_id: session.user.id,
        title: params[:property][:title],
        description: params[:property][:description],
        city: params[:property][:city],
        country: params[:property][:country],
        property_type: params[:property][:property_type],
        price_per_night: params[:property][:price_per_night],
        max_guests: params[:property][:max_guests],
        bedrooms: params[:property][:bedrooms],
        beds: params[:property][:beds],
        baths: params[:property][:baths],
      })
      @property.images.attach(params[:property][:images])
      if (@property)
        render 'api/properties/create', status: :created
      end
    end

    def update
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property = Property.find_by(id: params[:id])
      if(@property)
        @property.update!(
          title: params[:property][:title],
          description: params[:property][:description],
          city: params[:property][:city],
          country: params[:property][:country],
          property_type: params[:property][:property_type],
          price_per_night: params[:property][:price_per_night],
          max_guests: params[:property][:max_guests],
          bedrooms: params[:property][:bedrooms],
          beds: params[:property][:beds],
          baths: params[:property][:baths]
        )
        @property.images.purge
        @property.images.attach(params[:property][:newImages])
        if(@property)
          render'api/properties/update'
        end
      end
    end

    def destroy
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property = Property.find_by(id: params[:id])
      if (@property)
        @property.delete
        render status: :deleted
      end

    end

    private

    def property_params
      params.require(:property).permit(:title, :description, :city, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, images: [])
    end

      
    def images
      if object.photo.attached?
        {
          url: rails_blob_url(object.photo),
          signed_id: object.photo.signed_id
        }
      end
    end

  end
end