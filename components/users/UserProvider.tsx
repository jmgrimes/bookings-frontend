import {
  FunctionComponent,
  useState,
} from "react"

import {
  User,
  UserContext,
  UserSetContext,
} from "../../features/users"

const UserProvider: FunctionComponent = (props) => {
  const {children} = props
  const [user, setUser] = useState<User>()
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  )
}

export default UserProvider