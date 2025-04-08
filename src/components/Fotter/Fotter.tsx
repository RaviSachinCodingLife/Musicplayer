import { Fragment } from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { footerLinks, socialIcons } from "./util";
import * as style from "./style";

const Fotter = () => {
  return (
    <Fragment>
      <Box px={10} py={2}>
        <Divider sx={style.DividerStyle} />

        <Box sx={style.MainBoxStyle}>
          <Box display="flex" flexWrap="wrap" alignItems={"center"} gap={1}>
            {footerLinks.map((link, index) => (
              <Fragment key={index}>
                <a href={link.href} color="inherit" style={{ color: "white" }}>
                  {link.label}
                </a>
                {index !== footerLinks.length - 1 && (
                  <Typography mx={0.5} color="grey">
                    |
                  </Typography>
                )}
              </Fragment>
            ))}
          </Box>

          <Box display="flex" gap={1}>
            {socialIcons.map((item, index) => (
              <IconButton
                key={index}
                component="a"
                href={item.href}
                target="_blank"
                sx={style.IconButtonStyle}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        <Divider sx={{ ...style.DividerStyle, mt: 2 }} />

        <Box mt={1}>
          <Typography
            variant="body2"
            color="grey"
            fontSize="11px"
            textAlign="center"
          >
            2025 © All rights reserved | RaviSachinCodingLife Digital Limited
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Fotter;
