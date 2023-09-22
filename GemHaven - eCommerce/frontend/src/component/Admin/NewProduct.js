import React , {Fragment , useEffect , useState} from 'react'
import "./NewProduct.css"
import { useDispatch , useSelector } from 'react-redux'
import { createProduct , clearErrors } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DescriptionIcon from "@material-ui/icons/Description"
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router'


const NewProduct = () => {
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Mobile",
        "Watch"
      ]


      const navigate = useNavigate();
      const dispatch = useDispatch();
      const alert = useAlert();
  
      const {loading , error , success} = useSelector((state) => state.newProduct);
  
      const [name,setName] = useState("");
      const [price,setPrice] = useState("");
      const [description,setDescription] = useState("");
      const [category,setCategory] = useState("");
      const [stock,setStock] = useState("");
      const [images,setImages] = useState([]);
      const [imagesPreview,setImagesPreview] = useState([]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET});
        }
    },[dispatch , alert , error , navigate , success]);
    
 
    const createProductSubmitHandler = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("price" , price);
        myForm.set("description" , description);
        myForm.set("category" , category);
        myForm.set("stock" , stock);

        images.forEach((image) => {
            myForm.append("images" , image);
        })

        dispatch(createProduct(myForm));

    }

    const createProductImagesChange = (event) => {

        const files = Array.from(event.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old , reader.result]);
                    setImages((old) => [...old , reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
};


  return (
    <Fragment>
        <MetaData title="Create Product" />

        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form 
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={createProductSubmitHandler}
                >

                    <h1>Create Product</h1>

                    <div>
                        <SpellcheckIcon/>
                        <input 
                        type="text" 
                        placeholder='Product Name'
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}    
                        />
                    </div>

                    <div>
                        <AttachMoneyIcon/>
                        <input 
                        type="number" 
                        placeholder='Price'
                        required
                        onChange={(event) => setPrice(event.target.value)}    
                        />
                    </div>

                    <div>
                        <DescriptionIcon/>
                        <textarea
                         placeholder='Product Description'
                         value={description}
                         onChange={(event) => setDescription(event.target.value)}
                         cols = "30"
                         rows = "1"
                        >

                         </textarea>
                    </div>

                    <div>
                        <AccountTreeIcon/>
                        <select 
                        onChange={(event) => setCategory(event.target.value)}
                        >

                            <option value="" > Choose Category </option>

                            {categories.map((category) => (
                                <option key={category} value={category} >
                                    {category}
                                </option>
                            ))}

                        </select>
                    </div>

                    
                    <div>
                        <StorageIcon/>
                        <input 
                        type="number"
                        placeholder='Stock'
                        required
                        onChange={(event) => setStock(event.target.value)}
                        />
                    </div>

                    <div id='createProductFormFile'>
                        <input type="file"
                        name='avatar'
                        onChange={createProductImagesChange}
                        accept='image/*'
                        multiple
                         />
                    </div>
                                

                    <div id='createProductFormImage'>
                        {imagesPreview.map((image,index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button id='createProductBtn'
                    type='submit'
                    // disabled= {loading ? true : false}
                    >
                    Create     
                    </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct