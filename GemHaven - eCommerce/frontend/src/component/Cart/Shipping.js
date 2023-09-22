import React ,{Fragment , useState}from 'react';
import "./Shipping.css";
import { useDispatch , useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import {Country , State} from "country-state-city";
import { useAlert } from 'react-alert';
import CheckoutSteps from "../Cart/CheckoutSteps.js"
import { useNavigate } from 'react-router';
import Loader from '../layout/Loader/Loader';


const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading} = useSelector((state) => state.user);
    const {shippingInfo} = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


    const shippingSubmit = (event) => {
        event.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be of 10 digits.");
            return;
        }

        dispatch(
            saveShippingInfo({address , city , state , country , pinCode , phoneNo})
        );
        
        navigate("/order/confirm");
    };

  return (
    <Fragment>
        {loading ? <Loader/> : 

        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className='shippingHeading' >Shipping Details</h2>

                    <form
                    className='shippingForm'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                    >

                        <div>
                            <HomeIcon/>
                            <input 
                            type="text" 
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}   
                            />
                        </div>

                        <div>
                            <LocationCityIcon/>
                            <input 
                            type="text" 
                            placeholder='City'
                            required
                            value={city}
                            onChange={(event) => setCity(event.target.value)}   
                            />
                        </div>

                        <div>
                            <PinDropIcon/>
                            <input 
                            type="number" 
                            placeholder='Pin Code'
                            required
                            value={pinCode}
                            onChange={(event) => setPinCode(event.target.value)}   
                            />
                        </div>

                        <div>
                            <PhoneIcon/>
                            <input 
                            type="number" 
                            placeholder='Phone Number'
                            required
                            value={phoneNo}
                            onChange={(event) => setPhoneNo(event.target.value)}   
                            size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon/>
                            
                            <select 
                            required
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            >

                            <option value="">Country</option>

                            {Country && 
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon/>

                                <select 
                                    required
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                >

                                <option value="">State</option>

                                {State && 
                                    State.getStatesOfCountry(country).map((item) => (

                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>

                                    ))}

                                </select>
                            </div>
                        )}

                        <input 
                        type="submit"
                        value="Continue"
                        className='shippingBtn'
                        disabled = {state ? false : true}
                        />

                    </form>
                </div>
            </div>

        </Fragment>
        
    }
    </Fragment>
  )
}

export default Shipping