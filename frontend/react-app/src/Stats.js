import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap/esm/';
import { postData } from './utils';

import { Line, Pie } from 'react-chartjs-2';
import { controllers } from 'chart.js';

export default class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wlogs: [],
            target: 0
        }
    }

    componentDidMount() {
        fetch('/api/api_basic/wlogs')
            .then(res => {
                // console.log(res.status)
                if (res.status !== 200) return []
                return res.json()
            })
            .then(res => {
                console.log(res)
                this.setState({ wlogs: res })
            })

        fetch('/api/api_basic/tw')
            .then(res => {
                // console.log(res.status)
                if (res.status === 400) return { target: 0 }
                if (res.status === 203) return res.json()
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (!("weight" in res)) {
                    console.log(JSON.stringify(res))
                }
                else {
                    this.setState({ target: res['weight'] })
                }
            })
    }

    getWeightChartData = () => {
        if (!(this.state.target > 0) || (this.state.wlogs.length === 0)) return {}
        const labels = this.state.wlogs.map((wlog) => {
            return (new Date(wlog['date'])).toDateString()
        })
        const data = this.state.wlogs.map((wlog) => {
            return wlog['weight']
        })
        console.log(labels, data)
        return {
            labels,
            datasets: [
                {
                    label: "Weight Plot",
                    fill: false,
                    lineTension: 0.5,
                    borderwidth: 2,
                    backgroundColor:'black',
                    data
                }
            ]
        }
    }

    getTargetChartData = () => {
        if (!(this.state.target > 0) || (this.state.wlogs.length === 0)) return {}
        const cw = this.state.wlogs[this.state.wlogs.length - 1]['weight']
        const tg = this.state.target;
        let rem;
        if (cw < tg) {
            rem = (tg - cw) / tg
            rem = 100 * rem;
        }
        else {
            rem = (cw - tg) / tg
            rem = 100 * rem;
        }
        return {
            labels: [ "Remaining", "Completed"],
            datasets: [
                {
                    label: 'Target Status',
                    backgroundColor: [
                        'grey',
                        'black'
                    ],
                    data: [rem, 100 - rem]
                }
            ]
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md-span={6}>
                        {/* weight plot */}
                        <Line
                            data={this.getWeightChartData()}
                        />

                    </Col>
                    <Col md-span={6}>
                        {/* target plot */}
                        <Pie
                            data={this.getTargetChartData()}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}


