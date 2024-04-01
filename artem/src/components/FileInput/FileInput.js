import { FileContainer, InputStyled, TextStyled } from "./FileInput.styled";
import { sendImageToServer } from "../../services/assetServices";

const FileInput = ({onImageChange}) => {

  const readImage = (e) => {
    const file = e.target.files[0];
    sendImageToServer(file)
     .then(res => onImageChange(res.data.secure_url))
     .catch(err => console.log(err));
  }

  return (
    <FileContainer className="inputContainer">
      <TextStyled>Upload your profile picture</TextStyled>
      <InputStyled type="file" onChange={readImage}/>
    </FileContainer>
  )
}

export default FileInput;