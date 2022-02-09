const NavBar = (props) => (
    <div className="nav-wrapper">
        <button type="button" onClick={props.deleteSelected} className="btn btn-danger">Delete Selected</button>
        <nav className='nav' aria-label="Page navigation example">

            <ul className="pagination">
                <li className="page-item">
                    <button onClick={props.callBack1} className="page-link" >{'<<'}</button>
                </li>
                {props.map1}
                <li className="page-item">
                    <button onClick={props.callBack2} className="page-link" >{'>>'}</button>
                </li>
            </ul>
        </nav>
    </div>
);

export default NavBar;