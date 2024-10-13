import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

function ImageComponent({ imagePath }) {
  return (
    <>
      <Box
        component="ul"
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          p: 0,
          m: 0,
          borderRadius: 20,
          width: "50%",
        }}
      >
        <Card
          component="li"
          sx={{ width: "100%", height: "100dvh", flexGrow: 1 }}
        >
          {/* <CardCover> */}
          <img
            src={imagePath}
            loading="lazy"
            alt="image"
            style={{
              // objectFit: "cover",
              height: "100%",
              width: "100%",
              padding: "20px",
              borderRadius: "8%",
            }}
          />
          {/* </CardCover> */}
        </Card>
      </Box>
    </>
  );
}

export default ImageComponent;