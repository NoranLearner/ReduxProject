import React, { useRef, useState } from 'react'
import { Box, Typography, CircularProgress, Button, IconButton, styled, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Add, Remove } from "@mui/icons-material";
import { useGetOneProductQuery } from '../../Redux/productsApi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseQuantity, increaseQuantity } from 'Redux/cartSlice';
import './ProductDetails.css';
import DetailsThumb from './DetailsThumb.js';

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        // backgroundColor: "#1976d2",
        // color: "#fff",
    },
}));

const ProductDetails = () => {

    let { id } = useParams();

    const { data, error, isLoading } = useGetOneProductQuery(id);

    // console.log(data);

    // console.log(id);

    const [index, setIndex] = useState(0);

    const myRef = useRef(null);

    const handleTab = (index) => {
        // this.setState({index: index})
        setIndex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    const dispatch = useDispatch()

    // @ts-ignore
    const { selectedProducts, selectedProductsId } = useSelector((state) => state.carttt);

    const productQuantity = (item) => {

        const myProduct = selectedProducts.find((itemUser) => {
            return itemUser.id === item.id;
        });

        return myProduct.quantity;

    }

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
            <div className="app details-page">

                <div className="details">

                    <div className="big-img">
                        <img src={data.imageLink[index]} alt="" />
                    </div>

                    <div className="box">

                        <div className="row">
                            <h2>{data.productName}</h2>
                            <span>${data.price}</span>
                        </div>

                        <p>{data.description}</p>

                        <DetailsThumb images={data.imageLink} tab={handleTab} myRef={myRef} />

                        {selectedProductsId.includes(data.id) ?
                                    (
                                        <div style={{ display: "flex", alignItems: "center", marginTop:"33px" }}>
                                            <IconButton color='primary' sx={{ mr: "10px" }} onClick={() => dispatch(decreaseQuantity(data))}>
                                                <Remove fontSize='small' />
                                            </IconButton>


                                            <StyledBadge badgeContent={productQuantity(data)} color='primary' />

                                            <IconButton color='primary' sx={{ ml: "10px" }} onClick={() => dispatch(increaseQuantity(data))}>
                                                <Add fontSize='small' />
                                            </IconButton>

                                        </div>
                                    )
                                    :
                                    (
                                        <Button variant="contained" color='primary' className="cart"> <ShoppingCartIcon sx={{ fontSize: "18px", mr: "1" }} onClick={() => dispatch(addToCart(data))}/> add to cart</Button>
                                    )
                                }

                        

                    </div>

                </div>

            </div>
        )
    }

    // ---------------------------------- //
}

export default ProductDetails
