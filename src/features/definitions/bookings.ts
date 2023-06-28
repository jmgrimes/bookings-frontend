import "reflect-metadata"
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"

import { Bookable } from "~/features/definitions/bookables"
import type { Context } from "~/features/definitions/context"
import { User } from "~/features/definitions/users"
import { BookableSessionEnum } from "~/features/models/bookables"
import type { IBooking, IBookingProps, IBookingQuery } from "~/features/models/bookings"

@InputType("BookingPropsBase", {
    description: "abstract base class for booking properties",
})
@ObjectType("BookingPropsBase", {
    description: "abstract base class for booking properties",
})
abstract class BookingPropsBase implements IBookingProps {
    @Field({
        description: "the id of the booking user for the booking, reservation, or appointment",
        nullable: false,
    })
    bookerId: number
    @Field({
        description: "the id of the bookable for the booking, reservation, or appointment",
        nullable: false,
    })
    bookableId: number
    @Field({
        description: "the title of the booking, reservation, or appointment",
        nullable: false,
    })
    title: string
    @Field({
        description: "the date on which the booking, reservation, or appointment occurs",
        nullable: false,
    })
    date: string
    @Field(() => BookableSessionEnum, {
        description: "the session during which the booking, reservation, or appointment occurs",
        nullable: false,
    })
    session: BookableSessionEnum
    @Field({
        description: "the notes for the booking, reservation, or appointment",
        nullable: false,
    })
    notes?: string

    constructor(
        bookerId: number,
        bookableId: number,
        title: string,
        date: string,
        session: BookableSessionEnum,
        notes?: string,
    ) {
        this.bookerId = bookerId
        this.bookableId = bookableId
        this.title = title
        this.date = date
        this.notes = notes
        this.session = session
    }
}

@ObjectType("Booking", {
    description: "a booking, reservation, or appointment in the bookings application",
})
export class Booking extends BookingPropsBase implements IBooking {
    @Field({
        description: "the id of the booking resource",
        nullable: false,
    })
    id: number

    constructor(
        id: number,
        bookerId: number,
        bookableId: number,
        title: string,
        date: string,
        session: BookableSessionEnum,
        notes?: string,
    ) {
        super(bookerId, bookableId, title, date, session, notes)
        this.id = id
    }

    static fromBooking(booking: IBooking) {
        return new Booking(
            booking.id,
            booking.bookerId,
            booking.bookableId,
            booking.title,
            booking.date,
            booking.session,
            booking.notes,
        )
    }
}

@InputType("BookingProps", {
    description: "data for new bookables and bookable updates",
})
export class BookingProps extends BookingPropsBase implements IBookingProps {
    constructor(
        bookerId: number,
        bookableId: number,
        title: string,
        date: string,
        session: BookableSessionEnum,
        notes?: string,
    ) {
        super(bookerId, bookableId, title, date, session, notes)
    }

    static fromBookingProps(props: IBookingProps) {
        return new BookingProps(props.bookerId, props.bookableId, props.title, props.date, props.session, props.notes)
    }
}

@InputType("BookingQuery", {
    description: "query parameters for bookings",
})
export class BookingQuery implements IBookingQuery {
    @Field({
        description: "the id of the booking user for the booking, reservation, or appointment",
        nullable: true,
    })
    bookerId?: number
    @Field({
        description: "the id of the bookable for the booking, reservation, or appointment",
        nullable: true,
    })
    bookableId?: number
    @Field({
        description: "the date after which returned bookings, reservations, or appointments should be selected",
        nullable: true,
    })
    startDate?: string
    @Field({
        description: "the date before which returned bookings, reservations, or appointments should be selected",
        nullable: true,
    })
    endDate?: string

    constructor(bookerId?: number, bookableId?: number, startDate?: string, endDate?: string) {
        this.bookerId = bookerId
        this.bookableId = bookableId
        this.startDate = startDate
        this.endDate = endDate
    }

    static fromBookingQuery(query: IBookingQuery) {
        return new BookingQuery(query.bookerId, query.bookableId, query.startDate, query.endDate)
    }
}

@Resolver(() => Booking)
export default class BookingResolver {
    @FieldResolver(() => Bookable, {
        description: "the bookable for this booking",
        nullable: false,
    })
    async bookable(@Ctx() context: Context, @Root() booking: Booking) {
        const bookable = await context.dataSources.bookableApi.getBookable(booking.bookableId)
        return Bookable.fromBookable(bookable)
    }

    @FieldResolver(() => User, {
        description: "the user who booked this booking",
        nullable: false,
    })
    async booker(@Ctx() context: Context, @Root() booking: Booking) {
        const user = await context.dataSources.userApi.getUser(booking.bookerId)
        return User.fromUser(user)
    }

    @Query(() => Booking, {
        description: "get a booking by its identifier",
        nullable: false,
    })
    async booking(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        const booking = await context.dataSources.bookingApi.getBooking(id)
        return Booking.fromBooking(booking)
    }

    @Query(() => [Booking], {
        description: "get all bookings matching the specified query parameters",
        nullable: false,
    })
    async bookings(@Ctx() context: Context, @Arg("query", { nullable: false }) bookingQuery: BookingQuery) {
        const bookings = await context.dataSources.bookingApi.getBookings(bookingQuery)
        return bookings.map(Booking.fromBooking)
    }

    @Mutation(() => Booking, {
        description: "add a new booking",
        nullable: false,
    })
    async createBooking(@Ctx() context: Context, @Arg("props") bookingProps: BookingProps) {
        const booking = await context.dataSources.bookingApi.createBooking(bookingProps)
        return Booking.fromBooking(booking)
    }

    @Mutation(() => Booking, {
        description: "update an existing booking",
        nullable: false,
    })
    async updateBooking(
        @Ctx() context: Context,
        @Arg("id", { nullable: false }) id: number,
        @Arg("props", { nullable: false }) bookingProps: BookingProps,
    ) {
        const booking = await context.dataSources.bookingApi.updateBooking(id, bookingProps)
        return Booking.fromBooking(booking)
    }

    @Mutation(() => Number, {
        description: "delete an existing booking",
        nullable: false,
    })
    async deleteUser(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        return context.dataSources.bookingApi.deleteBooking(id)
    }
}
