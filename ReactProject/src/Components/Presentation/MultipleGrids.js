import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MultipleGrids = (props) => {
    const { multiplegridsdata } = props;
    return (
        <div>
            {
                multiplegridsdata && multiplegridsdata.map((singleGrid) => {
                    const singleGridData = singleGrid[0];



                    return singleGridData && singleGridData.map((data, i) => {
                        return <Container >
                            {
                                i === 0 && <Row>
                                    {
                                        Object.keys(data).map((d) => {
                                            return <Col  className={"border border-primary"}>{d}</Col>
                                        })
                                    }
                                </Row>
                            }


                            <Row>
                                {
                                    Object.values(data).map((d) => {
                                        return <Col  className={"border border-primary"}>{d}</Col>
                                    })
                                }
                            </Row>
                        </Container>
                    })
                })
            }

        </div>
    )
}

export default MultipleGrids;
