import { useParams } from "react-router-dom";
import Details from "../Components/Details";
import { basicData } from "../interfaces";
import { NavLink } from "react-router-dom";
import "./DetailsPage.css";

const DetailsPage = () => {
  const params = useParams<{ type: string; itemId: string }>();
  let obj: basicData = {
    itemId: params.itemId,
    type: params.type,
  };

  const backPg = params.type + "s";

  return (
    <div className="item">
      <div>
        <NavLink to={`/${backPg}`}>
          <button>Back</button>
        </NavLink>
      </div>
      <Details key={params.itemId} info={obj} />
    </div>
  );
};

export default DetailsPage;
