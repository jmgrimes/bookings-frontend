/**
 * @jest-environment jsdom
 */
import {
  render
} from "@testing-library/react"

import LoadingList from "./LoadingList"

describe("<LoadingList/>", () => {
  it("should render properly with defaults", () => {
    const {getAllByRole} = render(<LoadingList/>)
    expect(getAllByRole("button")).toHaveLength(4)
  })

  it("should render the expected number of items", () => {
    const items = 7
    const {getAllByRole} = render(<LoadingList items={items}/>)
    expect(getAllByRole("button")).toHaveLength(items)
  })
})