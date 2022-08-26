import { useRef, useState } from "react";

function App() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [users, setUsers] = useState([])
  let watchUpdateUserId = 0

  email = useRef()
  password = useRef()

  const addUser = (e) => {
    e.preventDefault()

    if(email.current.value.trim() === "" || password.current.value === ""){
      alert("Please fill inputs")
      return
    }

    if (watchUpdateUserId !== 0) {
      let findUser = users.find(user => user.id === watchUpdateUserId);
      findUser.email = email.current.value
      findUser.password = password.current.value
      setUsers([...users])
    }

    if(watchUpdateUserId === 0){
      let newUser = {
        id: users.length + 1,
        email: email.current.value,
        password: password.current.value,
      };
      users.push(newUser);
      setUsers([...users]);
      email.current.value = "";
      password.current.value = "";
    }
  }

  const updateUser = (id) => {
    const findUser = users.find(user => user.id === id)
    email.current.value = findUser.email
    password.current.value = findUser.password
    watchUpdateUserId = findUser.id;
  }

  const deleteUser = (id) => {
    users = users.filter(user => user.id !== id)
    setUsers([...users])
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <form onSubmit={addUser}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                ref={email}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                Never share email address
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                ref={password}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>{users.length === 0 ? "Not yet users" : `Count of users: ${users.length}`}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Email address</th>
                <th>Password</th>
                <th>Edit action</th>
                <th>Delete action</th>
              </tr>
            </thead>
            {users.map((user) => (
              <tbody key={user.id}>
                <tr>
                  <th>{user.id}</th>
                  <th>{user.email}</th>
                  <th>{user.password}</th>
                  <th><button className="btn btn-primary" onClick={() => updateUser(user.id)}>Edit</button></th>
                  <th><button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button></th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;