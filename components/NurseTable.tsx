import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import router from 'next/router';
import { getAdmitListForNurse, getSearchedAdmitForNurse } from '@/services/patientService';
import { getAdmitListForDoctor, getSearchedAdmitForDoctor } from '@/services/patientService';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, TextField } from '@mui/material';
import { useAuth } from '@/_auth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { disableUser, getAllUser, getDoctorUser, getNurseUser, getSearchedUser } from '@/services/userService';

export interface IUserForm {
    id: number;
    username: string;
    authorities: string[];
    enabled: boolean;
    nurse: {
        name: string;
        surname: string;
        phoneNumber: string;
        medicalID: string;
        gender: string;
    }
    doctor: {
        name: string;
        surname: string;
        phoneNumber: string;
        medicalID: string;
        gender: string;
        speciality: string;

    }
}

export interface INurseTable {
    username: string;
    name: string;
    surname: string;
    phoneNumber: string;
    medicalID: string;
    gender: string;
    type: string;
    enabled: boolean;
    id: number;
    speciality: string;

}
/* 
export interface UserTypeProps {
    type: string;
} */

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof INurseTable;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'username',
        numeric: false,
        disablePadding: true,
        label: 'email',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'ชื่อ',
    },
    {
        id: 'surname',
        numeric: true,
        disablePadding: false,
        label: 'นามสกุล',
    },

    {
        id: 'gender',
        numeric: true,
        disablePadding: false,
        label: 'เพศ',
    },
    {
        id: 'phoneNumber',
        numeric: true,
        disablePadding: false,
        label: 'เบอร์โทรศัพท์',
    },

    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'ตำแหน่ง',
    },


    {
        id: 'speciality',
        numeric: true,
        disablePadding: false,
        label: 'ความชำนาญ',
    },
    {
        id: 'medicalID',
        numeric: true,
        disablePadding: false,
        label: 'เลขประจำตัว',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof INurseTable) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof INurseTable) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function EnhancedTable() {
    const { role } = useAuth()

    const [rows, setRows] = useState<any>([])

    useEffect(() => {
        //loadPatientFromApi()
        const fetchData = async () => {
            // get the data from the api
            const user = await loadUserFromApi()
            const arr: { username: any; name: any; surname: any; gender: any; medicalID: any; phoneNumber: any; type: string; id: any; }[] = [];
            console.log(user)

            Object.keys(user).forEach((id) => {
                if (!!user[id].nurse && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].nurse.name,
                        "surname": user[id].nurse.surname,
                        "gender": user[id].nurse.gender,
                        "medicalID": user[id].nurse.medicalID,
                        "phoneNumber": user[id].nurse.phoneNumber,
                        "type": "nurse",
                        "id": user[id].id
                    })
                } else if (!!user[id].doctor && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].doctor.name,
                        "surname": user[id].doctor.surname,
                        "gender": user[id].doctor.gender,
                        "medicalID": user[id].doctor.medicalID,
                        "phoneNumber": user[id].doctor.phoneNumber,
                        "speciality": user[id].doctor.speciality,
                        "type": "doctor",
                        "id": user[id].id
                    })
                }
            })

            console.log(arr);
            setRows(arr)

        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);

    }, [role])

    const loadUserFromApi = async () => {
        const response = await getAllUser()
        console.log(response.data)
        return response.data
    }

    const handleSearch = async (searchText: string) => {
        if (searchText != "") {
            const user = (await getSearchedUser(searchText)).data
            const arr: { username: any; name: any; surname: any; gender: any; medicalID: any; phoneNumber: any; type: string; id: any; }[] = [];
            console.log(user)
            Object.keys(user).forEach((id) => {
                if (!!user[id].nurse && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].nurse.name,
                        "surname": user[id].nurse.surname,
                        "gender": user[id].nurse.gender,
                        "medicalID": user[id].nurse.medicalID,
                        "phoneNumber": user[id].nurse.phoneNumber,
                        "type": "nurse",
                        "id": user[id].id
                    })
                } else if (!!user[id].doctor && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].doctor.name,
                        "surname": user[id].doctor.surname,
                        "gender": user[id].doctor.gender,
                        "medicalID": user[id].doctor.medicalID,
                        "phoneNumber": user[id].doctor.phoneNumber,
                        "speciality": user[id].doctor.speciality,
                        "type": "doctor",
                        "id": user[id].id
                    })
                }
            })

            console.log(arr);
            setRows(arr)
        } else {
            const user = await loadUserFromApi()
            const arr: { username: any; name: any; surname: any; gender: any; medicalID: any; phoneNumber: any; type: string; id: any; }[] = [];
            console.log(user)

            Object.keys(user).forEach((id) => {
                if (!!user[id].nurse && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].nurse.name,
                        "surname": user[id].nurse.surname,
                        "gender": user[id].nurse.gender,
                        "medicalID": user[id].nurse.medicalID,
                        "phoneNumber": user[id].nurse.phoneNumber,
                        "type": "nurse",
                        "id": user[id].id
                    })
                } else if (!!user[id].doctor && user[id].enabled == true) {
                    arr.push({
                        "username": user[id].username,
                        "name": user[id].doctor.name,
                        "surname": user[id].doctor.surname,
                        "gender": user[id].doctor.gender,
                        "medicalID": user[id].doctor.medicalID,
                        "phoneNumber": user[id].doctor.phoneNumber,
                        "type": "doctor",
                        "speciality": user[id].doctor.speciality,
                        "id": user[id].id
                    })
                }
            })

            console.log(arr);
            setRows(arr)
        }

    }
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof INurseTable>('username');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof INurseTable,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleDisableUser = async (id: string | number) => {
        await disableUser(id)
        router.reload()
    };

    const [openDischarge, setOpenDischarge] = React.useState(false);
    const [rowUsername, setRowUsername] = React.useState<string | number>('');
    const [rowName, setRowName] = React.useState<string | number>('');
    const [rowSurname, setRowSurname] = React.useState<string | number>('');
    const [rowID, setRowID] = React.useState<string | number>(0);


    const handleClickOpenDischarge = (id: string | number, username: string | number, name: string | number, surname: string | number) => {
        setRowID(id)
        setRowUsername(username)
        setRowName(name)
        setRowSurname(surname)
        setOpenDischarge(true);
    };

    const handleCloseDischarge = () => {
        setOpenDischarge(false);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Grid container sx={{ my: { xs: 3, md: 0 }, p: { xs: 2, md: 3 } }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="ค้นหา"
                            placeholder="email, ชื่อ, นามสกุล"
                            onChange={async (search) => {
                                await handleSearch(search.target.value)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6.5}></Grid>
                    <Grid item xs={12} sm={1.5} >

                        <Button
                            variant='contained'
                            fullWidth
                            onClick={() => router.push("/user/register")}
                            sx={{ color: "white" }}

                        >
                            <AddIcon />
                            เพิ่ม User
                        </Button>


                    </Grid>
                    <Grid item xs={12} sm={6.5}></Grid>

                </Grid>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.username}
                                    >
                                        <TableCell padding="checkbox">

                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.username}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.surname}</TableCell>
                                        <TableCell align="right">{row.gender}</TableCell>
                                        <TableCell align="right">{row.phoneNumber}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                        <TableCell align="right">{row.speciality!}</TableCell>
                                        <TableCell align="right">{row.medicalID}</TableCell>
                                        <TableCell align="left">
                                            <Button variant='contained'
                                                color='error'
                                                onClick={() => { handleClickOpenDischarge(row.id, row.username, row.name, row.surname) }}
                                                sx={{ color: "white" }}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Dialog
                        open={openDischarge}
                        onClose={handleCloseDischarge}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography variant="h6" align='center' >
                                {"ยืนยันจะลบ User นี้ใช่หรือไม่"}
                            </Typography>
                        </DialogTitle>
                        <DialogContent >
                            <Paper sx={{ p: { xs: 3, md: 3 }, backgroundColor: '#80A9E5' }}>
                                <Grid container alignItems="center" justifyContent="center">
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' fontWeight='bold'>
                                            {rowUsername}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} alignItems="center">
                                        <Typography variant="h6" align='center' fontWeight='bold'>
                                            {rowName} {rowSurname}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Grid container alignItems="center" justifyContent="center" sx={{ mt: { xs: 3, md: 3 } }}>
                                <Grid item sm={12} alignItems="center">
                                    <Typography variant="subtitle1" align='center' color='error'>
                                        *เมื่อยืนยัน User นี่จะไม่สามารถใช้ได้อีกต่อไป!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDischarge}>ยกเลิก</Button>
                            <Button variant='contained' onClick={() => { handleDisableUser(rowID) }} autoFocus>
                                ยืนยัน
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </Box>
    );
}