import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  protected housingLocationList: HousingLocation[] = [
    {
      id: 0,
      name: 'Econo Fitness Centre',
      city: 'Chicago',
      state: 'IL',
      photo: '../assets/Econo.jpg',
      phoneNumber: '(403) 999-1224',
      wifi: true,
      couponsAvailable: 5,
      rating: 5
    },
    {
      id: 1,
      name: 'Akai Bowl',
      city: 'Verdun',
      state: 'Montreal',
      photo: '../assets/AkaiBowl.jpg',
      phoneNumber: '(449) 827-9593',
      wifi: false,
      couponsAvailable: 4,
      rating: 5
    },
    {
      id: 2,
      name: 'Buzz Gym',
      city: 'Juneau',
      state: 'AK',
      photo: '../assets/Buzz.jpg',
      phoneNumber: '(297) 524-1735',
      wifi: false,
      couponsAvailable: 2,
      rating: 5
    },
    {
      id: 3,
      name: 'Freshi Homemade dishes',
      city: 'Chicago',
      state: 'IL',
      photo: '../assets/Freshi.jpeg',
      phoneNumber: '(902) 639-6161',
      wifi: true,
      couponsAvailable: 3,
      rating: 5
    },
    {
      id: 4,
      name: 'Lola Rosa',
      city: 'Gary',
      state: 'IN',
      photo: '../assets/LolaRosa.jpg',
      phoneNumber: '(410) 658-5743',
      wifi: true,
      couponsAvailable: 6,
      rating: 5
    },
    {
      id: 5,
      name: 'Scandinave Spa',
      city: 'Oakland',
      state: 'CA',
      photo: '../assets/Scandinave.jpg',
      phoneNumber: '(542) 362-5341',
      wifi: true,
      couponsAvailable: 2,
      rating: 5
    },
    {
      id: 6,
      name: 'Orange Gym(24/7)',
      city: 'Oakland',
      state: 'CA',
      photo: '../assets/Orange.jpg',
      phoneNumber: '(817) 387-2275',
      wifi: true,
      couponsAvailable: 3,
      rating: 5
    },
    {
      id: 7,
      name: 'Verte Lifestyle',
      city: 'Oakland',
      state: 'CA',
      photo: '../assets/Verte.jpg',
      phoneNumber: '(817) 387-2275',
      wifi: true,
      couponsAvailable: 1,
      rating: 5
    },
    {
      id: 8,
      name: 'Strom Spa',
      city: 'Oakland',
      state: 'CA',
      photo: '../assets/Strom.jpg',
      phoneNumber: '(817) 387-2275',
      wifi: false,
      couponsAvailable: 6,
      rating: 5
    },
    {
      id: 9,
      name: 'Nautilus Fitness Centre',
      city: 'Portland',
      state: 'OR',
      photo: '../assets/Nautilus.jpg',
      phoneNumber: '(542) 362-5341',
      wifi: true,
      couponsAvailable: 4,
      rating: 5
    }
  ];

  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
