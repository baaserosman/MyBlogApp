import { Box } from "@mui/material";
import { useFetch } from "../../auth/firebase";
import CardItem from "./CardItem";

const CardContainer = () => {
  const { cards, isLoading } = useFetch();
  // const navigate = useNavigate();
  // const { currentUser } = useContext(AuthContext);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Box
          width="50%"
          component="img"
          src={
            "https://www.loginradius.com/blog/static/8b9b7fd9f1449699b8c7a09b270a185c/c40f8/css3-loading-spinner.png"
          }
        ></Box>
      ) : cards?.length === 0 ? (
        <Box
          width="75%"
          component="img"
          src={
            "https://cdn.dribbble.com/users/453325/screenshots/5573953/empty_state.png"
          }
        ></Box>
      ) : (
        cards?.map((card, index) => <CardItem card={card} key={index} />)
      )}
    </Box>
  );
};

export default CardContainer;
