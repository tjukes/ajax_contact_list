# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  Contact.all.to_json
end

post '/contacts/create' do
  results = {result: false}
  contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], phone: params[:phone])
  if contact.save
    results[:result] = true
    results[:contact_id] = contact.id
    # Should refactor to add error messages here if save unsuccessful
  end
  results.to_json
end
