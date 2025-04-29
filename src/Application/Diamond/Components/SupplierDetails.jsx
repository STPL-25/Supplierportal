import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { DiamondContext } from '../DiamondGridContext/DiamondGridContext'; 
import newImage from "../assets/newImage.png";
import MetalTypeCheckboxes from "./MetalTypeCheckboxes "
import { DashBoardContext } from '../../../DashBoardContext/DashBoardContext';
function SupplierDetails() {
    const { inputFields,  handleInputChange,setInputFields,handleSubmit,setLoopErr,ref,handleAddNew,generateFormattedDateTime } = useContext(DiamondContext);
const {user}=useContext(DashBoardContext)
  return (
    <div>
        {/* <TextField
          id="outlined-multiline-flexible"
          label="Supplier Name"
          name="SupplierName"
          value={user}
          multiline
          onChange={handleInputChange}
          maxRows={4}
          style={{ width: '15%',borderRadius:"5px" }} // Adjust the width as needed

        /> */}
        {/* <button type="button" onClick={handleAddNew} className="text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">New</button> */}
        {/* <button onClick={generateFormattedDateTime} className='pl-4 pt-1'><img src={newImage} alt="new file" /></button> */}
        {/* <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
      <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700">
         
         <div className="font-medium text-center text-gray-500 dark:text-gray-400">{inputFields.GNetWt}</div>
      </div>
        </div> */}

    <MetalTypeCheckboxes />



        
    </div>
  )
}

export default SupplierDetails
