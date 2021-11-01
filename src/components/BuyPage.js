import * as React from 'react';
import Grid from '@mui/material/Grid';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';
import Box from '@mui/material/Box';

const BuyPage =()=>{

const [{basket},dispatch] = useStateValue();

function FormRow(){

        
return(
    <React.Fragment>
        {basket?.map((item)=>

            <Grid item xs={12} sm={8} md={6} lg={4} >
                <Box position="absolut" top="0px" rigth="0px" width="200px" heigth="150px"backgroundColor="blue">
                <BuyCard key={item.id} product={item}/>
                </Box>
            </Grid>
            
        )}
</React.Fragment>
);
}
return( 

        <Grid item xs={12} sm={8} md={9}  container spacing={2}>
            <FormRow/>
        </Grid>

)
}
export default BuyPage;