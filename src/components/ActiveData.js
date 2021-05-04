import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { makeStyles,Paper,TableCell, TableRow,TableContainer,TableHead,Table,TableBody, TablePagination} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper:{
      margin: theme.spacing(5),
      padding:theme.spacing(3)
    },
    table: {
        marginTop:20,
        minWidth: 100,
      },
  }));

export default function ActiveData() {
    const classes = useStyles();
    const [data,setData]=useState()
    const [rowsPerPage,setRowsPerPage]=useState(5)
    const [page,setPage]=useState(0)
    const [order,setOrder]=useState("asc")
    
    useEffect(()=>{
        const token ='BobTestToken'
        axios.post('https://api-dev.professorbob.ai/hiring_test',{
              query: `
              query{
                listTestingCustomers(onlyActive: false, ids: []){
                    id
                    name
                    contractDate
                    contractType
                    contractActive
                    emailAddress
                    customerSector
                    courseNumber
                }
            }
                `},{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }).then((res)=>{
                      //console.log(res.data.data.listTestingCustomers)
                      setData(res.data.data.listTestingCustomers)
                  }).catch((error) => {
                    console.error(error)
                  })
    },[])

    const handleChangePage=(event,newPage)=>{
        setPage(newPage)
    }
    
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    

    const displayData=data && data.filter((doc)=>{
        //console.log(doc)
        if(doc.contractActive.toString()==="true"){
          return doc
        }
    })

    const convertTime=(timestamp)=>{
        var date = new Date(timestamp);
        return (date.toString())
        
    }

    const sortable=()=>{
        console.log("hello")
        if(order==="asc"){
            setOrder("desc")
        }

    }

      
    return (data!==undefined?
        <div>
        <h1>Active Customers</h1>
        <Paper className={classes.paper}>
        {displayData?
        <>
        <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right" onClick={sortable("Name")}>Name</TableCell>
            <TableCell align="right">Contract Date</TableCell>
            <TableCell align="right">Contract Active</TableCell>
            <TableCell align="right">Contract Type</TableCell>
            <TableCell align="right">Course Number</TableCell>
            <TableCell align="right">Customer Sector</TableCell>
            <TableCell align="right">Email Address</TableCell>
          </TableRow>
        </TableHead>

        {(rowsPerPage > 0
            ? displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : displayData
          ).map(doc=>{
            return(
            <TableBody>
            <TableRow key={doc.id}>
            
              <TableCell component="th" scope="row">
                {doc.id}
              </TableCell>
              <TableCell align="right">{doc.name}</TableCell>
              <TableCell align="right">{convertTime(doc.contractDate)}</TableCell>
              <TableCell align="right">{doc.contractActive.toString()}</TableCell>
              <TableCell align="right">{doc.contractType}</TableCell>
              <TableCell align="right">{doc.courseNumber}</TableCell>
              <TableCell align="right">{doc.customerSector}</TableCell>
              <TableCell align="right">{doc.emailAddress}</TableCell>
            </TableRow>
            </TableBody>)
          
    })}
      </Table>
    </TableContainer>
    <TablePagination rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }] } colSpan={3}
              count={displayData.length} rowsPerPage={rowsPerPage}
              page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage}
              /></>:""}       
        </Paper>       
        </div>:""
    )
}
