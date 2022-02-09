export const Table = (props) => (<table>{props.children}</table>)

export const TableBody = (props) => (<tbody>{props.children}</tbody>)

export const TableHead = (props) => (
    <thead>
        <tr>
            <th scope="col">
                <div className="form-check">
                    <input {...props} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>

        </tr>
    </thead>
)

export const TableRow = (props) => (
    <tr>
        <td data-label="Name">
            <div className="form-check">
                <input
                    checked={props.isTrue}
                    onChange={e => {
                        
                        props.selected(props.user.id,e)
                    }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
        </td>
        <td key={props.user.name} data-label="Name">{props.user.name}</td>
        <td key={props.user.email} data-label="Email">{props.user.email}</td>
        <td key={props.user.role} data-label="Role">{props.user.role}</td>
        <td data-label="Actions">
            <button type="button" onClick={e => {
                console.log('edit')
                const updatedFields = prompt("Username, Email, Role: ")
                props.update(props.user.id, updatedFields)
            }} className="btn btn-primary">Edit</button>
            <button type="button" onClick={() => {
                props.deleteUser(props.user.id)
            }} className="btn btn-danger">Delete</button>
        </td>
    </tr>
)