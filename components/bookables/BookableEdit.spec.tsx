/**
 * @jest-environment jsdom
 */
import {
  MockedProvider,
} from "@apollo/client/testing"
import {
  act,
  render,
} from "@testing-library/react"
import {
  FunctionComponent,
} from "react"

import {
  Bookable,
  BookableDayEnum,
  BookableSessionEnum,
} from "../../features/bookables"
import {
  UseBookableQuery,
} from "../../features/bookables/useBookable"
import {
  UseDeleteBookableMutation,
} from "../../features/bookables/useDeleteBookable"
import {
  UseUpdateBookableMutation,
} from "../../features/bookables/useUpdateBookable"

import BookableEdit from "./BookableEdit"

const useRouter = jest.spyOn(require("next/router"), "useRouter")
const push = jest.fn()

const bookable: Bookable = {
  id: 1,
  group: "Rooms",
  title: "Test Room",
  notes: "Test Room Notes",
  days: [
    BookableDayEnum.Sunday,
    BookableDayEnum.Saturday,
  ],
  sessions: [
    BookableSessionEnum.Morning,
    BookableSessionEnum.Evening,
  ],
}

const errorMessage = "could not load bookable"

const flushAllPromises = () => new Promise<void>(resolve => setTimeout(resolve, 0))

const successMocks = [
  {
    request: {
      query: UseBookableQuery,
      variables: {
        id: bookable.id,
      },
    },
    result: {
      data: {
        bookable,
      },
    },
    newData: jest.fn(() => ({
      data: {
        bookable,
      },
    })),
  },
  {
    request: {
      query: UseDeleteBookableMutation,
      variables: {
        id: bookable.id,
      },
    },
    result: {
      data: {
        deleteBookable: bookable.id,
      },
    },
  },
  {
    request: {
      query: UseUpdateBookableMutation,
      variables: bookable,
    },
    result: {
      data: {
        updateBookable: bookable,
      },
    },
  }
]

const errorMocks = [
  {
    request: {
      query: UseBookableQuery,
      variables: {
        id: bookable.id,
      },
    },
    error: new Error(errorMessage),
  },
]

type BookableEditTestProps = {
  error?: boolean
}

const BookableEditTest: FunctionComponent<BookableEditTestProps> = (props) => {
  const {error} = props
  const mocks = error ? errorMocks : successMocks
  return (
    <MockedProvider mocks={mocks}>
      <BookableEdit/>
    </MockedProvider>
  )
}

describe("<BookableEdit/>", () => {
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: {
        id: bookable.id,
      },
      push,
    })
  })

  it("should render the completed state properly", async () => {
    const {getByText} = render(<BookableEditTest/>)
    await act(async () => await flushAllPromises())
    expect(getByText("Edit Bookable")).toBeInTheDocument()
  })

  it("should render the error state properly", async () => {
    const {getByText} = render(<BookableEditTest error/>)
    await act(async () => await flushAllPromises())
    expect(getByText(errorMessage)).toBeInTheDocument()
  })

  it("should redirect to the bookable view on cancel", async () => {
    const {getByRole} = render(<BookableEditTest/>)
    await act(async () => await flushAllPromises())
    act(() => {
      getByRole("button", { name: /cancel/i, }).click()
    })
    await act(async () => await flushAllPromises())
    expect(push).toBeCalledWith(`/bookables/${bookable.id}`)
  })

  it("should redirect to the bookable view on save", async () => {
    const {getByRole} = render(<BookableEditTest/>)
    await act(async () => await flushAllPromises())
    act(() => {
      getByRole("button", { name: /save/i, }).click()
    })
    await act(async () => await flushAllPromises())
    expect(push).toBeCalledWith(`/bookables/${bookable.id}`)
  })

  it("should redirect to the root bookable view on delete", async () => {
    const {getByRole} = render(<BookableEditTest/>)
    await act(async () => await flushAllPromises())
    act(() => {
      getByRole("button", { name: /delete/i, }).click()
    })
    await act(async () => await flushAllPromises())
    expect(push).toBeCalledWith(`/bookables`)
  })
})