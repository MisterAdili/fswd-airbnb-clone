json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.user_id booking.user_id
    json.property_id booking.property_id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.property_title booking.property.title
    json.property_description booking.property.description
    json.property_city booking.property.city
  end
end