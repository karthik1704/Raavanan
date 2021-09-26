import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearItemFromCart } from '../../data/actions/cartActions';
import { API_URL } from '../../CONSTANTS';
import './order-confirm.css';

const Orderconfirm = () => {
  const dispatch = useDispatch();
  // const [status,setStatus] = useState('');
  const order_confirm_url = `${API_URL}api/order_confirm/`;
  const { status } = useParams();
  useEffect(() => {
    if (status === 'success') dispatch(clearItemFromCart());
  }, [dispatch]);

  const handleclearItemFromCart = () => {
    dispatch(clearItemFromCart());
  };

  if (status === 'success') {
    return (
      <div className="col-rt-12">
        <div className="Scriptcontent">
          <div id="card" className="animated fadeIn">
            <div id="upper-side">
              <h3 id="status">Success</h3>
            </div>
            <div id="lower-side">
              <p id="message">
                Thank you, your order has been successfully placed.
              </p>
              <a href="/" id="contBtn">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (status === 'failure' || status === 'pending') {
    return (
      <div className="col-rt-12">
        <div className="Scriptcontent">
          <div id="card" className="animated fadeIn">
            <div id="upper-side">
              <h3 id="status">FAILURE</h3>
            </div>
            <div id="lower-side">
              <p id="message">
                We are sorry, your transaction has been failed. Please try again
                later
              </p>
              {/* <a href="/" id="contBtn">Continue Shopping</a> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-rt-12">
        <div className="Scriptcontent">
          <div id="card" className="animated fadeIn">
            <div id="lower-side">
              <p id="message">We are fetching the order status</p>
              {/* <a href="/" id="contBtn">Continue Shopping</a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Orderconfirm;
