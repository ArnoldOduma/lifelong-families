import { Injectable } from '@angular/core';
import { Adapter } from '../adapters/adapter';


export class BusinessService {
  constructor(
    public id: number,
    public name: string,
    public type: number,
    public image1: string,
    public image2: string,
    public image3: string,
    public image4: string,
    public price: number,
    public category: string,
    public description: string,
    public location: string,
    public location_g_lat: number,
    public location_g_lng: number,
    public location_description: string,
    public country: string,
    public county: string,
    public city: string,
    public town: string,
    public rating: number,
    public paid: boolean,
    public verified: boolean,
    public date_posted: Date,
    public views: number,
    public limit: number,
    public ownerID: number,
    public company: string,
    public owner_id_passport: string,
    public business_permit_number: string,
    public email1: string,
    public email2: string,
    public phone1: number,
    public phone2: number,
    public website_address: string,
    public user: number
  ) { }
}


@Injectable({
  providedIn: 'root'
})
export class BusinessServiceAdapter implements Adapter<BusinessService> {
  adapt(item: any): BusinessService {
    return new BusinessService(
      item.id,
      item.name,
      item.type,
      item.image1,
      item.image2,
      item.image3,
      item.image4,
      item.price,
      item.category,
      item.description,
      item.location,
      item.location,
      item.location_g_lat,
      item.location_g_lng,
      item.country,
      item.county,
      item.city,
      item.town,
      item.rating,
      item.paid,
      item.verified,
      new Date(item.date_posted),
      item.views,
      item.limit,
      item.ownerID,
      item.company,
      item.owner_id_passport,
      item.business_permit_number,
      item.email1,
      item.email2,
      item.phone1,
      item.phone2,
      item.website_address,
      item.user
    );
  }
}
