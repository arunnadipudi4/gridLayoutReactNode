import React from 'react';
import { Table } from 'react-bootstrap';

const MultipleGrids = (props) => {
    const { multiplegridsdata } = props;
    return (
        <div>
            {
                multiplegridsdata && multiplegridsdata.map((singleGrid) => {
                    const singleGridData = singleGrid[0];
                    return <Table responsive variant="primary" striped bordered hover className={"mt-5"}>
                        {
                            <thead>
                                {
                                    Object.keys(singleGridData[0]).map((d) => {
                                        return <th className={"border border-primary"}>{d}</th>
                                    })
                                }
                            </thead>
                        }

                        <tbody>
                            {
                                singleGridData && singleGridData.map((data, i) => {
                                    return (
                                        <tr>
                                            {
                                                Object.values(data).map((d) => {
                                                    return <td className={"border border-primary"}>{d}</td>
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
