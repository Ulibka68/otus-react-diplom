import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as expenceTypes from "./ExpenceTypes";

export class ExpenceList extends React.Component<any, { expList: expenceTypes.iState[] }> {
    constructor(props: any) {
        super(props);
        // this.state=[];
    }

    componentDidMount() {
        fetch('/api/expenses/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({expList: data});
            });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <>
                <div>Здесь будет вывод</div>
                {console.log(this.state)}
                {this.state &&
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.expList.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </>
        );
    }
}
