import "reflect-metadata"
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"

import { Booking } from "~/features/definitions/bookings"
import type { Context } from "~/features/definitions/context"
import type { IUser, IUserProps } from "~/features/models/users"

@ObjectType({
    description: "abstract base class for user properties",
})
@InputType({
    description: "abstract base class for user properties",
})
class UserPropsBase implements IUserProps {
    @Field({
        description: "the name of the user",
        nullable: false,
    })
    name: string
    @Field({
        description: "the title of the user",
        nullable: false,
    })
    title: string
    @Field({
        description: "the avatar image of the user",
        nullable: true,
    })
    img?: string
    @Field({
        description: "the notes about the user",
        nullable: true,
    })
    notes?: string

    constructor(name: string, title: string, img?: string, notes?: string) {
        this.name = name
        this.title = title
        this.img = img
        this.notes = notes
    }
}

@ObjectType({
    description: "a user of the bookings application",
})
export class User extends UserPropsBase implements IUser {
    @Field({
        description: "the unique identifier for the user",
        nullable: false,
    })
    id: number

    constructor(id: number, name: string, title: string, img?: string, notes?: string) {
        super(name, title, img, notes)
        this.id = id
    }

    static fromUser(user: IUser) {
        return new User(user.id, user.name, user.title, user.img, user.notes)
    }
}

@InputType({
    description: "data for new users and user updates",
})
export class UserProps extends UserPropsBase implements IUserProps, Partial<User> {
    constructor(name: string, title: string, img?: string, notes?: string) {
        super(name, title, img, notes)
    }

    static fromUserProps(props: IUserProps) {
        return new UserProps(props.name, props.title, props.img, props.notes)
    }
}

@Resolver(() => User)
export default class UserResolver {
    @FieldResolver(() => [Booking], {
        description: "the bookings made by the user",
        nullable: false,
    })
    async bookings(
        @Ctx() context: Context,
        @Root() user: User,
        @Arg("bookableId", { nullable: true }) bookableId?: number,
        @Arg("startDate", { nullable: true }) startDate?: string,
        @Arg("endDate", { nullable: true }) endDate?: string,
    ) {
        const bookings = await context.dataSources.bookingApi.getBookings({
            bookerId: user.id,
            bookableId,
            startDate,
            endDate,
        })
        return bookings.map(Booking.fromBooking)
    }

    @Query(() => User, {
        description: "get a user by its identifier",
        nullable: false,
    })
    async user(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        const user = await context.dataSources.userApi.getUser(id)
        return User.fromUser(user)
    }

    @Query(() => [User], {
        description: "get a list of all users",
        nullable: false,
    })
    async users(@Ctx() context: Context) {
        const users = await context.dataSources.userApi.getUsers()
        return users.map(User.fromUser)
    }

    @Mutation(() => User, {
        description: "add a new user",
        nullable: false,
    })
    async createUser(@Ctx() context: Context, @Arg("props") userProps: UserProps) {
        const user = await context.dataSources.userApi.createUser(userProps)
        return User.fromUser(user)
    }

    @Mutation(() => User, {
        description: "update an existing user",
        nullable: false,
    })
    async updateUser(
        @Ctx() context: Context,
        @Arg("id", { nullable: false }) id: number,
        @Arg("props", { nullable: false }) userProps: UserProps,
    ) {
        const user = await context.dataSources.userApi.updateUser(id, userProps)
        return User.fromUser(user)
    }

    @Mutation(() => Number, {
        description: "delete an existing user",
        nullable: false,
    })
    async deleteUser(@Ctx() context: Context, @Arg("id", { nullable: false }) id: number) {
        return context.dataSources.userApi.deleteUser(id)
    }
}
