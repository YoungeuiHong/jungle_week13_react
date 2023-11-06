import {
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" component="div" color="#FFFFFF">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
