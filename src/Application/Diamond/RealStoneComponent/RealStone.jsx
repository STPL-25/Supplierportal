import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { useContext } from 'react';
import { RealStoneContext } from '../DiamondGridContext/RealStoneGridContex';

function RealStone() {
   const{inputFields,handleChange ,handleInputChange}=useContext(RealStoneContext)

   
  return (
    <div>
    <div className="table-container">
      <form>
        <table>
          <thead>
            <tr className='header-cell'style={{height:"50px"}}>
              <th>Product Name</th>
              <th>Real Stone</th>
              {/* <th>Wt Mode</th> */}
              <th>Pcs</th>
              <th>Gms</th>
              <th>Rate</th>
              <th>Making Charge</th>
              <th>Tax</th>
              <th>Total Amount</th>


             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TextField id="standard-basic" name='ProductName' value={inputFields.ProductName} sx={{ width: "150px",height:"70px",paddingTop:"20px", }}onChange={handleInputChange} variant="standard" />  
              </td>
              {/* border:"1px solid grey",borderRadius:"10px" */}
            
              <td>
                {/* <TextField id="standard-basic"name='MetalType' value={inputFields.MetalType} sx={{ width: "100px", }}onChange={handleChange} variant="standard" /> */}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="RealStone"
                    onChange={(e, value) => handleChange(e, value, "MetalType")}
                    options={["Yellow Gold", "Rose Gold ", "White Gold"
                ,"Platinum","Gem Stones"
                    ]}
                    // value={selectedValue}
                    sx={{ width: 300, border: "none",height:"70px",paddingTop:"10px"  }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ border: "none" }} />
                    )}
                    style={{
                      display: "inline-block",
                      width: "200px",
                      border: "none",
                    }}
                  />
              </td>
              {/* <td>*/}
                {/* <TextField id="standard-basic" name='WtMode' value={inputFields.WtMode} sx={{ width: "80px" }}onChange={handleChange} variant="standard" /> */}
                {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="WtMode"
                    onChange={(e, value) => handleChange(e, value, "WtMode")}
                    options={["Gold With Diamond NtWt", "Gold With Diamond GsWt ", "Platinum With Daimond NtWt"
                    ,"Platinum With Diamond GsWt","Platinum With Gold NtWt","Platinum With Gold Diamond NtWt","Platinum With Gold Diamond GsWt"
                    ,"Platinum NtWt",]}
                    // value={selectedValue}
                    sx={{ width: 300, border: "none",height:"70px",paddingTop:"10px"  }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ border: "none" }} />
                    )}
                    style={{
                      display: "inline-block",
                      width: "350px",
                      border: "none",
                    }}
                  /> */}
              {/* </td> */} 
              {/* <td>
                <TextField id="standard-basic" name='WtMode' value={inputFields.DesignNo} sx={{ width: "55px" }}onChange={handleChange} variant="standard" />
                
              </td> */}
              <td>
                <TextField id="standard-basic" name='Pcs' value={inputFields.Pcs} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
              <td>
                <TextField id="standard-basic" name='Gms' value={inputFields.Gms} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
              <td>
                <TextField id="standard-basic" name='Rate' value={inputFields.Rate} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
              <td>
                <TextField id="standard-basic" name='MakingCharges' value={inputFields.MakingCharges} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
              <td>
                <TextField id="standard-basic" name='Tax' value={inputFields.Tax} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
              <td>
                <TextField id="standard-basic" name='TotalAmount' value={inputFields.TotalAmount} sx={{ width: "55px" }}onChange={handleInputChange} variant="standard" />
                
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
  )
}

export default RealStone
