import { test, expect } from '@playwright/test';
import { Booking, BookingResponse } from '../../src/types/Booking';

test('Отправка и проверка POST', async ({ request }) => {
  const postResponse = await request.post(
    'https://restful-booker.herokuapp.com/booking',
    {
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2018-01-01',
          checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
      },
    }
  );

  expect(postResponse.status()).toBe(200);
  const postBody: BookingResponse = await postResponse.json();

  expect(postBody.bookingid).toBeGreaterThan(0)
  expect(postBody.booking.firstname).toBe('Jim');
  expect(postBody.booking.lastname).toBe('Brown');
  expect(postBody.booking.totalprice).toBe(111);
  expect(postBody.booking.depositpaid).toBe(true);
  expect(postBody.booking.bookingdates.checkin).toBe('2018-01-01');
  expect(postBody.booking.bookingdates.checkout).toBe('2019-01-01');
  expect(postBody.booking.additionalneeds).toBe('Breakfast')


  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${postBody.bookingid}`);

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody.firstname).toBe('Jim');
  expect(getBody.lastname).toBe('Brown');
  expect(getBody.totalprice).toBe(111);
  expect(getBody.depositpaid).toBe(true);
  expect(getBody.bookingdates.checkin).toBe('2018-01-01');
  expect(getBody.bookingdates.checkout).toBe('2019-01-01');
  expect(getBody.additionalneeds).toBe('Breakfast');

});