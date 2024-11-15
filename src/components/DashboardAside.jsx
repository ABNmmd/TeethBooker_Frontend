import React from 'react'

function DashboardAside({ arr }) {
    return (
        <aside>
            <h1>TeethBooker</h1>
            <ul>
                <li>
                    <a href="/dashboard">Dashboard</a>
                </li>
                {arr &&
                    arr.map((item, index) => (
                        <li key={index}>
                            <a href={item}>
                                
                                {item}
                            </a>
                        </li>
                    )
                    )
                }
            </ul>
        </aside>
    )
}

export default DashboardAside;