import { Injectable } from '@angular/core';
import { Adapter } from '../adapters/adapter';

export class Housing {
  constructor(
    id: number,
    name: string,
    type: number,
    image1: string,
    image2: string,
    image3: any,
    image4: any,
    price: number,
    description: string,
    size: number,
    bedrooms_no: number,
    bathrooms_no: number,
    furnished: boolean,
    finishing: string,
    amenities: string,
    location: string,
    location_g_lat: string,
    location_g_lng: string,
    location_description: string,
    country: string,
    county: string,
    city: string,
    town: string,
    rating: number,
    paid: boolean,
    verified: boolean,
    date_posted: Date,
    views: number,
    limit: number,
    ownerID: number,
    company: string,
    owner_id_passport: string,
    business_permit_number: string,
    email1: string,
    email2: string,
    phone1: number,
    phone2: number,
    website_address: string,
    user: number,
    category: number,

  ) { }
}

@Injectable({
  providedIn: 'root'
})

export class HousingAdapter implements Adapter<Housing>{
  adapt(item: any): Housing {
    return new Housing(
      item.id,
      item.name,
      item.type,
      item.image1,
      item.image2,
      item.image3,
      item.image4,
      item.price,
      item.description,
      item.size,
      item.bedrooms,
      item.bathrooms_no,
      item.furnished,
      item.finishing,
      item.amenities,
      item.location,
      item.location_g_lat,
      item.location_g_lng,
      item.location_description,
      item.country,
      item.county,
      item.city,
      item.town,
      item.rating,
      item.paid,
      item.verified,
      item.date_posted,
      item.views,
      item.limit,
      item.ownerID,
      item.company,
      item.owner_id_passport,
      item.business_permit_number,
      item.email1,item.email2,
      item.phone1,
      item.phone2,
      item.website_address,
      item.user,
      item.category
    );
  }
}
