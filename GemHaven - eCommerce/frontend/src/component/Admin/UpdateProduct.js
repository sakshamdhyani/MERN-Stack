import React , {Fragment , useEffect , useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { updateProduct , getProductDetails , clearErrors } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DescriptionIcon from "@material-ui/icons/Description"
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import Sidebar from './Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate, useParams } from 'react-router'


const UpdateProduct = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
        "Mobile"
      ]

      const productId = params.id;
      
      const {error , product} = useSelector((state) => state.productDetails)
      const {loading , error:updateError , isUpdated} = useSelector((state) => state.product);
  
      const [name,setName] = useState("");
      const [price,setPrice] = useState("");
      const [description,setDescription] = useState("");
      const [category,setCategory] = useState("");
      const [stock,setStock] = useState("");
      const [images,setImages] = useState([]);
      const [imagesPreview,setImagesPreview] = useState([]);
      const [oldImages,setOldImages] = useState([]);


    useEffect(() => {

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId));
        }
        else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({type: UPDATE_PRODUCT_RESET});
        }
    },[dispatch , alert , isUpdated , navigate , updateError, product ,productId]);
    
 
    const updateProductSubmitHandler = (event) => {
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

        dispatch(updateProduct(productId , myForm));

    }

    const updateProductImagesChange = (event) => {

        const files = Array.from(event.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
                    onSubmit={updateProductSubmitHandler}
                >

                    <h1>Update Product</h1>

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
                        value={price}
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
                        value={category}
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
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                        />
                    </div>

                    <div id='createProductFormFile'>
                        <input type="file"
                        name='avatar'
                        onChange={updateProductImagesChange}
                        accept='image/*'
                        multiple
                         />
                    </div>
                    

                    <div id='createProductFormImage'>
                        {oldImages && 
                            oldImages.map((image,index) => (
                            <img key={index} src={image.url} alt="Old Product Preview" />
                        ))}
                    </div>

                    <div id='createProductFormImage'>
                        {imagesPreview.map((image,index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button id='createProductBtn'
                    type='submit'
                    disabled= {loading ? true : false}
                    >
                    Update     
                    </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateProduct