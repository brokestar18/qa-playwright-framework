import { test, expect } from '@playwright/test';
import { BookingClient } from '@/api/BookingClient';

test('Отправка и проверка POST', async ({ request }) => {

  const client = new BookingClient(request)

  const created = await client.create(
    
    {
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
    
  );


  expect(created.bookingid).toBeGreaterThan(0);
  expect(created.booking.firstname).toBe('Jim');
  expect(created.booking.lastname).toBe('Brown');
  expect(created.booking.totalprice).toBe(111);
  expect(created.booking.depositpaid).toBe(true);
  expect(created.booking.bookingdates.checkin).toBe('2018-01-01');
  expect(created.booking.bookingdates.checkout).toBe('2019-01-01');
  expect(created.booking.additionalneeds).toBe('Breakfast');


  const fetched = await client.getById(created.bookingid);

  expect(fetched.firstname).toBe('Jim');
  expect(fetched.lastname).toBe('Brown');
  expect(fetched.totalprice).toBe(111);
  expect(fetched.depositpaid).toBe(true);
  expect(fetched.bookingdates.checkin).toBe('2018-01-01');
  expect(fetched.bookingdates.checkout).toBe('2019-01-01');
  expect(fetched.additionalneeds).toBe('Breakfast');

});