import { useSearchParams } from "react-router-dom";
const Labels = () => {
  //   let { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const label = searchParams.get("label");

  return <h1>{label}</h1>;
};

export default Labels;
