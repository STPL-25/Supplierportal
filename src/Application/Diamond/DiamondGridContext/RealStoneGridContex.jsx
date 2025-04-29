import { useState, createContext, } from "react";
import PropTypes from "prop-types";
// Create a new context
const RealStoneContext = createContext();

const RealStoneProvider = ({ children }) => {
    const [inputFields, setInputFields] = useState({
        ProductName:null,
        RealStone:null,
        Pcs:null,
        Gms:null,
        Rate:null,
        MakingCharges:null,
        Tax:null,
        TotalAmount:null
    });
    const handleChange=(e,value,field)=>{
        setInputFields(preFields=>({...preFields,[field]:value}))
    }
    const handleInputChange=(e)=>{
        const {field,value}=e.target ;
        setInputFields(preFields=>({...preFields,[field]:value}))

    }
    return (
        <RealStoneContext.Provider
          value={{
            inputFields,
            setInputFields,
            handleChange,
            handleInputChange
          }}
        >
          {children}
        </RealStoneContext.Provider>
      );

        }

        RealStoneProvider.propTypes = {
            children: PropTypes.node.isRequired,
          };
          export { RealStoneContext, RealStoneProvider };