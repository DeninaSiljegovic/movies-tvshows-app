import { useParams } from "react-router-dom";
import Details from "../Components/Details";
import { basicData } from "../interfaces";
import "./DetailsPage.css";

const DetailsPage = () => {
  const params = useParams<{ type: string; itemId: string }>();
  let obj: basicData = {
    itemId: params.itemId,
    type: params.type,
  };

  return (
    <div className="item">
      <div>
        <button>BACK</button>
      </div>
      <Details key={params.itemId} info={obj} />
    </div>
  );
};

export default DetailsPage;
