import "reflect-metadata"
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    ObjectType,
    Query,
    registerEnumType,
    Resolver,
    Root,
} from "type-graphql"

import { Booking } from "~/features/graphql/bookings"
import type { Context } from "~/features/graphql/context"
import { BookableDay, BookableSession } from "~/features/models/bookables"
import type { IBookable, IBookableProps } from "~/features/models/bookables"

@ObjectType({
    description: "abstract base class for bookable properties",
})
@InputType({
    description: "abstract base class for bookable properties",
})
class BookablePropsBase implements IBookableProps {
    @Field({
        description: "the group of the bookable resource",
        nullable: false,
    })
    group: string
    @Field({
        description: "the title of the bookable resource",
        nullable: false,
    })
    title: string
    @Field(() => [BookableSession], {
        description: "the list of days on which the bookable resource can be booked",
        nullable: false,
    })
    days: BookableDay[]
    @Field(() => [BookableSession], {
        description: "the list of sessions during which the bookable resource can be booked",
        nullable: false,
    })
    sessions: BookableSession[]
    @Field({
        description: "the notes about the bookable resource",
        nullable: true,
    })
    notes?: string

    constructor(group: string, title: string, days: BookableDay[], sessions: BookableSession[], notes?: string) {
        this.group = group
        this.title = title
        this.days = days
        this.sessions = sessions
        this.notes = notes
    }
}

@ObjectType({
    description: "a bookable resource in the bookings application",
})
export class Bookable extends BookablePropsBase implements IBookable {
    @Field({
        description: "the id of the bookable resource",
        nullable: false,
    })
    id: number

    constructor(
        id: number,
        group: string,
        title: string,
        days: BookableDay[],
        sessions: BookableSession[],
        notes?: string,
    ) {
        super(group, title, days, sessions, notes)
        this.id = id
    }

    static fromBookable(bookable: IBookable) {
        return new Bookable(
            bookable.id,
            bookable.group,
            bookable.title,
            bookable.days,
            bookable.sessions,
            bookable.notes,
        )
    }
}

@InputType({
    description: "data for new bookables and bookable updates",
})
export class BookableProps extends BookablePropsBase implements Partial<Bookable> {
    constructor(group: string, title: string, days: BookableDay[], sessions: BookableSession[], notes?: string) {
        super(group, title, days, sessions, notes)
    }

    static fromBookableProps(props: IBookableProps) {
        return new BookableProps(props.group, props.title, props.days, props.sessions, props.notes)
    }
}

@Resolver(() => Bookable)
export default class BookableResolver {
    @FieldResolver(() => [Booking], {
        description: "the bookings for the bookable",
        nullable: false,
    })
    async bookings(
        @Ctx() context: Context,
        @Root() bookable: Bookable,
        @Arg("bookerId", { nullable: true }) bookerId?: number,
        @Arg("startDate", { nullable: true }) startDate?: string,
        @Arg("endDate", { nullable: true }) endDate?: string,
    ) {
        const bookings = await context.dataSources.bookingApi.getBookings({
            bookableId: bookable.id,
            bookerId,
            startDate,
            endDate,
        })
        return bookings.map(Booking.fromBooking)
    }

    @Query(() => Bookable, {
        description: "get a bookable by its identifier",
        nullable: false,
    })
    async bookable(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        const bookable = await context.dataSources.bookableApi.getBookable(id)
        return Bookable.fromBookable(bookable)
    }

    @Query(() => [Bookable], {
        description: "get a list of all bookables",
        nullable: false,
    })
    async bookables(@Ctx() context: Context) {
        const bookables = await context.dataSources.bookableApi.getBookables()
        return bookables.map(Bookable.fromBookable)
    }

    @Mutation(() => Bookable, {
        description: "add a new bookable",
        nullable: false,
    })
    async createBookable(@Ctx() context: Context, @Arg("props") bookableProps: BookableProps) {
        const bookable = await context.dataSources.bookableApi.createBookable(bookableProps)
        return Bookable.fromBookable(bookable)
    }

    @Mutation(() => Bookable, {
        description: "update an existing bookable",
        nullable: false,
    })
    async updateBookable(
        @Ctx() context: Context,
        @Arg("id", { nullable: false }) id: number,
        @Arg("props", { nullable: false }) bookableProps: BookableProps,
    ) {
        const bookable = await context.dataSources.bookableApi.updateBookable(id, bookableProps)
        return Bookable.fromBookable(bookable)
    }

    @Mutation(() => Number, {
        description: "delete an existing bookable",
        nullable: false,
    })
    async deleteBookable(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        return context.dataSources.bookableApi.deleteBookable(id)
    }
}

registerEnumType(BookableDay, {
    name: "BookableDay",
    description: "a day on which a bookable resource can be booked",
})

registerEnumType(BookableSession, {
    name: "BookableSession",
    description: "a session during which a bookable resource can be booked",
})
