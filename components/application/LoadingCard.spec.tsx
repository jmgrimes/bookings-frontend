/**
 * @jest-environment jsdom
 */
import {
  render,
} from "@testing-library/react"

import LoadingCard from "./LoadingCard"

describe("<LoadingCard/>", () => {
  it("should render", () => {
    render(<LoadingCard/>)
  })
})