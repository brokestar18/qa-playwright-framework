import { APIRequestContext } from "@playwright/test";
import { Booking, BookingResponse } from "../types/Booking";

export class BookingClient {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext){

        this.request = request

    }

async create(data: Booking): Promise<BookingResponse> {

    const postResponse = await this.request.post(
    '/booking', {data});

    return postResponse.json();
};

async getById(id: number): Promise<Booking> {

    const getResponse = await this.request.get(`/booking/${id}`);

    return getResponse.json();
}

    

}