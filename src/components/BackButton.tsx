import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Button onClick={handleClick} type="back">
      &larr; Back
    </Button>
  );
}

export default BackButton;
