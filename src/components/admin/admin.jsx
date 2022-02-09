import React from 'react';
import SearchBar from '../search/search';
import NavBar from '../navbar/navbar';
import { TableHead, TableRow, Table, TableBody } from '../table/table';
import './admin.css'

class Admin extends React.Component {
    state = {
        userData: [],
        allCheck: false,
        pagination: [],
        index: 1,
        filtered: [],
        input: '',
        update: '',
        select: []
    };

    async componentDidMount() {
        const data = (await (await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")).json())
        const pagination = [];
        let i = 1;
        let length = data.length;
        while (length > 0) {
            length -= 10
            pagination.push(i)
            i++
        }
        this.setState({ userData: [...data], pagination: [...pagination] })
    }

    render() {
        //Deleate a user
        const deleteUser = (id) => {
            let mutatedData = [...this.state.userData]
            const user = this.state.userData.find(user => {
                return user.id === id;
            })
            mutatedData.splice(mutatedData.indexOf(user), 1)
            this.setState({ userData: [...mutatedData] })
            if (this.state.pagination.length * 10 - this.state.userData.length === 9) {
                this.state.pagination.pop()
            }
        }

        //Search a user
        const search = (str) => {
            let filteredData = [];
            this.state.userData.forEach(user => {
                const data = Object.values(user)
                if (data.includes(str)) {
                    filteredData.push(user)
                }
                this.setState({ filtered: [...filteredData] })
            })
        }

        //Update an user
        const update = (id, str) => {
            const updatedData = str.split(',');
            let userData = [...this.state.userData]
            const findUserById = userData.find(user => {
                return user.id === id;
            })
            userData.splice(userData.indexOf(findUserById), 1, {
                id,
                name: updatedData[0] ? updatedData[0].trim() : findUserById.name,
                email: updatedData[1] ? updatedData[1].trim() : findUserById.email,
                role: updatedData[2] ? updatedData[2].trim() : findUserById.role
            })
            this.setState({ userData: userData })
        }

        //Select an user
        const selectUser = (id, event) => {
            let selected = this.state.select
            if (event.target.checked) {
                selected.push(id)
                this.setState(({ select: selected }))
            } else {
                selected.splice(
                    selected.indexOf(id),
                    1
                )
                this.setState(({ select: selected }))
            }
        }

        //Select multiple users
        const selectAll = (idArr, event) => {
            let selected = this.state.select;
            console.log(event.target.checked)
            if (event.target.checked) {
                selected = selected.concat(idArr)
                this.setState(({ select: selected }))
            } else if (idArr === []) {

            }
            else {
                selected = []
                this.setState(({ select: selected }))
            }
        }

        //Delete multiple users
        const deleteMultiple = () => {
            let mutatedData = [...this.state.userData] 
            let selected = this.state.select;
            console.log(mutatedData)
            const toBeDeleted = selected.map(id => {
                return mutatedData.find(user => user.id===id)
            })
            console.log(toBeDeleted)
            toBeDeleted.forEach((user) => {
                mutatedData.splice(mutatedData.indexOf(user),1)
                selected.splice(selected.indexOf(user.id),1)
            })
            console.log(selected, mutatedData)
            this.setState({ select: selected, userData:[...mutatedData]})
            console.log(this.state.pagination.length * 10 - this.state.userData.length)
            if (this.state.pagination.length * 10 - this.state.userData.length >= 9) {
                this.state.pagination.pop()
            }
        }

        return (
            <div>
                <SearchBar onChange={e => {
                    this.setState({ input: e.target.value })
                    search(e.target.value)
                }} />

                <Table>
                    <TableHead
                        checked={this.state.userData.slice((this.state.index - 1) * 10, this.state.index * 10).length === this.state.select.length}
                        onClick={e => {
                            let newArr = this.state.userData.slice((this.state.index - 1) * 10, this.state.index * 10).map(user => user.id)
                            selectAll(newArr, e)
                        }} />
                    <TableBody>
                        {this.state.input ? (this.state.filtered.map(user => {
                            return (
                                <TableRow
                                    key={user.id}
                                    user={user}
                                    update={update}
                                    deleteUser={deleteUser}
                                    selected={selectUser}
                                    isTrue={this.state.select.includes(user.id)}
                                />
                            )
                        })) : (this.state.userData.slice((this.state.index - 1) * 10, this.state.index * 10).map(user => {
                            return (
                                <TableRow
                                    key={user.id}
                                    user={user}
                                    update={update}
                                    deleteUser={deleteUser}
                                    selected={selectUser}
                                    isTrue={this.state.select.includes(user.id)}
                                />
                            )
                        }))}
                    </TableBody>
                </Table>

                <NavBar
                    deleteSelected={deleteMultiple}
                    callBack1={() => this.setState({ index: 1 })}
                    map1={this.state.pagination.map(num => {
                        return (
                            <li key={num} className="page-item">
                                <button onClick={() => this.setState({ index: num })} className="page-link" >{num}</button>
                            </li>
                        )
                    }
                    )}
                    callBack2={() => this.setState({ index: this.state.pagination.length })}
                />
            </div>
        );
    }
}

export default Admin;