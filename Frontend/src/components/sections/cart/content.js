import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { fetchCart, updateQuantity, deleteItem } from '../../../api';
import Cookies from 'js-cookie';
import './styles.css';

const Cart = () => {

    const [cart, setCart] = useState([]);
    const classes = useStyles();
    const [check, setCheck] = useState(false);

    useEffect(async () => {
        await fetchCart({ uid: Cookies.get('id') })
            .then((response) => {
                console.log("Res cart: ", response.data.cart[0].items)
                if (response.data.message === true) {
                    setCart(response.data.cart[0])
                }
            }).catch((err) => {
                console.log("err: ", err.message)
            })


    }, [check])

    const updatequantity = (pid, quant, val) => {
        var quantity = quant + (val);
        if (quantity == 0) {
            deleteFunc(pid)
        } else {
            updateQuantity({ cid: cart._id, pid, quantity })
                .then((response) => {
                    console.log("response : ", response.data)
                    setCheck(!check)
                }).catch((err) => {
                    console.log("err: ", err.message)
                })
        }

    }

    const deleteFunc = async (pid) => {
        await deleteItem({ cid: cart._id, pid })
            .then((response) => {
                console.log("response : ", response.data)
                setCheck(!check)
            }).catch((err) => {
                console.log("err: ", err.message)
            })
    }


    //console.log("cart: ", cart)
    const renderEmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link className={classes.link} to="/">start adding some</Link>!
        </Typography>
    );

    if (cart.length == 0) return 'Loading';

    const renderCart = () => (
        <>

            <div className="container-fluid px-lg-4">

                <div className="row">
                    <div className="col-md-8 mt-4">
                        <div className="table-responsive">
                            <table id="table" className="table v-middle">
                                <thead>
                                    <tr className="bg-light">
                                        <th scope="col">No</th>
                                        <th scope="col" ></th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item, key) => (
                                        <tr>

                                            <td><i className='fa fa-trash' id="icon" onClick={() => deleteFunc(item.pid._id)} style={{ fontSize: 17 }} /></td>
                                            <td><img class="cart-products-image" src={item.pid.picture} /></td>
                                            <td>{item.pid.title}</td>
                                            <td><span><i className='fa fa-minus' id="icon" onClick={() => updatequantity(item.pid._id, item.quantity, -1)} /></span>{item.quantity}<span><i className='fa fa-plus' id="icon" style={{ color: '#2CAC5D' }} onClick={() => updatequantity(item.pid._id, item.quantity, 1)} /></span></td>
                                            <td>{item.pid.price}</td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="container" id="Billing">
                            <div className="Billing-header">
                                <h1>CART TOTAL</h1>
                            </div>
                            <div className="Billing-content">
                                <p>Total<span id="total">Rs.0</span></p>
                                <p>Shippping<span id="shipping">0</span></p>
                                <p className="ship-cost">Discount<span>Rs.0</span></p>
                                <h2>Grand Total<span id="grandTotal">0</span></h2>

                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {cart.length === 0 ? renderEmptyCart() : renderCart()}
        </Container>
    );
};

export default Cart;
