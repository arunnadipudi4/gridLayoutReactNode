import React from 'react';
import { Table } from 'react-bootstrap';

const MultipleGrids = (props) => {
    const { multiplegridsdata } = props;
    return (
        <div>
            {
                multiplegridsdata && multiplegridsdata.map((singleGrid) => {
                    const singleGridData = singleGrid[0];
                    return <Table responsive striped hover className={"mt-5"}>
                        {
                            <thead>
                                {
                                    Object.keys(singleGridData[0]).map((d) => {
                                        return <th 
                                        style={{ border: "1px solid yellow", maxHeight: '10px', padding: '5px', 'fontSize': '14px'}}
                                       >{d}</th>
                                    })
                                }
                            </thead>
                        }

                        <tbody style={{'fontSize': '12px'}}>
                            {
                                singleGridData && singleGridData.map((data, i) => {
                                    return (
                                        <tr>
                                            {
                                                Object.values(data).map((d) => {
                                                    return <td
                                                    style={{ border: "1px solid yellow" }}
                                                   >{d}</td>
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                })

            }

        </div>
    )
}

export default MultipleGrids;
