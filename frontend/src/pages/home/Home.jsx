import * as React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Badge, Box, CircularProgress, IconButton, styled, useTheme } from '@mui/material';

import { useGetproductsByNameQuery } from '../../Redux/productsApi';

import './Home.css'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from 'Redux/cartSlice';

import { Add, Remove } from "@mui/icons-material";

import { decreaseQuantity, increaseQuantity } from 'Redux/cartSlice';

import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        // backgroundColor: "#1976d2",
        // color: "#fff",
    },
}));

const Home = () => {

    const theme = useTheme();

    const { data, error, isLoading } = useGetproductsByNameQuery();

    const dispatch = useDispatch()

    // @ts-ignore
    const { selectedProducts, selectedProductsId } = useSelector((state) => state.carttt);

    const productQuantity = (item) => {

        const myProduct = selectedProducts.find((itemUser) => {
            return itemUser.id === item.id;
        });

        return myProduct.quantity;

    }

    const navigate = useNavigate();

    // ---------------------------------- //

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    // ---------------------------------- //

    if (error) {
        return (
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h3" color="error">ERROR</Typography>
            </Box>
        )
    }

    // ---------------------------------- //

    if (data) {

        return (

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
                mt={{ xs: 1, sm: 2, md: 3 }}
                sx={{ flexWrap: "wrap", justifyContent: "center" }}>

                {data.map((item) => {

                    return (

                        <Card sx={{ maxWidth: 277, mb: 6 }} key={item.id} className='card'>

                            <CardMedia component="img" height="277" image={item.imageLink[0]} alt={item.productName} onClick={()=>{
                                navigate(`product-details/${item.id}`)
                            }}/>

                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>

                            <CardActions sx={{ justifyContent: "space-between" }}>

                                {selectedProductsId.includes(item.id) ?
                                    (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <IconButton color='primary' sx={{ mr: "10px" }} onClick={() => dispatch(decreaseQuantity(item))}>
                                                <Remove fontSize='small' />
                                            </IconButton>


                                            <StyledBadge badgeContent={productQuantity(item)} color='primary' />

                                            <IconButton color='primary' sx={{ ml: "10px" }} onClick={() => dispatch(increaseQuantity(item))}>
                                                <Add fontSize='small' />
                                            </IconButton>

                                        </div>
                                    )
                                    :
                                    (
                                        <Button variant="contained" color='primary' sx={{ textTransform: "capitalize", lineHeight: "1.1", p: '1' }} onClick={() => dispatch(addToCart(item))}>add to cart</Button>
                                    )
                                }

                                <Typography variant="h6" color={theme.palette.error.light} sx={{ textAlign: "left", marginRight: "8px" }}>${item.price}</Typography>

                            </CardActions>

                        </Card>

                    )

                })
                }


            </Stack >

        )

    }

    // ---------------------------------- //
}

export default Home;