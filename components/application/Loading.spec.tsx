/**
 * @jest-environment jsdom
 */
import {
  render
} from "@testing-library/react"

import Loading from "./Loading"

describe("<Loading/>", () => {
  it("should render", () => {
    render(<Loading/>)
  })
})